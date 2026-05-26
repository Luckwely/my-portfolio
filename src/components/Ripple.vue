<template>
  <div class="relative flex items-center justify-center 
               w-[250px] h-[250px] 
               lg:w-[520px] lg:h-[520px] 
               xl:w-[600px] xl:h-[600px]
               2xl:w-[680px] 2xl:h-[680px]">

    <div class="animate-ripple absolute rounded-full bg-[#ff004f] opacity-20 
                w-[80%] h-[80%] 
                lg:w-[310px] lg:h-[310px]
                xl:w-[360px] xl:h-[360px]
                2xl:w-[410px] 2xl:h-[410px]" style="--i: 1; z-index: 2;"></div>
    <div class="animate-ripple absolute rounded-full bg-[#ff004f] opacity-15 
                w-[95%] h-[95%] 
                lg:w-[385px] lg:h-[385px]
                xl:w-[445px] xl:h-[445px]
                2xl:w-[505px] 2xl:h-[505px]" style="--i: 2; z-index: 1;"></div>
    <div class="animate-ripple absolute rounded-full bg-[#ff004f] opacity-10 
                w-[110%] h-[110%] 
                lg:w-[450px] lg:h-[450px]
                xl:w-[520px] xl:h-[520px]
                2xl:w-[590px] 2xl:h-[590px]" style="--i: 3; z-index: 1;"></div>
    <div class="animate-ripple absolute rounded-full bg-[#ff004f] opacity-5 
                w-[125%] h-[125%] 
                lg:w-[520px] lg:h-[520px]
                xl:w-[600px] xl:h-[600px]
                2xl:w-[680px] 2xl:h-[680px]" style="--i: 4; z-index: 0;"></div>

    <div class="animate-photo absolute z-10 
                w-[200px] h-[200px] 
                lg:w-[260px] lg:h-[260px]
                xl:w-[300px] xl:h-[300px]
                2xl:w-[340px] 2xl:h-[340px]
                rounded-full border-4 border-[#ff004f] overflow-hidden shadow-xl">
      <img src="/src/assets/1.png" alt="Profile" class="w-full h-full object-cover object-top" />
    </div>

  </div>
</template>