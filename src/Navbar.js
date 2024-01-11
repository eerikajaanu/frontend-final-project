import { Link } from "react-router-dom";
import {AppBar, Container, Button, Box, Switch} from '@mui/material';

const Nav = () => {
    return(
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/BookingPage">Booking</Link></li>
                <li><Link to="/CalendarPage">Calendar</Link></li>
            </ul>
        </nav>
    )
}

export default Nav;