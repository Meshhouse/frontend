<template>
  <transition-group
    class="notification-container"
    name="notification"
    tag="div"
  >
    <div
      v-for="(notification, idx) in notifications"
      :key="`notification-${idx}`"
      class="notification"
      :class="`notification--${notification.type}`"
    >
      <div class="notification__icon">
        <font-awesome-icon icon="info" />
      </div>
      <div class="notification__content">
        <header class="notification__header">
          {{ notification.title }}
        </header>
        <div class="notification__message">
          {{ notification.message }}
        </div>
      </div>
      <button
        class="notification__close"
        @click="removeNotification(idx)"
      >
        <font-awesome-icon icon="times" />
      </button>
    </div>
  </transition-group>
</template>

<script lang="ts" src="./NotificationContainer.ts" />

<style lang="sass">
@import "NotificationContainer"
</style>
