<template>
  <div
    class="flex h-[100dvh] bg-gradient-to-r from-[#551F91] from-0% to-[#3B1C7A] to-100% px-4 py-8 align-top md:px-0"
  >
    <div class="m-auto flex flex-col justify-center align-middle text-white">
      <section class="mb-1 flex-col text-base sm:mb-0 sm:text-lg md:flex">
        <h1 class="mb-1 text-center text-lg sm:mb-10 sm:text-6xl">
          Subscriptions tracker
        </h1>
        <h2 class="mb-5 text-center text-xs sm:mb-10 sm:text-sm">
          Gardez le contrôle de vos abonnements en un clin d'œil
        </h2>
      </section>
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>
