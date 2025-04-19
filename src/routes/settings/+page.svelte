<script lang="ts">
	import { language, t } from '$lib/i18n';
	import { goto } from '$app/navigation';
	import {
		Home,
		Edit3,
		Award,
		Settings,
		QrCodeIcon,
		Search,
		ChevronDown,
		RefreshCw,
		Trash2,
		Moon,
		Sun,
		Save
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { theme, applyTheme } from '$lib/stores/theme';

	let searchQuery = '';
	let isDropdownOpen = false;
	let showNotification = false;
	let notificationMessage = '';

	const languages = [
		{ code: 'en', name: 'English' },
		{ code: 'es', name: 'Español' },
		{ code: 'fr', name: 'Français' },
		{ code: 'de', name: 'Deutsch' },
		{ code: 'it', name: 'Italiano' },
		{ code: 'ja', name: '日本語' },
		{ code: 'ko', name: '한국어' },
		{ code: 'zh', name: '中文' },
		{ code: 'ar', name: 'العربية' },
		{ code: 'pt', name: 'Português' },
		{ code: 'ru', name: 'Русский' },
		{ code: 'hi', name: 'हिन्दी' }
	];

	// Settings page translations
	const translations = {
		en: {
			settingsTitle: 'Settings',
			appearance: 'Appearance',
			lightMode: 'Light Mode',
			darkMode: 'Dark Mode',
			systemDefault: 'System Default',
			dataManagement: 'Data Management',
			clearHistory: 'Clear Password History',
			clearHistoryDescription: 'Delete all saved passwords from history',
			resetSettings: 'Reset Settings',
			resetSettingsDescription: 'Restore default settings',
			language: 'Language',
			saveSettings: 'Save Settings',
			settingsSaved: 'Settings Saved!',
			historyCleared: 'Password history cleared!',
			settingsReset: 'Settings reset to defaults!'
		}
	};

	function settingsT(key: string): string {
		let currentLang;
		language.subscribe((value) => {
			currentLang = value;
		})();

		// Fall back to English if translation doesn't exist
		return translations[currentLang]?.[key] || translations.en[key] || key;
	}

	let settings = {
		language: 'en'
	};

	function navigateTo(path: string) {
		goto(path);
	}

	function toggleDropdown() {
		isDropdownOpen = !isDropdownOpen;
	}

	function setLanguage(lang: string) {
		language.set(lang);
		settings.language = lang;
		isDropdownOpen = false;

		// Store user language preference
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('preferred-language', lang);
		}
	}

	function showNotificationWithMessage(message: string) {
		notificationMessage = message;
		showNotification = true;
		setTimeout(() => (showNotification = false), 2000);
	}

	function setTheme(newTheme) {
		theme.set(newTheme);
	}

	function saveSettings() {
		// Theme is already saved by the theme store
		language.set(settings.language);
		showNotificationWithMessage(settingsT('settingsSaved'));
	}

	function clearHistory() {
		if (confirm('Are you sure you want to clear all password history?')) {
			localStorage.removeItem('password-history');
			showNotificationWithMessage(settingsT('historyCleared'));
		}
	}

	function resetSettings() {
		if (confirm('Are you sure you want to reset all settings to defaults?')) {
			settings.language = 'en';
			language.set('en');
			theme.set('light');
			localStorage.setItem('preferred-language', 'en');
			showNotificationWithMessage(settingsT('settingsReset'));
		}
	}

	onMount(() => {
		try {
			// Language setting
			const savedLanguage = localStorage.getItem('preferred-language');
			if (savedLanguage && languages.some((lang) => lang.code === savedLanguage)) {
				settings.language = savedLanguage;
				language.set(savedLanguage);
			}
		} catch (error) {
			console.error('Failed to load settings:', error);
		}
	});
</script>

