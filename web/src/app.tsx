import HistoryCard from './components/historyCard'
import { NewLinkCard } from './components/newLinkCard'
import Logo from './assets/Logo.svg'
import { ToastContainer } from 'react-toastify'

export function App() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-4 sm:p-10">
      <div className="w-full max-w-5xl">
        <div className="mb-6 md:mb-8 text-center md:text-left">
          <img
            src={Logo}
            alt="Brev.ly"
            className="h-8 w-auto mx-auto md:mx-0"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <NewLinkCard />
          <HistoryCard />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
