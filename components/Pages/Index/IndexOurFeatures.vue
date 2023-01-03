<template>
  <div class="grid-container grid-container--our-features">
    <div class="row">
      <div class="column our-feature">
        <h4 class="display-text display-text--h4">
          <span>
            {{ $t('blocks.ourFeatures.readytouse.title') }}
          </span>
        </h4>
        <div class="our-feature__icon">
          <font-awesome-icon icon="draw-polygon" />
        </div>
        <p>{{ $t('blocks.ourFeatures.readytouse.text') }}</p>
        <i>{{ $t('blocks.ourFeatures.readytouse.note') }}</i>
      </div>
      <div class="column our-feature">
        <h4 class="display-text display-text--h4">
          <span>
            {{ $t('blocks.ourFeatures.free.title') }}
          </span>
        </h4>
        <div class="our-feature__icon">
          <font-awesome-icon icon="donate" />
        </div>
        <p>{{ $t('blocks.ourFeatures.free.text') }}</p>
        <i>{{ $t('blocks.ourFeatures.free.note') }}</i>
      </div>
      <div class="column our-feature">
        <h4 class="display-text display-text--h4">
          <span>
            {{ $t('blocks.ourFeatures.opensource.title') }}
          </span>
        </h4>
        <div class="our-feature__icon">
          <font-awesome-icon :icon="[ 'fab', 'github' ]" />
        </div>
        <p>{{ $t('blocks.ourFeatures.opensource.text') }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./IndexOurFeatures.ts" />

<style lang="sass">
@import 'IndexOurFeatures'
</style>
