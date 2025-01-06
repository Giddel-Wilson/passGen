<script lang="ts">
	import { onMount } from 'svelte';
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
	let currentLanguage = 'English';
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
		'English',
		'Español',
		'Français',
		'Deutsch',
		'Italiano',
		'日本語',
		'한국어',
		'中文',
		'العربية',
		'Português',
		'Русский',
		'Hindi'
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
	}

	function copyPassword() {
		navigator.clipboard.writeText(password);
		showCopiedNotification = true;
		setTimeout(() => (showCopiedNotification = false), 2000);
	}

	function setLanguage(lang: string) {
		currentLanguage = lang;
		isDropdownOpen = false;
	}

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
</script>

<div class="min-h-screen select-none bg-white">
	<!-- Left Sidebar -->
	<nav
		class="fixed left-0 top-0 hidden h-full lg:w-16 2xl:w-40 flex-col items-center justify-between space-y-8 py-4 lg:flex"
	>
		<div class="flex h-8 w-8 items-center justify-center rounded-full bg-[#2F3676]">
			<span class="p-10 text-xl font-bold text-white">PG</span>
		</div>
		<div class="flex h-full flex-col justify-center space-y-6">
			<button class="rounded-lg p-2 text-[#2F3676] hover:bg-blue-50">
				<Home size={24} />
			</button>
			<button class="rounded-lg p-2 text-[#2F3676] hover:bg-blue-50">
				<Edit3 size={24} />
			</button>
			<button class="rounded-lg p-2 text-[#2F3676] hover:bg-blue-50">
				<Award size={24} />
			</button>
			<button class="rounded-lg p-2 text-[#2F3676] hover:bg-blue-50">
				<Settings size={24} />
			</button>
			<button
				class="rounded-lg p-2 text-[#2F3676] hover:bg-blue-50"
				on:click={openModal}
				aria-label="Show QR Code"
			>
				<QrCodeIcon size={24} />
			</button>
		</div>
	</nav>

	<!-- Header -->
	<div class="flex flex-col items-end px-4 lg:px-20">
		<header class="lg:fixed flex max-w-max items-center gap-4 p-4 lg:gap-10">
			<div class="relative hidden w-full max-w-sm lg:block">
				<Search
					class="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
					size={20}
				/>
				<input
					type="text"
					placeholder="Search"
					bind:value={searchQuery}
					class="h-10 w-full rounded-full border-0 bg-[#F8F9FB] pl-10 focus:outline-none focus:ring-2 focus:ring-[#2F3676]"
				/>
			</div>
			<div class="ml-auto flex items-center space-x-4">
				<!-- Custom Dropdown -->
				<div class="relative">
					<button
						on:click={toggleDropdown}
						class="flex items-center rounded-full bg-[#2F3676] px-4 py-2 text-white"
					>
						{currentLanguage}
						<ChevronDown class="ml-2" size={16} />
					</button>

					{#if isDropdownOpen}
						<div
							class="absolute right-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg"
							on:click|stopPropagation
						>
							{#each languages as language}
								<button
									class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
									on:click={() => setLanguage(language)}
								>
									{language}
								</button>
							{/each}
						</div>
					{/if}
				</div>
				<div class="h-10 w-10 rounded-full bg-gray-200 shadow-md">
					<img
						src="https://i.pinimg.com/236x/7e/88/12/7e881286d4d60c28aabfd7dfb48ecf36.jpg"
						alt="pfp"
						class="h-full w-full rounded-full bg-cover shadow-inner"
					/>
				</div>
			</div>
		</header>
	</div>

	<!-- Main Content -->
	<main class="mx-auto lg:ml-8 xl:ml-4 2xl:ml-0 flex min-h-screen w-full items-center justify-center p-4 lg:p-8 lg:mt-14 xl:mt-16 2xl:mt-0">
		<div class="grid max-w-screen-2xl items-center gap-8 lg:grid-cols-2 lg:gap-20">
			<div class="order-2 lg:order-1 flex items-center justify-center">
				<img src={security} alt="Security Illustration" class="max-w-2xl" />
			</div>

			<div class="order-1 lg:order-2">
				<h1 class="mb-4 text-2xl font-bold text-[#2F3676] lg:text-3xl">
					Secure Password Generator
				</h1>

				<p class="mb-8 leading-relaxed text-gray-600">
					Use this free Password Generator to create highly secure passwords that are difficult to
					crack or guess. Just select the criteria for the passwords you need, and click "Generate
					Password(s)". Remember, the more options you choose, the more secure the passwords will
					be.
				</p>

				<button
					class="mb-6 rounded-full border border-gray-200 bg-white px-4 py-2 text-[#2F3676] shadow-sm hover:bg-gray-50"
					on:click={generatePassword}
				>
					Generate Password
				</button>

				<div class="relative max-w-max">
					<input
						type="text"
						readonly
						value={password}
						class="w-full rounded-full border border-gray-200 bg-white px-4 py-2 pr-20 font-mono focus:outline-none"
					/>
					<button
						class="absolute right-2 top-1/2 -translate-y-1/2 transform p-2 text-gray-400 hover:text-[#2F3676]"
						on:click={copyPassword}
					>
						<Copy size={20} />
					</button>
					<button
						class="absolute right-10 top-1/2 -translate-y-1/2 transform p-2 text-gray-400 hover:text-[#2F3676]"
						on:click={generatePassword}
					>
						<RefreshCw size={20} />
					</button>
				</div>

				<h2 class="mb-4 mt-8 text-xl font-semibold text-[#2F3676]">Customize your password</h2>
			</div>
		</div>
	</main>

	<!-- Copied Notification -->
	{#if showCopiedNotification}
		<div class="fixed bottom-4 right-4 rounded-full bg-[#2F3676] px-4 py-2 text-white shadow-md">
			Copied!
		</div>
	{/if}

	<!-- Modal -->
	{#if showModal}
    <div 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      on:click|self={closeModal}
      on:keydown={handleKeydown}
    >
      <div class="bg-white rounded-lg p-6 max-w-sm w-full">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold text-[#2F3676]">Password QR Code</h3>
          <button 
            on:click={closeModal}
            class="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        <div class="flex flex-col items-center">
          {#if qrCodeUrl}
            <img src={qrCodeUrl} alt="Password QR Code" class="mb-4 w-48 h-48" />
          {/if}
          <p class="text-center mb-4 font-mono">{password}</p>
          <div class="flex flex-wrap gap-2 justify-center">
            <button
              on:click={copyPassword}
              class="px-4 py-2 rounded text-gray-400 transition-colors hover:text-[#2F3676]"
            >
			<Copy size={24} />
            </button>
            <button
              on:click={generatePassword}
              class="px-4 py-2 rounded text-gray-400 transition-colors hover:text-[#2F3676]"
            >
			<RefreshCw size={24} />
            </button>
            <button
              on:click={downloadQRCode}
              class="px-4 py-2 rounded text-gray-400 transition-colors hover:text-[#2F3676]"
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
		@apply bg-[#F8F9FB];
	}
</style>