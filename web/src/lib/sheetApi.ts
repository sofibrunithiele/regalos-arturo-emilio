import type { Reservation } from './reservations'

const CONFIG_URL = `${import.meta.env.BASE_URL}config.json`

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

async function sheetPost(url: string, body: Record<string, unknown>): Promise<unknown> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(body),
    redirect: 'follow',
  })
  const text = await res.text()
  try {
    return JSON.parse(text) as unknown
  } catch {
    // Apps Script a veces redirige el POST y el body final no es JSON,
    // aunque la acción sí se ejecutó. Devolvemos null y el caller verifica.
    if (res.ok || res.type === 'opaqueredirect') return null
    throw new Error('Respuesta inválida del servidor de reservas')
  }
}

export async function sheetReserveGift(
  url: string,
  giftId: string,
  reservedBy: string,
): Promise<Reservation> {
  const data = await sheetPost(url, {
    action: 'reserve',
    gift_id: giftId,
    reserved_by: reservedBy,
  })

  if (data && typeof data === 'object' && 'id' in data) {
    return data as Reservation
  }

  // Fallback: confirmar leyendo la lista
  const rows = await sheetListReservations(url)
  const match = [...rows]
    .reverse()
    .find((r) => r.gift_id === giftId && r.reserved_by === reservedBy)
  if (match) return match

  throw new Error('No se pudo reservar')
}

export async function sheetReleaseReservation(url: string, id: string): Promise<void> {
  await sheetPost(url, { action: 'release', id })
}
