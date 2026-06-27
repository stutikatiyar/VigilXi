const API_URL = "https://legendary-palm-tree-xr597rpqpvfvj7v-8000.app.github.dev";

export async function uploadVideo(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload-video`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error(`Upload failed: ${response.status}`);
  return await response.json();
}

export async function pollResult(jobId: string) {
  const response = await fetch(`${API_URL}/result/${jobId}`);
  if (!response.ok) throw new Error(`Poll failed: ${response.status}`);
  return await response.json();
}