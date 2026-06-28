const API_URL = "https://proving-grudging-earflap.ngrok-free.dev"

export async function uploadVideo(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload-video`, {
    method: "POST",
    headers: { "ngrok-skip-browser-warning": "true" },
    body: formData,
  });

  if (!response.ok) throw new Error(`Upload failed: ${response.status}`);
  return await response.json();
}

export async function pollResult(jobId: string) {
  const response = await fetch(`${API_URL}/result/${jobId}`, {
    headers: { "ngrok-skip-browser-warning": "true" },
  });
  if (!response.ok) throw new Error(`Poll failed: ${response.status}`);
  return await response.json();
}