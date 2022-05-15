<template>
  <div>
    <div class="grid-container">
      <header class="models-header">
        <h1 class="display-text display-text--h2">
          <span>
            {{ $t('pages.dmca.title') }}
          </span>
        </h1>
      </header>
    </div>
    <div class="grid-container grid-container--posts">
      <p class="mb-3">
        This Digital Millennium Copyright Act policy (&quot;Policy&quot;) applies to the <a target="_blank" rel="noreferrer" href="https://meshhouse.art">meshhouse.art</a> website (&quot;Website&quot; or &quot;Service&quot;) and any of its related products and services (collectively, &quot;Services&quot;) and outlines how this Website operator (&quot;Operator&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;) addresses copyright infringement notifications and how you (&quot;you&quot; or &quot;your&quot;) may submit a copyright infringement complaint.
      </p>
      <p class="mb-3">
        Protection of intellectual property is of utmost importance to us and we ask our users and their authorized agents to do the same. It is our policy to expeditiously respond to clear notifications of alleged copyright infringement that comply with the United States Digital Millennium Copyright Act (&quot;DMCA&quot;) of 1998, the text of which can be found at the U.S. Copyright Office <a target="_blank" rel="noreferrer" href="https://www.copyright.gov">website</a>.
      </p>
      <h2 class="display-text display-text--h3">
        <span>What to consider before submitting a copyright complaint</span>
      </h2>
      <p class="mb-3">
        Please note that if you are unsure whether the material you are reporting is in fact infringing, you may wish to contact an attorney before filing a notification with us.
      </p>
      <p class="mb-3">
        The DMCA requires you to provide your personal information in the copyright infringement notification. If you are concerned about the privacy of your personal information, you may wish to <a target="_blank" rel="noreferrer" href="https://www.copyrighted.com/professional-takedowns">hire an agent</a> to report infringing material for you.
      </p>
      <h2 class="display-text display-text--h3">
        <span>Notifications of infringement</span>
      </h2>
      <p class="mb-3">
        If you are a copyright owner or an agent thereof, and you believe that any material available on our Services infringes your copyrights, then you may submit a written copyright infringement notification (&quot;Notification&quot;) using the contact details below pursuant to the DMCA. All such Notifications must comply with the DMCA requirements. You may refer to a <a target="_blank" rel="noreferrer" href="https://www.websitepolicies.com/create/dmca-takedown-notice">DMCA takedown notice generator</a> or other similar services to avoid making mistake and ensure compliance of your Notification.
      </p>
      <p class="mb-3">
        Filing a DMCA complaint is the start of a pre-defined legal process. Your complaint will be reviewed for accuracy, validity, and completeness. If your complaint has satisfied these requirements, our response may include the removal or restriction of access to allegedly infringing material.
      </p>
      <p class="mb-3">
        If we remove or restrict access to materials or terminate an account in response to a Notification of alleged infringement, we will make a good faith effort to contact the affected user with information concerning the removal or restriction of access.
      </p>
      <p class="mb-3">
        Notwithstanding anything to the contrary contained in any portion of this Policy, the Operator reserves the right to take no action upon receipt of a DMCA copyright infringement notification if it fails to comply with all the requirements of the DMCA for such notifications.
      </p>
      <p class="mb-3">
        The process described in this Policy does not limit our ability to pursue any other remedies we may have to address suspected infringement.
      </p>
      <h2 class="display-text display-text--h3">
        <span>Changes and amendments</span>
      </h2>
      <p class="mb-3">
        We reserve the right to modify this Policy or its terms relating to the Website and Services at any time, effective upon posting of an updated version of this Policy on the Website. When we do, we will send you an email to notify you.  Policy was created with <a target="_blank" rel="noreferrer" href="https://www.websitepolicies.com/dmca-policy-generator">WebsitePolicies</a>.
      </p>
      <h2 class="display-text display-text--h3">
        <span>Reporting copyright infringement</span>
      </h2>
      <p>If you would like to notify us of the infringing material or activity, you may send an email to d&#109;ca&#64;mesh&#104;&#111;use.a&#114;&#116;</p>
      <p>This document was last updated on September 3, 2020</p>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "pages": {
      "dmca": {
        "title": "DMCA Policy"
      }
    }
  },
  "ru": {
    "pages": {
      "dmca": {
        "title": "Политика DMCA"
      }
    }
  }
}
</i18n>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component<DMCAPolicyPage>({
  head () {
    return {
      title: this.$t('pages.dmca.title').toString()
    }
  }
})

export default class DMCAPolicyPage extends Vue {}
</script>
