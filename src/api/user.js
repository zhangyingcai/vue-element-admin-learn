import request from '@/utils/request'

export function login() {
  return request({
    url: '/user/login',
    method: 'get'
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

// 模拟登陆
export function testLogin() {
  return request({
    url: '/user/testLogin',
    method: 'get'
  })
}
