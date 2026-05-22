<script setup>
    defineProps({
    href: {
        type: String,
        default: null
    }
    });
    </script>

    <style scoped>
    /* Optional: ensures no default underline styling appears if it renders as an anchor link */
    a {
    text-decoration: none;
    }
</style>
<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    class="py-2 px-6 bg-[#ff004f] rounded-full tracking-wide duration-[0.5s] text-white font-semibold cursor-pointer tracking-tight hover:text-[#ff004f] hover:bg-transparent border-2 border-[#ff004f] inline-flex items-center justify-center decoration-none"
  >
    <slot />
  </component>
</template>