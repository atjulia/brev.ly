import HistoryCard from './components/historyCard'
import { NewLinkCard } from './components/newLinkCard'

export function App() {
  return (
    <main className="min-h-dvh flex items-center justify-center p-4 sm:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-5xl">
        <NewLinkCard />
        <HistoryCard />
      </div>
    </main>
  )
}
