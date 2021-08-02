import request from '@/utils/request.js'

export const getFansInfo = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/followers'
  })
}
