import axios from 'axios'

interface DeleteLinkParams {
  id: string
}

export async function deleteLink({ id }: DeleteLinkParams) {
  const response = await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/links/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  return response.data
}