<div class="bg-surface text-on-surface min-h-screen select-none">
	<!-- Left Sidebar -->
	<nav
		class="fixed left-0 top-0 hidden h-full flex-col items-center justify-between space-y-8 py-4 lg:flex lg:w-16 2xl:w-40"
	>
		<div class="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
			<span class="text-on-primary p-10 text-xl font-bold">PG</span>
		</div>
		<div class="flex h-full flex-col justify-center space-y-6">
			<button
				class="text-primary hover:bg-primary-hover rounded-lg p-2"
				on:click={() => navigateTo('/')}
			>
				<Home size={24} />
			</button>
			<button
				class="text-primary hover:bg-primary-hover rounded-lg p-2"
				on:click={() => navigateTo('/edit')}
			>
				<Edit3 size={24} />
			</button>
			<button
				class="text-primary hover:bg-primary-hover rounded-lg p-2"
				on:click={() => navigateTo('/award')}
			>
				<Award size={24} />
			</button>
			<button class="bg-primary-hover text-primary rounded-lg p-2">
				<Settings size={24} />
			</button>
			<button
				class="text-primary hover:bg-primary-hover rounded-lg p-2"
				on:click={() => navigateTo('/')}
				aria-label="Show QR Code"
			>
				<QrCodeIcon size={24} />
			</button>
		</div>
	</nav>

	<!-- Mobile Navigation Bar -->
	<div class="bg-surface border-divider fixed bottom-0 left-0 right-0 z-10 border-t lg:hidden">
		<div class="flex items-center justify-around py-2">
			<button class="text-primary p-2" on:click={() => navigateTo('/')}>
				<Home size={20} />
			</button>
			<button class="text-primary p-2" on:click={() => navigateTo('/edit')}>
				<Edit3 size={20} />
			</button>
			<button class="text-primary p-2" on:click={() => navigateTo('/award')}>
				<Award size={20} />
			</button>
			<button class="text-primary bg-primary-hover rounded-full p-2">
				<Settings size={20} />
			</button>
			<button class="text-primary p-2" on:click={() => navigateTo('/')} aria-label="Show QR Code">
				<QrCodeIcon size={20} />
			</button>
		</div>
	</div>

	<!-- Header -->
	<div class="flex flex-col items-end px-4 lg:px-20">
		<header class="flex w-full items-center justify-between p-4 lg:fixed lg:max-w-max lg:gap-10">
			<div class="bg-primary flex h-8 w-8 items-center justify-center rounded-full lg:hidden">
				<span class="text-on-primary text-xl font-bold">PG</span>
			</div>
			<!-- <div class="relative hidden w-full max-w-sm lg:block">
				<Search class="text-muted absolute left-3 top-1/2 -translate-y-1/2 transform" size={20} />
				<input
					type="text"
					placeholder={t('search')}
					bind:value={searchQuery}
					class="bg-surface-variant focus:ring-primary h-10 w-full rounded-full border-0 pl-10 focus:outline-none focus:ring-2"
				/>
			</div> -->
			<div class="flex items-center space-x-2 lg:space-x-4">
				<div class="relative">
					<button
						on:click={toggleDropdown}
						class="bg-primary text-on-primary flex items-center rounded-full px-2 py-1 text-sm lg:px-4 lg:py-2 lg:text-base"
						aria-haspopup="listbox"
						aria-expanded={isDropdownOpen}
					>
						{languages.find((lang) => lang.code === $language)?.code || 'en'}
						<ChevronDown class="ml-1 lg:ml-2" size={14} />
					</button>

					{#if isDropdownOpen}
						<ul
							class="border-divider bg-surface absolute right-0 z-50 mt-2 w-48 rounded-md border shadow-lg"
							role="listbox"
						>
							{#each languages as lang}
								<li>
									<button
										class="text-on-surface hover:bg-surface-variant block w-full px-4 py-2 text-left text-sm"
										on:click={() => setLanguage(lang.code)}
										role="option"
										aria-selected={lang.code === $language}
									>
										{lang.name}
									</button>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
				<!-- <div class="h-8 w-8 rounded-full bg-gray-200 shadow-md lg:h-10 lg:w-10">
					<img
						src="https://i.pinimg.com/236x/7e/88/12/7e881286d4d60c28aabfd7dfb48ecf36.jpg"
						alt="User profile"
						class="h-full w-full rounded-full bg-cover shadow-inner"
					/>
				</div> -->
			</div>
		</header>
	</div>

	<!-- Main Content -->
	<main
		class="mx-auto flex min-h-screen w-full flex-col py-4 pb-20 lg:p-8 lg:pt-20"
	>
		<div class="mx-auto w-full max-w-2xl px-4">
			<div class="mb-6 flex items-center justify-between">
				<h1 class="text-primary text-xl font-bold lg:text-2xl">
					{settingsT('settingsTitle')}
				</h1>
			</div>

			<div class="space-y-8">
				<!-- Appearance - Using theme store -->
				<div class="bg-surface border-divider rounded-lg border p-4 shadow-sm">
					<h2 class="text-primary mb-4 text-lg font-medium">{settingsT('appearance')}</h2>
					<div class="grid grid-cols-3 gap-4">
						<button
							class={`flex flex-col items-center rounded-lg border p-4 ${$theme === 'light' ? 'border-primary bg-primary-hover' : 'border-divider'}`}
							on:click={() => setTheme('light')}
						>
							<Sun size={24} class="text-primary mb-2" />
							<span class="text-sm">{settingsT('lightMode')}</span>
						</button>
						<button
							class={`flex flex-col items-center rounded-lg border p-4 ${$theme === 'dark' ? 'border-primary bg-primary-hover' : 'border-divider'}`}
							on:click={() => setTheme('dark')}
						>
							<Moon size={24} class="text-primary mb-2" />
							<span class="text-sm">{settingsT('darkMode')}</span>
						</button>
						<button
							class={`flex flex-col items-center rounded-lg border p-4 ${$theme === 'system' ? 'border-primary bg-primary-hover' : 'border-divider'}`}
							on:click={() => setTheme('system')}
						>
							<div class="text-primary mb-2 flex">
								<Sun size={24} class="mr-1" />
								<Moon size={24} />
							</div>
							<span class="text-sm">{settingsT('systemDefault')}</span>
						</button>
					</div>
				</div>

				<!-- Language -->
				<div class="bg-surface border-divider rounded-lg border p-4 shadow-sm">
					<h2 class="text-primary mb-4 text-lg font-medium">{settingsT('language')}</h2>
					<select
						bind:value={settings.language}
						on:change={() => {
							setLanguage(settings.language);
						}}
						class="border-divider focus:border-primary focus:ring-primary bg-surface text-on-surface w-full rounded-md border px-3 py-2"
					>
						{#each languages as lang}
							<option value={lang.code}>{lang.name}</option>
						{/each}
					</select>
				</div>

				<!-- Data Management -->
				<div class="bg-surface border-divider rounded-lg border p-4 shadow-sm">
					<h2 class="text-primary mb-4 text-lg font-medium">{settingsT('dataManagement')}</h2>

					<div class="space-y-4">
						<div class="flex items-center justify-between">
							<div>
								<h3 class="font-medium">{settingsT('clearHistory')}</h3>
								<p class="text-muted text-sm">{settingsT('clearHistoryDescription')}</p>
							</div>
							<button
								class="text-error hover:text-error-hover flex items-center"
								on:click={clearHistory}
							>
								<Trash2 size={18} class="mr-1" />
								<span>{settingsT('clearHistory')}</span>
							</button>
						</div>

						<div class="flex items-center justify-between">
							<div>
								<h3 class="font-medium">{settingsT('resetSettings')}</h3>
								<p class="text-muted text-sm">{settingsT('resetSettingsDescription')}</p>
							</div>
							<button
								class="text-primary hover:text-primary-hover flex items-center"
								on:click={resetSettings}
							>
								<RefreshCw size={18} class="mr-1" />
								<span>{settingsT('resetSettings')}</span>
							</button>
						</div>
					</div>
				</div>

				<!-- Save Button -->
				<div class="flex justify-end">
					<button
						class="bg-primary text-on-primary hover:bg-primary-hover flex items-center rounded-full px-4 py-2"
						on:click={saveSettings}
					>
						<Save size={18} class="mr-1" />
						{settingsT('saveSettings')}
					</button>
				</div>
			</div>
		</div>
	</main>

	<!-- Notification -->
	{#if showNotification}
		<div class="bg-primary text-on-primary fixed bottom-4 right-4 rounded-full px-4 py-2 shadow-md">
			{notificationMessage}
		</div>
	{/if}
</div>

<style>
	:global(:root) {
		/* Light theme (default) */
		--color-surface: #f8f9fb;
		--color-on-surface: #333333;
		--color-surface-variant: #f0f2f5;
		--color-primary: #2f3676;
		--color-on-primary: #ffffff;
		--color-primary-hover: rgb(47, 54, 118, 0.1);
		--color-muted: #6b7280;
		--color-divider: #e5e7eb;
		--color-error: #ef4444;
		--color-error-hover: #dc2626;
	}

	:global([data-theme='dark']) {
		/* Dark theme */
		--color-surface: #1a1b26;
		--color-on-surface: #e5e7eb;
		--color-surface-variant: #2a2b36;
		--color-primary: #7b82d5;
		--color-on-primary: #ffffff;
		--color-primary-hover: rgb(123, 130, 213, 0.2);
		--color-muted: #9ca3af;
		--color-divider: #374151;
		--color-error: #f87171;
		--color-error-hover: #ef4444;
	}

	/* Apply theme colors via utility classes */
	:global(.bg-surface) {
		background-color: var(--color-surface);
	}

	:global(.bg-surface-variant) {
		background-color: var(--color-surface-variant);
	}

	:global(.bg-primary) {
		background-color: var(--color-primary);
	}

	:global(.bg-primary-hover) {
		background-color: var(--color-primary-hover);
	}

	:global(.text-primary) {
		color: var(--color-primary);
	}

	:global(.text-on-primary) {
		color: var(--color-on-primary);
	}

	:global(.text-on-surface) {
		color: var(--color-on-surface);
	}

	:global(.text-muted) {
		color: var(--color-muted);
	}

	:global(.text-error) {
		color: var(--color-error);
	}

	:global(.text-error-hover) {
		color: var(--color-error-hover);
	}

	:global(.border-divider) {
		border-color: var(--color-divider);
	}

	:global(.border-primary) {
		border-color: var(--color-primary);
	}

	/* Add responsive font styles */
	@media (max-width: 640px) {
		:global(h1) {
			font-size: 1.25rem;
		}
		:global(p) {
			font-size: 0.875rem;
		}
	}
</style>
