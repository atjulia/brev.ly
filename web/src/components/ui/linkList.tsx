import { Link } from 'lucide-react'

interface LinkListProps {
  links?: string[]
}

export function LinkList({ links = [] }: LinkListProps) {
  if (links.length === 0) {
    return (
      <div className="text-center flex flex-col justify-center items-center py-8">
        <Link className="mb-2 text-gray-400" size={24} />
        <p className="text-gray-500 text-sm">Nenhum link encurtado ainda</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {links.map((link, index) => (
        <div
          key={index}
          className="bg-white p-3 rounded-md border border-gray-200 shadow-sm"
        >
          <p className="text-sm text-gray-700 truncate">{link}</p>
        </div>
      ))}
    </div>
  )
}
