<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import webGLFluidEnhanced from 'webgl-fluid-enhanced'; 
import Nav from './components/Nav.vue';
import Btn from './components/Btn.vue';
import Ripple from './components/Ripple.vue';
import Tabs from './components/Tabs.vue';
import Title from './components/Title.vue';
import Service from './components/Service.vue';
import Project from './components/Project.vue';
import Input from './components/Input.vue';
import Toast from 'primevue/toast';
import Social from './components/Social.vue';
import FluidCanvas from './components/FluidCanvas.vue';

const isMenuOpen = ref(false);
const value = ref('0');
const homeSection = ref(null);
const aboutSection = ref(null);
const servicesSection = ref(null);
const projectsSection = ref(null);
const contactSection = ref(null);
const sections = ref([]);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
const fluidCanvas = ref(null);

onMounted(() => {
  if (fluidCanvas.value) {
    webGLFluidEnhanced.simulation(fluidCanvas.value, {
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 1024,
  DENSITY_DISSIPATION: 0.998,   // very close to 1 = smoke stays very long
  VELOCITY_DISSIPATION: 0.99,
  PRESSURE: 0.1,
  SPLAT_RADIUS: 0.9,            // ← was 0.25, now 0.5 = much bigger plume
  SPLAT_FORCE: 20000,           // ← was 8000, stronger push = spreads further
  SPLAT_COUNT: 0,
  SHADING: true,
  COLORFUL: false,
  BLOOM: false,
  COLOR_PALETTE: ['#ff004f'],
  BACK_COLOR: { r: 0, g: 0, b: 0 },
  TRANSPARENT: true,
  HOVER: false,
  PAUSE: false,
});
  }
  sections.value = [
    { el: homeSection.value, id: '0' },
    { el: aboutSection.value, id: '1' },
    { el: servicesSection.value, id: '2' },
    { el: projectsSection.value, id: '3' },
    { el: contactSection.value, id: '4' },
  ];
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

function handleScroll() {
  const scrollPos = window.scrollY + 200;
  sections.value.forEach((section) => {
    const el = section.el;
    if (!el) return;
    const top = el.offsetTop;
    const bottom = top + el.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      value.value = section.id;
    }
  });
}

function scrollToSection(id) {
  isMenuOpen.value = false;
  const section = sections.value.find(s => s.id === id);
  if (section && section.el) {
    section.el.scrollIntoView({ behavior: 'smooth' });
  }
}

</script>

<template>

  <main class="relative isolate w-full min-h-screen overflow-x-hidden">
    <FluidCanvas />

    <Nav class="absolute top-2 z-10">
      <!-- Logo -->
      <p class="font-bold text-2xl">
        Luc<span class="text-[#ff004f] font-extrabold">&lt;/&gt;</span>
      </p>

      <!-- Hamburger (mobile only) -->
      <button type="button" class="md:hidden w-10 h-10 flex items-center justify-center focus:outline-none"
        @click="toggleMenu">
        <i :class="isMenuOpen ? 'pi pi-times' : 'pi pi-bars'"
          class="text-[#ff004f] text-2xl transition-all duration-300"></i>
      </button>

      <!-- Nav links -->
      <div :class="isMenuOpen ? 'flex' : 'hidden md:flex'" class="absolute md:static top-[72px] left-4 right-4 md:top-auto md:left-auto md:right-auto
               flex-col md:flex-row
               bg-black/90 md:bg-transparent
               backdrop-blur-xl md:backdrop-blur-none
               border border-[#ff004f] md:border-none
               rounded-2xl md:rounded-none
               px-6 py-5 md:p-0
               gap-5 md:gap-6
               z-50 tracking-widest">
        <li v-for="(label, idx) in ['Home', 'About', 'Services', 'Projects', 'Contact']" :key="idx"
          @click="scrollToSection(String(idx))"
          :class="value === String(idx) ? 'text-[#ff004f] font-extrabold' : 'text-white dark:text-gray-100 md:text-black'"
          class="cursor-pointer list-none text-base transition-colors duration-300 hover:text-[#ff004f]">
          {{ label }}
        </li>
      </div>
    </Nav>

    <!-- Hero -->
    <header class="relative z-10 px-4 md:px-12 lg:px-25 xl:px-32 2xl:px-48 lg:py-8 overflow-hidden" ref="homeSection">
      <div
        class="min-h-screen max-w-screen-2xl mx-auto flex flex-col-reverse lg:flex-row justify-center lg:justify-between items-center gap-10 lg:gap-0">

        <div class="w-full text-center lg:text-left flex flex-col items-center lg:items-start">
          <p class="text-2xl font-semibold tracking-widest mt-1 dark:text-gray-400">
            Hi, I am <span class="font-bold text-[#ff004f]">Luc</span>
          </p>
          <h1
            class="my-1 lg:my-3 text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-widest leading-none text-gray-900 dark:text-gray-100">
            Full Stack <br class="hidden lg:block"> Developer
          </h1>
          <p class="text-sm lg:text-base text-gray-600 dark:text-gray-400 my-3 lg:my-4 max-w-md">
            Architecting modern websites and dynamic web applications with passion and precision.
          </p>
          <Btn href="/CV_Randriamiharisoa_Jean_Luc.pdf" download="CV_Randriamiharisoa_Jean_Luc.pdf">
            <i class="pi pi-download mr-2"></i> Download Resume
          </Btn>
        </div>

        <div class="w-full flex justify-center items-center lg:justify-end">
          <Ripple />
        </div>

      </div>
    </header>

    <!-- About -->
    <section class="px-1 md:px-5 xl:px-16 2xl:px-32 pt-20" ref="aboutSection">
      <Title>About Me</Title>
      <div class="flex flex-col md:flex-row px-3 md:px-7 py-10 gap-4 items-stretch">
        <div
          class="w-full md:w-[40%] lg:w-[30%] bg-black/10 backdrop-blur-md rounded-2xl overflow-hidden min-h-[300px] md:min-h-0 self-stretch">
          <img src="/src/assets/2.png" alt="" class="w-full h-full object-cover object-top">
        </div>
        <div class="flex-1 bg-black/10 backdrop-blur-md rounded-2xl tracking-tight p-4 sm:p-8">
          <div class="mb-1 font-bold text-2xl text-gray-900 dark:text-gray-100">
            Hi, My name is Randriamiharisoa Jean Luc.
          </div>
          <div class="mb-1 text-gray-500 dark:text-gray-300">
            "A Developer passionate about building meaningful digital experiences. With a focus on clean code,
            thoughtful design, and scalable solutions, I help turn ideas into products that people love to use.
          </div>
          <div class="text-gray-500 dark:text-gray-300">
            I specialize in Web Development, cross-platform applications, and UI/UX design, blending creativity with
            technical expertise to deliver work that's both functional and visually compelling."
          </div>
          <Tabs />
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="px-1 md:px-5 xl:px-16 2xl:px-32 pt-20" ref="servicesSection">
      <Title>My Services</Title>
      <Service />
    </section>

    <!-- Projects -->
    <section class="px-1 md:px-5 xl:px-16 2xl:px-32 pt-20" ref="projectsSection">
      <Title>My Projects</Title>
      <div class="px-3 md:px-7 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 [&>*]:min-w-0">
        <Project :limit="3" />
      </div>
      <div class="text-center">
        <Btn href="/all-projects.html">View More</Btn>
      </div>
    </section>

    <!-- Contact -->
    <section class="px-1 md:px-5 xl:px-16 2xl:px-32 pt-20" ref="contactSection">
      <Title>Contact Me</Title>
      <div class="px-3 md:px-7 py-10 flex flex-col md:flex-row gap-4">

        <div class="bg-black/10 backdrop-blur-md rounded-2xl flex-1 p-4 sm:p-8">
          <h2 class="text-xl lg:text-2xl font-bold text-gray-500 mb-2">Have a project?</h2>
          <h1 class="text-6xl lg:text-8xl font-black tracking-tight text-gray-900 dark:text-gray-100 mb-7 lg:mb-8">
            Let's <span class="text-[#ff004f]">talk</span>
          </h1>

          <div class="space-y-3 mb-7 lg:mb-10">
            <div class="flex gap-5 items-center group duration-500">
              <div
                class="w-12 h-12 rounded-full bg-[#ff004f]/10 flex items-center justify-center transition-colors duration-500 group-hover:bg-[#ff004f]">
                <i class="pi pi-envelope text-xl text-[#ff004f] group-hover:text-white duration-500"></i>
              </div>
              <p class="text-xl font-medium text-gray-700 dark:text-gray-400">Lucharisoaa@gmail.com</p>
            </div>
            <div class="flex gap-5 items-center group duration-500">
              <div
                class="w-12 h-12 rounded-full bg-[#ff004f]/10 flex items-center justify-center transition-colors duration-500 group-hover:bg-[#ff004f]">
                <i class="pi pi-phone text-xl text-[#ff004f] group-hover:text-white duration-500"></i>
              </div>
              <p class="text-xl font-medium text-gray-700 dark:text-gray-400">+261 34 15 970 15</p>
            </div>
          </div>

          <Social />
        </div>

        <div class="bg-black/10 backdrop-blur-md rounded-2xl md:w-1/2 lg:w-[45%] p-4 sm:p-8">
          <Input />
        </div>

      </div>
    </section>

    <footer class="bg-black/10 backdrop-blur-md h-20 flex items-center justify-center text-gray-500">
      <p>Copyright © Luc. All rights reserved.</p>
    </footer>

  </main>
  <div class="fixed bottom-8 right-8 z-[1000]">
    <Toast />
  </div>
</template>

<style scoped>

</style>