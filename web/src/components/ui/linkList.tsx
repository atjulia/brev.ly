import { Link } from 'lucide-react'

interface Link {
  id: string
  url: string
  shortCode: string
  shortUrl: string
  createdAt: string
  clickCount?: number
}

interface LinkListProps {
  links: Link[]
}

export function LinkList({ links }: LinkListProps) {
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
      {links.map(link => (
        <div
          key={link.id}
          className="bg-white p-3 rounded-md border border-gray-200"
        >
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              {link.shortUrl}
            </p>
            <p className="text-xs text-gray-500 truncate">{link.url}</p>
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>
                {new Date(link.createdAt).toLocaleDateString('pt-BR')}
              </span>
              {link.clickCount !== undefined && (
                <span>{link.clickCount} cliques</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
