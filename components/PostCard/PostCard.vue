<template>
  <article
    v-if="!fullItem"
    class="post-card"
  >
    <nuxt-link
      class="image__inner"
      :to="localePath(`/news/${item.slug}`)"
    >
      <img
        :src="item.thumbnail"
        :alt="item.title"
        loading="lazy"
      >
    </nuxt-link>
    <div class="post-card__info">
      <h2 class="display-text display-text--h3">
        <span>{{ item.title }}</span>
      </h2>
      <p class="time">
        <font-awesome-icon icon="calendar-alt" />
        {{ format(new Date(item.created_at), 'dd.MM.yyyy') }}
      </p>
    </div>
    <div
      class="post-card__content"
      v-html="item.excerpt"
    />
    <nuxt-link
      class="button button--primary"
      :to="localePath(`/news/${item.slug}`)"
    >
      {{ $t('common.readMore') }}
    </nuxt-link>
  </article>
  <article
    v-else
    class="post-card post-card--full"
  >
    <img
      class="image__inner"
      :src="item.thumbnail"
      :alt="item.title"
      loading="lazy"
    >
    <div class="post-card__info">
      <h2 class="display-text display-text--h3">
        <span>{{ item.title }}</span>
      </h2>
      <p class="time">
        <font-awesome-icon icon="calendar-alt" />
        {{ format(new Date(item.created_at), 'dd.MM.yyyy') }}
      </p>
    </div>
    <div
      class="post-card__content"
      v-html="item.content"
    />
  </article>
</template>

<script lang="ts" src="./PostCard.ts" />

<style lang="sass">
@import 'PostCard'
</style>
