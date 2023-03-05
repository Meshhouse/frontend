<template>
  <modal-basic
    size="two-columns"
    :title="$t('form.loginTitle')"
    @close="$emit('close')"
  >
    <template slot="aside">
      <img src="/images/index/auth-img.webp">
    </template>

    <form class="content__form">
      <div class="form-field form-field--input">
        <label for="email">{{ $t('form.email') }}</label>
        <input
          id="email"
          v-model="$v.email.$model"
          class="input"
          :class="{ 'input--error': $v.email.$error }"
          type="email"
          autocomplete="email"
          placeholder="mail@example.com"
          required
        >
        <small
          v-if="$v.email.$error && !$v.email.required"
          class="form-field__error"
        >
          {{ $t('validations.required', { '_field_': $t('form.email') }) }}
        </small>
      </div>
      <div class="form-field form-field--input">
        <label for="password">{{ $t('form.password') }}</label>
        <input
          id="password"
          v-model="$v.password.$model"
          class="input"
          :class="{ 'input--error': $v.password.$error }"
          type="password"
          autocomplete="current-password"
          required
        >
        <small
          v-if="$v.password.$error && !$v.password.required"
          class="form-field__error"
        >
          {{ $t('validations.required', { '_field_': $t('form.password') }) }}
        </small>
      </div>
      <div class="form-field form-field--input">
        <VueHcaptcha
          :sitekey="captchaKey"
          @verify="onVerify"
        />
        <small
          v-if="$v.token.$error && !$v.token.required"
          class="form-field__error"
        >
          {{ $t('validations.required', { '_field_': '' }) }}
        </small>
      </div>
      <button
        class="button button--primary"
        @click.prevent="login"
      >
        {{ $t('form.login') }}
      </button>
    </form>
    <div class="content__actions">
      <a
        href="#"
        @click.prevent="$emit('redirect', 'AuthRegister')"
      >
        {{ $t('form.actions.newUser') }}
      </a>
      <a
        href="#"
        @click.prevent="$emit('redirect', 'AuthResetPassword')"
      >
        {{ $t('form.actions.forgot') }}
      </a>
    </div>
  </modal-basic>
</template>

<script lang="ts" src="./Login.ts" />

<style lang="sass">
@import "Login"
</style>
