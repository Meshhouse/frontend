<template>
  <div
    class="accordion"
    :class="{ 'accordion--active': active }"
  >
    <header
      class="accordion__header"
      @click="activate"
    >
      <slot name="header" />
      <aside class="header-badge">
        <span
          v-if="counter && counter > 0"
          class="badge"
        >
          {{ counter }}
        </span>
        <span
          v-if="selected"
          class="badge badge--selected"
        />
        <font-awesome-icon
          class="caret"
          icon="caret-down"
        />
      </aside>
    </header>
    <main class="accordion__body">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" src="./Accordion.ts" />

<style lang="sass">
@import 'Accordion'
</style>
