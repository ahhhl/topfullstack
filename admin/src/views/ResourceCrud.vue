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
      :page="page"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      @on-load="changePage"
      @sort-change="changeSort"
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
  page = {
    total: 0,
    currentPage: 1,
    pageSize: 10,
  };

  query: any = {
    // limit: this.page.pageSize,
    // sort: { _id: 0 },
  };

  async changePage(page: any) {
    this.query.limit = page.pageSize;
    this.query.page = page.currentPage;
    this.fetch();
  }

  async changeSort({ prop, order }) {
    if (!order) {
      this.query.sort = null;
    } else {
      this.query.sort = {
        [prop]: order === 'ascending' ? 1 : -1,
      };
    }
    this.fetch();
  }

  async fetch() {
    const res = await this.$http.get(`${this.resource}`, {
      params: {
        query: JSON.stringify(this.query),
      },
    });
    this.data = res.data;
    this.page.total = res.data.total;
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
    // this.fetch();
  }
}
</script>

<style lang="" scoped></style>
