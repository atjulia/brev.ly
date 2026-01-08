import { TriangleAlert } from 'lucide-react'
import { useMemo } from 'react'

interface InputAliasProps {
  value: string
  onChange: (value: string) => void
  prefix?: string
  error?: string
}

export function InputAlias({
  value,
  onChange,
  prefix = 'brev.ly/',
  error,
}: InputAliasProps) {
  const prefixWidth = useMemo(() => {
    return `${prefix.length * 7.5}px`
  }, [prefix])

  return (
    <div>
      <label
        htmlFor="alias"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Link encurtado
      </label>

      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-sm text-gray-400 pointer-events-none">
          {prefix}
        </span>

        <input
          id="alias"
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ paddingLeft: prefixWidth }}
          className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2
            ${
              error
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
        />
      </div>

      {error && (
        <p className="mt-1 flex items-center text-sm text-red-600">
          <TriangleAlert className="mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}
