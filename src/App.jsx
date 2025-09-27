import { Routes, Route } from 'react-router-dom'

// Context Providers
import { AuthProvider } from './contexts/AuthContext'
import { DataProvider } from './contexts/DataContext'
import { ThemeProvider } from './contexts/ThemeContext'

// Layout Components
import Layout from './components/Layout/Layout'
import AdminLayout from './components/Layout/AdminLayout'
import LandscapeRestriction from './components/LandscapeRestriction'

// Public Pages
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Experience from './pages/Experience'
import Skills from './pages/Skills'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// Auth Pages
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'

// Admin Pages
import Dashboard from './pages/Admin/Dashboard'
import AdminHome from './pages/Admin/About'
import AdminProjects from './pages/Admin/Projects'
import AdminExperience from './pages/Admin/Experience'
import AdminSkills from './pages/Admin/Skills'
import AdminContacts from './pages/Admin/Contacts'

// Route Protection
import ProtectedRoute from './components/Auth/ProtectedRoute'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <LandscapeRestriction />
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="projects" element={<Projects />} />
                <Route path="projects/:id" element={<ProjectDetail />} />
                <Route path="experience" element={<Experience />} />
                <Route path="skills" element={<Skills />} />
                <Route path="contact" element={<Contact />} />
              </Route>

              {/* Auth Routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Signup />} />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="home" element={<AdminHome />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="experience" element={<AdminExperience />} />
                <Route path="skills" element={<AdminSkills />} />
                <Route path="contacts" element={<AdminContacts />} />
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
