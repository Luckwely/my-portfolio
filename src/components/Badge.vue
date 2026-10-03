<script setup>
defineProps({
    name: { type: String, default: 'Jean Luc' },
    title: { type: String, default: 'Developer Web' },
    email: { type: String, default: 'Lucharisoaa@gmail.com' },
    avatarUrl: {
        type: String,
        default:
            '/src/assets/2.png',
    },
    badgeId: { type: String, default: '' },
    brand: { type: String, default: 'Jean luc' },
})
</script>

<template>
    <div class="w-full md:w-[40%] lg:w-[30%] bg-black/10 backdrop-blur-md rounded-2xl overflow-hidden min-h-[300px] md:min-h-0 self-stretch">
      <div class="relative flex min-h-screen items-start justify-center overflow-hidden">

          <div
              class="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-700/10 blur-3xl" />
  
          <div class="badge-swing relative h-[620px] w-[340px] origin-top scale-[0.8] sm:scale-100">
              <div
                  class="absolute left-1/2 top-[-200px] h-[260px] w-[54px] -translate-x-1/2 bg-gradient-to-r from-neutral-900 via-stone-950 to-black shadow-[inset_0_0_8px_rgba(0,0,0,0.5)]">
                  <div class="absolute inset-y-0 left-1 w-px bg-white/10" />
                  <div class="absolute inset-y-0 right-1 w-px bg-black/30" />
              </div>

              <div
                  class="absolute left-[18px] top-[110px] h-[390px] w-[220px] origin-top-left -rotate-[14deg] overflow-hidden rounded-2xl bg-gradient-to-br from-[#ff004f] to-[#cc003f] shadow-2xl shadow-black/60 ring-1 ring-white/10">

                  <span
                      class="absolute bottom-24 left-6 origin-bottom-left -rotate-90 whitespace-nowrap text-[76px] font-extrabold leading-none tracking-tight text-white/95">
                      {{ brand }}
                  </span>

                  <svg class="absolute bottom-6 left-5 h-14 w-14 text-white/90" viewBox="0 0 48 48" fill="currentColor">
                      <path d="M6 14c0-3 2-5 5-5h20c4 0 6 3 4 6L26 28H11c-3 0-5-2-5-5z" opacity=".95" />
                      <path d="M42 34c0 3-2 5-5 5H17c-4 0-6-3-4-6l9-13h15c3 0 5 2 5 5z" opacity=".7" />
                  </svg>
              </div>
  
              <div
                  class="absolute left-[78px] top-[96px] h-[400px] w-[220px] rotate-[6deg] overflow-hidden rounded-2xl bg-neutral-50 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.8)] ring-1 ring-black/5">

                  <div class="absolute left-1/2 top-3 h-2.5 w-6 -translate-x-1/2 rounded-full bg-neutral-900/90" />
  

                  <svg class="absolute left-4 top-4 h-6 w-6 text-neutral-900" viewBox="0 0 48 48" fill="currentColor">
                      <path d="M6 14c0-3 2-5 5-5h20c4 0 6 3 4 6L26 28H11c-3 0-5-2-5-5z" />
                      <path d="M42 34c0 3-2 5-5 5H17c-4 0-6-3-4-6l9-13h15c3 0 5 2 5 5z" opacity=".8" />
                  </svg>
  

                  <div class="absolute inset-x-0 top-[48px] h-[245px] bg-neutral-200">
                      <img :src="avatarUrl" :alt="name" class="h-full w-full object-cover object-top" />
                      <div class="absolute inset-0 bg-gradient-to-t from-neutral-50/70 via-transparent to-transparent" />
                  </div>
  
                  <div class="absolute inset-x-0 top-[310px] px-4">
                      <h2 class="max-w-[10ch] text-[24px] font-extrabold leading-[1.05] tracking-tight text-neutral-950">
                          {{ name }}
                      </h2>
                      <p class="mt-1.5 text-[11px] font-medium text-neutral-400">{{ title }}</p>
                  </div>

                  <div
                      class="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 pb-3 pt-2 text-[7px] font-bold uppercase tracking-wider text-neutral-800">
                      <span class="flex items-center gap-1">
                          <span class="text-neutral-500">Email:</span>
                          {{ email }}
                      </span>
                  </div>
  

                  <div
                      class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/5" />
              </div>
  
  
              <svg class="absolute left-1/2 top-[40px] z-10 h-[140px] w-[80px] -translate-x-1/2 drop-shadow-[0_6px_6px_rgba(0,0,0,0.6)]"
                  viewBox="0 0 80 140" fill="none">
                  <defs>
                      <linearGradient id="chrome" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stop-color="#f4f4f5" />
                          <stop offset=".35" stop-color="#a1a1aa" />
                          <stop offset=".6" stop-color="#e4e4e7" />
                          <stop offset="1" stop-color="#71717a" />
                      </linearGradient>
                  </defs>

                  <path d="M18 8h44a8 8 0 0 1 8 8v22a8 8 0 0 1-8 8H18" stroke="url(#chrome)" stroke-width="6"
                      stroke-linecap="round" />
                  <path d="M18 8v38" stroke="url(#chrome)" stroke-width="6" stroke-linecap="round" />

                  <rect x="33" y="44" width="14" height="16" rx="4" fill="url(#chrome)" />
                  <circle cx="40" cy="52" r="2" fill="#52525b" />

                  <path d="M30 60h20c4 0 6 3 6 7v30c0 12-8 22-16 22s-16-10-16-22V67c0-4 2-7 6-7z" fill="url(#chrome)" />
                  <path d="M40 70c-6 0-9 5-9 12v14c0 8 4 14 9 14" stroke="#3f3f46" stroke-width="3"
                      stroke-linecap="round" />
 
                  <rect x="52" y="76" width="6" height="14" rx="3" fill="#d4d4d8" />
              </svg>
          </div>
      </div>
    </div>
</template>

<style scoped>

.badge-swing {
    animation: swing 5s ease-in-out infinite;
    transform-origin: 50% 0;
    will-change: transform;
}

@keyframes swing {
    0% {
        transform: rotate(7deg);
    }

    25% {
        transform: rotate(2deg);
    }

    50% {
        transform: rotate(-7deg);
    }

    75% {
        transform: rotate(-2deg);
    }

    100% {
        transform: rotate(7deg);
    }
}

@media (prefers-reduced-motion: reduce) {
    .badge-swing {
        animation: none;
    }
}
</style>