import { Copy, Link, Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { deleteLink } from '../../http/delete-link'

interface Link {
  id: string
  url: string
  shortCode: string
  shortUrl: string
  createdAt: string
  accessCount?: number
}

interface LinkListProps {
  links: Link[]
  onLinkDeleted?: () => void
}

export function LinkList({ links, onLinkDeleted }: LinkListProps) {
  const handleCopyLink = async (shortUrl: string) => {
    try {
      await navigator.clipboard.writeText(shortUrl)
    } catch (error) {
      console.error('Failed to copy link:', error)
      toast.error('Falha ao copiar o link.')
    }
  }

  const handleDeleteLink = async (id: string) => {
    try {
      await deleteLink({ id })
      toast.success('Link deletado com sucesso.')
      onLinkDeleted?.()
    } catch (error) {
      console.error('Failed to delete link:', error)
      toast.error('Falha ao deletar o link.')
    }
  }

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
        <>
          <div key={link.id} className="p-2 rounded-md">
            <div className="flex justify-between space-y-1">
              <div>
                <a
                  href={link.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary truncate hover:underline cursor-pointer"
                >
                  {link.shortUrl}
                </a>
                <p className="text-xs text-gray-500 truncate">{link.url}</p>
              </div>

              <div className="flex items-center space-x-2">
                <div className=" items-center text-xs text-gray-400">
                  {link.accessCount !== undefined && (
                    <span>{link.accessCount} acessos</span>
                  )}
                </div>
                <button
                  onClick={() => handleCopyLink(link.shortUrl)}
                  className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-md transition-colors duration-200"
                  title="Copiar link"
                >
                  <Copy size={16} />
                </button>
                <button
                  onClick={() => handleDeleteLink(link.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors duration-200"
                  title="Deletar link"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-3 h-px w-full bg-gray-200" />
        </>
      ))}
    </div>
  )
}
