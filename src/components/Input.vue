<script setup lang="ts">
import { ref } from 'vue';
import emailjs from '@emailjs/browser';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import Btn from './Btn.vue';

const toast = useToast();
const isSending = ref(false);
const contactForm = ref<HTMLFormElement | null>(null);

// Reactive state linked to the fields
const fromName = ref('');
const replyTo = ref('');
const message = ref('');

const sendEmail = () => {
    if (!contactForm.value) return;

    // 1. Cleanly check if fields are empty
    if (!fromName.value.trim() || !replyTo.value.trim() || !message.value.trim()) {
        toast.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: 'Please fill out all fields before sending.', 
            life: 3000 
        });
        return;
    }

    // 2. Validate email structure formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(replyTo.value.trim())) {
        toast.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: 'Please provide a valid email address.', 
            life: 3000 
        });
        return;
    }

    isSending.value = true;

    const serviceID = 'service_66bq22q';
    const templateID = 'template_tri6reu'; 
    const publicKey = '5iDoxsjTF-lm6EZkL';

    emailjs.sendForm(serviceID, templateID, contactForm.value, publicKey)
        .then(() => {
            toast.add({ 
                severity: 'success', 
                summary: 'Success', 
                detail: 'Message sent to Luc!', 
                life: 3000 
            });
            
            // Clean out text values on completion
            fromName.value = '';
            replyTo.value = '';
            message.value = '';
            contactForm.value?.reset();
        })
        .catch((err) => {
            toast.add({ 
                severity: 'error', 
                summary: 'Error', 
                detail: 'Could not send email.', 
                life: 3000 
            });
            console.error(err);
        })
        .finally(() => {
            isSending.value = false;
        });
};
</script>

<template>
    <Toast />

    <form ref="contactForm" @submit.prevent="sendEmail">
        <h1 class="text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-2">Make an Appointment</h1>
        <p class="mb-5 text-gray-500 xl:text-lg">Feel free to contact with us, we don't spam your email</p>
        <input type="hidden" name="time" value="">
        
        <div>
            <input 
                v-model="fromName"
                type="text" 
                name="from_name" 
                placeholder="Your name"
                class="outline-none border border-gray-500 dark:border-gray-700 focus:border-[#ff004f] rounded-xl py-2 xl:py-3 px-4 xl:text-lg w-full mb-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-600 transition-all duration-300"
            >
        </div>
        
        <div>
            <input 
                v-model="replyTo"
                type="text" 
                name="reply_to" 
                placeholder="Your email"
                class="outline-none border border-gray-500 dark:border-gray-700 focus:border-[#ff004f] rounded-xl py-2 xl:py-3 px-4 xl:text-lg w-full mb-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-600 transition-all duration-300"
            >
        </div>
        
        <div>
            <textarea 
                v-model="message"
                name="message" 
                rows="6" 
                placeholder="Your comment"
                class="outline-none border border-gray-500 dark:border-gray-700 focus:border-[#ff004f] rounded-xl py-2 xl:py-3 px-4 xl:text-lg w-full mb-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-600 transition-all duration-300"
            ></textarea>
        </div>
        
        <div>
            <Btn :disabled="isSending">
                <i :class="isSending ? 'pi pi-spin pi-spinner' : 'pi pi-send'"></i>
                {{ isSending ? 'Sending...' : 'Send Message' }}
            </Btn>
        </div>
    </form>
</template>