<template>
  <div
    class="select"
    :class="selectClass"
    tabindex="0"
    @blur="visible = false"
  >
    <span
      class="select__value"
      @click="visible = !visible"
    >
      <font-awesome-icon
        v-if="icon"
        class="select__prepend-icon"
        :icon="icon"
        fixed-width
      />
      {{ selectedValue }}
      <font-awesome-icon
        class="select__caret"
        icon="angle-right"
        fixed-width
      />
    </span>
    <nav class="select__items">
      <li
        v-for="(item, idx) in items"
        :key="idx"
        class="item"
        :class="item.value === value ? 'item--active' : ''"
        @click="onClick(item)"
      >
        {{ item.text }}
      </li>
    </nav>
  </div>
</template>

<script lang="ts" src="./Select.ts" />

<style lang="sass">
@import 'Select'
</style>
