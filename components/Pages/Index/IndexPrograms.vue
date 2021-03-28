<template>
  <div class="grid-container">
    <h2 class="display-text display-text--h2">
      <span>
        {{ $t('pages.index.programs.title') }}
      </span>
    </h2>
    <i class="index-programs__description">
      {{ $t('pages.index.programs.note') }}
    </i>
    <div class="index-programs__container">
      <div class="program program--autodesk">
        <p class="program__count">
          {{ stats.max }}
        </p>
        <img
          class="program__icon"
          src="/icons/programs/3dsmax.svg"
          alt="3ds Max logo"
        >
        <p class="program__title">
          {{ $t('pages.index.programs.max') }}
        </p>
        <ul class="program__list">
          <li>Redshift 2.6+</li>
        </ul>
      </div>
      <div class="program program--autodesk">
        <p class="program__count">
          {{ stats.maya }}
        </p>
        <img
          class="program__icon"
          src="/icons/programs/maya.svg"
          alt="Maya logo"
        >
        <p class="program__title">
          {{ $t('pages.index.programs.maya') }}
        </p>
        <ul class="program__list">
          <li>Redshift 2.6+</li>
        </ul>
      </div>
      <div class="program program--blender">
        <p class="program__count">
          {{ stats.blender }}
        </p>
        <img
          class="program__icon"
          src="/icons/programs/blender.svg"
          alt="Blender logo"
        >
        <p class="program__title">
          {{ $t('pages.index.programs.blender') }}
        </p>
        <ul class="program__list">
          <li>Cycles</li>
        </ul>
      </div>
      <div class="program program--cinema4d">
        <p class="program__count">
          {{ stats.c4d }}
        </p>
        <img
          class="program__icon padded"
          src="/icons/programs/cinema4d.svg"
          alt="Cinema4D logo"
        >
        <p class="program__title">
          {{ $t('pages.index.programs.cinema4d') }}
        </p>
        <ul class="program__list">
          <li>Redshift 2.6+</li>
        </ul>
      </div>
      <div class="program program--unity">
        <p class="program__count">
          {{ stats.unity }}
        </p>
        <img
          class="program__icon padded"
          src="/icons/programs/unity.svg"
          alt="Unity logo"
        >
        <p class="program__title">
          {{ $t('pages.index.programs.unity') }}
        </p>
      </div>
      <div class="program program--unreal">
        <p class="program__count">
          {{ stats.unreal }}
        </p>
        <img
          class="program__icon"
          src="/icons/programs/unrealengine.svg"
          alt="Unreal Engine logo"
        >
        <p class="program__title">
          {{ $t('pages.index.programs.unreal') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./IndexPrograms.ts" />

<style lang="sass">
@import 'IndexPrograms'
</style>
