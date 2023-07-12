import type { TagsData } from "../contexts/TagsContext";

/**
 * Delivers a human friendly datetime string
 * e.g. 7/11/2023, 7:23:34 PM
 * `time` is expected to be an ISO date string
 */
export function humanDateTimeString(time: string): string {
  const date = new Date(time);
  return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
}

/**
 * Applies the singular or plural version of a word based on provided qty
 */
export function pluralize(qty = 0, singular: string, plural: string): string {
  return `${qty} ${qty === 1 ? singular : plural}`;
}

/**
 * Finds the tag's value for the given ID
 */
export function findTag(id: string, tagIds: TagsData): string {
 return tagIds.find((tag) => tag.id == id)?.value ?? "";
}

/**
 * Formats an array of values into parentheses, comma separated.
 * e.g. (item1, item2)
 */
export function formatTagString(tags: string[]): string {
  const str = tags.join(", ");
  return str === "" ? "" : ` (${str})`;
}

/**
 * Extracts tag values for  matching ids from tag data
 */
export function extractTags(tagIds: string[], tags: TagsData): string[] {
  return tagIds.map(id => findTag(id, tags));
}
