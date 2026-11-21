import type { Reservation } from './reservations'

const CONFIG_URL = '/config.json'

type AppConfig = {
  reservationsUrl?: string
}

let cachedConfig: AppConfig | null = null

async function loadConfig(): Promise<AppConfig> {
  if (cachedConfig) return cachedConfig
  try {
    const res = await fetch(CONFIG_URL, { cache: 'no-store' })
    if (!res.ok) {
      cachedConfig = {}
      return cachedConfig
    }
    cachedConfig = (await res.json()) as AppConfig
    return cachedConfig
  } catch {
    cachedConfig = {}
    return cachedConfig
  }
}

export async function getReservationsUrl(): Promise<string | null> {
  const config = await loadConfig()
  const url = config.reservationsUrl?.trim()
  return url || null
}

export async function sheetListReservations(url: string): Promise<Reservation[]> {
  const res = await fetch(url, { method: 'GET' })
  if (!res.ok) throw new Error('No se pudieron cargar las reservas')
  const data = await res.json()
  return Array.isArray(data) ? (data as Reservation[]) : []
}

export async function sheetReserveGift(
  url: string,
  giftId: string,
  reservedBy: string,
): Promise<Reservation> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      action: 'reserve',
      gift_id: giftId,
      reserved_by: reservedBy,
    }),
  })
  if (!res.ok) throw new Error('No se pudo reservar')
  return (await res.json()) as Reservation
}

export async function sheetReleaseReservation(url: string, id: string): Promise<void> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action: 'release', id }),
  })
  if (!res.ok) throw new Error('No se pudo liberar')
}
