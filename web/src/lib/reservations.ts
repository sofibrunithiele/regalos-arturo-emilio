import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export type Reservation = {
  id: string
  gift_id: string
  reserved_by: string
  created_at: string
}

const STORAGE_KEY = 'arturo-emilio-reservations-v1'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = (import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) as string | undefined

let supabase: SupabaseClient | null = null
if (url && key) {
  supabase = createClient(url, key)
}

export const usingCloud = Boolean(supabase)

function readLocal(): Reservation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Reservation[]
  } catch {
    return []
  }
}

function writeLocal(items: Reservation[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export async function listReservations(): Promise<Reservation[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('reservations')
      .select('id, gift_id, reserved_by, created_at')
      .order('created_at', { ascending: true })
    if (error) throw error
    return (data ?? []) as Reservation[]
  }
  return readLocal()
}

export async function reserveGift(
  giftId: string,
  reservedBy: string,
): Promise<Reservation> {
  const name = reservedBy.trim()
  if (!name) throw new Error('Necesitamos tu nombre')

  if (supabase) {
    const { data, error } = await supabase
      .from('reservations')
      .insert({ gift_id: giftId, reserved_by: name })
      .select('id, gift_id, reserved_by, created_at')
      .single()
    if (error) throw error
    return data as Reservation
  }

  const item: Reservation = {
    id: crypto.randomUUID(),
    gift_id: giftId,
    reserved_by: name,
    created_at: new Date().toISOString(),
  }
  const next = [...readLocal(), item]
  writeLocal(next)
  return item
}

export async function releaseReservation(id: string): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from('reservations').delete().eq('id', id)
    if (error) throw error
    return
  }
  writeLocal(readLocal().filter((r) => r.id !== id))
}
