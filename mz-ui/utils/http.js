import axios from 'axios';
import { useUserStore } from '@store'
import router from '../router/index'
import { ElMessage } from 'element-plus';
function createHttp() {
  const client = axios.create({
    baseURL: import.meta.env.VITE_SERVICE_URL,
    timeout: 1000 * 60 * 10,
    headers: {
      "Content-Type": 'application/json'
    }
  });

  client.interceptors.request.use((request) => {
    const user = useUserStore()
    if (request.url.indexOf('common') == -1) {
      if (router.currentRoute.value.meta?.requestKey) {
        request.url = router.currentRoute.value.meta.requestKey + request.url
      }
    }
    else{
      request.url = request.url.replace('common' , 'user-center')
    }
    const authorization = user.token
    if (authorization) {
      request.headers.Authorization = 'Bearer ' + authorization
    }
    return request
  })

  client.interceptors.response.use((response) => {
    if( response.data.code == 500 ){
      ElMessage.error(response.data.msg)
    }
    return response.data
  }, error => {
    const user = useUserStore()
    if (error.status == 403) {
      user.logout()
      return Promise.resolve()
    }
  })

  return client;
}

export const http = createHttp();

export const httpService = createHttp();
