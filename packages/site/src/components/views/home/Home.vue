<template>
  <div class="home-content-wrapper">
    <div class="home-banner">
      <div class="video-wrapper">
        <video src="https://idux-cdn.sangfor.com.cn/medias/home-banner.mp4" autoplay loop muted>
          {{ locale.videoErr }}
        </video>
        <div class="home-banner-title-wrapper">
          <h1 class="home-banner-title"> {{ locale.bannerTitle }} </h1>
          <div class="home-banner-title-desc">{{ locale.bannerTitleDesc }}</div>
          <IxButtonGroup class="home-banner-btn-group" :size="breakpoints.xs ? 'md' : 'lg'">
            <IxButton mode="primary" @click="gotoPage('/docs/introduce')">{{ locale.start }}</IxButton>
            <IxButton mode="link" :href="githubUrl" target="_blank">{{ locale.github }}</IxButton>
          </IxButtonGroup>
        </div>
      </div>
    </div>
    <IxRow class="home-comp-properties-wrapper">
      <IxCol v-for="(item, index) of locale.compProperties" :key="index" xs="24" sm="12" class="home-comp-properties">
        <dl>
          <div class="home-comp-properties-img"></div>
          <dt>{{ item.title }}</dt>
          <dd v-for="(desc, _index) of item.descs" :key="_index">{{ desc }}</dd>
        </dl>
      </IxCol>
    </IxRow>
    <!-- <div class="home-desc">
    <h3 class="home-desc-h3 home-desc-scene">{{ locale.sceneDesc[0] }}</h3>
    <h2 class="home-desc-h2 home-desc-scene">{{ locale.sceneDesc[1] }}</h2>
    <h2 class="home-desc-h2 home-desc-welcome">{{ locale.welcome[0] }}</h2>
    <p class="home-desc-p home-desc-welcome">{{ locale.welcome[1] }}</p>
  </div>
  <div class="home-comments">
    <div v-for="(item, index) of locale.comments" :key="index" class="home-comments-item">
      <dl>
        <dt>{{ item.desc }}</dt>
        <dd>{{ item.author }}</dd>
      </dl>
    </div>
  </div> -->
  </div>
  <LayoutFooter></LayoutFooter>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'

import { useRouter } from 'vue-router'

import { appContextToken } from '../../../context'
import { homeLocales } from './locales'

export default defineComponent({
  setup() {
    const { breakpoints, lang, org, repo } = inject(appContextToken)!
    const router = useRouter()

    const locale = computed(() => homeLocales[lang.value])
    const githubUrl = computed(() => `https://github.com/${org}/${repo}`)
    const gotoPage = (path: string) => {
      router.push(`${path}/${lang.value}`)
    }

    return { breakpoints, lang, locale, githubUrl, gotoPage }
  },
})
</script>

<style lang="less">
.home-content-wrapper {
  background-color: #f0eff0;

  .home-banner {
    display: flex;
    flex-direction: column;
    position: relative;
    top: -75px;
    width: 100%;
    padding-bottom: 28.92%;
    background-color: #f4f8ff;

    .video-wrapper {
      position: relative;

      video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;

        @media (max-width: @screen-xs-max) {
          left: -25%;
          width: 140%;
        }
      }
    }

    &-title-wrapper {
      position: absolute;
      top: 50%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 9%;
      width: 960px;
      gap: 20px;
      @media (max-width: @screen-md-max) {
        margin-top: 7%;
      }
      @media (max-width: @screen-xs-max) {
        margin-top: 5%;
      }
    }

    &-title {
      font-size: 64px;
      color: #333;
      margin-bottom: 8px;
      @media (max-width: @screen-md-max) {
        font-size: 48px;
      }
      @media (max-width: @screen-xs-max) {
        display: none;
      }

      &-desc {
        margin-top: 16px;
        font-size: 40px;
        color: #333;
        @media (max-width: @screen-md-max) {
          font-size: 32px;
        }
        @media (max-width: @screen-xs-max) {
          margin-top: 48px;
          text-align: center;
          font-size: 20px;
        }
      }
    }

    &-btn-group {
      &.ix-button-group {
        @media (max-width: @screen-xs-max) {
          text-align: center;
        }
        .ix-button {
          margin: 0 16px;
          font-size: 18px;
          height: 40px;
          line-height: 40px;
          padding: 0;
          width: 160px;
          border-radius: 32px;
          border-color: @color-primary;
          color: @color-primary;
          box-shadow: unset;

          @media (max-width: @screen-xs-max) {
            font-size: 14px;
            width: 100px;
            border-radius: 20px;
          }
        }

        .ix-button-primary {
          color: #fff;
        }

        .ix-button-link {
          background-color: #fff;
        }
      }
    }
  }

  .home-comp-properties-wrapper {
    position: relative;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -12.5%);
    border-radius: 4px;
    max-width: 960px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

    @media (max-width: @screen-xs-max) {
      transform: translate(-50%, -1%);
      padding: 0 8px;
    }

    .home-comp-properties {
      background-color: #fff;
      &-img {
        width: 128px;
        height: 128px;
        background-repeat: no-repeat;
      }

      &:nth-child(1) {
        .home-comp-properties-img {
          background-image: url('/icons/comp-properties-1.png');
        }
      }

      &:nth-child(2) {
        .home-comp-properties-img {
          background-image: url('/icons/comp-properties-2.png');
        }
      }

      &:nth-child(3) {
        .home-comp-properties-img {
          background-image: url('/icons/comp-properties-3.png');
        }
      }

      &:nth-child(4) {
        .home-comp-properties-img {
          background-image: url('/icons/comp-properties-4.png');
        }
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
            color: @color-primary;
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

  .home-desc {
    display: flex;
    flex-direction: column;
    position: relative;
    text-align: center;

    &-h3 {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      color: #000;
    }

    &-h2 {
      font-family: PingFangSC-Medium;
      font-size: 24px;
      color: #000;

      &.home-content-desc-scene {
        margin: 26px 0 90px;
      }
    }

    &-p {
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #666;
    }
  }

  .home-comments {
    display: grid;
    width: 980px;
    grid-template-columns: repeat(auto-fill, 320px);
    grid-gap: 10px;
    justify-content: space-between;
    margin: 20px auto;

    &-item {
      display: flex;
      flex-direction: column;
      border-radius: 4px;
      padding: 16px 20px 16px 54px;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
