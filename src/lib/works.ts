import type { ImageMetadata } from 'astro';
import worksData from '../data/works.json';
import collectionsData from '../data/collections.json';

export interface Work {
  slug: string;
  title: string;
  medium: string;
  description: string;
  faaUrl?: string;
  year?: number;
  image: ImageMetadata;
  collections: string[];
}

export interface Collection {
  slug: string;
  name: string;
  description: string;
  cover: Work;
  works: Work[];
}

const images = import.meta.glob<ImageMetadata>('../assets/works/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

function imageFor(slug: string): ImageMetadata {
  const entry = Object.entries(images).find(([path]) =>
    path.replace(/^.*\//, '').replace(/\.[^.]+$/, '') === slug,
  );
  if (!entry) throw new Error(`No image found in src/assets/works for artwork "${slug}"`);
  return entry[1];
}

const bySlug = new Map<string, Work>(
  worksData.map((w) => [
    w.slug,
    {
      ...w,
      image: imageFor(w.slug),
      collections: collectionsData.filter((c) => c.works.includes(w.slug)).map((c) => c.slug),
    },
  ]),
);

export function getWork(slug: string): Work {
  const work = bySlug.get(slug);
  if (!work) throw new Error(`Unknown artwork "${slug}" (check src/data/works.json)`);
  return work;
}

export const collections: Collection[] = collectionsData.map((c) => ({
  ...c,
  cover: getWork(c.cover ?? c.works[0]),
  works: c.works.map(getWork),
}));

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

/** Every work, ordered by collection, then works that aren't in any collection. */
export const allWorks: Work[] = (() => {
  const seen = new Set<string>();
  const ordered: Work[] = [];
  for (const c of collections) {
    for (const w of c.works) {
      if (!seen.has(w.slug)) {
        seen.add(w.slug);
        ordered.push(w);
      }
    }
  }
  for (const w of bySlug.values()) if (!seen.has(w.slug)) ordered.push(w);
  return ordered;
})();

export const ratio = (w: Work) => w.image.width / w.image.height;

/** Descriptive alt text for an artwork image. */
export const altFor = (w: Work) =>
  `${w.title}${w.medium ? `, ${w.medium.toLowerCase()}` : ''} painting by Bruce Repei`;
