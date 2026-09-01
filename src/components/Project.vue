<script setup>

import Btn from './Btn.vue';

const props = defineProps({
  project: {
    type: Object,
    required: true,
    default: () => ({})
  },
});

</script>

<template>
  <div
    class="group relative overflow-hidden rounded-2xl border border-black/[0.08]
           bg-slate-900/[0.06] backdrop-blur-xl cursor-pointer
           transition-all duration-500 hover:-translate-y-2 hover:border-[#ff004f]/40
           hover:bg-slate-900/[0.12] flex flex-col shadow-sm"
  >
    <div class="relative overflow-hidden">
      <img
        :src="project.image"
        class="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div class="absolute inset-0 bg-black/5 transition-opacity duration-500 group-hover:bg-transparent" />

      <span
        class="absolute bottom-2 right-4 text-[64px] font-bold leading-none
               text-slate-900/10 select-none transition-colors duration-500
               group-hover:text-[#ff004f]/15"
      >
        {{ project.num }}
      </span>

      <span
        class="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-medium
               bg-[#ff004f]/90 text-white tracking-wide shadow-sm"
      >
        {{ project.tag }}
      </span>
    </div>

    <span
      class="absolute bottom-0 left-0 h-[3px] w-0 bg-[#ff004f]
             transition-all duration-500 group-hover:w-full"
    />

    <div class="flex flex-col flex-1 p-6">
      
      <h3 class="text-lg font-bold text-slate-800  mb-2 tracking-tight">
        {{ project.title }}
      </h3>
      
      <p class="text-sm text-slate-600  leading-relaxed flex-1">
        {{ project.content }}
      </p>

      <div class="flex flex-wrap gap-2 mt-4 mb-5">
        <span
          v-for="t in project.tech"
          :key="t"
          class="px-2.5 py-1 rounded-md text-[11px] font-medium
                 bg-[#ff004f]/8 text-[#ff004f] border border-[#ff004f]/15
                 transition-colors duration-300 group-hover:bg-[#ff004f]/15"
        >
          {{ t }}
        </span>
      </div>

      <div class="flex gap-4 items-center">
        <Btn v-if="project.github" :href="project.github" target="_blank" rel="noopener noreferrer">
          <i class="pi pi-github mr-1.5"></i> Repository
        </Btn>
      </div>
    </div>
  </div>
</template>