import axios from 'axios'

interface Link {
  id: string
  url: string
  shortCode: string
  shortUrl: string
  createdAt: string
  clickCount?: number
}

interface GetLinksResponse {
  links: Link[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

interface GetLinksOptions {
  page?: number
  limit?: number
  signal?: AbortSignal
}

export async function getLinks(options: GetLinksOptions = {}) {
  const { page = 1, limit = 10, signal } = options

  const response = await axios.get<GetLinksResponse>(
    'http://localhost:3333/links',
    {
      params: { page, limit },
      headers: {
        'Content-Type': 'application/json',
      },
      signal,
    }
  )

  return response.data
}
