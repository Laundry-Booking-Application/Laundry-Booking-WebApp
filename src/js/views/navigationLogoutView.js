import {Nav} from 'react-bootstrap';

const NavigationLogoutView = ({username, handleLogout, navHomePageHref}) =>
    <>
        <Nav.Link className='navButton pr-3 pl-3' href={navHomePageHref}>{username}</Nav.Link>
        <Nav.Link className='navButton pr-3 pl-3' href={navHomePageHref} onSelect={(e) => {handleLogout();}}>Logout</Nav.Link>
    </>;

export default NavigationLogoutView;