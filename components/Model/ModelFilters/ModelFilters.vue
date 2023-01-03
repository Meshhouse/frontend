<template>
  <aside class="models-filters">
    <accordion
      v-for="categoryFilter in categoryFilters"
      :key="categoryFilter.key"
      class="mb-2"
      :selected="checkSelectedAccordion(categoryFilter, selectedFilters[categoryFilter.key])"
    >
      <template slot="header">
        {{ categoryFilter.title }}
      </template>
      <template v-if="categoryFilter.type === 'radio'">
        <radio-button
          v-for="filterValue in categoryFilter.values"
          :key="filterValue.value"
          v-model="selectedFilters[categoryFilter.key]"
          :value="filterValue.value"
        >
          {{ filterValue.title }}
        </radio-button>
      </template>
      <template v-if="categoryFilter.type === 'checkbox'">
        <checkbox
          v-for="filterValue in categoryFilter.values"
          :key="filterValue.value"
          v-model="selectedFilters[categoryFilter.key]"
          :value="filterValue.value"
        >
          {{ filterValue.title }}
        </checkbox>
      </template>
      <template v-if="categoryFilter.type === 'checkbox-color'">
        <checkbox
          v-for="filterValue in categoryFilter.values"
          :key="filterValue.value"
          v-model="selectedFilters[categoryFilter.key]"
          :value="filterValue.value"
          :color="filterValue.color"
        >
          {{ filterValue.title }}
        </checkbox>
      </template>
      <template v-if="categoryFilter.type === 'range'">
        <range-input
          v-model="selectedFilters[categoryFilter.key]"
          :ranges="categoryFilter.values[0]"
        />
      </template>
    </accordion>
    <v-button
      color="primary"
      :disabled="loading"
      @click="$emit('submit')"
    >
      {{ $t('common.submit') }}
    </v-button>
  </aside>
</template>

<script lang="ts" src="./ModelFilters.ts" />
