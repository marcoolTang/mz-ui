import axios from 'axios'

// 简化的 HTTP 客户端，用于组件库
function createHttp() {
  const client = axios.create({
    timeout: 1000 * 60 * 10,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // 请求拦截器
  client.interceptors.request.use((request) => {
    // 可以在这里添加 token 等
    return request
  })

  // 响应拦截器
  client.interceptors.response.use(
    (response) => {
      return response.data
    },
    (error) => {
      console.error('HTTP Error:', error)
      return Promise.reject(error)
    }
  )

  return client
}

export const http = createHttp()
export const httpService = createHttp()
