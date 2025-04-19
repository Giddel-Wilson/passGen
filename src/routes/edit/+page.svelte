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
		Copy,
		X,
		Trash2,
		Calendar
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme';

	let searchQuery = '';
	let isDropdownOpen = false;
	let passwordHistory = [];
	let showCopiedNotification = false;

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

	// History page translations
	const translations = {
		en: {
			historyTitle: 'Password History',
			historyEmpty: 'No passwords generated yet.',
			deleteAll: 'Clear History',
			copied: 'Copied!',
			generated: 'Generated',
			options: 'Options',
			uppercase: 'Uppercase',
			lowercase: 'Lowercase',
			numbers: 'Numbers',
			symbols: 'Symbols',
			length: 'Length'
		}
	};

	function historyT(key: string): string {
		let currentLang;
		language.subscribe((value) => {
			currentLang = value;
		})();

		// Fall back to English if translation doesn't exist
		return translations[currentLang]?.[key] || translations.en[key] || key;
	}

	function navigateTo(path: string) {
		goto(path);
	}

	function toggleDropdown() {
		isDropdownOpen = !isDropdownOpen;
	}

	function setLanguage(lang: string) {
		language.set(lang);
		isDropdownOpen = false;

		// Store user language preference
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('preferred-language', lang);
		}
	}

	function copyPassword(password: string) {
		navigator.clipboard.writeText(password);
		showCopiedNotification = true;
		setTimeout(() => (showCopiedNotification = false), 2000);
	}

	function clearHistory() {
		if (confirm('Are you sure you want to clear all password history?')) {
			localStorage.removeItem('password-history');
			passwordHistory = [];
		}
	}

	function deletePassword(index: number) {
		passwordHistory.splice(index, 1);
		passwordHistory = [...passwordHistory]; // Trigger reactivity
		localStorage.setItem('password-history', JSON.stringify(passwordHistory));
	}

	function formatDate(timestamp: number) {
		const date = new Date(timestamp);
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(date);
	}

	onMount(() => {
		try {
			const storedHistory = localStorage.getItem('password-history');
			if (storedHistory) {
				passwordHistory = JSON.parse(storedHistory);
			}
		} catch (error) {
			console.error('Failed to load password history:', error);
		}
	});
</script>

