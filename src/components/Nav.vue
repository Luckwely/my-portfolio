<template>
    <nav class="w-[calc(100%-2rem)] xl:w-[calc(100%-6rem)] 2xl:w-[calc(100%-10rem)] max-w-screen-2xl 
                m-auto h-14 lg:h-15 xl:h-16
                fixed top-4 lg:top-5 left-1/2 -translate-x-1/2 z-[1000] cursor-pointer 
                bg-black/10 backdrop-blur-md rounded-full border-3 border-[#ff004f] 
                flex justify-between items-center px-5 lg:px-10 xl:px-14">
      <slot />
    </nav>
</template>