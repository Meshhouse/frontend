<template>
  <div v-on-clickaway="onInputBlur" class="search-box">
    <font-awesome-icon class="search-box__icon" icon="search" />
    <input
      v-model="search"
      v-debounce:500ms="onInputSubmit"
      class="search-box__input"
      type="text"
      :placeholder="$t('blocks.searchBox.placeholder')"
      @focus="onInputFocus"
      @keypress="onKeypress"
    >
    <div
      class="search-box__results"
      :class="isResultsVisible ? 'is-visible' : ''"
      @click="onInputBlur"
    >
      <model-card
        v-for="model in results"
        :key="model._id"
        :item="model"
        row
      />
      <nuxt-link
        class="result result--link"
        :to="localePath(`/search?q=${search}`)"
      >
        {{ $t('blocks.searchBox.link', { query: search }) }}
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" src="./SearchBox.ts" />

<style lang="sass">
@import 'SearchBox'
</style>
