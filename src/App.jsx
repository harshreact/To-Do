import './App.css'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Todo from './Component/todo'
import Addtask from './Component/Addtask'
import TodoProvider from './Component/TodoContext'
import Status from './Component/Status'


function App() {
  return (
    <TodoProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Todo/>}/>
          <Route path='/addtask' element={<Addtask/>}/>
          <Route path='/addtask/:id' element={<Addtask/>}/>
          <Route path='/status/:id' element={<Status/>}/>
        </Routes>
      </Router>
    </TodoProvider>
  )
}

export default App
