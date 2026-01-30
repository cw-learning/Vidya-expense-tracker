import { stringFormat } from './stringFormat';

describe('stringFormat', () => {
  it('replaces single placeholder', () => {
    expect(stringFormat('Hello {0}', 'World')).toBe('Hello World');
  });

  it('replaces multiple placeholders', () => {
    expect(stringFormat('{0} {1} {2}', 'one', 'two', 'three')).toBe(
      'one two three',
    );
  });

  it('handles missing arguments', () => {
    expect(stringFormat('{0} {1}', 'one')).toBe('one {1}');
  });

  it('handles extra arguments', () => {
    expect(stringFormat('{0}', 'one', 'two', 'three')).toBe('one');
  });

  it('handles non-sequential placeholders', () => {
    expect(stringFormat('{2} {0} {1}', 'A', 'B', 'C')).toBe('C A B');
  });

  it('handles no placeholders', () => {
    expect(stringFormat('Hello World')).toBe('Hello World');
  });

  it('handles empty string', () => {
    expect(stringFormat('')).toBe('');
  });

  it('replaces falsy values', () => {
    expect(
      stringFormat('Count {0}, Enabled {1}, Empty "{2}"', 0, false, ''),
    ).toBe('Count 0, Enabled false, Empty ""');
  });
});
