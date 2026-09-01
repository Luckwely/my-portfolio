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

        .stagger-btn {
          display: inline-flex;
          align-items: center;
          padding: 12px 28px;
          background: #ff004f;
          border-radius: 9999px;
          border: 3px solid #ff004f;
          color: white;
          font-size: 16px;
          line-height: 1;
          cursor: pointer;
          transition: all 0.5s;
          text-decoration: none;
          overflow: hidden;
        }

        .stagger-btn:hover {
          background: transparent;
          color: #ff004f;
        }
    </style>
<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    class="stagger-btn"
  >
    <slot />
  </component>
</template>