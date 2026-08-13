/** Strip a trailing slash so callers can join paths safely. */
function trimSlash(url: string) {
  return url.replace(/\/+$/, "");
}

/**
 * Canonical site origin. Never hardcode a deploy host in source.
 * - `NEXT_PUBLIC_SITE_URL` (see `.env.example`) — required for production build
 * - `next dev` — `http://localhost:3083` if unset
 */
export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return trimSlash(fromEnv);
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3083";
  }
  throw new Error(
    "NEXT_PUBLIC_SITE_URL is required for production builds. Copy .env.example to .env or inject the public origin at build time.",
  );
}

export function toAbsoluteUrl(path = "/") {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
