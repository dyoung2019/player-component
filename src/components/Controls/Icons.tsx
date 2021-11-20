export function Stop() {
  return (
    <svg width="24" height="24"><path d="M6 6h12v12H6V6z" /></svg>
  );
}

export function Loop() {
  return (
    <svg width="24" height="24">
      <path
        d="M17.016 17.016v-4.031h1.969v6h-12v3l-3.984-3.984 3.984-3.984v3h10.031zM6.984 6.984v4.031H5.015v-6h12v-3l3.984 3.984-3.984 3.984v-3H6.984z"
      />
    </svg>
  )
}

export function Pause() {
  return (
    <svg width="24" height="24"><path d="M8.016 5.016L18.985 12 8.016 18.984V5.015z" /></svg>
  );
}

export function Play() {
  return (
    <svg width="24" height="24">
      <path d="M14.016 5.016H18v13.969h-3.984V5.016zM6 18.984V5.015h3.984v13.969H6z" />
    </svg>
  );
}