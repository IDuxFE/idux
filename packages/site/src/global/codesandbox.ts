import { getParameters } from 'codesandbox/lib/api/define'

export const getCsbParams = (code: string): string => {
  return getParameters({
    template: 'node',
    files: {
      'package.json': {
        content: {
          scripts: {
            dev: 'vite',
          },
          dependencies: {
            vue: 'next',
            '@idux/components': 'latest',
            '@idux/pro': 'latest',
            '@idux/cdk': 'latest',
          },
          devDependencies: {
            '@vitejs/plugin-vue': 'latest',
            less: 'latest',
            typescript: 'latest',
            vite: 'latest',
          },
        },
        isBinary: false,
      },
      'tsconfig.json': {
        content: tsconfigJson,
        isBinary: false,
      },
      'vite.config.ts': {
        content: viteConfigTs,
        isBinary: false,
      },
      'index.html': {
        content: indexHtml,
        isBinary: false,
      },
      'src/Demo.vue': {
        content: decodeURIComponent(code),
        isBinary: false,
      },
      'src/App.vue': {
        content: appVue,
        isBinary: false,
      },
      'src/main.ts': {
        content: mainTs,
        isBinary: false,
      },
      'src/idux.ts': {
        content: iduxTs,
        isBinary: false,
      },
      'src/env.d.ts': {
        content: envDTs,
        isBinary: false,
      },
    },
  })
}

const indexHtml = `
<!DOCTYPE html>
<html>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>`

const mainTs = `
import { createApp } from 'vue';
import Idux from './idux';
import App from './App.vue';
createApp(App).use(Idux).mount('#app');`

const appVue = `
<template>
  <IxDrawerProvider ref="drawerProviderRef">
  <IxModalProvider ref="modalProviderRef">
    <IxNotificationProvider>
      <IxMessageProvider>
        <Demo />
      </IxMessageProvider>
    </IxNotificationProvider>
  </IxModalProvider>
  </IxDrawerProvider>
</template>
<script>
import { defineComponent } from 'vue';
import Demo from './Demo.vue';

export default defineComponent({
  components: {
    Demo,
  },
});
</script>
<style>
#app {
  margin-top: 40px;
  margin-left: 20px;
}
</style>`

const iduxTs = `
import { App } from 'vue';
import IduxCdk from '@idux/cdk';
import IduxComponents from '@idux/components';
import IduxPro from '@idux/pro';

import '@idux/components/default.min.css';
import '@idux/pro/default.min.css';

import { createGlobalConfig } from "@idux/components/config";
import {
  IDUX_ICON_DEPENDENCIES,
  addIconDefinitions
} from '@idux/components/icon';
// import { enUS } from "@idux/components/locales";

addIconDefinitions(IDUX_ICON_DEPENDENCIES);

const loadIconDynamically = (iconName: string) => {
  return fetch(\`https://idux-cdn.sangfor.com.cn/icons/\${iconName}.svg\`).then((res) => res.text());
};

const globalConfig = createGlobalConfig({
  // 默认为中文，可以打开注释设置为其他语言
  // locale: enUS,
  icon: { loadIconDynamically },
});

const install = (app: App): void => {
  app.use(IduxCdk).use(IduxComponents).use(IduxPro).use(globalConfig);
};

export default { install };`

const envDTs = `
/// <reference types="vite/client" />
/// <reference types="@idux/cdk/types" />
/// <reference types="@idux/components/types" />
/// <reference types="@idux/pro/types" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}`

const tsconfigJson = `
{
  "compilerOptions": {
    "target": "esnext",
    "useDefineForClassFields": true,
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": ["esnext", "dom"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}`

const viteConfigTs = `
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: "@import '@idux/components/style/variable/index.less';",
      },
    },
  },
})`
