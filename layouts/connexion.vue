<template>
  <div
    class="min-w-screen flex min-h-screen flex-row items-center justify-center bg-gradient-to-r from-[#572093] from-0% to-[#7d2d98] to-100% text-white"
  >
    <section class="m-9 flex-1">
      <h1 class="mb-10 text-center text-6xl">Subscriptions tracker</h1>
      <h2 class="text-center text-4xl">
        Gardez le contrôle de vos dépenses récurrentes en un clin d'œil
      </h2>
    </section>
    <button></button>

    <main class="border-1 flex-auto bg-dark-button-color">
      <slot />
    </main>
  </div>
</template>
