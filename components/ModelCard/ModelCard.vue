<template>
  <article
    v-if="!row"
    class="model-card model-card--lite"
    :class="hasBlurMatureContent ? 'model-card--mature-content' : null"
    @mouseenter="handleShowPreview"
    @mouseleave="removeTimeout"
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
    <div class="model-card__tags">
      <div
        v-if="item.mature_content"
        class="model-tag model-tag--mature-content"
        :title="$t('license.matureContent')"
      >
        <font-awesome-icon icon="1" />
        <font-awesome-icon icon="8" />
        <font-awesome-icon icon="plus" />
      </div>
      <div
        v-if="item.copyrighted_content"
        class="model-tag model-tag--copyright"
        :title="$t('license.copyright')"
      >
        <font-awesome-icon :icon="['regular', 'copyright']" />
      </div>
    </div>
    <div class="model-card__info">
      <p class="title">
        {{ item.title }}
      </p>
      <p class="time">
        <font-awesome-icon icon="calendar-alt" />
        {{ format(new Date(item.created_at), 'dd.MM.yyyy') }}
      </p>
      <div
        v-if="item.statistics !== undefined"
        class="model-card__statistics"
      >
        <div class="statistic">
          <font-awesome-icon icon="thumbs-up" />
          {{ item.statistics.likes }}
        </div>
        <div class="statistic">
          <font-awesome-icon icon="chart-line" />
          {{ item.statistics.views }}
        </div>
        <div class="statistic">
          <font-awesome-icon icon="cloud-arrow-down" />
          {{ item.statistics.downloads }}
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
    <portal to="overlay">
      <model-card-preview
        v-if="showPreview"
        :item="item"
        :position="position"
      />
    </portal>
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
