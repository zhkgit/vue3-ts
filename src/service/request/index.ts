import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading.js'

import { TSRequestIntercept, TSRequestConfig } from './types'

const DEFAULT_LOADING = true
export default class TSRequest {
    instance: AxiosInstance
    interceptors?: TSRequestIntercept
    showLoading: boolean
    loading?: LoadingInstance
    constructor(config: TSRequestConfig) {
        this.instance = axios.create(config)
        this.interceptors = config.interceptors
        this.showLoading = config.showLoading ?? DEFAULT_LOADING
        // 部分实例拦截
        this.instance.interceptors.request.use(
            this.interceptors?.requestInterceptor,
            this.interceptors?.requestInterceptorCatch
        )
        this.instance.interceptors.response.use(
            this.interceptors?.responseInterceptor,
            this.interceptors?.responseInterceptorCatch
        )

        // 所有实例拦截拦截
        this.instance.interceptors.request.use(
            (config) => {
                if (this.showLoading) {
                    this.loading = ElLoading.service({
                        text: 'Loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    })
                }
                return config
            },
            (err) => {
                console.log('全局请求失败拦截器')
                return err
            }
        )
        this.instance.interceptors.response.use(
            (res) => {
                this.loading?.close()
                const data = res.data
                if (data.returnCode == '-1001') {
                    console.log(`请求失败, 原因：${data.error}`)
                } else {
                    return data
                }
            },
            (err) => {
                console.log('全局响应失败拦截')
                switch (err.response.status) {
                    case 401:
                        console.log('err 401')
                        break
                    case 404:
                        console.log('err 404')
                        break
                    default:
                        console.log('响应错误')
                }
                return err
            }
        )
    }
    request<T>(config: TSRequestConfig<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            if (config.interceptors?.requestInterceptor) {
                config = config.interceptors.requestInterceptor(config)
            }
            if (config.showLoading === false) {
                this.showLoading = config.showLoading
            }

            this.instance
                .request<any, T>(config)
                .then((res) => {
                    if (config.interceptors?.responseInterceptor) {
                        res = config.interceptors.responseInterceptor(res)
                    }
                    this.showLoading = DEFAULT_LOADING
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                    this.showLoading = DEFAULT_LOADING
                })
        })
    }
    get<T>(config: TSRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'GET' })
    }
    post<T>(config: TSRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'POST' })
    }
    delete<T>(config: TSRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'DELETE' })
    }
    patch<T>(config: TSRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'PATCH' })
    }
}
