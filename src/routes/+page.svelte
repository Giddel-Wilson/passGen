<script lang="ts">
	import { onMount } from 'svelte';
	import { language, t } from '$lib/i18n';
	import { theme } from '$lib/stores/theme';
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

	let password = 'VI@Bk-FIqU^';
	let searchQuery = '';
	let isDropdownOpen = false;
	let showCopiedNotification = false;
	let showModal = false;
	let qrCodeUrl = '';

	// Password generation options
	let passwordLength = 12;
	let includeUppercase = true;
	let includeLowercase = true;
	let includeNumbers = true;
	let includeSymbols = true;

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

	function generatePassword() {
		let charset = '';
		let newPassword = '';

		if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
		if (includeNumbers) charset += '0123456789';
		if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

		// Ensure at least one character from each selected type
		if (includeUppercase) newPassword += 'A';
		if (includeLowercase) newPassword += 'a';
		if (includeNumbers) newPassword += '1';
		if (includeSymbols) newPassword += '@';

		// Fill remaining length with random characters
		while (newPassword.length < passwordLength) {
			const randomIndex = Math.floor(Math.random() * charset.length);
			newPassword += charset[randomIndex];
		}

		// Shuffle the password
		password = newPassword
			.split('')
			.sort(() => Math.random() - 0.5)
			.join('');
		generateQRCode();

		// Store in history
		if (typeof localStorage !== 'undefined') {
			try {
				let history = JSON.parse(localStorage.getItem('password-history') || '[]');
				history.unshift({
					password: password,
					timestamp: Date.now(),
					options: {
						includeUppercase,
						includeLowercase,
						includeNumbers,
						includeSymbols,
						length: passwordLength
					}
				});
				// Limit history to 50 entries
				if (history.length > 50) history = history.slice(0, 50);
				localStorage.setItem('password-history', JSON.stringify(history));
			} catch (err) {
				console.error('Failed to save password to history', err);
			}
		}
	}

	function copyPassword() {
		navigator.clipboard.writeText(password);
		showCopiedNotification = true;
		setTimeout(() => (showCopiedNotification = false), 2000);
	}

	// Enhanced language management
	function setLanguage(lang: string) {
		$language = lang;
		isDropdownOpen = false;
		// Store user language preference
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('preferred-language', lang);
		}
	}

	// Initialize language from stored preference
	onMount(() => {
		generateQRCode();

		// Load saved language preference
		const savedLanguage =
			typeof localStorage !== 'undefined' ? localStorage.getItem('preferred-language') : null;
		if (savedLanguage && languages.some((lang) => lang.code === savedLanguage)) {
			$language = savedLanguage;
		} else {
			// Try to detect browser language
			const browserLang = navigator.language.split('-')[0];
			if (languages.some((lang) => lang.code === browserLang)) {
				$language = browserLang;
			}
		}
	});

	// Get current language details
	$: currentLanguage = languages.find((lang) => lang.code === $language) || languages[0];

	// Determine if the current language is RTL
	$: isRTL = $language === 'ar';

	function toggleDropdown() {
		isDropdownOpen = !isDropdownOpen;
	}

	function openModal() {
		showModal = true;
		generateQRCode();
	}

	function closeModal() {
		showModal = false;
	}

	function generateQRCode() {
		const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/';
		const params = new URLSearchParams({
			size: '200x200',
			data: password
		});
		qrCodeUrl = `${baseUrl}?${params.toString()}`;
	}

	function downloadQRCode() {
		const link = document.createElement('a');
		link.download = 'password-qr-code.png';
		link.href = qrCodeUrl;
		link.click();
	}

	onMount(() => {
		generateQRCode();
	});

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}

	// Navigate to other pages
	function navigateTo(path) {
		goto(path);
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="bg-surface text-on-surface min-h-screen select-none" dir={isRTL ? 'rtl' : 'ltr'}>
	<!-- Left Sidebar - Added mobile-friendly navigation -->
	<nav
		class="fixed left-0 top-0 hidden h-full flex-col items-center justify-between space-y-8 py-4 lg:flex lg:w-16 2xl:w-40"
	>
		<div class="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
			<span class="text-on-primary p-10 text-xl font-bold">PG</span>
		</div>
		<div class="flex h-full flex-col justify-center space-y-6">
			<button class="text-primary hover:bg-primary-hover rounded-lg p-2">
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
			<button
				class="text-primary hover:bg-primary-hover rounded-lg p-2"
				on:click={() => navigateTo('/settings')}
			>
				<Settings size={24} />
			</button>
			<button
				class="text-primary hover:bg-primary-hover rounded-lg p-2"
				on:click={openModal}
				aria-label="Show QR Code"
			>
				<QrCodeIcon size={24} />
			</button>
		</div>
	</nav>

	<!-- Mobile Navigation Bar -->
	<div class="border-divider bg-surface fixed bottom-0 left-0 right-0 z-10 border-t lg:hidden">
		<div class="flex items-center justify-around py-2">
			<button class="text-primary p-2">
				<Home size={20} />
			</button>
			<button class="text-primary p-2" on:click={() => navigateTo('/edit')}>
				<Edit3 size={20} />
			</button>
			<button class="text-primary p-2" on:click={() => navigateTo('/award')}>
				<Award size={20} />
			</button>
			<button class="text-primary p-2" on:click={() => navigateTo('/settings')}>
				<Settings size={20} />
			</button>
			<button class="text-primary p-2" on:click={openModal} aria-label="Show QR Code">
				<QrCodeIcon size={20} />
			</button>
		</div>
	</div>

	<!-- Header - Improved mobile layout -->
	<div class="flex flex-col items-end px-4 lg:px-20">
		<header class="flex w-full items-center justify-between p-4 lg:fixed lg:max-w-max lg:gap-10">
			<div class="bg-primary flex h-8 w-8 items-center justify-center rounded-full lg:hidden">
				<span class="text-on-primary text-xl font-bold">PG</span>
			</div>
			<div class="relative hidden w-full max-w-sm lg:block">
				<Search class="text-muted absolute left-3 top-1/2 -translate-y-1/2 transform" size={20} />
				<input
					type="text"
					placeholder={t('search')}
					bind:value={searchQuery}
					class="bg-surface-variant focus:ring-primary h-10 w-full rounded-full border-0 pl-10 focus:outline-none focus:ring-2"
				/>
			</div>
			<div class="flex items-center space-x-2 lg:space-x-4">
				<!-- Improved language dropdown -->
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
							class="border-divider bg-surface absolute right-0 z-50 mt-2 max-h-64 w-48 overflow-y-auto rounded-md border shadow-lg"
							role="listbox"
						>
							{#each languages as lang}
								<li>
									<button
										class="text-on-surface hover:bg-surface-variant block w-full px-4 py-2 text-left text-sm {lang.code ===
										$language
											? 'bg-primary-hover text-primary font-medium'
											: ''}"
										on:click={() => setLanguage(lang.code)}
										role="option"
										aria-selected={lang.code === $language}
									>
										{lang.name}
										<span class="text-muted ml-1 text-xs">({lang.code.toUpperCase()})</span>
									</button>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			</div>
		</header>
	</div>

	<!-- Main Content - Improved spacing and layout for mobile -->
	<main
		class="mx-auto flex min-h-screen w-full items-center justify-center p-4 pb-20 lg:ml-8 lg:mt-14 lg:p-8 lg:pb-8 lg:pt-20 xl:ml-4 xl:mt-16 2xl:ml-0 2xl:mt-0"
	>
		<div class="grid max-w-screen-2xl items-center gap-6 lg:grid-cols-2 lg:gap-20">
			<div class="order-2 flex items-center justify-center lg:order-1">
				<img
					src={security || '/placeholder.svg'}
					alt="Security Illustration"
					class="h-auto max-w-full lg:max-w-2xl"
				/>
			</div>

			<div class="order-1 lg:order-2">
				<h1 class="text-primary mb-3 text-xl font-bold lg:mb-4 lg:text-2xl xl:text-3xl">
					{t('title')}
				</h1>

				<p class="text-muted mb-6 text-sm leading-relaxed lg:mb-8 lg:text-base">
					{t('description')}
				</p>

				<button
					class="border-divider bg-surface text-primary hover:bg-surface-variant mb-4 rounded-full border px-4 py-2 shadow-sm lg:mb-6"
					on:click={generatePassword}
				>
					{t('generateButton')}
				</button>

				<div class="relative w-full max-w-full lg:max-w-max">
					<input
						type="text"
						readonly
						value={password}
						class="border-divider bg-surface w-full rounded-full border px-4 py-2 pr-20 font-mono text-sm focus:outline-none lg:text-base"
					/>
					<button
						class="text-muted hover:text-primary absolute right-2 top-1/2 -translate-y-1/2 transform p-2"
						on:click={copyPassword}
						aria-label={t('copy')}
					>
						<Copy size={20} />
					</button>
					<button
						class="text-muted hover:text-primary absolute right-10 top-1/2 -translate-y-1/2 transform p-2"
						on:click={generatePassword}
						aria-label={t('regenerate')}
					>
						<RefreshCw size={20} />
					</button>
				</div>

				<h2 class="text-primary mb-3 mt-6 text-lg font-semibold lg:mb-4 lg:mt-8 lg:text-xl">
					{t('customizeTitle')}
				</h2>

				<div class="space-y-3 text-sm lg:space-y-4 lg:text-base">
					<div>
						<label class="flex items-center space-x-2">
							<input
								type="checkbox"
								bind:checked={includeUppercase}
								class="border-divider text-primary focus:ring-primary rounded"
							/>
							<span>{t('includeUppercase')}</span>
						</label>
					</div>
					<div>
						<label class="flex items-center space-x-2">
							<input
								type="checkbox"
								bind:checked={includeLowercase}
								class="border-divider text-primary focus:ring-primary rounded"
							/>
							<span>{t('includeLowercase')}</span>
						</label>
					</div>
					<div>
						<label class="flex items-center space-x-2">
							<input
								type="checkbox"
								bind:checked={includeNumbers}
								class="border-divider text-primary focus:ring-primary rounded"
							/>
							<span>{t('includeNumbers')}</span>
						</label>
					</div>
					<div>
						<label class="flex items-center space-x-2">
							<input
								type="checkbox"
								bind:checked={includeSymbols}
								class="border-divider text-primary focus:ring-primary rounded"
							/>
							<span>{t('includeSymbols')}</span>
						</label>
					</div>
					<div>
						<label class="flex items-center space-x-2">
							<span>{t('passwordLength')}</span>
							<input
								type="number"
								bind:value={passwordLength}
								min="8"
								max="32"
								class="border-divider focus:border-primary focus:ring-primary w-20 rounded-md dark:bg-surface-variant dark:text-on-surface-variant p-0.5 text-center"
							/>
						</label>
					</div>
				</div>
			</div>
		</div>
	</main>

	<!-- Copied Notification -->
	{#if showCopiedNotification}
		<div class="bg-primary text-on-primary fixed bottom-4 right-4 rounded-full px-4 py-2 shadow-md">
			{t('copied')}
		</div>
	{/if}

	<!-- Modal - Improved for mobile -->
	{#if showModal}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-3 lg:p-4"
			role="dialog"
			aria-modal="true"
			on:click|self={closeModal}
			on:keydown={handleKeydown}
			tabindex="-1"
		>
			<div class="bg-surface mx-3 w-full max-w-sm rounded-lg p-4 lg:p-6">
				<div class="mb-3 flex items-center justify-between lg:mb-4">
					<h3 class="text-primary text-lg font-semibold lg:text-xl">{t('qrCodeTitle')}</h3>
					<button
						on:click={closeModal}
						class="text-muted hover:text-on-surface transition-colors"
						aria-label="Close modal"
					>
						<X size={22} />
					</button>
				</div>
				<div class="flex flex-col items-center">
					{#if qrCodeUrl}
						<img
							src={qrCodeUrl || '/placeholder.svg'}
							alt="Password QR Code"
							class="mb-3 h-40 w-40 lg:mb-4 lg:h-48 lg:w-48"
						/>
					{/if}
					<p class="mb-3 break-all text-center font-mono text-sm lg:mb-4 lg:text-base">
						{password}
					</p>
					<div class="flex flex-wrap justify-center gap-2">
						<button
							on:click={copyPassword}
							class="text-muted hover:text-primary rounded px-4 py-2 transition-colors"
						>
							<Copy size={24} />
						</button>
						<button
							on:click={generatePassword}
							class="text-muted hover:text-primary rounded px-4 py-2 transition-colors"
						>
							<RefreshCw size={24} />
						</button>
						<button
							on:click={downloadQRCode}
							class="text-muted hover:text-primary rounded px-4 py-2 transition-colors"
						>
							<ImageDownIcon size={24} />
						</button>
					</div>
				</div>
			</div>
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

	/* RTL language support */
	[dir='rtl'] .ml-1 {
		margin-left: 0;
		margin-right: 0.25rem;
	}

	[dir='rtl'] .ml-2 {
		margin-left: 0;
		margin-right: 0.5rem;
	}

	[dir='rtl'] .right-0 {
		right: auto;
		left: 0;
	}

	[dir='rtl'] .right-2 {
		right: auto;
		left: 0.5rem;
	}

	[dir='rtl'] .right-4 {
		right: auto;
		left: 1rem;
	}

	[dir='rtl'] .right-10 {
		right: auto;
		left: 2.5rem;
	}

	[dir='rtl'] .text-left {
		text-align: right;
	}
</style>
