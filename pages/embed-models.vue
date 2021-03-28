<template>
  <div>
    <div class="grid-container">
      <header class="models-header">
        <h1 class="display-text display-text--h2">
          <span>
            {{ $t('pages.embed.title') }}
          </span>
        </h1>
      </header>
    </div>
    <div
      class="grid-container grid-container--posts"
      v-html="$t('pages.embed.content')"
    />
  </div>
</template>

<i18n>
{
  "en": {
    "pages": {
      "embed": {
        "title": "Embed models",
        "content": "<p>Models from the MeshHouse site can be embedded on third-party sites in the form of a card .</p><h2>How to embed model</h2><ol><li>Open Meshhouse and navigate to models page.</li><li>Click <b>Share</b> under models images.</li><li>Select the option you want (share a link or embed a model).</li><li>Copy code.</li><li>Add code in your blog or on site.</li></ol><h2>Example of embed model card</h2><h3>Big card (364px)</h3><img src=\"/images/embed/card-big.webp\"><h3>Medium card (204px)</h3><img src=\"/images/embed/card-medium.webp\"><h3>Small card (96px)</h3><img src=\"/images/embed/card-small.webp\">"
      }
    }
  },
  "ru": {
    "pages": {
      "embed": {
        "title": "Встраивание моделей",
        "content": "<p>Модели с сайта MeshHouse можно встраивать на сторонних сайтах в виде карточки.</p><h2>Как встроить модель</h2><ol><li>Откройте Meshhouse и перейдите на страницу нужной модели.</li><li>Нажмите <b>Поделиться</b> под изображениями моделей.</li><li>Выберите нужный вариант (поделиться ссылкой или встроить модель).</li><li>Скопируйте код.</li><li>Добавьте код в свой блог или на сайт.</li></ol><h2>Пример встроенной карточки модели</h2><h3>Большая карточка (364px)</h3><img src=\"/images/embed/card-big.webp\"><h3>Средняя карточка (204px)</h3><img src=\"/images/embed/card-medium.webp\"><h3>Маленькая карточка (96px)</h3><img src=\"/images/embed/card-small.webp\">"
      }
    }
  }
}
</i18n>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component<EmbedModelsPage>({
  head () {
    return {
      title: this.$t('pages.embed.title').toString()
    }
  }
})

export default class EmbedModelsPage extends Vue {}
</script>
