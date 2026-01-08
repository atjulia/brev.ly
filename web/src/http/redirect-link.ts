import axios from 'axios'

interface RedirectLinkParams {
  code: string
}

export async function redirectLink({ code }: RedirectLinkParams) {
  const response = await axios.get(`http://localhost:3333/resolve/${code}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response.data
}
