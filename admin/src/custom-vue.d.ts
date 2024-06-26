import Vue from 'vue';
import { AxiosInstance } from 'axios';

// 设置你想要补充的类型
// 在 types/vue.d.ts 里 Vue 有构造函数类型
declare module 'vue/types/vue' {
  // 声明为 Vue 补充的东西
  interface Vue {
    $http: AxiosInstance;
  }
}
