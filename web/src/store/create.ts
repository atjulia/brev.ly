import { create } from 'zustand'
import { enableMapSet } from 'immer'
import { immer } from 'zustand/middleware/immer'
import { createLink } from '../http/create-link'
import { CanceledError } from 'axios'
import { useShallow } from 'zustand/shallow'

export type Link = {
  id: string
  url: string
  alias: string
  abortController?: AbortController
  status: 'progress' | 'success' | 'error' | 'canceled'
  originalUrl?: string
  shortUrl?: string
  createdAt?: string
  errorMessage?: string
}

type LinkState = {
  links: Map<string, Link>
  addLink: (url: string, alias: string) => void
  cancelLinkCreation: (linkId: string) => void
  retryLinkCreation: (linkId: string) => void
  clearLinks: () => void
}

enableMapSet()

export const useLinks = create<LinkState, [['zustand/immer', never]]>(
  immer((set, get) => {
    function updateLink(linkId: string, data: Partial<Link>) {
      const link = get().links.get(linkId)

      if (!link) {
        return
      }

      set(state => {
        state.links.set(linkId, {
          ...link,
          ...data,
        })
      })
    }

    async function processLinkCreation(linkId: string) {
      const link = get().links.get(linkId)

      if (!link) {
        return
      }

      const abortController = new AbortController()

      updateLink(linkId, {
        abortController,
        status: 'progress',
        errorMessage: undefined,
      })

      try {
        const response = await createLink({
          url: link.url,
          alias: link.alias,
        })

        updateLink(linkId, {
          status: 'success',
          originalUrl: response.originalUrl,
          shortUrl: response.shortUrl,
          createdAt: response.createdAt,
        })
      } catch (err) {
        if (err instanceof CanceledError) {
          updateLink(linkId, {
            status: 'canceled',
          })

          return
        }

        updateLink(linkId, {
          status: 'error',
          errorMessage:
            err instanceof Error ? err.message : 'Erro desconhecido',
        })
      }
    }

    function cancelLinkCreation(linkId: string) {
      const link = get().links.get(linkId)

      if (!link) {
        return
      }

      link.abortController?.abort()

      set(state => {
        state.links.set(linkId, {
          ...link,
          status: 'canceled',
        })
      })
    }

    function retryLinkCreation(linkId: string) {
      processLinkCreation(linkId)
    }

    function addLink(url: string, alias: string) {
      const linkId = crypto.randomUUID()

      const link: Link = {
        id: linkId,
        url,
        alias,
        status: 'progress',
      }

      set(state => {
        state.links.set(linkId, link)
      })

      processLinkCreation(linkId)
    }

    function clearLinks() {
      set(state => {
        state.links.clear()
      })
    }

    return {
      links: new Map(),
      addLink,
      cancelLinkCreation,
      retryLinkCreation,
      clearLinks,
    }
  })
)

export const usePendingLinks = () => {
  return useLinks(
    useShallow(store => {
      const isThereAnyPendingLinks = Array.from(store.links.values()).some(
        link => link.status === 'progress'
      )

      const totalLinks = store.links.size
      const completedLinks = Array.from(store.links.values()).filter(
        link =>
          link.status === 'success' ||
          link.status === 'error' ||
          link.status === 'canceled'
      ).length

      const globalPercentage =
        totalLinks > 0 ? Math.round((completedLinks * 100) / totalLinks) : 100

      return {
        isThereAnyPendingLinks,
        globalPercentage,
        totalLinks,
        completedLinks,
      }
    })
  )
}
