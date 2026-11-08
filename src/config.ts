/**
 * Site-wide settings. Edit these values to update details across every page.
 */
export const site = {
  name: 'Bruce Repei',
  url: 'https://brucerepei.ca',
  tagline: 'Canadian Painter & Scenic Artist, Hamilton, Ontario',
  description:
    'Canadian painter Bruce Repei works in oil, acrylic and watercolour from his Hamilton, Ontario studio, after thirty years as a head scenic artist for the stage.',
  location: 'James Street North, Hamilton, Ontario',

  // TODO: replace with Bruce's real email address.
  email: '',

  // Contact form endpoint. Create a free form at https://formspree.io and paste
  // its endpoint here (e.g. 'https://formspree.io/f/abcdwxyz').
  // While empty, the contact page falls back to an email link.
  formEndpoint: '',

  faaProfile: 'https://fineartamerica.com/profiles/bruce-repei',

  // Artwork slugs (file names in src/assets/works, without .jpg).
  heroWork: 'niagara-vineyards-fall',
  selectedWorks: [
    'on-the-gulf',
    'emerald-edge',
    'st-marks',
    'fishing-boats-at-moss-landing',
    'peace-rose',
    'the-music-box',
    'niagara-vineyards-spring',
    'ship-island-palmetto',
  ],
} as const;

export const nav = [
  { href: '/work/', label: 'Work' },
  { href: '/collections/', label: 'Collections' },
  { href: '/about/', label: 'About' },
  { href: '/theatre/', label: 'Theatre' },
  { href: '/contact/', label: 'Contact' },
] as const;
