import { atom } from "nanostores";

/** `_id` of the continent selected on the map / pills; null = default continent. */
export const $activeContinent = atom<string | null>(null);
