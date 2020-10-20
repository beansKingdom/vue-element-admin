<template>
  <div>
    <el-row>
      <div class="tool_title">
        <span style="align: middle">Quote Data数据转义</span>
      </div>
    </el-row>
    <el-row>
      <el-col :span="112">
        <div style="margin: 20px 20px">
          <el-input
            v-model="input_quote_data"
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 6 }"
            placeholder="Example: http://www.baidu.com/search?scope=bbs&q=C%E8%AF%AD%E8%A8%80"
          />
        </div>
      </el-col>
      <el-col :span="13">
        <div style="margin: 70px 10px">
          <el-button type="primary" round @click="convertData">转码</el-button>
        </div>
      </el-col>
      <el-col :span="112">
        <div style="margin: 20px 20px">
          <el-input
            v-model="convert_data"
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 6 }"
            placeholder="http://www.baidu.com/search?scope=bbs&q=C语言"
            :disabled="true"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style>
.el-col-112 {
  width: 40%;
  padding: 2px 4px;
}

.el-col-13 {
  width: 100px;
  height: 182px;
  padding: 0px;
  text-align: center;
  margin: auto;
}

.tool_title {
  padding: 20px 20px 2px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: large;
}
.el-main {
  padding: 5px 0px;
}

.el-textarea__inner {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
}
</style>

<script>
import CommonMethods from '@/utils/common-methods'

export default {
  data() {
    return {
      input: '',
      input_quote_data: '',
      convert_data: ''
    }
  },
  methods: {
    async convertData() {
      var params = {
        quote_data: this.input_quote_data
      }
      var res = await CommonMethods.request_get('/parse_quote_data', params)
      this.convert_data = res.data
    }
  }
}
</script>
