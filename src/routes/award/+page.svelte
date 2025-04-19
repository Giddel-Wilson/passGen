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
		ImageDownIcon
	} from 'lucide-svelte';
	import security from '$lib/assets/secIll.svg';
	import { theme } from '$lib/stores/theme';

	let searchQuery = '';
	let isDropdownOpen = false;

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

	// Award page translations
	const translations = {
		en: {
			awardTitle: 'Certification',
			awardDescription:
				'Password Generator is certified and 100% trusted by security experts worldwide.',
			securityFeatures: 'Security Features',
			feature1: 'End-to-end encryption',
			feature2: 'No password storage on servers',
			feature3: 'Open-source algorithms',
			feature4: 'Regular security audits',
			certifiedBy: 'Certified By',
			organization1: 'International Cybersecurity Institute',
			organization2: 'Digital Privacy Association',
			organization3: 'Open Web Security Foundation'
		}
	};

	function awardT(key: string): string {
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
				class="rounded-lg p-2 text-primary hover:bg-blue-50"
				on:click={() => navigateTo('/')}
			>
				<Home size={24} />
			</button>
			<button
				class="rounded-lg p-2 text-primary hover:bg-blue-50"
				on:click={() => navigateTo('/edit')}
			>
				<Edit3 size={24} />
			</button>
			<button class="rounded-lg bg-blue-100 p-2 text-primary">
				<Award size={24} />
			</button>
			<button
				class="rounded-lg p-2 text-primary hover:bg-blue-50"
				on:click={() => navigateTo('/settings')}
			>
				<Settings size={24} />
			</button>
			<button
				class="rounded-lg p-2 text-primary hover:bg-blue-50"
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
			<button class="p-2 text-primary" on:click={() => navigateTo('/')}>
				<Home size={20} />
			</button>
			<button class="p-2 text-primary" on:click={() => navigateTo('/edit')}>
				<Edit3 size={20} />
			</button>
			<button class="rounded-full bg-blue-50 p-2 text-primary">
				<Award size={20} />
			</button>
			<button class="p-2 text-primary" on:click={() => navigateTo('/settings')}>
				<Settings size={20} />
			</button>
			<button class="p-2 text-primary" on:click={() => navigateTo('/')} aria-label="Show QR Code">
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
				<Search
					class="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
					size={20}
				/>
				<input
					type="text"
					placeholder={t('search')}
					bind:value={searchQuery}
					class="h-10 w-full rounded-full border-0 bg-[#F8F9FB] pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div> -->
			<div class="flex items-center space-x-2 lg:space-x-4">
				<div class="relative">
					<button
						on:click={toggleDropdown}
						class="flex items-center rounded-full bg-primary px-2 py-1 text-sm text-white lg:px-4 lg:py-2 lg:text-base"
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
		class="mx-auto flex min-h-screen w-full items-center justify-center p-4 pb-20 lg:ml-8 lg:mt-14 lg:p-8 lg:pb-8 lg:pt-20 xl:ml-4 xl:mt-16 2xl:ml-0 2xl:mt-0"
	>
		<div class="grid max-w-screen-2xl items-center gap-0 lg:grid-cols-2 lg:gap-8">
			<div class="order-2 flex flex-col lg:order-1">
				<h1 class="text-primary mb-3 text-xl font-bold lg:mb-4 lg:text-2xl xl:text-3xl">
					{awardT('awardTitle')}
				</h1>

				<p class="text-muted mb-6 text-sm leading-relaxed lg:mb-8 lg:text-base">
					{awardT('awardDescription')}
				</p>

				<h2 class="mb-3 text-lg font-semibold text-primary">
					{awardT('securityFeatures')}
				</h2>

				<ul class="mb-6 space-y-2 text-sm text-muted lg:text-base">
					<li class="flex items-center">
						<span class="mr-2 h-2 w-2 rounded-full bg-primary"></span>
						{awardT('feature1')}
					</li>
					<li class="flex items-center">
						<span class="mr-2 h-2 w-2 rounded-full bg-primary"></span>
						{awardT('feature2')}
					</li>
					<li class="flex items-center">
						<span class="mr-2 h-2 w-2 rounded-full bg-primary"></span>
						{awardT('feature3')}
					</li>
					<li class="flex items-center">
						<span class="mr-2 h-2 w-2 rounded-full bg-primary"></span>
						{awardT('feature4')}
					</li>
				</ul>

				<h2 class="mb-3 text-lg font-semibold text-primary">
					{awardT('certifiedBy')}
				</h2>

				<ul class="space-y-2 text-sm text-muted lg:text-base">
					<li class="flex items-center">
						<span class="mr-2 h-2 w-2 rounded-full bg-primary"></span>
						{awardT('organization1')}
					</li>
					<li class="flex items-center">
						<span class="mr-2 h-2 w-2 rounded-full bg-primary"></span>
						{awardT('organization2')}
					</li>
					<li class="flex items-center">
						<span class="mr-2 h-2 w-2 rounded-full bg-primary"></span>
						{awardT('organization3')}
					</li>
				</ul>
			</div>

			<div class="order-1 flex items-center justify-center lg:order-2">
				<img src={security} alt="Certificate" class="h-auto max-w-full" />
			</div>
		</div>
	</main>
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
