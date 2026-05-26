import { ref } from 'vue';
export default function useAccordionData() {

    const items = ref([
        {title:'item1', content:'content 1'},
        {title:'item2', content:'content 2'},
        {title:'item3', content:'content 3'}
    ]);

    return { items };
}