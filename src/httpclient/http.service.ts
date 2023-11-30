import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { inject, injectable } from 'inversify';
import { AppLogger } from '../app/app.logger';

@injectable()
class HttpClient {
    private readonly client: AxiosInstance;

    constructor(@inject(AppLogger) private logger: AppLogger) {
        this.client = axios.create({
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Add request interceptor
        this.client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
            // Modify the request config if needed
            logger.info("Making network request: \n%s %s\nHEADERS %s \nDATA %o", config.method?.toUpperCase(), config.url, JSON.stringify(config.headers), JSON.stringify(config.data));
            return config;
        }, (error: any) => {
            // Handle request error
            logger.error("Request error: \n%o", error.data);
            return Promise.reject(error);
        });

        // Add response interceptor
        this.client.interceptors.response.use((response: AxiosResponse) => {
            // Modify the response data if needed
            logger.info("Response received: %o\n", JSON.stringify(response.data));
            return response;
        }, (error: any) => {
            // Handle response error
            logger.error("Response error: %o", error.message);
            return Promise.reject(error);
        });
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.get(url, config);
        return response.data;
    }

    async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.post(url, data, config);
        return response.data;
    }

    async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.put(url, data, config);
        return response.data;
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.delete(url, config);
        return response.data;
    }
}

export default HttpClient;
