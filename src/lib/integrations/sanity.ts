// Sanity configuration surface. The full Studio + schema definitions live in
// src/sanity. This module exposes config and a guard the data layer can use
// to decide between local data and live GROQ queries.

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-10-01",
  useCdn: process.env.NODE_ENV === "production",
};

export function isSanityConfigured(): boolean {
  return Boolean(sanityConfig.projectId);
}
