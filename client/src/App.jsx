import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import CreateRoom from './components/room/CreateRoom'
import ExistingRoom from './components/room/ExistingRoom'

function App() {
  return (
    <>
      <CreateRoom />
      <ExistingRoom />
    </>
  )
}

export default App
