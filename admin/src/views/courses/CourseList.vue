<template>
  <div>
    <h3>课程列表</h3>
    <el-button
      type="success"
      size="mini"
      @click="$router.push('/courses/create')"
      >创建课程</el-button
    >
    <el-table :data="data.data" border stripe>
      <el-table-column
        v-for="(field, name) in fields"
        :prop="name"
        :key="name"
        :label="field.label"
        :width="field.width"
      >
      </el-table-column>
      <el-table-column label="操作" :width="200">
        <template v-slot="{ row }">
          <el-button
            type="success"
            size="mini"
            @click="$router.push(`/courses/edit/${row._id}`)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" @click="remove(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class extends Vue {
  data = {};
  fields = {
    _id: { label: 'ID' },
    name: { label: '课程名称' },
    cover: { label: '课程封面图' },
  };
  async fetch() {
    const res = await this.$http.get('courses');
    this.data = res.data;
  }
  created() {
    this.fetch();
  }

  async remove(row: any) {
    await this.$confirm('是否确认删除？');
    await this.$http.delete(`courses/${row._id}`);
    this.$message.success('删除成功');
    this.fetch();
  }
}
</script>

<style lang="" scoped></style>
