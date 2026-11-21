import { useEffect, useState } from 'react'
import { budgetLabels, type Gift } from '../data/gifts'

type GiftCardProps = {
  gift: Gift
  remaining: number
  reservedBy?: string[]
  admin?: boolean
  onReserve: (gift: Gift) => void
  onRelease?: (giftId: string) => void
  index: number
}

export function GiftCard({
  gift,
  remaining,
  reservedBy = [],
  admin = false,
  onReserve,
  onRelease,
  index,
}: GiftCardProps) {
  const [imgFailed, setImgFailed] = useState(!gift.image)
  const taken = !gift.unlimited && remaining <= 0

  useEffect(() => {
    setImgFailed(!gift.image)
  }, [gift.image])

  if (taken && !admin) return null

  return (
    <article
      className={`gift-card ${taken ? 'gift-card--taken' : ''}`}
      style={{ animationDelay: `${Math.min(index, 12) * 45}ms` }}
    >
      <div className="gift-card__media">
        {!imgFailed && gift.image ? (
          <img
            src={gift.image}
            alt={gift.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="gift-card__placeholder" aria-hidden="true">
            <span className="gift-card__placeholder-mark" />
          </div>
        )}
        <span className={`gift-card__budget gift-card__budget--${gift.budget}`}>
          {budgetLabels[gift.budget]}
        </span>
      </div>

      <div className="gift-card__body">
        <p className="gift-card__store">{gift.store}</p>
        <h3 className="gift-card__title">{gift.name}</h3>
        {gift.notes ? <p className="gift-card__note">{gift.notes}</p> : null}
        {!gift.unlimited && gift.quantity > 1 ? (
          <p className="gift-card__qty">
            {remaining} de {gift.quantity} disponibles
          </p>
        ) : null}
        {admin && reservedBy.length > 0 ? (
          <p className="gift-card__reserved">
            Reservado por {reservedBy.join(', ')}
          </p>
        ) : null}

        <div className="gift-card__actions">
          <a
            className="btn btn--ghost"
            href={gift.link}
            target="_blank"
            rel="noreferrer noopener"
          >
            Ver producto
          </a>
          {!taken ? (
            <button type="button" className="btn btn--primary" onClick={() => onReserve(gift)}>
              Lo regalo
            </button>
          ) : (
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => onRelease?.(gift.id)}
            >
              Liberar
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
