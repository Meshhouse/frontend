<template>
  <div class="model-specifications">
    <div
      v-for="specification in specificationList"
      :key="specification.slug"
      class="specification"
    >
      <b class="specification__title">
        {{ $t(`specifications.${specification.slug}`) }}
      </b>
      <span class="specification__value">
        <template
          v-if="!specification.with_icon || (specification.with_icon && !specification.as_boolean)"
        >
          {{ specification.value }}
        </template>
        <font-awesome-icon
          v-if="specification.with_icon && specification.as_boolean"
          :icon="specification.value ? 'check' : 'times'"
          :class="specification.value ? 'icon--success': 'icon--danger'"
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts" src="./ModelSpecifications.ts" />

<style lang="sass">
@import 'ModelSpecifications'
</style>
