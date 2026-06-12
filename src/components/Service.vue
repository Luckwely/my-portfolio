<script setup>
import { ref, onMounted } from 'vue';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// const dataService = ref([
//   {
//     icon: 'pi pi-desktop',
//     num: '01',
//     title: 'Full-Stack Solutions',
//     content: 'Developing end-to-end web applications using the powerful combination of Laravel and Vue.js.',
//   },
//   {
//     icon: 'pi pi-database',
//     num: '02',
//     title: 'Database Architecture',
//     content: 'Designing efficient MySQL structures and managing complex data logic for seamless performance.',
//   },
//   {
//     icon: 'pi pi-window-maximize',
//     num: '03',
//     title: 'Component-Based UI',
//     content: 'Building modular, reusable interfaces with PrimeVue and Tailwind CSS for a consistent experience.',
//   },
// ]);

const dataService = ref([]);
onMounted(async () => {
  try {
    const q = query(collection(db, "services"), orderBy("order", "asc"));

    const querySnapshot = await getDocs(q);
    
    const services = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const formattedNum = String(data.order).padStart(2, '0');
      
      services.push({
        id: doc.id,
        num: formattedNum,
        ...data
      });
    });
    
    dataService.value = services;
  } catch (error) {
    console.error("Error fetching services from Firestore:", error);
  }
});

</script>

<template>
  <div class="px-3 md:px-7 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 [&>*]:min-w-0">
    <div
      v-for="data in dataService"
      :key="data.num"
      class="group relative overflow-hidden rounded-2xl border border-white/10 
             bg-black/10 backdrop-blur-md p-8 cursor-pointer
             transition-all duration-350 hover:-translate-y-1.5 hover:border-[#ff004f]/50
             hover:bg-black/20"
    >
      <span
        class="absolute bottom-0 left-0 h-[3px] w-0 bg-[#ff004f] transition-all duration-400 group-hover:w-full"
      />

      <span
        class="absolute top-2 right-3 select-none text-[80px] font-bold leading-none
               text-white/5 transition-colors duration-350 group-hover:text-[#ff004f]/10"
      >
        {{ data.num }}
      </span>

      <div
        class="mb-4 flex h-11 w-11 items-center justify-center rounded-[10px]
               bg-[#ff004f]/10 transition-all duration-350
               group-hover:rotate-[-4deg] group-hover:scale-110 group-hover:bg-[#ff004f]"
      >
        <i
          :class="`${data.icon} text-xl text-[#ff004f] transition-colors duration-350 group-hover:text-white`"
        />
      </div>

      <h3 class="mb-2 text-base font-medium text-gray-900 ">{{ data.title }}</h3>
      <p class="mb-5 text-sm leading-relaxed text-gray-500">{{ data.content }}</p>

      <div class="flex items-center gap-1.5 text-[13px] text-gray-400 transition-colors duration-350 group-hover:text-[#ff004f]">
        Explore service
        <span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </div>
    </div>
  </div>
</template>