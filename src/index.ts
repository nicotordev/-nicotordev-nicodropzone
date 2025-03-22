import { NicoDropzoneError } from './errors';
import { BaseResponse, NicoDropzoneFile } from './types';

export default class NicoDropzone {
  private baseURL: string;
  private apiKey: string;
  private basePath: string;
  constructor(baseURL: string, apiKey: string, basePath: string) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    this.basePath = basePath;
  }

  private getAuthHeaders(): Record<string, string> {
    return {
      'x-api-key': this.apiKey,
    };
  }

  private async get<T = unknown>(
    endpoint: string,
    config: RequestInit = {},
  ): Promise<T> {
    try {
      const headers = {
        ...config.headers,
        ...this.getAuthHeaders(),
      };

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...config,
        method: 'GET',
        headers,
      });
      const dataReceived = await response.json();

      if (!response.ok) {
        throw new NicoDropzoneError(
          `GET error! status: ${response.status}`,
          dataReceived,
        );
      }

      return (await response.json()) as T;
    } catch (error) {
      throw error;
    }
  }

  private async post<T = unknown>(
    endpoint: string,
    data: any,
    config: RequestInit = {},
  ): Promise<T> {
    try {
      const headers = {
        ...config.headers,
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      };

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...config,
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      const dataReceived = await response.json();

      if (!response.ok) {
        throw new NicoDropzoneError(
          `POST error! status: ${response.status}`,
          dataReceived,
        );
      }

      return dataReceived as T;
    } catch (error) {
      throw error;
    }
  }
  private async put<T = unknown, P = unknown>(
    endpoint: string,
    data: P,
    config: RequestInit = {},
  ): Promise<T> {
    try {
      const headers = {
        ...config.headers,
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      };

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...config,
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      });

      const dataReceived = await response.json();

      if (!response.ok) {
        throw new NicoDropzoneError(
          `PUT error! status: ${response.status} - ${response.statusText}`,
          dataReceived,
        );
      }
      return (await response.json()) as T;
    } catch (error) {
      throw error;
    }
  }
  private async delete<T = unknown>(
    endpoint: string,
    config: RequestInit = {},
  ): Promise<T> {
    try {
      const headers = {
        ...config.headers,
        ...this.getAuthHeaders(),
      };

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...config,
        method: 'DELETE',
        headers,
      });

      const dataReceived = await response.json();

      if (!response.ok) {
        throw new NicoDropzoneError(
          `DELETE error! status: ${response.status} - ${response.statusText}`,
          dataReceived,
        );
      }
      return (await response.json()) as T;
    } catch (error) {
      throw error;
    }
  }
  private async patch<T = unknown, P = unknown>(
    endpoint: string,
    data: P,
    config: RequestInit = {},
  ): Promise<T> {
    try {
      const headers = {
        ...config.headers,
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      };

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...config,
        method: 'PATCH',
        headers,
        body: JSON.stringify(data),
      });

      const dataReceived = await response.json();

      if (!response.ok) {
        throw new NicoDropzoneError(
          `PATCH error! status: ${response.status} - ${response.statusText}`,
          dataReceived,
        );
      }
      return (await response.json()) as T;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async uploadFiles(
    path: string,
    files: File[],
  ): Promise<NicoDropzoneFile[]> {
    const finalPath = `${this.basePath}/${path}`;
    const filesFormData = new FormData();
    files.forEach((file) => {
      filesFormData.append('files', file);
    });

    const { data } = await this.post<BaseResponse<NicoDropzoneFile[]>>(
      `/files/with-path?path=${finalPath}`,
      filesFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return data || [];
  }

  public async getFiles(path: string): Promise<NicoDropzoneFile[] | null> {
    const finalPath = `${this.basePath}/${path}`;
    const { data } = await this.get<BaseResponse<NicoDropzoneFile[]>>(
      `/files/with-path?path=${finalPath}`,
    );

    return data || [];
  }

  public async deleteFile(src: string, preview: string | null) {
    try {
      const query = preview ? `?src=${src}&preview=${preview}` : '?src=${src}';
      await this.nicoDropzoneInstance.delete('/files' + query);
    } catch (err) {
      logger.error(errorsConstants.errorPrefixes.NICODROPZONE, err);
    }
  }
}
