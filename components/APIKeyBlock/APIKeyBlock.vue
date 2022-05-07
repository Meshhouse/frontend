<template>
  <div class="api-block">
    <div class="api-block__title">
      {{ block.name }}
    </div>
    <div class="api-block__date">
      <font-awesome-icon icon="calendar-alt" />
      {{ format(new Date(block.created_at), 'dd.MM.yyyy') }}
    </div>
    <div class="api-block__actions">
      <v-button
        color="danger"
        size="lg"
        :title="$t('form.delete')"
        icon
        @click="$emit('delete', block.id)"
      >
        <font-awesome-icon icon="minus" />
      </v-button>
    </div>
  </div>
</template>

<script lang="ts" src="./APIKeyBlock.ts" />

<style lang="sass">
@import './APIKeyBlock'
</style>
