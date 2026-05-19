export async function uploadVideo(file: File) {

  const formData = new FormData()

  formData.append("file", file)

  const response = await fetch(
    "http://127.0.0.1:8000/upload-video",
    {
      method: "POST",
      body: formData,
    }
  )

  return response.json()
}