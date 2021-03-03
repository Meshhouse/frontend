<template>
  <div class="grid-container grid-container--our-features">
    <div class="row">
      <div class="column">
        <img
          class="our-features__image"
          src="/images/index/timemanagement.svg"
          alt="Time management"
        >
        <a href="https://www.freepik.com/vectors/work">Work vector created by stories - www.freepik.com</a>
      </div>
      <div class="column">
        <div class="our-features__block our-features__block--right">
          <h2 class="display-text display-text--h2">
            <span>
              {{ $t('pages.index.features.readytouse.title') }}
            </span>
          </h2>
          <p>{{ $t('pages.index.features.readytouse.text') }}</p>
          <i>{{ $t('pages.index.features.readytouse.note') }}</i>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <div class="our-features__block">
          <h2 class="display-text display-text--h2">
            <span>
              {{ $t('pages.index.features.free.title') }}
            </span>
          </h2>
          <p>{{ $t('pages.index.features.free.text') }}</p>
        </div>
      </div>
      <div class="column">
        <img
          class="our-features__image"
          src="/images/index/moneysavings.svg"
          alt="Money savings"
        >
        <a href="https://www.freepik.com/vectors/money">Money vector created by stories - www.freepik.com</a>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <img
          class="our-features__image"
          src="/images/index/opensource.svg"
          alt="Pair programming"
        >
        <a href="https://www.freepik.com/vectors/technology">Technology vector created by stories - www.freepik.com</a>
      </div>
      <div class="column">
        <div class="our-features__block our-features__block--right">
          <h2 class="display-text display-text--h2">
            <span>
              {{ $t('pages.index.features.opensource.title') }}
            </span>
          </h2>
          <p>{{ $t('pages.index.features.opensource.text') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./IndexOurFeatures.ts" />

<style lang="sass">
@import 'IndexOurFeatures'
</style>
