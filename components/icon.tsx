import type { CSSProperties } from 'react';

const paths = {
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  northeast: <path d="M6 18 18 6M6 6h12v12" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  research: <><path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5" /></>,
  people: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5v1" /></>,
  paper: <><path d="M14 3H5v18h14V8l-5-5ZM14 3v5h5M8 12h8M8 16h6" /></>,
  news: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
  code: <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16" />,
  back: <path d="M19 12H5m6 6-6-6 6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
};

export type IconName = keyof typeof paths;
export function Icon({ name, size = 20, style, className }: { name: IconName; size?: number; style?: CSSProperties; className?: string }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>{paths[name]}</svg>;
}

export function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><svg width="25" height="25" viewBox="0 0 28 28" fill="none"><path d="m7 6 14 4-7 12L7 6Zm0 0L4 18l10 4" stroke="currentColor" strokeWidth="1.2" /><circle cx="7" cy="6" r="2.5" fill="currentColor" /><circle cx="21" cy="10" r="2.5" fill="currentColor" /><circle cx="14" cy="22" r="2.5" fill="currentColor" /><circle cx="4" cy="18" r="2" fill="#c5ded0" /></svg></span>;
}
