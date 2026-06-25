export async function uploadVideo(file: File) {

  const formData = new FormData()

  formData.append("file", file)

  const response = await fetch(
    "https://legendary-palm-tree-xr597rpqpvfvj7v-8000.app.github.dev/upload-video",
    {
      method: "POST",
      body: formData,
    }
  )

  return await response.json()
}