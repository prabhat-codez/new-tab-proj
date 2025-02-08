import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ensureHttpPrefix(url: string) {
  if (url.startsWith("https://") || url.startsWith("http://")) {
    return url
  }
  return `https://${url}`
}

export function checkUrlPrefix(query: string) {
  return (
    query.startsWith("https://") ||
    query.startsWith("www.") ||
    query.startsWith("http://")
  )
}

export function getDomain(url: string) {
  // Remove 'http://' or 'https://' and 'www.' if present
  return url.replace(/^(https?:\/\/)?(www\.)?/, "")
}
