import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export function PawIcon(props: P) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden {...props}>
      <path d="M32 30c-8 0-16 9.2-16 16.4 0 6 5 8.2 9.2 7.2 3-.7 4.4-1.7 6.8-1.7s3.8 1 6.8 1.7c4.2 1 9.2-1.2 9.2-7.2C48 39.2 40 30 32 30z" />
      <ellipse cx="13.5" cy="27" rx="5.6" ry="7.6" transform="rotate(-24 13.5 27)" />
      <ellipse cx="24" cy="15" rx="5.8" ry="8" />
      <ellipse cx="40" cy="15" rx="5.8" ry="8" />
      <ellipse cx="50.5" cy="27" rx="5.6" ry="7.6" transform="rotate(24 50.5 27)" />
    </svg>
  );
}

export function BoneIcon(props: P) {
  return (
    <svg viewBox="0 0 64 32" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2a8 8 0 0 0-5.6 13.7A8 8 0 1 0 17.6 27.6c.6-.9 1.5-1.6 2.6-1.6h23.6c1.1 0 2 .7 2.6 1.6a8 8 0 1 0 11.2-11.9A8 8 0 1 0 46.4 4.4c-.6.9-1.5 1.6-2.6 1.6H20.2c-1.1 0-2-.7-2.6-1.6A8 8 0 0 0 12 2z" />
    </svg>
  );
}

export function FacebookIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21h3z" />
    </svg>
  );
}

export function InstagramIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M16.6 3c.4 2.2 1.8 3.7 4 3.9v3c-1.5.1-2.8-.4-4-1.2v5.9c0 3.5-2.6 6.4-6.2 6.4S4 18.3 4 14.9c0-3.7 3.3-6.4 7-5.9v3.1c-1.8-.4-3.8.7-3.8 2.8 0 1.6 1.3 2.9 3 2.9 1.8 0 3.1-1.2 3.1-3.3V3h3.3z" />
    </svg>
  );
}

export const socialIcons = { facebook: FacebookIcon, instagram: InstagramIcon, tiktok: TikTokIcon };
