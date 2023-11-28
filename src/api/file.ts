import request from '@/utils/request';
import type { FileInfo } from '@/types/file';

export const uploadFile = (file: File): Promise<FileInfo> => {
  const formData = new FormData();
  formData.append('file', file);

  return request({
    url: '/file/upload',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
