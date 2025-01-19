// Calculate Levenshtein distance between two strings
export function levenshtein(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  
  // Create matrix
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  // Initialize first row and column
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  // Fill in the rest of the matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + 1, // substitution
          dp[i - 1][j] + 1,     // deletion
          dp[i][j - 1] + 1      // insertion
        );
      }
    }
  }
  
  return dp[m][n];
}

// Format date string to ISO format
export function formatDate(dateStr: string): string {
  // Try different date formats
  const formats = [
    // MM/DD/YY
    /^(\d{1,2})\/(\d{1,2})\/(\d{2})$/,
    // MM/DD/YYYY
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
    // YYYY-MM-DD
    /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
    // DD-MM-YYYY
    /^(\d{1,2})-(\d{1,2})-(\d{4})$/
  ];
  
  for (const format of formats) {
    const match = dateStr.match(format);
    if (match) {
      let [_, part1, part2, part3] = match;
      
      // Convert 2-digit year to 4-digit
      if (part3.length === 2) {
        const year = parseInt(part3);
        part3 = (year >= 50 ? '19' : '20') + part3;
      }
      
      // Handle YYYY-MM-DD format
      if (part1.length === 4) {
        [part1, part2, part3] = [part2, part3, part1];
      }
      
      // Ensure month and day are 2 digits
      const month = part1.padStart(2, '0');
      const day = part2.padStart(2, '0');
      
      return `${part3}-${month}-${day}`;
    }
  }
  
  // If no format matches, try parsing as ISO string
  const date = new Date(dateStr);
  if (!isNaN(date.getTime())) {
    return date.toISOString().split('T')[0];
  }
  
  throw new Error(`Unable to parse date: ${dateStr}`);
}

// Format amount string to number
export function formatAmount(amountStr: string): number {
  // Remove currency symbols and whitespace
  const cleaned = amountStr.replace(/[$,\s]/g, '');
  
  // Handle parentheses for negative numbers
  if (cleaned.startsWith('(') && cleaned.endsWith(')')) {
    return -Math.abs(parseFloat(cleaned.slice(1, -1)));
  }
  
  return parseFloat(cleaned);
}

// Generate a unique ID
export function generateId(): string {
  return crypto.randomUUID();
} 