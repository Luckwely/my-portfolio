<script setup>
import { ref, onMounted } from 'vue';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Timeline from 'primevue/timeline';
import Card from 'primevue/card';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

// const tabs = ref([
//     { 
//         title: 'Skills', 
//         value: '0', 
//         content: [
//             { 
//                 status: 'Frontend Stack', 
//                 skills: 'Vue.js, JavaScript, Tailwind CSS, PrimeVue, Sass, HTML/CSS',
//                 icon: 'pi pi-desktop', 
//                 color: '#ff004f', 
//                 description: 'Developing interactive, responsive interfaces using modern frameworks and advanced CSS architectures.'
//             },
//             { 
//                 status: 'Backend & Infrastructure', 
//                 skills: 'Laravel, PHP, MVC Architecture, REST APIs',
//                 icon: 'pi pi-server', 
//                 color: '#ff004f',  
//                 description: 'Building secure, scalable server-side applications following the MVC architectural pattern.'
//             },
//             { 
//                 status: 'Database Management', 
//                 skills: 'MySql',
//                 icon: 'pi pi-database', 
//                 color: '#ff004f', 
//                 description: 'Designing optimized relational schemas and managing efficient data migrations.'
//             },
//         ] 
//     },
//     { 
//         title: 'Experience', 
//         value: '1', 
//         content: [
//             { 
//                 status: 'Senior Customer Service Representative at ADM Value', 
//                 date: '2022 - Present', 
//                 icon: 'pi pi-briefcase', 
//                 color: '#FF9800',
//                 description: 'Handling high-level customer claims, complex dispute resolution, and fraudulent activity investigations.'
//             },
//             { 
//                 status: 'Study Project', 
//                 date: '2025 - Present', 
//                 icon: 'pi pi-code', 
//                 color: '#FF9800',
//                 description: 'Designing and deploying full-stack personal projects to master the Laravel + Vue ecosystem.'
//             }
//         ] 
//     },
//     { 
//         title: 'Training', 
//         value: '2', 
//         content: [
//             { 
//                 status: 'L2 Computer Science at CNTEMAD', 
//                 date: '2025 - Ongoing', 
//                 icon: 'pi pi-graduation-cap', 
//                 color: '#ff004f',
//                 description: 'Academic studies focusing on software engineering, algorithmic logic, and system architecture.'
//             },
//             { 
//                 status: 'Full-Stack Web Development | Hopes Formation', 
//                 date: '2025 - In Progress', 
//                 icon: 'pi pi-book', 
//                 color: '#ff004f',
//                 description: 'Intensive professional training covering modern web development technologies and best practices.'
//             },
//             { 
//                 status: 'Professional English Proficiency', 
//                 date: '2021', 
//                 icon: 'pi pi-language', 
//                 color: '#ff004f',
//                 description: 'Enhancing technical and business communication skills to a B2 level for international collaboration.'
//             },
//         ] 
//     }
// ]);

const tabs = ref([]);

const tabOrder = { 'skills': 0, 'experience': 1, 'training': 2 };

onMounted(async () => {
  try {
    const tabsCollectionRef = collection(db, "about_tabs");
    const querySnapshot = await getDocs(tabsCollectionRef);
    
    const loadedTabs = [];
    
    querySnapshot.forEach((doc) => {
      const docId = doc.id; 
      
      const cleanTitle = docId.charAt(0).toUpperCase() + docId.slice(1);
      
      const orderValue = tabOrder[docId] !== undefined ? tabOrder[docId].toString() : '99';

      loadedTabs.push({
        id: docId,
        title: cleanTitle,     
        value: orderValue,    
        ...doc.data()         
      });
    });
    
    loadedTabs.sort((a, b) => parseInt(a.value) - parseInt(b.value));
    
    tabs.value = loadedTabs;
  } catch (error) {
    console.error("Error fetching portfolio tabs from Firestore:", error);
  }
});
</script>

<template>
  <div class="card mt-4 bg-transparent">
    <Tabs value="0" class="bg-transparent">
      <TabList class="bg-transparent flex gap-6 border-b border-gray-200">
        <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value" class="bg-transparent px-4 py-2 transition-all duration-300">
          {{ tab.title }}
        </Tab>
      </TabList>

      <TabPanels class="bg-transparent w-full">
        <TabPanel v-for="tab in tabs" :key="tab.value" :value="tab.value" class="w-full">
          <div class="mt-4 w-full flex justify-start">
            <Timeline :value="tab.content" class="w-full customized-timeline">
              
              <template #marker="slotProps">
                <span class="flex w-10 h-10 items-center justify-center text-white rounded-full z-10 shadow-md transition-transform hover:scale-110" 
                      style="background-color: #ff004f">
                  <i :class="slotProps.item.icon"></i>
                </span>
              </template>

              <template #content="slotProps">
                <div class="mb-5 ml-6">
                  <h3 class="text-xl font-bold text-gray-800 leading-tight">
                    {{ slotProps.item.status }}
                  </h3>
                  
                  <p v-if="slotProps.item.date" class="text-sm font-bold mt-1 text-gray-500 font-normal">
                    {{ slotProps.item.date }}
                  </p>

                  <div v-if="slotProps.item.skills" class="flex flex-wrap gap-2 mt-3">
                    <span v-for="skill in slotProps.item.skills.split(', ')" :key="skill"
                          class="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded border border-gray-200">
                      {{ skill }}
                    </span>
                  </div>

                </div>
              </template>
            </Timeline>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<style scoped>

/* Remove the focus/active green border (outline) */
:deep(.p-tabpanel), 
:deep(.p-tabList), 
:deep(.p-tabpanel-content),
:deep(.card),
:deep(.p-tabs) {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
}

/* timeline content starts from the left edge */
:deep(.p-timeline-event-opposite) {
    display: none; 
}

:deep(.p-timeline-event-content) {
    padding-left: 1rem;
    text-align: left;
}

/* Force the line to stay on the left */
:deep(.p-timeline-event) {
    flex-direction: row !important;
}

/* Force the container to be transparent */
:deep(.p-tabs), 
:deep(.p-tablist), 
:deep(.p-tabpanel),
:deep(.p-tabpanels) {
    background: transparent !important;
    border: none !important;
}

/* The "Active" */
:deep(.p-tab-active) {
    color: #ff004f !important;
    border-bottom: 2px solid #ff004f !important;
    background: transparent !important;
}

/* Hover effect */
:deep(.p-tab:not(.p-tab-active):hover) {
    color: #ff004f;
    opacity: 0.7;
}

/* ilay tsipika */
:deep(.p-timeline-event-connector) {
    background-color: #ff004f;
    width: 3px;
}

/*TabList doesnt have a hidden overflow */
:deep(.p-tablist-content) {
    background: transparent !important;
}

/* Style for each Tab */
:deep(.p-tab) {
    font-weight: 600;
    color: #4b5563; 
    border-bottom: 2px solid transparent; 
}
</style>


