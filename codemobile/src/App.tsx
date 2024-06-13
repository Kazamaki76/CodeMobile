import {Routes, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Home } from './pages/HomePage'
import { Login } from './pages/LoginPage'
import { Detail } from './pages/DetailPage'
import { Summary } from './pages/SummaryPage'
function App() {


  return (
    <Container>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={ <Home/>} />
        <Route path="/detail" element={ <Detail/>} />
        <Route path="/summary" element={ <Summary/>} />
      </Routes>
    </Container>
  )
}

export default App
