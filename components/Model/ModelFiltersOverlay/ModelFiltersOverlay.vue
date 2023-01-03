<template>
  <div class="models-header__filters">
    <v-select
      v-model="sortingVal"
      :items="sortingItems"
      icon="sort-alpha-down"
    />
    <v-button
      color="primary"
      @click="visible = true"
    >
      <span>{{ $t('common.filters') }}</span>
      <font-awesome-icon icon="filter" style="min-width: 0.875rem; flex: 0 0 0.875rem" />
    </v-button>
    <overlay
      :visible="visible"
      @close="visible = false"
    >
      <modal-basic
        size="full-page"
        :title="$t('common.filters')"
        @close="visible = false"
      >
        <model-filters
          v-model="selectedFilters"
          :category-filters="categoryFilters"
          :loading="loading"
          @submit="onSubmit"
        />
      </modal-basic>
    </overlay>
  </div>
</template>

<script lang="ts" src="./ModelFiltersOverlay.ts" />
