<template>
  <div>
    <el-row>
      <el-col :span="15">
        <el-select v-model="value" @change="handleSelectionChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-table
      :data="table_data"
      highlight-current-row
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column
        type="index"
        width="50"
      />
      <el-table-column
        prop="issue_title"
        label="类型"
        width="300"
      >
        <template slot-scope="scope">
          <a :href="scope.row.issue_url" target="_blank" class="buttonText">{{ scope.row.issue_title }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="issue_count"
        label="数量"
        sortable
        width="150"
        align="center"
      />
      <el-table-column
        prop="issue_jql"
        label="过滤条件"
        align="center"
      />
    </el-table>
  </div>
</template>

<script>
import CommonMethods from '@/utils/common-methods.js'
import TpProjectMethods from '@/utils/tp-project-methods.js'

export default {
  data() {
    return {
      table_data: [],
      options: [],
      value: '',
      query_version: ''
    }
  },
  mounted() {
    this.getVersionInfo()
  },
  methods: {
    async getJiraInfo() {
      this.table_data = []
      var temptable_data = []
      var args = {
        query_version: this.query_version
      }
      var response = await CommonMethods.request_get('get_jira_info', args)
      response.data.forEach(function(jira_issue_info) {
        var single_issue_info = {}
        single_issue_info['issue_title'] = jira_issue_info.issue_title
        single_issue_info['issue_url'] = jira_issue_info.issue_url
        single_issue_info['issue_jql'] = jira_issue_info.issue_jql
        single_issue_info['issue_count'] = jira_issue_info.issue_count
        temptable_data.push(single_issue_info)
      })
      this.table_data = temptable_data
    },
    handleSelectionChange(val) {
      this.query_version = val
      this.getJiraInfo()
    },
    async getVersionInfo() {
      var temp_options = []
      var temp_version = await TpProjectMethods.getVersionInfo()
      temp_version.forEach(function(tp_version) {
        var version_info = {}
        version_info['value'] = tp_version
        version_info['label'] = tp_version
        temp_options.push(version_info)
      })
      this.options = temp_options
      this.value = this.options[this.options.length - 1].value
      this.query_version = this.value
      this.getJiraInfo()
    }
  }
}
</script>
