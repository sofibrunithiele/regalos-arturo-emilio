import { useEffect, useRef, useState, type FormEvent } from 'react'
import type { Gift } from '../data/gifts'

type ReserveModalProps = {
  gift: Gift | null
  busy: boolean
  error?: string | null
  onClose: () => void
  onConfirm: (name: string) => void
}

export function ReserveModal({
  gift,
  busy,
  error,
  onClose,
  onConfirm,
}: ReserveModalProps) {
  const [name, setName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (gift) {
      setName('')
      const t = window.setTimeout(() => inputRef.current?.focus(), 50)
      return () => window.clearTimeout(t)
    }
  }, [gift])

  useEffect(() => {
    if (!gift) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [gift, onClose])

  if (!gift) return null

  const submit = (e: FormEvent) => {
    e.preventDefault()
    onConfirm(name)
  }

  return (
    <div className="modal-root" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reserve-title"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="modal__eyebrow">Reservar regalo</p>
        <h2 id="reserve-title" className="modal__title">
          {gift.name}
        </h2>
        <p className="modal__copy">
          Deja tu nombre para que nadie más lo compre. Después abre el link y
          cómpralo en la tienda.
        </p>
        <form onSubmit={submit} className="modal__form">
          <label className="field">
            <span>Tu nombre</span>
            <input
              ref={inputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Tía Carmen"
              autoComplete="name"
              required
              maxLength={60}
            />
          </label>
          {error ? <p className="modal__error">{error}</p> : null}
          <div className="modal__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose} disabled={busy}>
              Cancelar
            </button>
            <button type="submit" className="btn btn--primary" disabled={busy || !name.trim()}>
              {busy ? 'Reservando…' : 'Confirmar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
