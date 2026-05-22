<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; 

const socialLinks = ref([]);

onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "socials"));
    const links = [];
    
    querySnapshot.forEach((doc) => {
      links.push({
        icon: doc.id,         
        url: doc.data().url   
      });
    });
    
    socialLinks.value = links;
  } catch (error) {
    console.error("Error fetching social media links from Firestore:", error);
  }
});
</script>

<template>
  <div class="flex gap-4">
    <a 
      v-for="social in socialLinks" 
      :key="social.icon"
      :href="social.url"
      target="_blank" 
      rel="noopener noreferrer"
      class="w-12 h-12 rounded-full bg-[#ff004f]/10 flex items-center justify-center transition-colors duration-500 hover:bg-[#ff004f] group"
    >
      <i :class="`pi pi-${social.icon} text-xl text-[#ff004f] group-hover:text-white duration-500`"></i>
    </a>
  </div>
</template>