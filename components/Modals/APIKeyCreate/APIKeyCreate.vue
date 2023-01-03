<template>
  <modal-basic
    :title="$t('modals.apiKeyCreate.title')"
    content-align="center"
    @close="$emit('close')"
  >
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
  </modal-basic>
</template>

<script lang="ts" src="./APIKeyCreate.ts" />

<style lang="sass">
@import "APIKeyCreate"
</style>
