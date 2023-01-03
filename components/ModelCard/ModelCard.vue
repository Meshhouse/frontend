<template>
  <article
    v-if="!row"
    class="model-card model-card--lite"
  >
    <nuxt-link
      class="image__inner"
      :to="localePath(`/models/${item.category}/${item.slug}`)"
    >
      <img
        :src="item.thumbnail"
        :alt="item.title"
        loading="lazy"
      >
    </nuxt-link>
    <div class="model-card__info">
      <p class="title">
        {{ item.title }}
      </p>
      <p class="time">
        <font-awesome-icon icon="calendar-alt" />
        {{ format(new Date(item.created_at), 'dd.MM.yyyy') }}
      </p>
      <div class="tag-group model-card__tags">
        <div
          v-if="item.copyrighted_content"
          class="tag tag--icon tag--warning"
          :title="$t('license.copyright')"
        >
          <font-awesome-icon icon="exclamation" />
        </div>
        <div
          v-if="item.mature_content"
          class="tag tag--icon tag--onlyfans"
          :title="$t('license.matureContent')"
        >
          <font-awesome-icon icon="venus" />
        </div>
      </div>
      <div class="model-card__programs">
        <div
          v-for="(program, idx) in item.available_formats"
          :key="`program-${idx}`"
        >
          <img
            class="icon"
            :src="`/icons/programs/${getProgramIcon(program)}.svg`"
            :title="getProgramIcon(program)"
          >
        </div>
      </div>
    </div>
    <!--
    <div class="model-card__actions">
      <v-button
        color="primary"
        icon
        size="lg"
        :active="isInFavorite"
        @click="$store.dispatch('changeFavorite', item.id)"
      >
        <font-awesome-icon icon="heart" />
      </v-button>
    </div>-->
  </article>
  <nuxt-link
    v-else
    class="model-card model-card--row"
    :to="localePath(`/models/${item.category}/${item.slug}`)"
  >
    <div class="image__inner">
      <img
        :src="item.thumbnail"
        :alt="item.title"
        loading="lazy"
      >
    </div>
    <div class="model-card__info">
      <p class="title">
        {{ item.title }}
      </p>
      <p class="time">
        <font-awesome-icon icon="calendar-alt" />
        {{ format(new Date(item.created_at), 'dd.MM.yyyy') }}
      </p>
      <div class="model-card__programs">
        <div
          v-for="(program, idx) in item.available_formats"
          :key="`program-${idx}`"
        >
          <img
            class="icon"
            :src="`/icons/programs/${getProgramIcon(program)}.svg`"
            :title="getProgramIcon(program)"
          >
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts" src="./ModelCard.ts" />

<style lang="sass">
@import 'ModelCard'
</style>
