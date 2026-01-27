import { getCategoryIcon } from './categoryIcons';

describe('getCategoryIcon', () => {
  it('returns correct icon', () => {
    expect(getCategoryIcon('food')).toBe('🍔');
  });

  it('returns default for unknown', () => {
    expect(getCategoryIcon('unknown')).toBe('📌');
  });
});
