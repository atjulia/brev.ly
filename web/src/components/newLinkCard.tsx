import React, { useState } from 'react'
import { InputUrl } from './ui/inputUrl'
import { InputAlias } from './ui/inputAlias'

interface NewLinkCardProps {
  onSubmit?: (url: string, alias: string) => void
  className?: string
}

export function NewLinkCard({ onSubmit }: NewLinkCardProps) {
  const [url, setUrl] = useState('')
  const [alias, setAlias] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim() && alias.trim()) {
      onSubmit?.(url, alias)
      // Reset form after submit
      setUrl('')
      setAlias('')
    }
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 sm:p-6 w-full max-w-xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Novo link</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputUrl value={url} onChange={setUrl} />

        <InputAlias value={alias} onChange={setAlias} />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
        >
          Salvar link
        </button>
      </form>
    </div>
  )
}

export default NewLinkCard
