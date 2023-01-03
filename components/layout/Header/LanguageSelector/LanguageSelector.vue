<template>
  <v-dropdown-button
    class="dropdown__item"
    align="right"
  >
    {{ $t('common.language') }}
    <template slot="content">
      <nuxt-link class="dropdown__item" :to="switchLocalePath('en')">
        English
      </nuxt-link>
      <nuxt-link class="dropdown__item" :to="switchLocalePath('ru')">
        Русский
      </nuxt-link>
    </template>
  </v-dropdown-button>
</template>

<script lang="ts" src="./LanguageSelector.ts" />
