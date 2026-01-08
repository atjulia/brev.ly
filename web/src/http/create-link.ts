import axios from 'axios'

interface CreateLinkParams {
  url: string
  alias: string
}

interface CreateLinkResponse {
  id: string
  originalUrl: string
  shortUrl: string
  alias: string
  createdAt: string
}

export async function createLink({ url, alias }: CreateLinkParams) {
  const response = await axios.post<CreateLinkResponse>(
    `${import.meta.env.VITE_BACKEND_URL}/links`,
    {
      url,
      alias,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  return response.data
}
