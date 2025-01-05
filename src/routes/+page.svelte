<script lang="ts">
  import { Home, Edit3, Award, Settings, CreditCard, Search, ChevronDown, RefreshCw, Copy } from 'lucide-svelte'
  
  let password = 'VI@Bk-FIqU^'
  let searchQuery = ''
  let currentLanguage = 'English'
  let isDropdownOpen = false
  
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
  ]

  function generatePassword() {
    // Password generation logic here
    password = 'New-Generated-Password'
  }

  function copyPassword() {
    navigator.clipboard.writeText(password)
  }

  function setLanguage(lang: string) {
    currentLanguage = lang
    isDropdownOpen = false
  }

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen
  }
</script>

<div class="min-h-screen bg-[#F8F9FB]">
  <!-- Left Sidebar -->
  <nav class="fixed left-0 top-0 h-full w-40 hidden md:flex flex-col items-center justify-between py-4 space-y-8">
    <div class="w-8 h-8 rounded-full bg-[#2F3676] flex items-center justify-center">
      <span class="text-white text-xl font-bold">V</span>
    </div>
    <div class="flex flex-col space-y-6 h-full justify-center">
      <button class="p-2 text-[#2F3676] hover:bg-blue-50 rounded-lg">
        <Home size={20} />
      </button>
      <button class="p-2 text-[#2F3676] hover:bg-blue-50 rounded-lg">
        <Edit3 size={20} />
      </button>
      <button class="p-2 text-[#2F3676] hover:bg-blue-50 rounded-lg">
        <Award size={20} />
      </button>
      <button class="p-2 text-[#2F3676] hover:bg-blue-50 rounded-lg">
        <Settings size={20} />
      </button>
      <button class="p-2 text-[#2F3676] hover:bg-blue-50 rounded-lg">
        <CreditCard size={20} />
      </button>
    </div>
  </nav>

  <!-- Main Content -->
  <div class="md:ml-16 flex flex-col items-end px-20">
    <!-- Header -->
    <header class="max-w-max p-4 flex items-center gap-10">
      <div class="relative max-w-sm w-full hidden md:block">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search"
          bind:value={searchQuery}
          class="pl-10 w-full bg-[#F8F9FB] border-0 rounded-full h-10 focus:outline-none focus:ring-2 focus:ring-[#2F3676]"
        />
      </div>
      <div class="ml-auto flex items-center space-x-4">
        <!-- Custom Dropdown -->
        <div class="relative">
          <button
            on:click={toggleDropdown}
            class="flex items-center px-4 py-2 text-[#2F3676] bg-white border border-gray-200 rounded-md hover:bg-gray-50"
          >
            {currentLanguage}
            <ChevronDown class="ml-2" size={16} />
          </button>
          
          {#if isDropdownOpen}
            <div 
              class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
              on:click|stopPropagation
            >
              {#each languages as language}
                <button
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  on:click={() => setLanguage(language)}
                >
                  {language}
                </button>
              {/each}
            </div>
          {/if}
        </div>
        <div class="w-8 h-8 rounded-full bg-gray-200"></div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto p-8">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="order-2 md:order-1">
          <img src="/placeholder.svg?height=400&width=400" alt="Security Illustration" class="w-full" />
        </div>
        
        <div class="order-1 md:order-2">
          <h1 class="text-3xl font-bold text-[#2F3676] mb-4">
            Secure Password Generator
          </h1>
          
          <p class="text-gray-600 mb-8 leading-relaxed">
            Use the this free Password Generator to create highly secure passwords that are difficult 
            to crack or guess. Just select the criteria for the passwords you need, 
            and click "Generate Password(s)". Remember, the more options you choose, 
            the more secure the passwords will be.
          </p>

          <button 
            class="px-4 py-2 mb-6 bg-white hover:bg-gray-50 text-[#2F3676] border border-gray-200 rounded-md shadow-sm"
            on:click={generatePassword}
          >
            Generate Password
          </button>

          <div class="relative">
            <input
              type="text"
              readonly
              value={password}
              class="w-full px-4 py-2 pr-20 font-mono bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F3676]"
            />
            <button
              class="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-[#2F3676]"
              on:click={copyPassword}
            >
              <Copy size={20} />
            </button>
            <button
              class="absolute right-10 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-[#2F3676]"
              on:click={generatePassword}
            >
              <RefreshCw size={20} />
            </button>
          </div>

          <h2 class="text-xl font-semibold text-[#2F3676] mt-8 mb-4">
            Customize your password
          </h2>
        </div>
      </div>
    </main>
  </div>
</div>

<style>
  :global(body) {
    @apply bg-[#F8F9FB];
  }
</style>