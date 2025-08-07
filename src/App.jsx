import { useState } from 'react'
import './App.css'
import Navbar from './components/ui/shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
//import { LogIn } from 'lucide-react'
import Home from './components/ui/Home'
import Login from './components/ui/auth/Login'
import Signup from './components/ui/auth/Signup'
import Jobs from './components/ui/Jobs'
import Browse from './components/ui/Browse'
import JobDescription from './components/ui/JobDescription'
import Profile from './components/ui/Profile'
import Companies from './components/ui/admin/Companies'
import CompanyCreate from './components/ui/admin/CompanyCreate'
import CompanySetup from './components/ui/admin/CompanySetup'
import AdminJobs from './components/ui/admin/AdminJobs'
import PostJob from './components/ui/admin/PostJob'
import Applicants from './components/ui/admin/Applicants'
import ProtectedRoute from './components/ui/admin/ProtectedRoute'

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:"/description/:id",
    element: <JobDescription/>
  },
  {
    path:"/jobs",
    element:<Jobs/>
  },
  {
    path:"/browse",
    element:<Browse/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
  // admin
  {
    path:"/admin/companies",
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element:<CompanyCreate/>
  },
  {
    path:"/admin/companies/:id",
    element:<CompanySetup/>
  },
  {
    path:"/admin/jobs",
    element:<AdminJobs/>
  },
  {
    path:"/admin/jobs/create",
    element:<PostJob/>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<Applicants/>
  },


])

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
