import { BaseResponse, NicoDropzoneFile } from './types';
import FetchClient from '@nicotordev/fetch-client';

/**
 * Class to handle uploading, retrieving, and deleting files via a REST API.
 */
export default class NicoDropzone {
  private post: FetchClient['post'];
  private get: FetchClient['get'];
  private delete: FetchClient['delete'];

  private basePath: string;
  private apiKey: string;

  /**
   * Creates an instance of NicoDropzone.
   * @param baseURL - The base URL of the API.
   * @param apiKey - API key for authentication.
   * @param basePath - Base path used to organize uploaded files.
   */
  constructor(baseURL: string, apiKey: string, basePath: string) {
    const fetchClient = new FetchClient(baseURL);
    this.post = fetchClient.post.bind(fetchClient);
    this.get = fetchClient.get.bind(fetchClient);
    this.delete = fetchClient.delete.bind(fetchClient);
    this.basePath = basePath;
    this.apiKey = apiKey;
  }

  /**
   * Uploads multiple files to a specific path on the server.
   * @param path - Relative path from `basePath` where files will be stored.
   * @param files - An array of File objects to upload.
   * @returns A promise that resolves with an array of uploaded file metadata.
   */
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
          'x-api-key': this.apiKey,
        },
      },
    );

    return data || [];
  }

  /**
   * Retrieves files stored at the given path.
   * @param path - Relative path from `basePath` to look for files.
   * @returns A promise that resolves with an array of file metadata, or null if no files are found.
   */
  public async getFiles(path: string): Promise<NicoDropzoneFile[] | null> {
    const finalPath = `${this.basePath}/${path}`;
    const { data } = await this.get<BaseResponse<NicoDropzoneFile[]>>(
      `/files/with-path?path=${finalPath}`,
    );

    return data || [];
  }

  /**
   * Deletes a file by its source path, with optional preview URL.
   * @param src - The source path of the file to delete.
   * @param preview - Optional preview URL (if applicable).
   */
  public async deleteFile(src: string, preview: string | null) {
    const query = preview ? `?src=${src}&preview=${preview}` : `?src=${src}`;
    await this.delete('/files' + query, {
      headers: {
        'x-api-key': this.apiKey,
      },
    });
  }
}
