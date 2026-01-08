import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Redirect } from './pages/redirect'
import { NotFound } from './pages/not-found'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="/:code" element={<Redirect />} />
    </Routes>
  )
}
