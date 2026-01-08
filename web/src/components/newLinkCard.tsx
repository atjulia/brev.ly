import React, { useState } from 'react'
import { InputUrl } from './ui/inputUrl'
import { InputAlias } from './ui/inputAlias'
import { useLinks } from '../store/create'

interface HistoryCardProps {
  className?: string
}

export function NewLinkCard({ className = '' }: HistoryCardProps) {
  const [url, setUrl] = useState('')
  const [alias, setAlias] = useState('')
  const [errors, setErrors] = useState<{
    url?: string
    alias?: string
  }>({})

  const { addLink } = useLinks()

  const isValidUrl = (value: string) => {
    try {
      const url = new URL(value)

      return (
        (url.protocol === 'http:' || url.protocol === 'https:') &&
        Boolean(url.hostname)
      )
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

    addLink(url, alias)

    setUrl('')
    setAlias('')
  }

  return (
    <div
      className={`bg-gray-100 rounded-lg p-4 sm:p-6 w-full max-w-xl ${className}`}
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-600">Novo link</h2>
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
