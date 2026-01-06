interface InputUrlProps {
  value: string
  onChange: (value: string) => void
}

export function InputUrl({ value, onChange }: InputUrlProps) {
  return (
    <div>
      <label
        htmlFor="url"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Link original
      </label>
      <input
        type="url"
        id="url"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="www.exemplo.com.br"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
      />
    </div>
  )
}
