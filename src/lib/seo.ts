import { site } from '../config';

export const SITE_URL = site.url;
export const abs = (path: string) => new URL(path, SITE_URL).href;

export const PERSON_ID = abs('/#person');
export const WEBSITE_ID = abs('/#website');

/** Trim text to a search-friendly meta description length, on a word boundary. */
export function metaDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,.;:\s-]+$/, '') + '…';
}

export const personSchema = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: site.name,
  jobTitle: 'Painter and Scenic Artist',
  description: site.description,
  nationality: { '@type': 'Country', name: 'Canada' },
  url: abs('/'),
  image: abs('/bruce-repei.jpg'),
  sameAs: [site.faaProfile],
  knowsAbout: ['Painting', 'Watercolour', 'Acrylic painting', 'Oil painting', 'Scenic art', 'Theatre design'],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'McMaster University' },
    { '@type': 'CollegeOrUniversity', name: 'University of Calgary' },
    { '@type': 'CollegeOrUniversity', name: 'Mohawk College' },
    { '@type': 'CollegeOrUniversity', name: 'Ontario College of Art' },
  ],
  workLocation: {
    '@type': 'Place',
    name: 'Studio in Hamilton, Ontario',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hamilton',
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
  },
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: abs('/'),
  name: site.name,
  description: site.description,
  inLanguage: 'en-CA',
  publisher: { '@id': PERSON_ID },
};

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
