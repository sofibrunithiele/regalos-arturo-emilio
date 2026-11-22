import { useCallback, useEffect, useMemo, useState } from 'react'
import { GiftCard } from './components/GiftCard'
import { ReserveModal } from './components/ReserveModal'
import { Sailboat } from './components/Sailboat'
import { gifts, type Gift } from './data/gifts'
import { shipping } from './data/shipping'
import {
  detectCloud,
  listReservations,
  releaseReservation,
  reserveGift,
  type Reservation,
} from './lib/reservations'
import './App.css'

function isAdminMode() {
  return new URLSearchParams(window.location.search).get('admin') === 'vela'
}

export default function App() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Gift | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [liveList, setLiveList] = useState(false)
  const admin = isAdminMode()

  const refresh = useCallback(async () => {
    const rows = await listReservations()
    setReservations(rows)
  }, [])

  useEffect(() => {
    detectCloud()
      .then(setLiveList)
      .catch(() => setLiveList(false))

    refresh()
      .catch(() =>
        setLoadError('No pudimos cargar las reservas. Recarga la página.'),
      )
      .finally(() => setLoading(false))
  }, [refresh])

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(t)
  }, [toast])

  const counts = useMemo(() => {
    const map = new Map<string, Reservation[]>()
    for (const r of reservations) {
      const list = map.get(r.gift_id) ?? []
      list.push(r)
      map.set(r.gift_id, list)
    }
    return map
  }, [reservations])

  const availableCount = useMemo(() => {
    return gifts.filter((g) => {
      if (g.unlimited) return true
      const reserved = counts.get(g.id)?.length ?? 0
      return reserved < g.quantity
    }).length
  }, [counts])

  const onConfirm = async (name: string) => {
    if (!selected) return
    setBusy(true)
    setError(null)
    try {
      await reserveGift(selected.id, name)
      await refresh()
      setToast(`¡Gracias, ${name.trim()}! Ya quedó reservado.`)
      setSelected(null)
    } catch {
      setError('No se pudo reservar. Intenta de nuevo.')
    } finally {
      setBusy(false)
    }
  }

  const onRelease = async (giftId: string) => {
    const rows = counts.get(giftId) ?? []
    if (!rows.length) return
    setBusy(true)
    try {
      for (const row of rows) {
        await releaseReservation(row.id)
      }
      await refresh()
      setToast('Regalo liberado.')
    } catch {
      setToast('No se pudo liberar.')
    } finally {
      setBusy(false)
    }
  }

  const copyAddress = async () => {
    const text = `${shipping.recipient}\n${shipping.addressTitle}\n${shipping.addressLine}\n\nMercado Libre (si aparece): ${shipping.mercadoLibrePickup.name}, ${shipping.mercadoLibrePickup.place}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="page">
      <div className="sky" aria-hidden="true" />

      <header className="hero">
        <p className="hero__kicker">Lista de regalos</p>
        <h1 className="hero__brand">Arturo Emilio</h1>
        <p className="hero__lede">
          Un pequeño que ya tiene rumbo. Elige un regalo, resérvalo con tu
          nombre y cómpralo en el link de la tienda.
        </p>
        <Sailboat className="hero__sail" />
        <div className="hero__meta">
          <span>{loading ? '…' : `${availableCount} disponibles`}</span>
          <span className="dot" aria-hidden="true" />
          <span>{liveList ? 'Lista en vivo' : 'Vista local'}</span>
        </div>
      </header>

      {loadError ? (
        <p className="gifts__loading" role="alert">
          {loadError}
        </p>
      ) : null}

      <section className="shipping" aria-labelledby="shipping-title">
        <div className="shipping__inner">
          <p className="section-kicker">Para enviar</p>
          <h2 id="shipping-title" className="section-title">
            Dirección
          </h2>
          <p className="shipping__recipient">{shipping.recipient}</p>
          <p className="shipping__address">
            <strong>{shipping.addressTitle}</strong>
            <br />
            {shipping.addressLine}
          </p>
          <p className="shipping__ml">
            <strong>Mercado Libre:</strong> {shipping.mercadoLibrePickup.note}{' '}
            <em>
              {shipping.mercadoLibrePickup.name},{' '}
              {shipping.mercadoLibrePickup.place}
            </em>
            .
          </p>
          <button type="button" className="btn btn--soft" onClick={copyAddress}>
            {copied ? 'Copiado' : 'Copiar datos de envío'}
          </button>
        </div>
      </section>

      <main className="gifts" id="regalos">
        <div className="gifts__head">
          <p className="section-kicker">Elige con calma</p>
          <h2 className="section-title">Regalos</h2>
          <p className="gifts__hint">
            Al tocar “Lo regalo”, el ítem desaparece para el resto. La compra se
            hace en la tienda del link (Chile o el extranjero). Las etiquetas
            Accesible, Medio y Mayor son solo una guía de presupuesto.
          </p>
          {!loading && !liveList ? (
            <p className="gifts__hint gifts__hint--warn" role="status">
              Ahora mismo las reservas solo quedan en este navegador. Para que
              toda la familia vea qué ya se compró, falta activar la lista en
              vivo.
            </p>
          ) : null}
        </div>

        {loading ? (
          <p className="gifts__loading">Cargando la lista…</p>
        ) : (
          <div className="gifts__grid">
            {gifts.map((gift, index) => {
              const rows = counts.get(gift.id) ?? []
              const remaining = gift.unlimited
                ? 99
                : Math.max(0, gift.quantity - rows.length)
              return (
                <GiftCard
                  key={gift.id}
                  gift={gift}
                  remaining={remaining}
                  reservedBy={rows.map((r) => r.reserved_by)}
                  admin={admin}
                  index={index}
                  onReserve={setSelected}
                  onRelease={onRelease}
                />
              )
            })}
          </div>
        )}

        {!loading && availableCount === 0 && !admin ? (
          <p className="gifts__empty">
            Todos los regalos ya tienen capitán. ¡Gracias!
          </p>
        ) : null}
      </main>

      <footer className="footer">
        <p>Con amor, para Arturo Emilio</p>
      </footer>

      <ReserveModal
        gift={selected}
        busy={busy}
        error={error}
        onClose={() => {
          setSelected(null)
          setError(null)
        }}
        onConfirm={onConfirm}
      />

      {toast ? <div className="toast">{toast}</div> : null}
    </div>
  )
}
