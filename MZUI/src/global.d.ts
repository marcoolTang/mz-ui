/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 声明外部依赖，避免构建时报错
declare module '@http' {
  export const http: any
}

declare module '@utils' {
  export const eventBus: any
  export const deepClone: any
  export const dateFormater: any
}

declare module 'vue-router' {
  export function useRoute(): any
  export function useRouter(): any
}

// Window 类型扩展
interface Window {
  Vue: any
}
