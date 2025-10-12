export default function createSlug(text:string):string {
  return text
    ?.toLowerCase() // lowercase everything
    .trim() // remove leading/trailing spaces
    .replace(/[^a-z0-9\s-]/g, "") // remove special characters
    .replace(/\s+/g, "-") // replace spaces with -
    .replace(/-+/g, "-"); // collapse multiple -
}
