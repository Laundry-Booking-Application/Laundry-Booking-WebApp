import {Navbar, Nav, Row, Col} from 'react-bootstrap';
import {HouseFill} from 'react-bootstrap-icons'

const NavigationView = ({component, toggleState, setToggleState, handleClose, homepageHref}) =>
    <Navbar expand='sm' bg='dark' variant='dark'>
        <Navbar.Brand onClick={(e) => handleClose()} href={homepageHref}>
            <Row>
                <Col className='mx-2'>
                    <p className='font-weight-bold'>Laundry Booking App</p>
                </Col>
            </Row>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' onClick={(e) => setToggleState()}/>
        <Navbar.Collapse in={toggleState} className="justify-content-end" id='responsive-navbar-nav'>
            <Nav className='ml-auto'>
                <Nav.Link href={homepageHref} className='navButton mx-1' >
                    <HouseFill className='houseFill'/> Home </Nav.Link>
                {component}
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    ;

export default NavigationView;