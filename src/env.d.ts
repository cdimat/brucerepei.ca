/// <reference types="astro/client" />

interface Window {
  /** Umami analytics tracker (loaded from cloud.umami.is on the live site). */
  umami?: {
    track: (event: string, data?: Record<string, string | number>) => void;
  };
}
