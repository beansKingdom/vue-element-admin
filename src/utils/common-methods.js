import request from '@/utils/request'

class CommonMethods {
  async request_get(method, params = {}) {
    return request({
      url: method,
      method: 'get',
      params
    })
  }

  async request_post(method, data = {}) {
    return request({
      url: method,
      method: 'post',
      data
    })
  }

  format_date(new_data) {
    var mm = new_data.getMonth() + 1 // getMonth() is zero-based
    var dd = new_data.getDate()

    return [new_data.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd
    ].join('-')
  }

  format_date_minute(date) {
    // 返回字符串格式 "yyyy-mm-hh HH:MM"
    var new_data = new Date(date)

    // 解决时区问题差了8个小时
    new_data.setHours(new_data.getHours() + new_data.getTimezoneOffset() / 60)
    var hours = new_data.getHours()
    var minutes = new_data.getMinutes()

    var day_str = this.format_date(new_data)
    var minute_str = [(hours > 9 ? '' : '0') + hours,
      (minutes > 9 ? '' : '0') + minutes
    ].join(':')
    return day_str + ' ' + minute_str
  }

  check_date_type(date) {
    var query_time = null
    if (typeof (date) === 'object') {
      query_time = this.format_date(date)
    } else {
      query_time = date
    }
    return query_time
  }

  format_obj(obj) {
    return JSON.stringify(obj)
  }

  format_str_to_obj(jstring) {
    return JSON.parse(jstring)
  }
}

export default new CommonMethods()
