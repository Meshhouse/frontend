<template>
  <div class="pagination">
    <nuxt-link
      class="button button--primary button--icon"
      :to="generateLink(1)"
      :disabled="activePage === 1"
    >
      <font-awesome-icon icon="angle-double-left" />
    </nuxt-link>
    <nuxt-link
      class="button button--primary button--icon"
      :to="generateLink((activePage - 1))"
      :disabled="activePage === 1"
    >
      <font-awesome-icon icon="angle-left" />
    </nuxt-link>
    <nuxt-link
      v-for="idx in paginatorPages"
      :key="idx"
      :to="generateLink(idx)"
      class="button button--primary"
      :disabled="activePage === idx"
    >
      {{ idx }}
    </nuxt-link>
    <nuxt-link
      class="button button--primary button--icon"
      :to="generateLink((activePage + 1) < pagination.pages ? (activePage + 1) : pagination.pages)"
      :disabled="activePage === pagination.pages"
    >
      <font-awesome-icon icon="angle-right" />
    </nuxt-link>
    <nuxt-link
      class="button button--primary button--icon"
      :to="generateLink(pagination.pages)"
      :disabled="activePage === pagination.pages"
    >
      <font-awesome-icon icon="angle-double-right" />
    </nuxt-link>
  </div>
</template>

<script lang="ts" src="./Pagination.ts" />

<style lang="sass">
@import 'Pagination'
</style>
