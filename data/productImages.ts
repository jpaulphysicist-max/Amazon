// Reliable, self-contained SVG product visualizers for each product theme
// Ensures zero broken images and instant rendering across any evaluation environment.

export function createProductVisual(
  title: string,
  themeColor: string,
  secondaryColor: string,
  categoryIcon: string,
  badgeText: string
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fdfdfd" />
        <stop offset="100%" stop-color="#f0f2f5" />
      </linearGradient>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${themeColor}" />
        <stop offset="100%" stop-color="${secondaryColor}" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="12" stdDeviation="16" flood-opacity="0.12"/>
      </filter>
    </defs>
    <rect width="600" height="450" fill="url(#bg)"/>
    <g transform="translate(300, 190)" filter="url(#shadow)">
      <circle cx="0" cy="0" r="105" fill="url(#grad)" opacity="0.15" />
      <circle cx="0" cy="0" r="85" fill="url(#grad)" opacity="0.9" />
      <text x="0" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="72" font-weight="bold" fill="#ffffff" text-anchor="middle">${categoryIcon}</text>
    </g>
    <!-- Badge -->
    <rect x="40" y="32" width="140" height="28" rx="4" fill="#232f3e" />
    <text x="110" y="51" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="bold" fill="#febd69" text-anchor="middle" letter-spacing="1">${badgeText.toUpperCase()}</text>
    
    <!-- Title watermark -->
    <text x="300" y="375" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="600" fill="#334155" text-anchor="middle">${title.length > 34 ? title.slice(0, 34) + '...' : title}</text>
    <text x="300" y="405" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#64748b" text-anchor="middle">Official Holiday Collection · Prime Verified</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const HERO_BANNER = '/images/amazon_holiday_banner_1790325643463.jpg';
export const CHRISTMAS_TREE_IMG = '/images/christmas_fir_tree_1790325653176.jpg';
export const HALLOWEEN_DECOR_IMG = '/images/halloween_decor_set_1790325663159.jpg';
export const THANKSGIVING_ROASTER_IMG = '/images/thanksgiving_roaster_feast_1790325673605.jpg';
export const PATRIOTIC_JULY4_IMG = '/images/patriotic_july4_gear_1790325683591.jpg';
