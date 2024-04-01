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
      :option="option"
      :data="data.data"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class extends Vue {
  data = {};
  option = {
    title: '课程管理',
    column: [
      { label: '课程名称', prop: 'name' },
      { label: '课程封面图', prop: 'cover' },
    ],
  };

  async fetch() {
    const res = await this.$http.get('courses');
    this.data = res.data;
  }
  async create(row: any, done: any) {
    await this.$http.post('/courses', row);
    this.$message.success('创建成功');
    this.fetch();
    done();
  }

  async update(row: any, index: any, done: any) {
    await this.$http.put(`/courses/${row._id}`, row);
    this.$message.success('修改成功');
    this.fetch();
    done();
  }

  async remove(row: any) {
    await this.$confirm('是否确认删除？');
    await this.$http.delete(`courses/${row._id}`);
    this.$message.success('删除成功');
    this.fetch();
  }
  created() {
    this.fetch();
  }
}
</script>

<style lang="" scoped></style>
