import { useMemo, useState } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import CharacterProfile from './components/CharacterProfile'
import FileViewer from './components/FileViewer'
import TopBar from './components/TopBar'
import BottomBar from './components/BottomBar'
import LoginPage from './components/LoginPage'
import { Menu, X } from 'lucide-react'
import { experiencePages } from './pages/experience'

const sectionMap = {
  exp: 'experience',
  proj: 'projects',
  honor: 'awards',
  pub: 'publications'
}

const reverseSectionMap = Object.fromEntries(
  Object.entries(sectionMap).map(([key, value]) => [value, key])
)

const fileIdToPath = (fileId = 'profile') => {
  if (!fileId || fileId === 'profile') return '/'
  if (fileId === 'publications') return '/publications'

  const [type, index] = fileId.split('-')
  const section = sectionMap[type]

  if (!section) return '/'
  if (typeof index === 'undefined') return `/${section}`
  return `/${section}/${index}`
}

const pathToFileId = (pathname = '/') => {
  if (!pathname || pathname === '/' || pathname === '') return 'profile'

  const segments = pathname.split('/').filter(Boolean)
  if (!segments.length) return 'profile'

  const type = reverseSectionMap[segments[0]]
  if (!type) return 'profile'

  if (segments.length === 1) {
    return segments[0] === 'publications' ? 'publications' : `${type}-0`
  }

  return `${type}-${segments[1]}`
}

const FileRoute = ({ type }) => {
  const { index } = useParams()
  const normalizedIndex = index ?? '0'

  if (type === 'exp') {
    const ExperienceComponent = experiencePages[normalizedIndex]
    if (ExperienceComponent) {
      return <ExperienceComponent />
    }
  }

  const fileId = type === 'publications' ? 'publications' : `${type}-${normalizedIndex}`
  return <FileViewer fileId={fileId} />
}

function WorkspaceLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleFileSelect = (fileId) => {
    const targetPath = fileIdToPath(fileId)
    navigate(targetPath)
    setMobileMenuOpen(false)
  }

  const currentFile = useMemo(() => pathToFileId(location.pathname), [location.pathname])

  return (
    <div className="flex flex-col h-screen w-screen bg-background text-text-main overflow-hidden font-sans">
      {/* SYSTEM HEADER */}
      <TopBar />

      {/* MIDDLE CONTENT AREA (Flex Grow) */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* MOBILE MENU TOGGLE (Adjusted position) */}
        <button
          className="lg:hidden fixed top-14 right-4 z-50 p-3 bg-white rounded-full shadow-md border border-primary/20"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className="text-primary" />}
        </button>

        {/* SIDEBAR (Responsive) */}
        <div className={`
             fixed inset-y-0 left-0 top-10 bottom-8 z-40 bg-background
             transform transition-transform duration-300 ease-in-out
             w-full lg:w-72 lg:relative lg:translate-x-0 lg:inset-auto lg:h-full
             ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
             lg:border-r border-primary/20
           `}>
          <Sidebar currentFile={currentFile} onFileSelect={handleFileSelect} />
        </div>

        {/* OVERLAY FOR MOBILE */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 top-10 bottom-8 bg-black/20 z-30 md:hidden backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 relative flex flex-col h-full overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] bg-fixed">
          {/* Subtle grid texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(#C96868 1px, transparent 1px), linear-gradient(90deg, #C96868 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          </div>

          <Routes>
            <Route path="/" element={<CharacterProfile onNavigate={handleFileSelect} />} />
            <Route path="/experience" element={<Navigate to="/experience/0" replace />} />
            <Route path="/experience/:index" element={<FileRoute type="exp" />} />
            <Route path="/projects" element={<Navigate to="/projects/0" replace />} />
            <Route path="/projects/:index" element={<FileRoute type="proj" />} />
            <Route path="/awards" element={<Navigate to="/awards/0" replace />} />
            <Route path="/awards/:index" element={<FileRoute type="honor" />} />
            <Route path="/publications" element={<FileRoute type="publications" />} />
            <Route path="/publications/:index" element={<FileRoute type="pub" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>

      {/* SYSTEM FOOTER */}
      <BottomBar />
    </div>
  )
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    setIsLoggedIn(true)
    navigate('/', { replace: true })
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isLoggedIn ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />
        }
      />
      <Route
        path="/*"
        element={
          isLoggedIn ? <WorkspaceLayout /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  )
}

export default App
