import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act} from '@testing-library/react';
import { useThemeStore } from '../store/useThemeStore.js';
import { THEME_MODES } from '../utils/theme.constants.js';

describe('useThemeStore', () => {
  beforeEach(() => {
  localStorage.clear();

  useThemeStore.setState({
    theme: THEME_MODES.LIGHT,
  });
});


  it('should initialize with light theme', () => {
    const { result } = renderHook(() => useThemeStore());
    expect(result.current.theme).toBe(THEME_MODES.LIGHT);
  });

  it('should toggle theme from light to dark', () => {
    const { result } = renderHook(() => useThemeStore());

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe(THEME_MODES.DARK);
  });

  it('should toggle theme from dark to light', () => {
    const { result } = renderHook(() => useThemeStore());

    act(() => {
      result.current.setTheme(THEME_MODES.DARK);
    });

    expect(result.current.theme).toBe(THEME_MODES.DARK);

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe(THEME_MODES.LIGHT);
  });

  it('should set theme to specific mode', () => {
    const { result } = renderHook(() => useThemeStore());

    act(() => {
      result.current.setTheme(THEME_MODES.DARK);
    });

    expect(result.current.theme).toBe(THEME_MODES.DARK);
  });

  it('should persist theme to localStorage', () => {
    const { result } = renderHook(() => useThemeStore());

    act(() => {
      result.current.setTheme(THEME_MODES.DARK);
    });

    const stored = JSON.parse(
      localStorage.getItem('expense-tracker-theme')
    );

    expect(stored.state.theme).toBe(THEME_MODES.DARK);
  });

  it('should restore theme from localStorage', async () => {
  localStorage.setItem(
    'expense-tracker-theme',
    JSON.stringify({
      state: { theme: THEME_MODES.DARK },
      version: 0,
    })
  );

  await useThemeStore.persist.rehydrate();

  const { result } = renderHook(() => useThemeStore());

  expect(result.current.theme).toBe(THEME_MODES.DARK);
});

});