import { TriangleAlert } from 'lucide-react'

interface InputUrlProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

export function InputUrl({ value, onChange, error }: InputUrlProps) {
  return (
    <div>
      <label
        htmlFor="url"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Link original
      </label>

      <input
        id="url"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="https://www.exemplo.com.br"
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2
          ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
      />

      {error && (
        <p className="mt-1 flex items-center text-sm text-red-600">
          <TriangleAlert className="mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}
