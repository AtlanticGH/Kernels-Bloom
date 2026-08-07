/** True for Supabase storage URLs and other absolute CMS upload paths. */
export function isCmsRemoteImage(src: string | undefined): boolean {
  if (!src) return false;
  return /^https?:\/\//i.test(src);
}

/** Pass to next/image for CMS uploads — skips optimizer when remotePatterns may not match. */
export function cmsImageUnoptimized(src: string | undefined): boolean {
  return isCmsRemoteImage(src);
}
