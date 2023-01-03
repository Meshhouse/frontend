<template>
  <div class="license">
    <header class="license__header">
      <b class="title">{{ license.title }}</b>
      <div class="icons">
        <font-awesome-icon
          v-if="license.copyright_content"
          icon="copyright"
          class="icon-copyright"
          :title="$t('license.copyright')"
        />
        <font-awesome-icon
          v-if="license.access !== 'free'"
          icon="donate"
          class="icon-donate"
          :title="$t('license.donate')"
        />
        <font-awesome-icon
          v-if="license.mature_content"
          icon="venus"
          class="icon-onlyfans"
          :title="$t('license.matureContent')"
        />
      </div>
    </header>
    <p class="license__description">
      {{ license.description }}
    </p>
  </div>
</template>

<script lang="ts" src="./License.ts" />

<style lang="sass">
@import 'License'
</style>
