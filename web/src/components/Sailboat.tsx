type SailboatProps = {
  className?: string
}

export function Sailboat({ className }: SailboatProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 280 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        className="sailboat-wave sailboat-wave--back"
        d="M10 168c28-12 52-12 80 0s52 12 80 0 52-12 80 0 20 6 20 6"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.28"
      />
      <path
        className="sailboat-wave sailboat-wave--front"
        d="M0 184c30-14 56-14 86 0s56 14 86 0 56-14 86 0"
        stroke="currentColor"
        strokeWidth="1.75"
        opacity="0.45"
      />
      <g className="sailboat-hull">
        <path
          d="M88 148h108l-14 22c-3 5-8 8-14 8H116c-6 0-11-3-14-8l-14-22z"
          fill="currentColor"
          opacity="0.88"
        />
        <path d="M138 56v92" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path
          d="M141 62l58 78H141V62z"
          fill="currentColor"
          opacity="0.18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M135 72L86 140h49V72z"
          fill="currentColor"
          opacity="0.3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="138" cy="54" r="3" fill="currentColor" opacity="0.7" />
      </g>
    </svg>
  )
}
