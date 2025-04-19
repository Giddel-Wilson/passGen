import { writable } from 'svelte/store';

// Get initial theme (server-safe)
function getInitialTheme() {
	if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
		return 'light';
	}

	try {
		const storedSettings = localStorage.getItem('password-generator-settings');
		if (storedSettings) {
			const settings = JSON.parse(storedSettings);
			if (settings.theme && ['light', 'dark', 'system'].includes(settings.theme)) {
				return settings.theme;
			}
		}
	} catch (error) {
		console.error('Error loading theme from settings:', error);
	}

	return 'light';
}

// Create theme store
export const theme = writable(getInitialTheme());

// Apply theme function
export function applyTheme(themeValue) {
	if (typeof document === 'undefined') return;

	if (themeValue === 'system') {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
	} else {
		document.documentElement.setAttribute('data-theme', themeValue);
	}

	// Save to localStorage
	if (typeof localStorage !== 'undefined') {
		try {
			const storedSettings = localStorage.getItem('password-generator-settings');
			const settings = storedSettings ? JSON.parse(storedSettings) : {};
			settings.theme = themeValue;
			localStorage.setItem('password-generator-settings', JSON.stringify(settings));
		} catch (error) {
			console.error('Error saving theme to settings:', error);
		}
	}
}

// Initialize theme
if (typeof window !== 'undefined') {
	// Subscribe to theme changes
	theme.subscribe((value) => {
		applyTheme(value);
	});

	// Setup system theme change listener
	const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
	mediaQuery.addEventListener('change', () => {
		theme.update((current) => {
			if (current === 'system') {
				applyTheme('system');
			}
			return current;
		});
	});
}
