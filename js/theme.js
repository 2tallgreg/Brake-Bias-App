// js/theme.js

const THEME_STORAGE_KEY = 'brake-bias-theme';
const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

/**
 * Applies the selected theme to the document.
 * @param {string} theme - The theme to apply ('light' or 'dark').
 */
function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === DARK_THEME) {
    root.setAttribute('data-theme', DARK_THEME);
  } else {
    root.setAttribute('data-theme', LIGHT_THEME);
  }
}

/**
 * Toggles the theme between light and dark and saves the preference.
 */
export function toggleTheme() {
  const currentTheme = localStorage.getItem(THEME_STORAGE_KEY) || LIGHT_THEME;
  const newTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;

  localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  applyTheme(newTheme);
}

/**
 * Initializes the theme based on user preference or system settings.
 */
export function initializeTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (systemPrefersDark) {
    applyTheme(DARK_THEME);
  } else {
    applyTheme(LIGHT_THEME);
  }
}