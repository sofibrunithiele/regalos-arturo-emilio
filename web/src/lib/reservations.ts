import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import {
  getReservationsUrl,
  sheetListReservations,
  sheetReleaseReservation,
  sheetReserveGift,
} from './sheetApi'

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

type Backend = 'supabase' | 'sheet' | 'local'

let resolvedBackend: Backend | null = supabase ? 'supabase' : null
let sheetUrlCache: string | null | undefined

async function resolveBackend(): Promise<{ backend: Backend; sheetUrl: string | null }> {
  if (supabase) {
    resolvedBackend = 'supabase'
    return { backend: 'supabase', sheetUrl: null }
  }

  if (sheetUrlCache === undefined) {
    sheetUrlCache = await getReservationsUrl()
  }

  if (sheetUrlCache) {
    resolvedBackend = 'sheet'
    return { backend: 'sheet', sheetUrl: sheetUrlCache }
  }

  resolvedBackend = 'local'
  return { backend: 'local', sheetUrl: null }
}

/** True when reservas se comparten entre visitantes (no solo este navegador). */
export function usingCloudSync(): boolean {
  return resolvedBackend === 'supabase' || resolvedBackend === 'sheet'
}

/** @deprecated Prefer usingCloudSync() after el primer listReservations(). */
export const usingCloud = Boolean(supabase)

export async function detectCloud(): Promise<boolean> {
  const { backend } = await resolveBackend()
  return backend !== 'local'
}

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
  const { backend, sheetUrl } = await resolveBackend()

  if (backend === 'supabase' && supabase) {
    const { data, error } = await supabase
      .from('reservations')
      .select('id, gift_id, reserved_by, created_at')
      .order('created_at', { ascending: true })
    if (error) throw error
    return (data ?? []) as Reservation[]
  }

  if (backend === 'sheet' && sheetUrl) {
    return sheetListReservations(sheetUrl)
  }

  return readLocal()
}

export async function reserveGift(
  giftId: string,
  reservedBy: string,
): Promise<Reservation> {
  const name = reservedBy.trim()
  if (!name) throw new Error('Necesitamos tu nombre')

  const { backend, sheetUrl } = await resolveBackend()

  if (backend === 'supabase' && supabase) {
    const { data, error } = await supabase
      .from('reservations')
      .insert({ gift_id: giftId, reserved_by: name })
      .select('id, gift_id, reserved_by, created_at')
      .single()
    if (error) throw error
    return data as Reservation
  }

  if (backend === 'sheet' && sheetUrl) {
    return sheetReserveGift(sheetUrl, giftId, name)
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
  const { backend, sheetUrl } = await resolveBackend()

  if (backend === 'supabase' && supabase) {
    const { error } = await supabase.from('reservations').delete().eq('id', id)
    if (error) throw error
    return
  }

  if (backend === 'sheet' && sheetUrl) {
    await sheetReleaseReservation(sheetUrl, id)
    return
  }

  writeLocal(readLocal().filter((r) => r.id !== id))
}
