import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Profile from './Profile'
import AddListing from './Add-Listing'
import { Toaster } from 'sonner'
import SearchByCategory from './Search/[category]'
import SearchByOptions from './Search'
import ListingDetail from './Listing-Details/[id]'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
    {
    path: "/profile",
    element: <Profile/>
  },
   {
    path: "/Add-Listing",
    element: <AddListing/>
  },
   {
    path: "/Search/:category",
    element: <SearchByCategory/>
  },
    {
    path: "/Search",
    element: <SearchByOptions/>
  },
    {
    path: "/Listing-Details/:id",
    element: <ListingDetail/>
  }
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
     <RouterProvider router={router} />
     <Toaster/>
    </ClerkProvider>  </StrictMode>,
)
