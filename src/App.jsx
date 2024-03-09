import './App.css'
import Intro from './Intro'
import { Routes, Route } from 'react-router-dom'
import Room from './Room'
import RoomChoice from './RoomChoice'
function App() {

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Intro />} />
        <Route path='/choiceOfroom' element={<RoomChoice />} />
        <Route path='/room' element={<Room />} />
      </Routes>
      </div>
  )
}

export default App
