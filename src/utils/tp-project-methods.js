import CommonMethods from '@/utils/common-methods'

class TpProjectMethods {
  async getVersionInfo() {
    var temp_version = []
    var response = await CommonMethods.request_get('get_version_info')
    response.data.forEach(function(tp_version) {
      temp_version.push(tp_version)
    })
    return temp_version
  }

  async getProjectIssues() {
    var temp_issues = []
    var response = await CommonMethods.request_get('get_project_all_issues')
    response.data.forEach(function(single_issues) {
      temp_issues.push(single_issues.issue_count)
    })
    return temp_issues
  }

  async getPackageCount() {
    var temp_count = ''
    var response = await CommonMethods.request_get('get_total_package_count')
    temp_count = response.data.data
    return temp_count
  }

  async getMonthIssues() {
    var temp_issues_info = {
      temp_issues: [],
      temp_version: []
    }
    var response = await CommonMethods.request_get('get_month_all_issues')
    response.data.forEach(function(single_issues) {
      temp_issues_info.temp_issues.push(single_issues.issue_count)
      temp_issues_info.temp_version.push(single_issues.month_time)
    })
    return temp_issues_info
  }

  async getReviewIssuesInfo() {
    var temp_issues = []
    var response = await CommonMethods.request_get('get_review_issues')
    response.data.forEach(function(single_issues) {
      var temp_single_type_issues = {}
      for (var data_index in single_issues) {
        temp_single_type_issues[data_index] = {}
        temp_single_type_issues[data_index]['count_values'] = []
        for (var child_index in single_issues[data_index]) {
          temp_single_type_issues[data_index]['title'] = single_issues[data_index][child_index].issue_title
          temp_single_type_issues[data_index]['count_values'].push(single_issues[data_index][child_index].issue_count)
        }
      }
      temp_issues.push(temp_single_type_issues)
    })
    return temp_issues
  }

  async getPackageInfos(query_page = 1) {
    var temp_package_info = []
    var args = {
      query_page: query_page
    }
    var response = await CommonMethods.request_get('get_package_info', args)
    response.data.forEach(function(single_package_info) {
      var package_info = {}
      package_info['project_name'] = single_package_info.project_name
      package_info['package_version'] = single_package_info.package_version
      package_info['package_type'] = single_package_info.package_type
      var create_time = CommonMethods.format_date_minute(single_package_info.package_create_time)
      package_info['package_create_time'] = create_time
      package_info['package_url'] = single_package_info.package_url
      package_info['package_device'] = single_package_info.package_device
      temp_package_info.push(package_info)
    })
    return temp_package_info
  }
}

export default new TpProjectMethods()
