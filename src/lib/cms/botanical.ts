import type { BotanicalName } from "@/lib/types";

const BOTANICAL_NAMES: BotanicalName[] = [
  "Palm",
  "Shea",
  "Baobab",
  "Moringa",
  "Hibiscus",
  "Marula",
  "Kalahari melon",
];

export function parseBotanicalName(value: string, fallback: BotanicalName): BotanicalName {
  const match = BOTANICAL_NAMES.find(
    (name) => name.toLowerCase() === value.trim().toLowerCase()
  );
  return match ?? fallback;
}
