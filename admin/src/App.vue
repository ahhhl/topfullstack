<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class App extends Vue {}
</script>

<style>
body {
  margin: 0;
}

.el-upload-list--picture .el-upload-list__item,
.avue-upload__avatar {
  height: auto !important;
}
</style>
