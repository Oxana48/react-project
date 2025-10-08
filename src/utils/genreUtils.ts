export function capitalizedGenreName(name: string): string {
  if (name.includes("-")) {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("-");
  }
  if (name === "scifi") return "SciFi";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}