import TSRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCatch from '@/utils/catch'

const tsRequest = new TSRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    interceptors: {
        requestInterceptor: (config) => {
            const token = localCatch.getCatch('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        requestInterceptorCatch: (err) => {
            console.log('请求失败')

            return err
        },
        responseInterceptor: (res) => {
            return res
        },
        responseInterceptorCatch: (err) => {
            console.log('响应失败')
            return err
        }
    }
})

export default tsRequest
