import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface TSRequestIntercept<T = AxiosResponse> {
    requestInterceptor?: (confing: AxiosRequestConfig) => AxiosRequestConfig
    requestInterceptorCatch?: (error: any) => any
    responseInterceptor?: (res: T) => T
    responseInterceptorCatch?: (error: any) => any
}

export interface TSRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?: TSRequestIntercept<T>
    showLoading?: boolean
}
