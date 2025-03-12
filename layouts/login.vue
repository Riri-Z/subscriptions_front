<template>
  <div class="flex h-[100dvh] bg-primary py-8 align-top md:px-0">
    <BadgeI18n></BadgeI18n>
    <div class="m-auto flex flex-col justify-center align-middle">
      <section class="mb-1 flex-col text-base sm:mb-0 sm:text-lg md:flex">
        <h1 class="mb-1 text-center text-lg text-light sm:mb-10 sm:text-6xl">
          Subscriptions tracker
        </h1>
        <h2 class="mb-5 text-center text-xs text-light sm:mb-10 sm:text-sm">
          {{ $t("landingPage.hook") }}
        </h2>
      </section>
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>
