<template>
  <div
    class="min-h-screen bg-gradient-to-r from-[#551F91] from-0% to-[#3B1C7A] to-100%"
  >
    <div
      class="m-auto flex min-h-screen max-w-[1400px] flex-row justify-center align-middle text-white"
    >
      <section class="m-auto hidden flex-1 flex-col md:flex">
        <h1 class="mb-10 text-center text-6xl">Subscriptions tracker</h1>
        <h2 class="text-center text-2xl">
          Gardez le contrôle de vos dépenses récurrentes en un clin d'œil
        </h2>
      </section>

      <main class="border-1 h-100 flex flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>
