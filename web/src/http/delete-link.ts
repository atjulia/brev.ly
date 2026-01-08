import axios from 'axios'

interface DeleteLinkParams {
  id: string
}

export async function deleteLink({ id }: DeleteLinkParams) {
  const response = await axios.delete(`http://localhost:3333/links/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response.data
}
