import request from '@/utils/request'

export function convertData(params) {
  return request({
    url: '/parse_quote_data',
    method: 'get',
    params
  })
}
