<template>
  <div class="model-specifications">
    <div
      v-for="specification in specificationList"
      :key="specification.slug"
      class="specification"
    >
      <b class="specification__title">
        {{ $t(`specifications.${specification.slug}`) }}
      </b>
      <span class="specification__value">
        <template
          v-if="!specification.with_icon || (specification.with_icon && !specification.as_boolean)"
        >
          {{ specification.value }}
        </template>
        <font-awesome-icon
          v-if="specification.with_icon && specification.as_boolean"
          :icon="specification.value ? 'check' : 'times'"
          :class="specification.value ? 'icon--success': 'icon--danger'"
        />
      </span>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "specifications": {
      "id": "Product id",
      "created_at": "Upload date",
      "polygons": "Polygons",
      "vertices": "Vertices",
      "geometry": "Topology",
      "hair_system": "Hair system",
      "blendshapes": "Morpher / blendshapes",
      "rig": "Skeleton rigging",
      "textures": "Textures",
      "uv": "Unwrap type"
    },
    "specification-locales": {
      "hair-system": {
        "standard": "Standard",
        "ornatrix": "Ornatrix",
        "xgen": "XGen",
        "hairfarm": "Hairfarm",
        "yeti": "Yeti"
      },
      "rig": {
        "bones": "Bones",
        "biped": "Biped",
        "autodesk_cat": "Autodesk CAT"
      },
      "textures": {
        "procedural": "Procedural",
        "pbr": "PBR",
        "npr": "NPR"
      },
      "uv": {
        "generated": "Generated",
        "unwrap_uvw": "Unwrap UVW",
        "udim": "UDIM-unwrap",
        "uvtile": "UVTile-unwrap"
      },
      "geometry": {
        "tris": "Triangles",
        "quads": "Quads",
        "ngons": "N-gons",
        "combined": "Combined"
      }
    }
  },
  "ru": {
    "specifications": {
      "id": "Артикул модели",
      "created_at": "Дата загрузки",
      "polygons": "Полигонов",
      "vertices": "Вершин",
      "geometry": "Топология",
      "hair_system": "Система волос",
      "blendshapes": "Морфер / блендшейпы:",
      "rig": "Привязка к скелету",
      "textures": "Тип текстур",
      "uv": "Тип развертки"
    },
    "specification-locales": {
      "hair-system": {
        "standard": "Стандартная",
        "ornatrix": "Ornatrix",
        "xgen": "XGen",
        "hairfarm": "Hairfarm",
        "yeti": "Yeti"
      },
      "rig": {
        "bones": "На костях",
        "biped": "Biped",
        "autodesk_cat": "Autodesk CAT"
      },
      "textures": {
        "procedural": "Процедурные",
        "pbr": "PBR",
        "npr": "NPR"
      },
      "uv": {
        "generated": "Сгенерированная",
        "unwrap_uvw": "Unwrap UVW",
        "udim": "UDIM-развертка",
        "uvtile": "UVTile-развертка"
      },
      "geometry": {
        "tris": "Треугольники",
        "quads": "Квадраты",
        "ngons": "N-угольники",
        "combined": "Смешанная"
      }
    }
  }
}
</i18n>

<script lang="ts" src="./ModelSpecifications.ts" />

<style lang="sass">
@import 'ModelSpecifications'
</style>
