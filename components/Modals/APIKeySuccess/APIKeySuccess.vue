<template>
  <main class="modal">
    <div class="modal__content">
      <header class="content__header">
        <h1>{{ $t('modals.APIKeySuccess.title') }}</h1>
        <button
          class="overlay-close"
          @click="$emit('close')"
        >
          <font-awesome-icon icon="times" />
        </button>
      </header>
      <article class="content">
        <form class="content__form">
          <p>{{ $t('modals.APIKeySuccess.text') }}</p>
          <b style="font-size: 1.5rem; word-break: break-all">{{ token }}</b>
          <p>{{ $t('modals.APIKeySuccess.text_continue') }}</p>
        </form>
      </article>
    </div>
  </main>
</template>

<i18n>
{
  "en": {
    "modals": {
      "APIKeySuccess": {
        "title": "API key",
        "text": "Key created successful, your token:",
        "text_continue": "This token would be shown once"
      }
    }
  },
  "ru": {
    "modals": {
      "APIKeySuccess": {
        "title": "API ключ",
        "text": "Ключ успешно создан, ваш токен:",
        "text_continue": "Данный токен будет виден только один раз"
      }
    }
  }
}
</i18n>

<script lang="ts" src="./APIKeySuccess.ts" />

<style lang="sass">
@import "APIKeySuccess"
</style>
