<template>
  <article
    v-if="!row"
    class="model-card"
  >
    <nuxt-link
      class="image__outer"
      :to="localePath(`/models/view/${item.slug}`)"
    >
      <img
        class="image__inner"
        :src="getImageUrl(item.thumbnail)"
        :alt="item[`title_${$i18n.locale}`]"
        loading="lazy"
      >
    </nuxt-link>
    <div class="model-card__info">
      <p class="title">
        {{ item[`title_${$i18n.locale}`] }}
      </p>
      <p class="time">
        <font-awesome-icon icon="calendar-alt" />
        {{ format(new Date(), 'dd.MM.yyyy') }}
      </p>
      <div class="model-card__programs">
        <div
          v-for="(program, idx) in getUniquePrograms(item.model_links)"
          :key="`program-${idx}`"
        >
          <img
            class="icon"
            :src="`/icons/programs/${getProgramIcon(program)}.svg`"
            :title="getProgramIcon(program)"
          >
        </div>
      </div>
      <div class="model-card__tags">
        <vue-tag
          v-for="(tag, idx) in item.tags"
          :key="`tag-${idx}`"
          :tag="tag"
        />
      </div>
    </div>
  </article>
  <nuxt-link
    v-else
    class="model-card model-card--row"
    :to="localePath(`/models/view/${item.slug}`)"
  >
    <div class="image__outer">
      <img
        class="image__inner"
        :src="getImageUrl(item.thumbnail)"
        :alt="item[`title_${$i18n.locale}`]"
        loading="lazy"
      >
    </div>
    <div class="model-card__info">
      <p class="title">
        {{ item[`title_${$i18n.locale}`] }}
      </p>
      <p class="time">
        <font-awesome-icon icon="calendar-alt" />
        {{ format(new Date(), 'dd.MM.yyyy') }}
      </p>
      <div class="model-card__programs">
        <div
          v-for="(program, idx) in getUniquePrograms(item.model_links)"
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
