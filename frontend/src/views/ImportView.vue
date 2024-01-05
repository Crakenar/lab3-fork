<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <input type="file" @change="onFileChange" class="form-control">
      </div>
      <div class="form-group">
        <label for="upload-file-label" class="form-label">Uploaded file label:</label>
        <input name="upload-file-label" type="text" v-model="uploadedFileLabel" class="form-control">
      </div>
      <button type="submit" class="submit-btn">Upload</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import http from '../http-common';

export default {
  setup() {
    const file = ref<File | null>(null);
    const uploadedFileLabel = ref<string>('');

    const onFileChange = (e: Event) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        file.value = files[0]; // Assign the file value
      }
    };

    const onSubmit = async () => {
      if (!file.value) {
        return;
      }

      // eslint-disable-next-line no-debugger
      debugger;

      const formData = new FormData();

      if (file.value) {
        console.log(file.value);
        formData.append('file', file.value);
      }

      if(uploadedFileLabel.value) {
        formData.append('fileName', uploadedFileLabel.value);
      }

      try {
        const response = await http.post('/api/import/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    return { uploadedFileLabel, onFileChange, onSubmit};
  },
};
</script>

<style scoped>
.form-container {
  width: 100%;
  max-width: 600px;
  margin: 150px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-label {
  display: block;
  margin-bottom: 10px;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>