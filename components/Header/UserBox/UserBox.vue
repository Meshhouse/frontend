<template>
  <v-dropdown-button
    color="secondary"
    icon-only
    no-caret
  >
    <font-awesome-icon
      v-if="!$isLogged()"
      class="dropdown__prepend-icon"
      icon="user"
    />
    <span v-else>
      {{ user.name[0].toUpperCase() }}
    </span>
    <template slot="content">
      <language-selector />
      <theme-selector />
      <a
        v-if="!$isLogged()"
        href="#"
        class="dropdown__item"
        @click.prevent="$emit('open-login')"
      >
        {{ $t('form.login') }}
      </a>
      <a
        v-if="!$isLogged()"
        href="#"
        class="dropdown__item"
        @click.prevent="$emit('open-register')"
      >
        {{ $t('form.register') }}
      </a>
      <nuxt-link
        v-if="$isLogged()"
        :to="localePath('/account/profile')"
        class="dropdown__item"
      >
        {{ $t('form.profile') }}
      </nuxt-link>
      <a
        v-if="$isLogged()"
        href="#"
        class="dropdown__item"
        @click.prevent="logout"
      >
        {{ $t('form.logout') }}
      </a>
    </template>
  </v-dropdown-button>
</template>

<script lang="ts" src="./UserBox.ts" />
