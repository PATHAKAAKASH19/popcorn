/**
 * Creates a URL-friendly slug from a string
 * Example: "The Dark Knight" -> "the-dark-knight"
 */
export function createSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Creates a complete slug with ID for movie/TV show
 * Example: ("The Dark Knight", 155) -> "the-dark-knight-155"
 */
export function createContentSlug(title: string, id: number | string): string {
    const slug = createSlug(title);
    return `${slug}-${id}`;
}

/**
 * Extracts the ID from a slug
 * Example: "the-dark-knight-155" -> "155"
 */
export function extractIdFromSlug(slug: string): string {
    const parts = slug.split('-');
    return parts[parts.length - 1];
}
