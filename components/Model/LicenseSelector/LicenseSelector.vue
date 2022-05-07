<template>
  <div class="licenses">
    <div
      v-for="license in licenses"
      :key="license.id"
      class="license"
    >
      <radio-button
        v-model="checked"
        :value="license.alias"
        :disabled="license.auth"
      >
        {{ license.name }}
      </radio-button>
      <table class="license__table">
        <tbody>
          <tr>
            <th>{{ $t('license.features.attribution.title') }}</th>
            <td>{{ getAttributionText(license.features.attribution) }}</td>
          </tr>
          <tr>
            <th>{{ $t('license.features.nonCommercial') }}</th>
            <td>{{ $t(`common.${license.features.nonCommercial}`) }}</td>
          </tr>
          <tr>
            <th>{{ $t('license.features.commercial') }}</th>
            <td>{{ $t(`common.${license.features.commercial}`) }}</td>
          </tr>
          <tr>
            <th>{{ $t('license.features.convert') }}</th>
            <td>{{ $t(`common.${license.features.convert}`) }}</td>
          </tr>
          <tr>
            <th>{{ $t('license.features.reselling') }}</th>
            <td>{{ $t(`common.${license.features.reselling}`) }}</td>
          </tr>
          <tr>
            <th>{{ $t('license.features.reupload') }}</th>
            <td>{{ $t(`common.${license.features.reupload}`) }}</td>
          </tr>
          <tr>
            <th>{{ $t('license.features.matureContent') }}</th>
            <td>{{ $t(`common.${license.features.matureContent}`) }}</td>
          </tr>
          <tr>
            <th>{{ $t('license.features.askShareholder') }}</th>
            <td>{{ $t(`common.${!license.features.askShareholder}`) }}</td>
          </tr>
        </tbody>
      </table>
      <div :class="getLicenseClass(license.requirements, false)">
        {{ getRequrementsText(license.requirements) }}
      </div>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "license": {
      "features": {
        "attribution": {
          "title": "Author attribution",
          "lazy": "Recommended",
          "eager": "Required",
          "none": "Not required"
        },
        "nonCommercial": "Non-commercial use",
        "commercial": "Commercial use",
        "convert": "Model conversion (for use in other programs)",
        "reselling": "Resell model",
        "reupload": "Reupload model",
        "matureContent": "Use model in mature content",
        "askShareholder": "Use model without shareholder permission"
      },
      "requirements": {
        "none": "There are no requirements to use this license",
        "patreon-otd": "You need to be subscribed on Patreon at the moment of downloading model",
        "patreon-recurrent": "You need to be subscribed on Patreon at all time of using model commercially",
        "success": "You are legible to use this license"
      }
    }
  },
  "ru": {
    "license": {
      "features": {
        "attribution": {
          "title": "Указание авторства",
          "lazy": "Рекомендуется",
          "eager": "Обязательно",
          "none": "Не требуется"
        },
        "nonCommercial": "Некоммерческое использование",
        "commercial": "Коммерческое использование",
        "convert": "Конвертация модели (для использования в других программах)",
        "reselling": "Перепродажа модели",
        "reupload": "Перезалив модели",
        "matureContent": "Использование в контенте для взрослых",
        "askShareholder": "Использование без разрешения правообладателя"
      },
      "requirements": {
        "none": "Нет требований для использования данной лицензии",
        "patreon-otd": "Вы должны быть подписаны на Patreon на момент скачивания модели",
        "patreon-recurrent": "Вы должны быть подписаны на Patreon на всё время коммерческого использования модели",
        "success": "Вы удовлетворяете условиям использования лицензии"
      }
    }
  }
}
</i18n>

<script lang="ts" src="./LicenseSelector.ts" />

<style lang="sass">
@import "LicenseSelector"
</style>
