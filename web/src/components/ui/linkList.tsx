import { Copy, Link, Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { deleteLink } from '../../http/delete-link'
import { ConfirmDeleteModal } from './confirmDeleteModal'

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null)

  const handleCopyLink = async (shortUrl: string) => {
    try {
      await navigator.clipboard.writeText(shortUrl)
    } catch (error) {
      console.error('Failed to copy link:', error)
      toast.error('Falha ao copiar o link.')
    }
  }

  const openDeleteModal = (id: string) => {
    setSelectedLinkId(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!selectedLinkId) return

    try {
      await deleteLink({ id: selectedLinkId })
      toast.success('Link deletado com sucesso.')
      onLinkDeleted?.()
    } catch (error) {
      console.error('Failed to delete link:', error)
      toast.error('Falha ao deletar o link.')
    } finally {
      setIsModalOpen(false)
      setSelectedLinkId(null)
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
    <>
      <div className="space-y-2">
        {links.map(link => (
          <div key={link.id}>
            <div className="p-2 rounded-md">
              <div className="flex justify-between space-y-1">
                <div>
                  <a
                    href={link.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary truncate hover:underline cursor-pointer block"
                  >
                    {link.shortUrl}
                  </a>
                  <p className="text-xs text-gray-500 truncate max-w-[200px] sm:max-w-[300px]">
                    {link.url}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  {link.accessCount !== undefined && (
                    <span className="text-xs text-gray-400">
                      {link.accessCount} acessos
                    </span>
                  )}

                  <button
                    onClick={() => handleCopyLink(link.shortUrl)}
                    className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-md transition"
                    title="Copiar link"
                  >
                    <Copy size={16} />
                  </button>

                  <button
                    onClick={() => openDeleteModal(link.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition"
                    title="Deletar link"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-3 h-px w-full bg-gray-200" />
          </div>
        ))}
      </div>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
