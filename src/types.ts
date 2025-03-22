type BaseResponse<T> = {
  data: T | null;
  meta: {
    message: string;
    status: number;
    ok: boolean;
  };
};

type NicoDropzoneFile = {
  name: string;
  src: string;
  type: string;
  nameWithoutExtension: string;
  sizeInMB: number;
  preview: string;
};

export type { BaseResponse, NicoDropzoneFile };
