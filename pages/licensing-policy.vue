<template>
  <div>
    <div class="grid-container">
      <header class="models-header">
        <h1 class="display-text display-text--h2">
          <span>
            {{ $t('navigation.licensing') }}
          </span>
        </h1>
      </header>
    </div>
    <div class="grid-container grid-container--posts">
      <licensing-quiz />
      <h1 class="display-text display-text--h3">
        <span>Доступные лицензии</span>
      </h1>
      <div
        v-for="license in availableLicenses"
        :key="license.id"
        style="margin-top: 3rem"
      >
        <h2 class="display-text display-text--h4">
          <span>{{ license.title }}</span>
        </h2>
        <vue-alert
          v-if="license.copyright_content"
          type="warning"
        >
          Используется для моделей, где указан бренд (например, телефон популярной марки с нанесенным логотипом)
        </vue-alert>
        <vue-alert
          v-if="license.mature_content"
          type="onlyfans"
        >
          Используется для моделей, которые будут использоваться преимущественно в контенте для взрослых
        </vue-alert>
        <vue-alert
          v-if="!license.mature_content && !license.copyright_content"
          type="success"
        >
          Используется для моделей, где не указан бренд, а также не указана метка "Контент для взрослых"
        </vue-alert>
        <template v-if="license.access === 'free'">
          <h3 class="display-text display-text--h5">
            <span>Указание авторства</span>
          </h3>
          <ul class="list">
            <li v-if="!license.mature_content">Рекомендуется указать авторство модели</li>
            <li v-else>Обязательное указание авторства модели</li>
          </ul>
        </template>
        <template v-else>
          <h3 class="display-text display-text--h5">
            <span>Указание авторства</span>
          </h3>
          <ul class="list">
            <li>Указывать авторство модели не требуется</li>
          </ul>
        </template>

        <template v-if="!license.mature_content && !license.copyright_content">
          <h3 class="display-text display-text--h5">
            <span>Критерии стандартной лицензии</span>
          </h3>
          <ul class="list">
            <li>Невозможность определения бренда (нет логотипа, либо вымышленный бренд)</li>
            <li>Модель нельзя отнести к контенту для взрослых. Примеры:
              <ul class="list">
                <li>Медицинские препараты, доступные в любом месте (презервативы, смазки, лекарства)</li>
                <li>Люди в одежде (хотя бы в нижнем белье либо купальнике)</li>
                <li>Предметы двойного назначения</li>
              </ul>
            </li>
          </ul>
        </template>
        <template v-if="license.copyright_content">
          <h3 class="display-text display-text--h5">
            <span>Критерии лицензии Copyright</span>
          </h3>
          <ul class="list">
            <li>Однозначная идентификация бренда (логотип или другие отличительные черты)</li>
          </ul>
          <h3 class="display-text display-text--h5">
            <span>Ограничения бесплатной и платной лицензии</span>
          </h3>
          <ul class="list">
            <li>Требуется разрешение правообладателя на использование модели</li>
          </ul>
        </template>
        <template v-if="license.mature_content">
          <h3 class="display-text display-text--h5">
            <span>Критерии контента для взрослых</span>
          </h3>
          <ul class="list">
            <li>Содержимое подходит под определение порнографии в законодательстве вашей страны</li>
            <li>Контент для взрослых сделан на этапе разработки (в случае игр это не сторонние модификации)</li>
            <li>Контент для взрослых распространяется на специализированных либо общих площадках, разрешающих такой контент (Patreon, OnlyFans, порносайты, Steam)</li>
          </ul>
        </template>
      </div>

      <h1 class="display-text display-text--h3">
        <span>Общие ограничения для лицензий</span>
      </h1>
      <p><b>Вы не можете:</b></p>
      <ul class="list">
        <li>Заявлять авторство на используемые модели</li>
        <li>Перезаливать файлы без разрешения автора</li>
        <li>Заливать измененные модели куда-либо без разрешения автора</li>
        <li>Продавать файлы по-одиночке либо пакетно</li>
      </ul>
      <p class="mb-3">
        Пояснения к пункту 3: изменять используемые модели можно (например, конвертирование в другой формат/рендерер/движок, исправление оригинальных багов и недочетов модели), но нельзя их заливать на всеобщее обозрение.
      </p>

      <h2 class="display-text display-text--h2 mt-3">
        <span>Указание авторства модели</span>
      </h2>
      <p class="mb-2">
        В данном пункте расписаны распространенные местоположения, куда можно поместить текст об использования моделей.
      </p>
      <h4 class="display-text display-text--h4">
        <span>Изображения (напр. Artstation, DeviantArt)</span>
      </h4>
      <ul class="list">
        <li>Описание изображения</li>
        <li>Мелкий шрифт поверх изображения (в случае отсутствия описания на площадке)</li>
      </ul>
      <h4 class="display-text display-text--h4">
        <span>Видеоигры</span>
      </h4>
      <ul class="list">
        <li>После всех авторов игры в титрах</li>
      </ul>
      <h4 class="display-text display-text--h4">
        <span>Фильмы, сериалы, видеоконтент</span>
      </h4>
      <ul class="list">
        <li>После всех авторов в титрах</li>
        <li>В заставке мелким шрифтом (если есть)</li>
        <li>В описании под видео (если позволяет площадка)</li>
        <li>Добавить тег "meshhouse" или "#meshhouse" (если позволяет площадка)</li>
      </ul>
      <h4 class="display-text display-text--h4">
        <span>Контент для взрослых - видео</span>
      </h4>
      <ul class="list">
        <li>После всех авторов в титрах (если есть)</li>
        <li>В заставке мелким шрифтом (если есть)</li>
        <li>В описании под видео (если позволяет площадка)</li>
        <li>Добавить тег "meshhouse" или "#meshhouse" (если позволяет площадка)</li>
      </ul>

      <h2 class="display-text display-text--h2 mt-3">
        <span>Платная лицензия</span>
      </h2>
      <p class="mb-2">
        Данная лицензия позволяет использовать модели без указания авторства модели (royalty-free). Для использования моделей под данной лицензией вам необходимо:
      </p>
      <ul class="list">
        <li>Быть подписанным на Patreon, Ko-fi или Boosty на минимальный tier, который дает доступ к royalty-free моделям</li>
        <li>Для моделей со стандартной лицензией, либо Copyright-лицензией вы должны быть подписаны на момент скачивания модели</li>
        <li>Для моделей с лицензией "Контент для взрослых" вы должны быть подписаны на всё время коммерческого использования модели</li>
      </ul>

      <h2 class="display-text display-text--h2 mt-3">
        <span>Коммерческое использование</span>
      </h2>
      <p>Под коммерческим использованием подразумевается получение дохода от производного либо авторского контента с использованием моделей с нашего сайта, в том числе платная подписка или paywall, либо пожертвования.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import type {
  License
} from '@meshhouse/types'
import LicensingQuiz from '@/components/Pages/Licensing/LicensingQuiz.vue'
import VueAlert from '@/components/Alert/Alert.vue'

@Component<LicensingPolicyPage>({
  components: {
    LicensingQuiz,
    VueAlert
  },
  head () {
    return {
      title: this.$t('navigation.licensing').toString()
    }
  }
})

export default class LicensingPolicyPage extends Vue {
  availableLicenses: License[] = this.$store.state.licenses
}
</script>
