import type { ReactNode } from "react";
import { SITE } from "@/lib/site";

type SocialLinksProps = {
  className?: string;
};

const ICON_SIZE = 20;

const LINKS = [
  { href: SITE.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: SITE.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: SITE.social.youtube, label: "YouTube", Icon: YouTubeIcon },
] as const;

export function SocialLinks({ className = "" }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {LINKS.map(({ href, label, Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="grid h-8 w-8 place-items-center text-kb-gold/80 transition-colors hover:text-kb-kola"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}

function SocialIcon({ children }: { children: ReactNode }) {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {children}
    </svg>
  );
}

function FacebookIcon() {
  return (
    <SocialIcon>
      <path d="M14 8h2.4V5.2H14c-2.1 0-3.4 1.3-3.4 3.5V12H8v3h2.6v7H14v-7h2.5l.4-3H14V9.1c0-.8.2-1.1 1-1.1Z" />
    </SocialIcon>
  );
}

function InstagramIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <SocialIcon>
      <path d="M21.6 7.2a2.4 2.4 0 0 0-1.7-1.7C17.8 5 12 5 12 5s-5.8 0-7.9.5a2.4 2.4 0 0 0-1.7 1.7A25 25 0 0 0 2 12a25 25 0 0 0 .4 4.8 2.4 2.4 0 0 0 1.7 1.7c2.1.5 7.9.5 7.9.5s5.8 0 7.9-.5a2.4 2.4 0 0 0 1.7-1.7A25 25 0 0 0 22 12a25 25 0 0 0-.4-4.8ZM10 15.5V8.5l6 3.5Z" />
    </SocialIcon>
  );
}
