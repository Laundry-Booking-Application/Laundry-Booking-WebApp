import {Nav} from 'react-bootstrap';

const NavigationLogoutView = ({username, handleLogout, navHomePageHref, bookingScheduleHref}) =>
    <>
        <Nav.Link className='navButton mx-2' href={bookingScheduleHref}>{username}</Nav.Link>
        <Nav.Link className='navButton mx-2' href={navHomePageHref} onClick={(e) => {handleLogout();}}>Logout</Nav.Link>
    </>;

export default NavigationLogoutView;