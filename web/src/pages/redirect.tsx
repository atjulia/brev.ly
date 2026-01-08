import Logo from '../assets/Logo_Icon.svg'
import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { redirectLink } from '../http/redirect-link'

export function Redirect() {
  const { code } = useParams()
  const navigate = useNavigate()

  const [targetUrl, setTargetUrl] = useState<string | null>(null)
  const hasResolved = useRef(false)

  useEffect(() => {
    if (!code || hasResolved.current) return
    hasResolved.current = true

    async function resolve() {
      try {
        const response = await redirectLink({ code: code! })
        const url = response.url

        setTargetUrl(url)

        setTimeout(() => {
          window.location.href = url
        }, 800)
      } catch (err) {
        console.error('Redirection error:', err)
        navigate('/not-found', { replace: true })
      }
    }

    resolve()
  }, [code, navigate])

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-4 sm:p-10 bg-gray-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-auto text-center">
        <div className="mb-6">
          <img src={Logo} alt="Brev.ly" className="h-12 w-auto mx-auto" />
        </div>

        <h1 className="text-xl font-bold text-gray-800 mb-4">
          Redirecionando...
        </h1>

        <p className="text-gray-600 text-sm mb-2">
          O link será aberto automaticamente.
        </p>

        {targetUrl && (
          <p className="text-sm">
            Não foi redirecionado?{' '}
            <a
              href={targetUrl}
              className="text-primary underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Acesse aqui
            </a>
          </p>
        )}
      </div>
    </div>
  )
}
