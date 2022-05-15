<template>
  <div class="model-specifications">
    <div
      v-for="specification in specificationList"
      :key="specification.key"
      class="specification"
    >
      <b class="specification__title">
        {{ specification.title }}
      </b>
      <span class="specification__value">
        {{ specification.value }}
      </span>
      <span
        v-if="specification.color !== ''"
        :style="`--specification-color: #${specification.color}`"
        :title="`#${specification.color}`"
        class="specification__color"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./ModelCustomSpecifications.ts" />

<style lang="sass">
@import 'ModelSpecifications'
</style>
