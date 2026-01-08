import axios from 'axios'

export async function exportLink() {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/links/export`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  return response.data
}
