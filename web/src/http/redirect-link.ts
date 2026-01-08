import axios from 'axios'

interface RedirectLinkParams {
  code: string
}

export async function redirectLink({ code }: RedirectLinkParams) {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/resolve/${code}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  return response.data
}
