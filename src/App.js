import {Routes, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import ChatPage from './components/ChatPage'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
    <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/chat/:roomId" element={<ChatPage />} />
        <Route path="*" Component={NotFound} />
    </Routes>
)

export default App