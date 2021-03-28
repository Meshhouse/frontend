<template>
  <article
    v-if="!fullItem"
    class="post-card"
  >
    <nuxt-link
      class="image__outer"
      :to="localePath(`/news/${item.slug}`)"
    >
      <img
        class="image__inner"
        :src="getImageUrl(item.thumbnail)"
        :alt="item[`title_${$i18n.locale}`]"
        loading="lazy"
      >
    </nuxt-link>
    <div class="post-card__info">
      <p class="title">
        {{ item[`title_${$i18n.locale}`] }}
      </p>
      <p class="time">
        <font-awesome-icon icon="calendar-alt" />
        {{ format(new Date(), 'dd.MM.yyyy') }}
      </p>
    </div>
    <div class="post-card__content">
      {{ item[`excerpt_${$i18n.locale}`] }}
    </div>
    <nuxt-link
      class="button button--primary"
      :to="localePath(`/news/${item.slug}`)"
    >
      {{ $t('news.button') }}
    </nuxt-link>
  </article>
  <article
    v-else
    class="post-card post-card--full"
  >
    <div class="image__outer">
      <img
        class="image__inner"
        :src="getImageUrl(item.thumbnail)"
        :alt="item[`title_${$i18n.locale}`]"
        loading="lazy"
      >
    </div>
    <div class="post-card__info">
      <p class="title">
        {{ item[`title_${$i18n.locale}`] }}
      </p>
      <p class="time">
        <font-awesome-icon icon="calendar-alt" />
        {{ format(new Date(), 'dd.MM.yyyy') }}
      </p>
    </div>
    <div
      class="post-card__content"
      v-html="item[`content_${$i18n.locale}`]"
    />
  </article>
</template>

<i18n>
{
  "en": {
    "news": {
      "button": "Read more"
    }
  },
  "ru": {
    "news": {
      "button": "Читать далее"
    }
  }
}
</i18n>

<script lang="ts" src="./PostCard.ts" />

<style lang="sass">
@import 'PostCard'
</style>
