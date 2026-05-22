<script setup>
import Title from './components/Title.vue';
import Btn from './components/Btn.vue';
import Project from './components/Project.vue';
</script>

<template>
  <main class="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 md:px-8 lg:px-16 xl:px-24">
    <section class="mx-auto max-w-6xl">
      <div class="w-[calc(100%-2rem)] xl:w-[calc(100%-6rem)] 2xl:w-[calc(100%-10rem)] max-w-screen-2xl m-auto h-14 lg:h-15 xl:h-16 fixed top-4 lg:top-5 left-1/2 -translate-x-1/2 z-[1000] cursor-pointer  bg-black/10 backdrop-blur-md rounded-full border-3 border-[#ff004f]  flex justify-between items-center px-5 lg:px-8 xl:px-10">
          <div class="text-center">
            <h2 class="mx-6 text-2xl font-bold tracking-widest">PROJECTS</h2>
          </div>
          <div class="flex items-center gap-3">
            <Btn href="/">Back</Btn>
          </div>
      </div>

      <div class="mt-20 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <Project />
      </div>
    </section>
  </main>
</template>
