import Intro from './Intro'
import { Routes, Route } from 'react-router-dom'
import RoomChoice from './RoomChoice'
import DuoSpace from './DuoSpace/DuoSpace'
import GroupSpace from './GroupSpace/GroupSpace'
function App() {

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Intro />} />
        <Route path='/choiceOfroom' element={<RoomChoice />} />
        <Route path='/DuoSpace' element={<DuoSpace />} />
        <Route path='/GroupSpace' element={<GroupSpace />} />
      </Routes>
      </div>
  )
}

export default App
