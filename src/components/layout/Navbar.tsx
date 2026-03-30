import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

const Navbar = () => {
  return (
    <nav>
      <Link to={ROUTES.HOME}>Home</Link>
      <Link to={ROUTES.LOGIN}>Login</Link>
      <Link to={ROUTES.REGISTER}>Register</Link>
      <Link to={ROUTES.SEARCH}>Search</Link>
      <Link to={ROUTES.BOOKING}>Booking</Link>
      <Link to={ROUTES.MY_BOOKINGS}>My Bookings</Link>
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </nav>
  )
}

export default Navbar