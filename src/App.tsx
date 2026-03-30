import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProtectedRoute from '@/components/layout/ProtectedRoute'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import SearchResultsPage from '@/pages/SearchResultsPage'
import BookingPage from '@/pages/BookingPage'
import BookingDetailPage from '@/pages/BookingDetailPage'
import MyBookingsPage from '@/pages/MyBookingsPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.HOME}     element={<HomePage />} />
          <Route path={ROUTES.LOGIN}    element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.SEARCH}   element={<SearchResultsPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.BOOKING}        element={<BookingPage />} />
            <Route path={ROUTES.BOOKING_DETAIL} element={<BookingDetailPage />} />
            <Route path={ROUTES.MY_BOOKINGS}    element={<MyBookingsPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App