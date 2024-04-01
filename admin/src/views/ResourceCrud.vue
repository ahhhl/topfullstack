<template>
  <div>
    <h3>课程列表</h3>
    <!-- <el-button
      type="success"
      size="mini"
      @click="$router.push('/courses/create')"
      >创建课程</el-button
    > -->
    <avue-crud
      v-if="option.column"
      :option="option"
      :data="data.data"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class extends Vue {
  @Prop(String) resource!: string;
  data = {};
  option = {};

  async fetch() {
    const res = await this.$http.get(this.resource);
    this.data = res.data;
  }
  async fetchOption() {
    const res = await this.$http.get(`${this.resource}/option`);
    this.option = res.data;
  }
  async create(row: any, done: any) {
    await this.$http.post(this.resource, row);
    this.$message.success('创建成功');
    this.fetch();
    done();
  }

  async update(row: any, index: any, done: any) {
    await this.$http.put(`${this.resource}/${row._id}`, row);
    this.$message.success('修改成功');
    this.fetch();
    done();
  }

  async remove(row: any) {
    await this.$confirm('是否确认删除？');
    await this.$http.delete(`${this.resource}/${row._id}`);
    this.$message.success('删除成功');
    this.fetch();
  }
  created() {
    this.fetchOption();
    this.fetch();
  }
}
</script>

<style lang="" scoped></style>
