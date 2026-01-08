import axios from 'axios'

export async function exportLink() {
  const response = await axios.post('http://localhost:3333/links/export', {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response.data
}
