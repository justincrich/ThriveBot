import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './pages/Home'
import { ChatSessionPage } from './pages/ChatSessionPage'

const router = createBrowserRouter([
  {
    path: '/*',
    element: <HomePage />,
  },
])

export const Router = (): JSX.Element => {
  return <RouterProvider router={router} />
}
