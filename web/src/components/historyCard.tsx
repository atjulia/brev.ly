import { LinkList } from './ui/linkList'
import { useEffect, useState } from 'react'
import { getLinks } from '../http/get-link'
import { useLinks } from '../store/create'

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
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
          Meus links
        </h2>
        <div className="mt-3 h-px w-full bg-gray-200" />
      </div>

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
