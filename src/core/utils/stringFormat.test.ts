import { stringFormat } from './stringFormat';

describe('stringFormat', () => {
  it('replaces a single numbered placeholder with the corresponding argument', () => {
    expect(stringFormat('Hello {0}', 'World')).toBe('Hello World');
  });

  it('replaces multiple numbered placeholders with their corresponding arguments in order', () => {
    expect(stringFormat('{0} {1} {2}', 'one', 'two', 'three')).toBe(
      'one two three',
    );
  });

  it('leaves placeholders unreplaced when corresponding arguments are not provided', () => {
    expect(stringFormat('{0} {1}', 'one')).toBe('one {1}');
  });

  it('ignores extra arguments that have no corresponding placeholders', () => {
    expect(stringFormat('{0}', 'one', 'two', 'three')).toBe('one');
  });

  it('replaces placeholders based on their numeric index regardless of order in template', () => {
    expect(stringFormat('{2} {0} {1}', 'A', 'B', 'C')).toBe('C A B');
  });

  it('returns the template unchanged when no placeholders are present', () => {
    expect(stringFormat('Hello World')).toBe('Hello World');
  });

  it('returns an empty string when given an empty template', () => {
    expect(stringFormat('')).toBe('');
  });
});
