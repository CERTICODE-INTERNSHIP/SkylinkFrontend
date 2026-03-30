export const ROUTES = {
  // Public
  HOME:           '/',
  LOGIN:          '/login',
  REGISTER:       '/register',
  SEARCH:         '/search',

  // Protected
  BOOKING:        '/booking',
  BOOKING_DETAIL: '/booking/:id',
  MY_BOOKINGS:    '/my-bookings',

  // Admin
  ADMIN:          '/admin',
  ADMIN_FLIGHTS:  '/admin/flights',
  ADMIN_USERS:    '/admin/users',
  ADMIN_REPORTS:  '/admin/reports',
} as const