import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";
import { inject, injectable } from "inversify";
import { AppLogger } from "../app/app.logger";
import { WritableStream } from "stream/web";

@injectable()
export class HttpClient {
  public readonly client: AxiosInstance;

  constructor(@inject(AppLogger) private logger: AppLogger) {
    this.client = axios.create({
      headers: {
        "Content-Type": "application/json"
      }
    });

    // Add request interceptor
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Modify the request config if needed
        logger.info(
          "Making network request: \n%s %s\nHEADERS %s \nDATA %o \n\n",
          config.method?.toUpperCase(),
          config.url,
          JSON.stringify(config.headers),
          JSON.stringify(config.data)
        );
        return config;
      },
      (error: any) => {
        // Handle request error
        logger.error("Request error: \n%o", error.data);
        return Promise.reject(error);
      }
    );

    // Add response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        // Modify the response data if needed
        logger.info("Response received: %o\n", JSON.stringify(response.data));
        return response;
      },
      (error: any) => {
        // Handle response error
        logger.error("Response error: %o", error.message);
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(
      url,
      data,
      config
    );
    return response.data;
  }

  postFetch(
    url: string,
    data: any,
    callBack: ({ chunk, isEnd }: { chunk: any, isEnd: boolean }) => void
  ) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const transferEncoding = response.headers.get('transfer-encoding');
        const contentType = response.headers.get('content-type');

        // If not chunked, assume full JSON response
        if (transferEncoding !== 'chunked' && contentType?.includes('application/json')) {
          return response.json().then((data) => {
            callBack({ chunk: data, isEnd: true });
          });
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('No reader available');
        }

        const decoder = new TextDecoder();

        const read = () => {
          reader.read().then(({ done, value }) => {
            if (done) {
              callBack({ chunk: null, isEnd: true });
              reader.releaseLock();
              return;
            }

            const chunk = decoder.decode(value, { stream: true });
            callBack({ chunk, isEnd: false });
            read(); // Read next chunk
          }).catch((error) => {
            this.logger?.error?.('Error reading stream:', error);
            callBack({ chunk: null, isEnd: true });
            reader.releaseLock();
          });
        };

        read(); // Start reading
      })
      .catch((error) => {
        this.logger?.error?.('Fetch failed:', error);
        callBack({ chunk: null, isEnd: true });
      });
  }

  async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }
}

export default HttpClient;
