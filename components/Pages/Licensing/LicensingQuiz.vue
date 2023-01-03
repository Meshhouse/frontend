<template>
  <div class="licensing-quiz">
    <stepper
      :steps="steps"
      :selected-step="currentStep"
      @previous-step="currentStep--"
      @next-step="currentStep++"
    >
      <stepper-tab>
        <h3>Select all preferred use cases</h3>
        <checkbox
          v-model="useCases"
          value="games"
        >
          Video games
        </checkbox>
        <checkbox
          v-model="useCases"
          value="videos"
        >
          Youtube, Vimeo, cinema videos
        </checkbox>
        <checkbox
          v-model="useCases"
          value="art"
        >
          Digital art (2D, 3D)
        </checkbox>
        <checkbox
          v-model="useCases"
          value="printing"
        >
          3D printing
        </checkbox>
        <checkbox
          v-model="useCases"
          value="other"
        >
          Other
        </checkbox>
      </stepper-tab>
      <stepper-tab>
        <h3>Would you use models in mature content?</h3>
        <radio-button
          v-model="matureContent"
          value="false"
        >
          No
        </radio-button>
        <radio-button
          v-model="matureContent"
          value="true"
        >
          Yes
        </radio-button>
      </stepper-tab>
      <stepper-tab>
        <h3>Would you use branded (copyrighted) models?</h3>
        <radio-button
          v-model="copyright"
          value="false"
        >
          No
        </radio-button>
        <radio-button
          v-model="copyright"
          value="true"
        >
          Yes
        </radio-button>
      </stepper-tab>
      <stepper-tab>
        <h3>Would you set authorship of used models (eg. in credits)?</h3>
        <radio-button
          v-model="authorship"
          value="false"
        >
          No
        </radio-button>
        <radio-button
          v-model="authorship"
          value="true"
        >
          Yes
        </radio-button>
      </stepper-tab>
      <stepper-tab>
        <template v-if="calculatedLicense">
          <h3>Your preferred license:</h3>
          <h1>{{ calculatedLicense.title }}</h1>
          {{ calculatedLicense }}
        </template>
        <template v-else>
          <h3>We can't calculate preferred license</h3>
          <p>But you can choose from our selection below</p>
        </template>
      </stepper-tab>
    </stepper>
  </div>
</template>

<script lang="ts" src="./LicensingQuiz.ts" />

<style lang="sass">
@import 'LicensingQuiz'
</style>
