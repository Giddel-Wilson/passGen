<script>
	import '../app.css';
	import '../lib/styles/components.css';
	import { onMount } from 'svelte';
	import { theme, applyTheme } from '$lib/stores/theme';

	onMount(() => {
		// Initialize theme from localStorage
		if (typeof localStorage !== 'undefined') {
			try {
				const storedSettings = localStorage.getItem('password-generator-settings');
				if (storedSettings) {
					const settings = JSON.parse(storedSettings);
					if (settings.theme) {
						theme.set(settings.theme);
					}
				}
			} catch (e) {
				console.error('Failed to initialize theme:', e);
			}
		}
	});
</script>

<slot />
