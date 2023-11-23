<template>
  <div class="home-wrapper">
    <div class="home-banner">
      <video class="home-banner-video" src="https://idux-cdn.sangfor.com.cn/medias/home-banner.mp4" autoplay loop muted>
        {{ locale.videoErr }}
      </video>
      <div class="home-banner-title">
        <div class="home-banner-title-desc">{{ locale.bannerTitleDesc }}</div>
        <IxButtonGroup :gap="16" :size="buttonSize" shape="round">
          <IxButton mode="primary" @click="gotoPage('/docs/introduce')">{{ locale.start }}</IxButton>
          <IxButton>
            <a :href="githubUrl" target="_blank">{{ locale.github }}</a>
          </IxButton>
        </IxButtonGroup>
      </div>
    </div>
    <IxRow class="home-comp-properties-wrapper">
      <IxCol v-for="(item, index) of locale.compProperties" :key="index" xs="24" sm="12" class="home-comp-properties">
        <dl>
          <div class="home-comp-properties-img" :style="{ backgroundImage: `url(${item.image})` }"></div>
          <dt>{{ item.title }}</dt>
          <dd v-for="(desc, _index) of item.descs" :key="_index">{{ desc }}</dd>
        </dl>
      </IxCol>
    </IxRow>
  </div>
  <LayoutFooter></LayoutFooter>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'

import { useRouter } from 'vue-router'

import { homeLocales } from './locales'
import { appContextToken } from '../../../context'

export default defineComponent({
  setup() {
    const { breakpoints, lang, org, repo } = inject(appContextToken)!
    const router = useRouter()

    const locale = computed(() => homeLocales[lang.value])
    const buttonSize = computed(() => {
      return Object.keys(breakpoints).find(size => breakpoints[size])
    })
    const githubUrl = computed(() => `https://github.com/${org}/${repo}`)
    const gotoPage = (path: string) => {
      router.push(`${path}/${lang.value}`)
    }

    return { breakpoints, lang, locale, buttonSize, githubUrl, gotoPage }
  },
})
</script>

<style lang="less">
.home-wrapper {
  background-color: #fff;

  .home-banner {
    display: flex;
    flex-direction: column;
    position: relative;
    top: -64px;

    &-video {
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
    }

    &-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      text-align: center;
      margin-top: 72px;

      &-desc {
        text-align: center;
        color: #333;
        font-size: 32px;
        margin-bottom: 40px;
      }
    }

    .ix-button-group {
      display: flex;
      justify-content: center;
      .ix-button {
        min-width: 120px;
        border: none;
        box-shadow: none;

        a {
          text-decoration: none;
        }
      }

      .ix-button-link {
        background-color: #fff;
      }
    }

    @media (max-width: @screen-md-max) {
      .home-banner {
        &-video {
          left: -10%;
          width: 120%;
        }
        &-title {
          margin-top: 40px;
          &-desc {
            font-size: 24px;
            margin-bottom: 24px;
          }
          .ix-button-group {
            .ix-button {
              min-width: 96px;
            }
          }
        }
      }
    }

    @media (max-width: @screen-sm-max) {
      .home-banner {
        &-video {
          left: -25%;
          width: 140%;
        }
        &-title {
          margin-top: 32px;
          &-desc {
            font-size: 18px;
            margin-bottom: 16px;
          }
          .ix-button-group {
            .ix-button {
              min-width: 88px;
            }
          }
        }
      }
    }

    @media (max-width: @screen-xs-max) {
      .home-banner {
        &-video {
          left: -45%;
          width: 160%;
        }
        &-title {
          margin-top: 28px;
          &-desc {
            font-size: 14px;
            margin-bottom: 16px;
          }
          .ix-button-group {
            .ix-button {
              border-radius: 24px;
              width: 80px;
            }
          }
        }
      }
    }
  }

  .home-comp-properties-wrapper {
    position: relative;
    top: -32px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    border-radius: 4px;
    max-width: 960px;

    .home-comp-properties {
      &-img {
        width: 260px;
        height: 140px;
        background-repeat: no-repeat;
      }

      dl {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        text-align: center;
        padding-bottom: 16px;

        dt {
          font-size: 20px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;

          strong {
            color: var(--ix-color-primary-text);
          }
        }

        dd {
          font-size: 14px;
          line-height: 24px;
          color: #333;
        }
      }
    }
  }
}
</style>