<div class="bg-surface text-on-surface min-h-screen select-none overflow-x-hidden">
	<!-- Left Sidebar  -->
	<nav
		class="fixed left-0 top-0 hidden h-full flex-col items-center justify-between space-y-8 py-4 lg:flex lg:w-16 2xl:w-40"
	>
		<div class="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
			<span class="text-on-primary p-10 text-xl font-bold">PG</span>
		</div>
		<div class="flex h-full flex-col justify-center space-y-6">
			<button
				class="rounded-lg p-2 text-[#2F3676] hover:bg-blue-50"
				on:click={() => navigateTo('/')}
			>
				<Home size={24} />
			</button>
			<button class="rounded-lg bg-blue-100 p-2 text-[#2F3676]">
				<Edit3 size={24} />
			</button>
			<button
				class="rounded-lg p-2 text-[#2F3676] hover:bg-blue-50"
				on:click={() => navigateTo('/award')}
			>
				<Award size={24} />
			</button>
			<button
				class="rounded-lg p-2 text-[#2F3676] hover:bg-blue-50"
				on:click={() => navigateTo('/settings')}
			>
				<Settings size={24} />
			</button>
			<button
				class="rounded-lg p-2 text-[#2F3676] hover:bg-blue-50"
				on:click={() => navigateTo('/')}
				aria-label="Show QR Code"
			>
				<QrCodeIcon size={24} />
			</button>
		</div>
	</nav>

	<!-- Mobile Navigation Bar -->
	<div class="border-divider bg-surface fixed bottom-0 left-0 right-0 z-10 border-t lg:hidden">
		<div class="flex items-center justify-around py-2">
			<button class="p-2 text-[#2F3676]" on:click={() => navigateTo('/')}>
				<Home size={20} />
			</button>
			<button class="rounded-full bg-blue-50 p-2 text-[#2F3676]">
				<Edit3 size={20} />
			</button>
			<button class="p-2 text-[#2F3676]" on:click={() => navigateTo('/award')}>
				<Award size={20} />
			</button>
			<button class="p-2 text-[#2F3676]" on:click={() => navigateTo('/settings')}>
				<Settings size={20} />
			</button>
			<button class="p-2 text-[#2F3676]" on:click={() => navigateTo('/')} aria-label="Show QR Code">
				<QrCodeIcon size={20} />
			</button>
		</div>
	</div>

	<!-- Header -->
	<div class="flex flex-col items-end px-4 lg:px-20">
		<header class="flex w-full items-center justify-between p-4 lg:fixed lg:max-w-max lg:gap-10">
			<div class="flex h-8 w-8 items-center justify-center rounded-full bg-[#2F3676] lg:hidden">
				<span class="text-xl font-bold text-white">PG</span>
			</div>
			<div class="relative w-[60%] lg:w-full max-w-sm">
				<Search class="text-muted absolute left-3 top-1/2 -translate-y-1/2 transform" size={20} />
				<input
					type="text"
					placeholder={t('search')}
					bind:value={searchQuery}
					class="bg-surface-variant focus:ring-primary h-10 w-full rounded-full border-0 pl-10 focus:outline-none focus:ring-2"
				/>
			</div>
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
							class="absolute right-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg"
							role="listbox"
						>
							{#each languages as lang}
								<li>
									<button
										class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
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
		<div class="mx-auto w-full max-w-4xl px-4">
			<div class="mb-6 flex items-center justify-between">
				<h1 class="text-primary text-xl font-bold lg:text-2xl">
					{historyT('historyTitle')}
				</h1>

				{#if passwordHistory.length > 0}
					<button
						class="text-error hover:text-error-hover flex items-center text-sm"
						on:click={clearHistory}
					>
						<Trash2 size={16} class="mr-1" />
						{historyT('deleteAll')}
					</button>
				{/if}
			</div>

			{#if passwordHistory.length === 0}
				<div class="text-muted py-12 text-center">
					<p>{historyT('historyEmpty')}</p>
				</div>
			{:else}
				<div class="space-y-4">
					{#each passwordHistory as entry, i}
						<div class="bg-surface border-divider rounded-lg border p-4 shadow-sm">
							<div class="mb-2 flex items-center justify-between">
								<div class="text-primary truncate pr-2 font-mono text-lg">
									{entry.password}
								</div>
								<div class="flex space-x-2">
									<button
										class="text-muted hover:text-primary transition-colors"
										on:click={() => copyPassword(entry.password)}
										aria-label="Copy password"
									>
										<Copy size={18} />
									</button>
									<button
										class="text-muted hover:text-error transition-colors"
										on:click={() => deletePassword(i)}
										aria-label="Delete password"
									>
										<Trash2 size={18} />
									</button>
								</div>
							</div>

							<div class="text-muted mb-2 flex items-center text-xs">
								<Calendar size={14} class="mr-1" />
								<span>{historyT('generated')}: {formatDate(entry.timestamp)}</span>
							</div>

							<div class="mt-2">
								<p class="text-muted mb-1 text-xs">{historyT('options')}:</p>
								<div class="flex flex-wrap gap-2">
									{#if entry.options.includeUppercase}
										<span class="bg-primary-hover text-primary rounded-full px-2 py-1 text-xs"
											>{historyT('uppercase')}</span
										>
									{/if}
									{#if entry.options.includeLowercase}
										<span class="bg-primary-hover text-primary rounded-full px-2 py-1 text-xs"
											>{historyT('lowercase')}</span
										>
									{/if}
									{#if entry.options.includeNumbers}
										<span class="bg-primary-hover text-primary rounded-full px-2 py-1 text-xs"
											>{historyT('numbers')}</span
										>
									{/if}
									{#if entry.options.includeSymbols}
										<span class="bg-primary-hover text-primary rounded-full px-2 py-1 text-xs"
											>{historyT('symbols')}</span
										>
									{/if}
									<span class="bg-primary-hover text-primary rounded-full px-2 py-1 text-xs"
										>{historyT('length')}: {entry.options.length}</span
									>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</main>

	<!-- Copied Notification -->
	{#if showCopiedNotification}
		<div class="bg-primary text-on-primary fixed bottom-4 right-4 rounded-full px-4 py-2 shadow-md">
			{historyT('copied')}
		</div>
	{/if}
</div>

<style>
	:global(body) {
		background-color: #f8f9fb;
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
