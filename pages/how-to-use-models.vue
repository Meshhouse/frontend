<template>
  <div>
    <div class="grid-container">
      <header class="models-header">
        <h1 class="display-text display-text--h2">
          <span>
            {{ $t('pages.how-to-use-models.title') }}
          </span>
        </h1>
      </header>
    </div>
    <div class="grid-container grid-container--posts">
      <div id="3dsmax" class="howto__block">
        <h3 class="display-text display-text--h3">
          <span>3ds max</span>
        </h3>
        <vue-alert type="primary">
          {{ $t('pages.how-to-use-models.blocks.max.alert') }}
        </vue-alert>
        <h2>
          {{ $t('pages.how-to-use-models.blocks.max.titleMerge') }}
        </h2>
        <ul v-html="$t('pages.how-to-use-models.blocks.max.mergeList')" />
        <p>
          {{ $t('pages.how-to-use-models.blocks.max.mergeText') }}
        </p>
        <h2>
          {{ $t('pages.how-to-use-models.blocks.max.titleXref') }}
        </h2>
        <ul v-html="$t('pages.how-to-use-models.blocks.max.xrefList')" />
        <p>
          {{ $t('pages.how-to-use-models.blocks.max.xrefText1') }}
        </p>
        <img src="/images/howto/max_xref.png">
        <p>
          {{ $t('pages.how-to-use-models.blocks.max.xrefText2') }}
        </p>
      </div>
      <div id="maya" class="howto__block">
        <h3 class="display-text display-text--h3">
          <span>Maya</span>
        </h3>
        <vue-alert type="primary">
          {{ $t('pages.how-to-use-models.blocks.maya.alert') }}
        </vue-alert>
        <h2>
          {{ $t('pages.how-to-use-models.blocks.maya.titleMerge') }}
        </h2>
        <ul v-html="$t('pages.how-to-use-models.blocks.maya.mergeList')" />
        <p>
          {{ $t('pages.how-to-use-models.blocks.maya.mergeText') }}
        </p>
        <h2>
          {{ $t('pages.how-to-use-models.blocks.maya.titleXref') }}
        </h2>
        <ul v-html="$t('pages.how-to-use-models.blocks.maya.xrefList')" />
        <p>
          {{ $t('pages.how-to-use-models.blocks.maya.xrefText1') }}
        </p>
        <img src="/images/howto/maya_reference-editor.png">
        <p>
          {{ $t('pages.how-to-use-models.blocks.maya.xrefText2') }}
        </p>
      </div>
      <div id="blender" class="howto__block">
        <h3 class="display-text display-text--h3">
          <span>Blender</span>
        </h3>
        <vue-alert type="primary">
          {{ $t('pages.how-to-use-models.blocks.blender.alert') }}
        </vue-alert>
        <h2>
          {{ $t('pages.how-to-use-models.blocks.blender.titleMerge') }}
        </h2>
        <ul v-html="$t('pages.how-to-use-models.blocks.blender.mergeList')" />
        <p>
          {{ $t('pages.how-to-use-models.blocks.blender.mergeText') }}
        </p>
        <img src="/images/howto/blender_append.png">
        <h2>
          {{ $t('pages.how-to-use-models.blocks.blender.titleXref') }}
        </h2>
        <ul v-html="$t('pages.how-to-use-models.blocks.blender.xrefList')" />
        <p>
          {{ $t('pages.how-to-use-models.blocks.blender.xrefText1') }}
        </p>
        <img src="/images/howto/blender_link.png">
      </div>
      <div id="cinema4d" class="howto__block">
        <h3 class="display-text display-text--h3">
          <span>Cinema 4D</span>
        </h3>
        <vue-alert type="primary">
          {{ $t('pages.how-to-use-models.blocks.cinema4d.alert') }}
        </vue-alert>
        <img src="/images/howto/cinema4d_asset-path.png">
        <h2>
          {{ $t('pages.how-to-use-models.blocks.cinema4d.titleMerge') }}
        </h2>
        <ul v-html="$t('pages.how-to-use-models.blocks.cinema4d.mergeList')" />
        <p>
          {{ $t('pages.how-to-use-models.blocks.cinema4d.mergeText') }}
        </p>
        <h2>
          {{ $t('pages.how-to-use-models.blocks.cinema4d.titleXref') }}
        </h2>
        <ul v-html="$t('pages.how-to-use-models.blocks.cinema4d.xrefList')" />
        <p>
          {{ $t('pages.how-to-use-models.blocks.cinema4d.xrefText1') }}
        </p>
        <img src="/images/howto/cinema4d_xref-manager.png">
        <p>
          {{ $t('pages.how-to-use-models.blocks.cinema4d.xrefText2') }}
        </p>
      </div>
      <div id="unity" class="howto__block">
        <h3 class="display-text display-text--h3">
          <span>Unity</span>
        </h3>
        <vue-alert type="primary">
          {{ $t('pages.how-to-use-models.blocks.unity.alert') }}
        </vue-alert>
        <p>
          {{ $t('pages.how-to-use-models.blocks.unity.mergeText') }}
        </p>
      </div>
      <div id="unreal" class="howto__block">
        <h3 class="display-text display-text--h3">
          <span>Unreal Engine</span>
        </h3>
      </div>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "pages": {
      "how-to-use-models": {
        "title": "How to use models",
        "blocks": {
          "max": {
            "alert": "For properly model import you need to add path to textures in 'Customize -> Configure User Paths -> External Files'. Instructions will be given for 3ds Max 2016.",
            "titleMerge": "Variant 1 - Merge to scene",
            "titleXref": "Variant 2 - xRef",
            "mergeList": "<li>+ Full control on model and materials</li><li>- Changes in original model need to import again in current scene</li>",
            "mergeText": "For merge model with scene you need to click 'File' (or click on 3ds Max icon) -> 'Import' -> 'Merge' and select file.",
            "xrefList": "<li>+ Smaller scene size</li><li>+ Can use proxy to improve FPS</li><li>+ Changes in xRef syncs with all scenes</li><li>- Can't edit modifiers in xRef</li>",
            "xrefText1": "For import model as xRef you need to click 'File' (or click on 3ds Max icon) -> 'References' -> 'XRef Objects'",
            "xrefText2": "Choose preset 'Static Assets' then click on button in left upper corner (looks like square in curly braces) and select file."
          },
          "maya": {
            "alert": "Instructions will be given for Maya 2016.",
            "titleMerge": "Variant 1 - Merge to scene",
            "titleXref": "Variant 2 - Reference",
            "mergeList": "<li>+ Full control on model and materials</li><li>- Changes in original model need to import again in current scene</li>",
            "mergeText": "For merge model with scene you need to click 'File' -> 'Import' and select file.",
            "xrefList": "<li>+ Smaller scene size</li><li>+ Can use proxy to improve FPS</li><li>+ Changes in Reference syncs with all scenes</li>",
            "xrefText1": "For import model as Reference you need to click 'File' -> 'Reference Editor'",
            "xrefText2": "In new window click 'File' -> 'Create Reference' and select file."
          },
          "blender": {
            "alert": "Instructions will be given for Blender 2.80 beta.",
            "titleMerge": "Variant 1 - Merge to scene",
            "titleXref": "Variant 2 - Reference",
            "mergeList": "<li>+ Full control on model and materials</li><li>- Changes in original model need to import again in current scene</li>",
            "mergeText": "For merge model with scene you need to click 'File' -> 'Append', select file and after that select object.",
            "xrefList": "<li>+ Меньший размер сцены</li><li>+ Возможно использовать прокси для увеличения частоты кадров</li><li>+ Изменения в ссылке сихронизируются со всеми сценами</li>",
            "xrefText1": "For import model as reference you need to click 'File' -> 'Link', select file and after that select object."
          },
          "cinema4d": {
            "alert": "For properly model import you need to add path to textures in 'Edit -> Preferences -> Files -> Paths'. Instructions will be given for Cinema4D S22.",
            "titleMerge": "Variant 1 - Merge to scene",
            "titleXref": "Variant 2 - xRef",
            "mergeList": "<li>+ Full control on model and materials</li><li>- Changes in original model need to import again in current scene</li>",
            "mergeText": "For merge model with scene you need to click 'File' -> 'Merge Project' and select file.",
            "xrefList": "<li>+ Smaller scene size</li><li>+ Can use proxy to improve FPS</li><li>+ Changes in xRef syncs with all scenes</li>",
            "xrefText1": "For import model as xRef you need to click 'Create' -> 'XRef' -> 'XRef Manager'",
            "xrefText2": "In new window click 'File' -> 'Add XRef' and select file."
          },
          "unity": {
            "alert": "Model import can be possibly only through merge into current project. Instructions will be given for Unity 2019.3.",
            "mergeText": "Use the Assets > Import Package menu option to unpack the collection into your currently open Unity project."
          }
        }
      }
    }
  },
  "ru": {
    "pages": {
      "how-to-use-models": {
        "title": "Как использовать модели",
        "blocks": {
          "max": {
            "alert": "Для корректного импорта модели необходимо сначала прописать пути к текстурам в 'Customize -> Configure User Paths -> External Files'. Инструкции будут даны для 3ds Max 2016.",
            "titleMerge": "Вариант 1 - Слияние с текущей сценой",
            "titleXref": "Вариант 2 - xRef",
            "mergeList": "<li>+ Полный контроль над моделью и материалами</li><li>- Изменения, внесенные в оригинальную модель нужно заново импортировать в сцену</li>",
            "mergeText": "Для слияния модели со сценой необходимо зайти в 'File' (либо нажать на иконку 3ds Max) -> 'Import' -> 'Merge' и выбрать необходимый файл.",
            "xrefList": "<li>+ Меньший размер сцены</li><li>+ Возможно использовать прокси для увеличения частоты кадров</li><li>+ Изменения в xRef сихронизируются со всеми сценами</li><li>- Невозможно редактировать модификаторы в xRef</li>",
            "xrefText1": "Для импорта модели как xRef необходимо зайти в 'File' (либо нажать на иконку 3ds Max) -> 'References' -> 'XRef Objects'",
            "xrefText2": "Выберите пресет 'Static Assets', затем нажмите на кнопку в левом верхнем углу (выглядит как квадрат в фигурных скобках) и выберите необходимый файл."
          },
          "maya": {
            "alert": "Инструкции будут даны для Maya 2016.",
            "titleMerge": "Вариант 1 - Слияние с текущей сценой",
            "titleXref": "Вариант 2 - Reference",
            "mergeList": "<li>+ Полный контроль над моделью и материалами</li><li>- Изменения, внесенные в оригинальную модель нужно заново импортировать в сцену</li>",
            "mergeText": "Для слияния модели со сценой необходимо зайти в 'File' -> 'Import' и выбрать необходимый файл.",
            "xrefList": "<li>+ Меньший размер сцены</li><li>+ Возможно использовать прокси для увеличения частоты кадров</li><li>+ Изменения в Reference сихронизируются со всеми сценами</li>",
            "xrefText1": "Для импорта модели как Reference необходимо зайти в 'File' -> 'Reference Editor'",
            "xrefText2": "В появившемся окне зайдите в 'File' -> 'Create Reference' и выберите необходимый файл."
          },
          "blender": {
            "alert": "Инструкции будут даны для Blender 2.80 beta.",
            "titleMerge": "Вариант 1 - Слияние с текущей сценой",
            "titleXref": "Вариант 2 - Ссылка",
            "mergeList": "<li>+ Полный контроль над моделью и материалами</li><li>- Изменения, внесенные в оригинальную модель нужно заново импортировать в сцену</li>",
            "mergeText": "Для слияния модели со сценой необходимо зайти в 'File' -> 'Append', зайти в необходимый файл и выбрать нужный объект.",
            "xrefList": "<li>+ Меньший размер сцены</li><li>+ Возможно использовать прокси для увеличения частоты кадров</li><li>+ Изменения в ссылке сихронизируются со всеми сценами</li>",
            "xrefText1": "Для импорта модели как ссылку необходимо зайти в 'File' -> 'Link', зайти в необходимый файл и выбрать нужный объект."
          },
          "cinema4d": {
            "alert": "Для корректного импорта модели необходимо сначала прописать пути к текстурам в 'Edit -> Preferences -> Files -> Paths'. Инструкции будут даны для Cinema4D S22.",
            "titleMerge": "Вариант 1 - Слияние с текущей сценой",
            "titleXref": "Вариант 2 - XRef",
            "mergeList": "<li>+ Полный контроль над моделью и материалами</li><li>- Изменения, внесенные в оригинальную модель нужно заново импортировать в сцену</li>",
            "mergeText": "Для слияния модели со сценой необходимо зайти в 'File' -> 'Merge Project' и выбрать необходимый файл.",
            "xrefList": "<li>+ Меньший размер сцены</li><li>+ Возможно использовать прокси для увеличения частоты кадров</li><li>+ Изменения в Reference сихронизируются со всеми сценами</li>",
            "xrefText1": "Для импорта модели как Reference необходимо зайти в 'Create' -> 'XRef' -> 'XRef Manager'",
            "xrefText2": "В появившемся окне зайдите в 'File' -> 'Add XRef' и выберите необходимый файл."
          },
          "unity": {
            "alert": "Импорт модели возможен только путем слияния с текущим проектом. Инструкции будут даны для Unity 2019.3.",
            "mergeText": "Используйте меню Assets > Import Package чтобы распаковать пакет в текущий проект."
          }
        }
      }
    }
  }
}
</i18n>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import VueAlert from '@/components/Alert/Alert.vue'

@Component<HowtoUseModelsPage>({
  components: {
    VueAlert
  },
  head () {
    return {
      title: this.$t('pages.how-to-use-models.title').toString()
    }
  }
})

export default class HowtoUseModelsPage extends Vue {}
</script>

<style lang="sass">
.howto
  &__block
    margin: 2rem 0
</style>
