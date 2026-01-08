import Logo from '../assets/Logo_Icon.svg'

interface RedirectProps {
  targetUrl?: string
}

export function Redirect({ targetUrl = '#' }: RedirectProps) {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-4 sm:p-10 bg-gray-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-auto text-center">
        <div className="mb-6">
          <img src={Logo} alt="Brev.ly" className="h-12 w-auto mx-auto" />
        </div>

        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            Redirecionando...
          </h1>
        </div>

        <div className="text-gray-600 text-sm space-y-2">
          <p>O link será aberto automaticamente em alguns instantes.</p>
          <p>
            Não foi redirecionado?{' '}
            <a
              href={targetUrl}
              className="text-primary hover:text-primary-dark underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Acesse aqui
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
