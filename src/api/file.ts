import request from '@/utils/request';

export const uploadFile = (file: File): Promise<{ url: string }> => {
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
