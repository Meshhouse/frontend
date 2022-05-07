<template>
  <main class="modal">
    <div class="modal__content modal__content--center">
      <header class="content__header">
        <h1>{{ $t('modals.APIKeyCreate.title') }}</h1>
        <button
          class="overlay-close"
          @click="$emit('close')"
        >
          <font-awesome-icon icon="times" />
        </button>
      </header>
      <article class="content">
        <form class="content__form">
          <div class="form-field form-field--input">
            <label for="name">{{ $t('form.tokenName') }}</label>
            <input
              id="name"
              v-model="$v.name.$model"
              class="input"
              :class="{ 'input--error': $v.name.$error }"
              type="text"
              required
            >
            <small
              v-if="$v.name.$error && !$v.name.required"
              class="form-field__error"
            >
              {{ $t('validations.required', { '_field_': $t('form.tokenName') }) }}
            </small>
          </div>
          <button
            class="button button--primary"
            @click.prevent="submit"
          >
            {{ $t('form.create') }}
          </button>
        </form>
      </article>
    </div>
  </main>
</template>

<i18n>
{
  "en": {
    "modals": {
      "APIKeyCreate": {
        "title": "Create new key"
      }
    }
  },
  "ru": {
    "modals": {
      "APIKeyCreate": {
        "title": "Создать новый ключ"
      }
    }
  }
}
</i18n>

<script lang="ts" src="./APIKeyCreate.ts" />

<style lang="sass">
@import "APIKeyCreate"
</style>
