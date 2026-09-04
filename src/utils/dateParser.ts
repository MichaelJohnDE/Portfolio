export function parseStatedDate(dateString: string): number {
  if (!dateString) return 0;
  
  // Split by dash to get the end date (e.g. "Jan 2021 - Present" -> "Present")
  const parts = dateString.split('-');
  const endDateStr = parts[parts.length - 1].trim().toLowerCase();
  
  if (endDateStr === 'present' || endDateStr === 'current' || endDateStr === 'now') {
    // Return a very large timestamp to ensure it's sorted at the top
    return Date.now() + 315360000000; // +10 years
  }
  
  // Try parsing the end date
  const parsed = new Date(endDateStr).getTime();
  if (!isNaN(parsed)) {
    return parsed;
  }
  
  // If parsing fails, try just extracting any 4-digit year as a fallback
  const yearMatch = endDateStr.match(/\d{4}/);
  if (yearMatch) {
    return new Date(`${yearMatch[0]}-01-01`).getTime();
  }
  
  // Fallback to 0
  return 0;
}
