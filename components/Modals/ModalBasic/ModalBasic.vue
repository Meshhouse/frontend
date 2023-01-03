<template>
  <main
    class="modal"
    :class="modalClass"
  >
    <aside
      v-if="size === 'two-columns'"
      class="modal__aside"
    >
      <slot name="aside" />
    </aside>
    <div
      class="modal__content"
      :class="modalContentClass"
    >
      <header class="modal-header">
        <button
          v-if="showBackButton"
          class="overlay-close"
          @click="$emit('back')"
        >
          <font-awesome-icon icon="angle-left" />
        </button>
        <slot name="header">
          <h1 class="modal-header__title">
            {{ title }}
          </h1>
        </slot>
        <button
          class="overlay-close"
          @click="$emit('close')"
        >
          <font-awesome-icon icon="times" />
        </button>
      </header>
      <article
        v-if="!contentless"
        class="content"
      >
        <slot />
      </article>
      <slot v-else />
    </div>
  </main>
</template>

<script lang="ts" src="./ModalBasic.ts" />

<style lang="sass">
@import './ModalBasic'
</style>
