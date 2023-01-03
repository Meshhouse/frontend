<template>
  <div>
    <div
      v-if="$isLogged()"
      class="user-box__profile"
    >
      <div class="profile-avatar">
        <div class="avatar">
          <font-awesome-icon
            v-if="!$isLogged()"
            class="dropdown__prepend-icon"
            icon="user"
          />
          <span v-else>
            {{ user.name[0].toUpperCase() }}
          </span>
        </div>
      </div>
      <div class="profile-info">
        <b class="info-name">
          {{ user.name }}
        </b>
        <span class="info-role">
          {{ $t(`roles.${user.role}`) }}
        </span>
      </div>
    </div>
    <div
      v-if="$isLogged() && user.role === 'supporter' && Array.isArray(user.subscriptions) && user.subscriptions.length > 0"
      class="user-box__subscriptions"
    >
      <a
        v-for="(sub) in user.subscriptions"
        :key="sub.id"
        class="subscription"
        :class="`subscription--${sub.service.toLowerCase()}`"
        :href="sub.service.toLowerCase() === 'patreon' ? 'https://patreon.com/meshhouse' : 'https://boosty.to/meshhouse'"
        target="_blank"
      >
        <div class="subscription-logo">
          <font-awesome-icon
            v-if="sub.service.toLowerCase() === 'patreon'"
            :icon="['fab', 'patreon']"
          />
          <img
            v-else
            class="svg-inline--fa"
            src="/icons/brands/boosty_white.svg"
          >
        </div>
        <div class="subscription-info">
          <b class="title">
            {{ sub.name }}
          </b>
          <span class="price">
            {{ sub.price }} {{ sub.currency.toUpperCase() }}
          </span>
        </div>
      </a>
    </div>
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
    <footer class="user-box__actions">
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
        {{ $t('form.registerTitle') }}
      </a>
    </footer>
    <language-selector v-if="!compact" />
    <theme-selector v-if="!compact" />
  </div>
</template>

<script lang="ts" src="./UserBoxContent.ts" />
