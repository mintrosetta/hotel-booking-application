import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'
import CreateRoom from './components/room/CreateRoom'
import ExistingRoom from './components/room/ExistingRoom'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import EditRoom from './components/room/EditRoom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import RoomListing from './components/room/RoomListing'

function App() {
  return (
    <>
      <main>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='' element={<Home />} />
            <Route path='/edit/:roomId' element={<EditRoom />} />
            <Route path='/exiting-rooms' element={<ExistingRoom />} />
            <Route path='/add-room' element={<CreateRoom />} />
            <Route path='/brows-all-rooms' element={<RoomListing />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </main>
    </>
  )
}

export default App
