<template>
  <div class="grid-container">
    <nav
      class="breadcrumbs"
      itemscope
      itemtype="https://schema.org/BreadcrumbList"
    >
      <li
        v-for="(element, idx) in elements"
        :key="idx"
        class="breadcrumb"
        :class="{ 'breadcrumb--active': element.active }"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <a
          v-if="!element.active"
          itemprop="item"
          :href="localePath(element.href)"
          @click.prevent="$router.push(localePath(element.href))"
        >
          <span itemprop="name">{{ element.title }}</span>
        </a>
        <span
          v-else
          itemprop="item"
        >
          <span itemprop="name">{{ element.title }}</span>
        </span>
        <meta
          itemprop="position"
          :content="element.idx + 1"
        >
      </li>
    </nav>
  </div>
</template>

<script lang="ts" src="./Breadcrumbs.ts" />

<style lang="sass">
@import 'Breadcrumbs'
</style>
