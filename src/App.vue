<script setup>
  import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue';
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
  import { collection, query, orderBy, getDocs, Query } from 'firebase/firestore';
  import { db } from './firebase';
  import AOS from 'aos';
  import 'aos/dist/aos.css';

  const text= "Download Resume";
  const letters = text.split('');

  const isMenuOpen = ref(false);
  const value = ref('0');
  const homeSection = ref(null);
  const aboutSection = ref(null);
  const servicesSection = ref(null);
  const projectsSection = ref(null);
  const contactSection = ref(null);
  const sections = ref([]);
  const fluidCanvas = ref(null);
  const showProjectsModal = ref(false);
  const allProjects = ref([]);
  const searchQuery = ref("");

  const filteredProjects = computed(() => {
    if(!searchQuery.value) return allProjects.value;
    return allProjects.value.filter(p => p.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
  })

  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
  }

  function openModal() {
    showProjectsModal.value = true;
    document.body.style.overflow = 'hidden';
    nextTick(() => {
      AOS.refresh();
    })
  }

  function closeModal() {
    showProjectsModal.value = false;
    document.body.style.overflow = '';
  }

  onMounted(async() => {

    AOS.init({
      duration: 800,
      once: false,
      offset: 120,
      mirror: true
    });

    if (fluidCanvas.value) {
      webGLFluidEnhanced.simulation(fluidCanvas.value, {
        SIM_RESOLUTION: 128,
        DYE_RESOLUTION: 1024,
        DENSITY_DISSIPATION: 0.998,   
        VELOCITY_DISSIPATION: 0.99,
        PRESSURE: 0.1,
        SPLAT_RADIUS: 0.9,            
        SPLAT_FORCE: 20000,           
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

    console.log("DB:", db);

    try {
      const q= query(collection(db, "projects"),
      orderBy('order', 'asc'));

      const querySnapshot = await getDocs(q);
      allProjects.value = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          num: String(data.order).padStart(2,'0'),
          ...data
        }
      });

      await nextTick();
      AOS.refresh();

    } catch (error) {
      console.error("Error fetching projects:", error);
    }
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
      <p class="font-bold text-2xl logo">
        Luc<span class="text-[#ff004f] font-extrabold">&lt;/&gt;</span>
      </p>

      <!-- Hamburger mobile -->
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
          :class="value === String(idx) ? 'text-[#ff004f] font-extrabold' : 'text-white md:text-black'"
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
          <p data-aos="fade-down" data-aos-delay="100" class="text-xl md:text-2xl lg:text-3xl font-semibold tracking-widest mt-1 ">
            Hi, I am <span class="font-bold text-[#ff004f]">Luc</span>
          </p>
          <h1 data-aos="fade-down" data-aos-delay="200"
            class="my-1 lg:my-3 text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold tracking-widest leading-none text-gray-900 ">
            Full Stack <br class="hidden lg:block"> Developer
          </h1>
          <p data-aos="fade-down" data-aos-delay="300" class="text-base md:text-lg lg:text-xl 2xl:text-2xl text-gray-600  my-3 lg:my-4 max-w-2xl">
            Architecting modern websites and dynamic web applications with passion and precision.
          </p>
          <div class="mt-4">
            <Btn  href="/CV_Randriamiharisoa_Jean_Luc.pdf" download="CV_Randriamiharisoa_Jean_Luc.pdf">
              <i class="pi pi-download mr-2"></i>
              <span v-for="(letter, i) in letters" :key="i" class="letter" :style="{'--delay': i * 0.05 + 's'}">
                  <span class="top">{{ letter }}</span>
                  <span class="bottom">{{ letter }}</span>
              </span>
            </Btn>
          </div>
        </div>

        <div data-aos="fade-down" data-aos-delay="500" class="w-full flex justify-center items-center lg:justify-end">
          <Ripple />
        </div>

      </div>
    </header>

    <!-- About -->
    <section class="px-1 md:px-5 xl:px-16 2xl:px-32 pt-20" ref="aboutSection">
      <Title data-aos="fade-right" data-aos-delay="100">About Me</Title>
      <div class="flex flex-col md:flex-row px-3 md:px-7 py-10 gap-4 items-stretch">
        <div data-aos="fade-right" data-aos-delay="200"
          class="w-full md:w-[40%] lg:w-[30%] bg-black/10 backdrop-blur-md rounded-2xl overflow-hidden min-h-[300px] md:min-h-0 self-stretch">
          <img src="/src/assets/2.png" alt="" class="w-full h-full object-cover object-top">
        </div>
        <div data-aos="fade-right" data-aos-delay="300" class="flex-1 bg-black/10 backdrop-blur-md rounded-2xl tracking-tight p-4 sm:p-8">
          <div class="mb-1 font-bold text-2xl text-gray-900 ">
            Hi, My name is Randriamiharisoa Jean Luc.
          </div>
          <div class="mb-1 text-gray-500 ">
            "A Developer passionate about building meaningful digital experiences. With a focus on clean code,
            thoughtful design, and scalable solutions, I help turn ideas into products that people love to use.
          </div>
          <div class="text-gray-500 0">
            I specialize in Web Development, cross-platform applications, and UI/UX design, blending creativity with
            technical expertise to deliver work that's both functional and visually compelling."
          </div>
          <Tabs />
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="px-1 md:px-5 xl:px-16 2xl:px-32 pt-20" ref="servicesSection">
      <Title data-aos="fade-left" >My Services</Title>
      <Service data-aos="fade-left"  />
    </section>

    <!-- Projects -->
    <section  class="px-1 md:px-5 xl:px-16 2xl:px-32 pt-20" ref="projectsSection">
      <Title data-aos="fade-right" data-aos-delay="100">My Projects</Title>
      <div data-aos="fade-right" data-aos-delay="200" class="px-3 md:px-7 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 [&>*]:min-w-0">
        <Project v-for="p in allProjects.slice(0,3)" :key="p.id" :project="p" />
      </div>
      <div data-aos="fade-right" data-aos-delay="300" class="text-center">
        <Btn @click="openModal">View More</Btn>
      </div>
    </section>

    <!-- Contact -->
    <section  class="px-1 md:px-5 xl:px-16 2xl:px-32 pt-20" ref="contactSection">
      <Title data-aos="fade-left" data-aos-delay="100">Contact Me</Title>
      <div class="px-3 md:px-7 py-10 flex flex-col md:flex-row gap-4">

        <div data-aos="fade-left" data-aos-delay="200" class="bg-black/10 backdrop-blur-md rounded-2xl flex-1 p-4 sm:p-8">
          <h2 class="text-xl lg:text-2xl font-bold text-gray-500 mb-2">Have a project?</h2>
          <h1 class="text-6xl lg:text-8xl font-black tracking-tight text-gray-900  mb-7 lg:mb-8">
            Let's <span class="text-[#ff004f]">talk</span>
          </h1>

          <div class="space-y-3 mb-7 lg:mb-10">
            <div class="flex gap-5 items-center group duration-500">
              <div
                class="w-12 h-12 rounded-full bg-[#ff004f]/10 flex items-center justify-center transition-colors duration-500 group-hover:bg-[#ff004f]">
                <i class="pi pi-envelope text-xl text-[#ff004f] group-hover:text-white duration-500"></i>
              </div>
              <p class="text-xl font-medium text-gray-700 ">Lucharisoaa@gmail.com</p>
            </div>
            <div class="flex gap-5 items-center group duration-500">
              <div
                class="w-12 h-12 rounded-full bg-[#ff004f]/10 flex items-center justify-center transition-colors duration-500 group-hover:bg-[#ff004f]">
                <i class="pi pi-phone text-xl text-[#ff004f] group-hover:text-white duration-500"></i>
              </div>
              <p class="text-xl font-medium text-gray-700 ">+261 34 15 970 15</p>
            </div>
          </div>

          <Social />
        </div>

        <div data-aos="fade-left" data-aos-delay="300" class="bg-black/10 backdrop-blur-md rounded-2xl md:w-1/2 lg:w-[45%] p-4 sm:p-8">
          <Input />
        </div>

      </div>
    </section>

    <footer class="bg-black/10 backdrop-blur-md h-20 flex items-center justify-center text-gray-500">
      <p>Copyright © Luc. All rights reserved.</p>
    </footer>

    <Teleport to='body'>
      <transition name="fade">
        <div v-if="showProjectsModal" class="fixed inset-0 z-[999] bg-white/5 backdrop-blur-md  flex items-center justify-center" @click="closeModal">

          <div class=" bg-white border-2 w-full h-[100dvh] flex flex-col" @click.stop>
            
            <div class="p-3 sm:p-4 flex-shrink-0">
              <div class="flex items-center justify-between mb-2">
                <h2 class="text-2xl font-bold text-black mb-2">All Projects ({{ allProjects.length }})</h2>
                <button @click="closeModal" class="pi pi-times text-[#ff004f] text-4xl"></button>
              </div>
  
              <div class="mb-2 flex-shrink-0 ">
                <input v-model="searchQuery" type="text" placeholder="Search project by title..." class="w-full bg-black/20 border-[#ff004f]/30 rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-[#ff004f]">
              </div>
            </div>

              <div class="flex-1 overflow-y-auto p-4">
                <div v-if="filteredProjects.length === 0" class="text-gray-500 text-center mt-10">No projects found</div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Project
                    v-for="p in filteredProjects"
                    :key="p.id"
                    :project="p"
                  />
                </div>
              </div>

          </div>

        </div>
      </transition>
    </Teleport>

  </main>

  <div class="fixed bottom-8 right-8 z-[1000]">
    <Toast />
  </div>

</template>

<style scoped>
  .logo {
    transform-style: preserve-3d;
    animation: flip 6s ease-in-out infinite;
    color: black;
    text-shadow:
      0 0 0 #120106c8,
      0 0 0 #160007be,
      0 1px 0 #22000a;
  }

  @keyframes flip {
    0% {transform: rotateY(0deg);}
    25% {transform: rotateY(360deg);}
    50% {transform: rotateY(360deg);}
    75% {transform: rotateY(0deg);}
    100% {transform: rotateY(0deg);}
  }

  .rolling-text {
    display: inline-flex;
    height:1em;
    line-height: 1em;
  }

  .letter {
    position: relative;
    display: inline-block;
    width: 0.85em;
    height: 1em;
    overflow: hidden;        
  }

  .letter span {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    display: block;
    animation: rollLoop 3s ease-in-out infinite;
    animation-delay: var(--delay);
  }

  .bottom {
    top: 100%;
  }

  @keyframes rollLoop {
    0% {transform: translateY(0);}
    20% {transform: translateY(0);}
    40% {transform: translateY(-100%);}
    60% {transform: translateY(-100%);}
    80% {transform: translateY(0);}
    100% {transform: translateY(0);}
  }


  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
</style>