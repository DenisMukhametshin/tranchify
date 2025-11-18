import { createBrowserRouter } from 'react-router-dom'

import { RootLayout } from '@/layouts/root-layout'

import { NotFoundPage } from './not-found-page'
import { ProductDetailsPage } from './product-details-page'
import { ProductsPage } from './products-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ProductsPage />,
      },
      {
        path: 'product/:id',
        element: <ProductDetailsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
