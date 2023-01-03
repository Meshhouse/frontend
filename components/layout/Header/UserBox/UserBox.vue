<template>
  <v-dropdown-button
    color="secondary"
    class="user-box"
    icon-only
    no-caret
  >
    <font-awesome-icon
      class="dropdown__prepend-icon"
      icon="user"
    />
    <template slot="content">
      <user-box-content
        @open-login="$emit('open-login')"
        @open-register="$emit('open-register')"
      />
    </template>
  </v-dropdown-button>
</template>

<script lang="ts" src="./UserBox.ts" />

<style lang="sass">
@import 'UserBox'
</style>
