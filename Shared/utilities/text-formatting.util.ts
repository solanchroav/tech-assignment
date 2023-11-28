export function truncateText(text: string, maxLength: number): string {
    // Truncate text if it exceeds maxLength and append '...' at the end
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }