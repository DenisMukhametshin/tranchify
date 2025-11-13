import { createBrowserRouter } from 'react-router-dom'

import { RootLayout } from '@/layouts/root-layout'

import { LandingRoute } from './landing'
import { NotFoundRoute } from './not-found'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingRoute />,
      },
      {
        path: '*',
        element: <NotFoundRoute />,
      },
    ],
  },
])
