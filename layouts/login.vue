<template>
  <div class="flex h-[100dvh] bg-primary py-8 align-top md:px-0">
    <div class="m-auto flex flex-col justify-center align-middle text-accent">
      <section class="mb-1 flex-col text-base sm:mb-0 sm:text-lg md:flex">
        <h1 class="mb-1 text-center text-light text-lg sm:mb-10 sm:text-6xl">
          Subscriptions tracker
        </h1>
        <h2 class="mb-5 text-center text-light text-xs sm:mb-10 sm:text-sm">
          Gardez le contrôle de vos abonnements en un clin d'œil
        </h2>
      </section>
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>
