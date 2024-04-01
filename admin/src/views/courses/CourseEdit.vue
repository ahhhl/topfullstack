<template>
  <div>
    <h3>{{ isNew ? '创建' : '编辑' }}课程</h3>
    <ele-form
      :form-data="data"
      :form-desc="fields"
      :request-fn="handleSubmit"
    ></ele-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class extends Vue {
  @Prop(String) id!: string;

  data = {};
  fields = {
    name: { label: '课程名称', type: 'input' },
    cover: { label: '课程封面图', type: 'input' },
  };

  get isNew() {
    return !this.id;
  }

  async fetch() {
    const res = await this.$http.get(`courses/${this.id}`);
    this.data = res.data;
  }
  created() {
    !this.isNew && this.fetch();
  }

  async handleSubmit(data: any) {
    const url = this.isNew ? 'courses' : `courses/${this.id}`;
    const method = this.isNew ? 'post' : 'put';
    await this.$http[method](url, data);
    this.data = {};
    this.$message.success('保存成功');
    this.$router.go(-1);
  }
}
</script>

<style lang="" scoped></style>
