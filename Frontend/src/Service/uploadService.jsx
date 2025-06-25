import { toast } from 'react-toastify';
import axios from 'axios';

export const uploadImage = async event => {
  let toastId = null;

  const file = event.target.files?.[0];
  if (!file) {
    toast.warning("No file selected");
    return null;
  }

  if (file.type !== 'image/jpeg' && file.type !== 'image/jpg') {
    toast.error("Only JPG files are allowed");
    return null;
  }

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post('http://localhost:5000/api/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: ({ loaded, total }) => {
        const progress = loaded / total;
        if (toastId)
          toast.update(toastId, { progress });
        else
          toastId = toast.loading('Uploading...', { progress });
      },
    });

    toast.dismiss(toastId);
    toast.success('Image uploaded!');
    return response.data.imageUrl;
  } catch (err) {
    toast.dismiss(toastId);
    toast.error('Upload failed!');
    console.error(err);
    return null;
  }
};
