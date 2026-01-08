import { LinkList } from './ui/linkList'
import { useEffect, useState } from 'react'
import { getLinks } from '../http/get-link'
import { useLinks } from '../store/create'
import { Download } from 'lucide-react'
import { exportLink } from '../http/export-link'
import { toast } from 'react-toastify'

interface HistoryCardProps {
  className?: string
}

interface Link {
  id: string
  url: string
  shortCode: string
  shortUrl: string
  createdAt: string
  accessCount?: number
}

export function HistoryCard({ className = '' }: HistoryCardProps) {
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)
  const { links: createdLinks } = useLinks()

  const fetchLinks = async () => {
    try {
      setLoading(true)
      const response = await getLinks({ page: 1, limit: 50 })
      setLinks(response.links)
    } finally {
      setLoading(false)
    }
  }

  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownloadCSV = async () => {
    try {
      setIsDownloading(true)
      const response = await exportLink()

      if (response.url) {
        const link = document.createElement('a')
        link.href = response.url
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success('CSV baixado com sucesso!')
      }
    } catch (error) {
      console.error('Error downloading CSV:', error)
      toast.error('Erro ao baixar CSV')
    } finally {
      setIsDownloading(false)
    }
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  useEffect(() => {
    const hasSuccessfulLinks = Array.from(createdLinks.values()).some(
      link => link.status === 'success'
    )

    if (hasSuccessfulLinks) {
      fetchLinks()
    }
  }, [createdLinks])

  return (
    <div
      className={`
        bg-gray-50 rounded-lg
        p-4 sm:p-6
        w-full max-w-xl
        flex flex-col
        max-h-[500px]
        ${className}
      `}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-600">
          Meus links
        </h2>
        <div>
          <button
            onClick={handleDownloadCSV}
            disabled={isDownloading}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-500 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-offset-2 transition-colors duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={16} />
            {isDownloading ? 'Baixando...' : 'Baixar CSV'}
          </button>
        </div>
      </div>
      <div className="mt-3 h-px w-full bg-gray-200" />

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="text-gray-500 text-sm text-center">
            Carregando links...
          </p>
        ) : (
          <LinkList links={links} onLinkDeleted={fetchLinks} />
        )}
      </div>
    </div>
  )
}

export default HistoryCard
