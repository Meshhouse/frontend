<template>
  <modal-basic
    :title="$t('modals.apiKeySuccess.title')"
    @close="$emit('close')"
  >
    <form class="content__form">
      <p>{{ $t('modals.apiKeySuccess.text') }}</p>
      <b style="font-size: 1.5rem; word-break: break-all">{{ token }}</b>
      <p>{{ $t('modals.apiKeySuccess.note') }}</p>
    </form>
  </modal-basic>
</template>

<script lang="ts" src="./APIKeySuccess.ts" />

<style lang="sass">
@import "APIKeySuccess"
</style>
