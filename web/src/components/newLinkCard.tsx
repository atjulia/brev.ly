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
  const [errors, setErrors] = useState<{
    url?: string
    alias?: string
  }>({})

  const isValidUrl = (value: string) => {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: {
      url?: string
      alias?: string
    } = {}

    if (!url.trim()) {
      newErrors.url = 'O link original é obrigatório'
    } else if (!isValidUrl(url)) {
      newErrors.url = 'Informe uma URL válida'
    }

    if (!alias.trim()) {
      newErrors.alias = 'O link encurtado é obrigatório'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    onSubmit?.(url, alias)
  }

  return (
    <div className="bg-gray-100 rounded-lg p-4 sm:p-6 w-full max-w-xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Novo link</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputUrl
          value={url}
          onChange={value => {
            setUrl(value)
            setErrors(prev => ({ ...prev, url: undefined }))
          }}
          error={errors.url}
        />

        <InputAlias
          value={alias}
          onChange={value => {
            setAlias(value)
            setErrors(prev => ({ ...prev, alias: undefined }))
          }}
          error={errors.alias}
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200 font-medium"
        >
          Salvar link
        </button>
      </form>
    </div>
  )
}

export default NewLinkCard
