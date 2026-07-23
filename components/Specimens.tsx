export default function Specimens() {
  return (
    <section className="specimens" aria-label="specimens">
      <div className="spec">
        <svg width="66" height="42" viewBox="0 0 22 14">
          <path fill="#FF5A48" d="M3 8h16v3H3zM5 6h13v2H5zM8 5h8v1H8z" />
          <path
            fill="#DCE84B"
            d="M6 7h2v1H6zM10 6h2v1h-2zM14 7h2v1h-2zM8 9h2v1H8zM13 9h2v1h-2z"
          />
          <path fill="#17150F" d="M4 5h1v2H4zM6 4h1v2H6zM17 9h1v1h-1z" />
          <path fill="#0E6E64" d="M2 11h18v1H2z" />
        </svg>
        <p className="tag">
          <b>specimen 001</b>stiliger sp. · 4mm · lembeh
        </p>
      </div>
      <div className="spec">
        <svg width="48" height="54" viewBox="0 0 16 18">
          <path fill="#0E6E64" d="M4 2h8v12H4zM3 4h1v9H3zM12 4h1v9h-1z" />
          <path fill="#FAF6EE" d="M5 5h2v2H5zM9 5h2v2H9z" />
          <path fill="#DCE84B" d="M6 5h1v1H6zM10 5h1v1h-1z" />
          <path fill="#FF5A48" d="M7 8h2v1H7z" />
          <path
            fill="#17150F"
            d="M5 14h2v2H5zM9 14h2v2H9zM6 1h1v1H6zM9 1h1v1H9z"
          />
        </svg>
        <p className="tag">
          <b>specimen 002</b>buffy fish owl · patience: 3h+
        </p>
      </div>
      <div className="spec">
        <svg width="42" height="48" viewBox="0 0 14 16">
          <path
            fill="#17150F"
            d="M2 1h1v11H2zM3 2h1v9H3zM4 3h1v7H4zM5 4h1v5H5zM6 5h1v3H6zM7 6h1v1H7zM6 9h2v1H6zM7 10h2v2H7z"
          />
          <path fill="#FF5A48" d="M8 12h2v2H8z" />
        </svg>
        <p className="tag">
          <b>specimen 003</b>cursor, domesticated · this one
        </p>
      </div>
    </section>
  );
}
