<template>
  <model-viewer
    class="model-viewer"
    :model="model"
    hdri="/images/hdri/colorful_studio_1k.hdr"
    :modeltitle="title"
    author="MeshHouse Team"
    authorlink="https://meshhouse.art"
    :autohide="true"
    :thumbnail="thumbnail"
  >
    <span slot="loader">
      <img src="/icons/logo-icon.svg" alt="Meshhouse">
    </span>
    <span slot="logo">
      <img src="/icons/logo-icon.svg" alt="Meshhouse" style="width: 3rem">
    </span>
  </model-viewer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import '@meshhouse/model-viewer'

@Component({})

export default class VueModelViewer extends Vue {
  @Prop({ type: String, required: true, default: '' }) readonly model!: string
  @Prop({ type: String, required: true, default: '' }) readonly title!: string
  @Prop({ type: String, required: true, default: '' }) readonly thumbnail!: string
}
</script>
