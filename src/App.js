import { Routes, Route } from "react-router-dom"
import BookingPage from "./BookingPage"
import CalendarPage from "./CalendarPage"
import LoginPage from "./LoginPage"
import HomePage from "./HomePage"
import Nav from "./Navbar"

const App = () => {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="booking" element={ <BookingPage/> } />
        <Route path="calendar" element={ <CalendarPage/> } />
      </Routes>
    </div>
  )
}

export default App