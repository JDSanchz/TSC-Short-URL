// utils.ts

export function generateRandomString(): string {
    return Math.random().toString(36).substr(2, 9);
  }
  