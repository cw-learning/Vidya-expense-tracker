import { describe, expect, it } from 'vitest';
import { getCategoryIcon } from './categoryIcons';

describe('getCategoryIcon', () => {
  it('returns the corresponding emoji icon for a recognized category', () => {
    expect(getCategoryIcon('food')).toBe('🍔');
  });

  it('returns a default fallback icon when category is not recognized', () => {
    expect(getCategoryIcon('unknown')).toBe('📌');
  });
});
