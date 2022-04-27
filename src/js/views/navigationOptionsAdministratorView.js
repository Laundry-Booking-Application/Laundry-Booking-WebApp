import {NavDropdown} from 'react-bootstrap';

const NavigationOptionsAdministratorView = ({bookingScheduleHref, registerResidentComponent}) =>
    <>
        <NavDropdown title='Options' variant='dark' menuVariant='dark'>
            <NavDropdown.Item href={bookingScheduleHref} >
                Booking Schedule
            </NavDropdown.Item>

            {registerResidentComponent}

            <NavDropdown.Item href='#home' >
                List Users
            </NavDropdown.Item>
        </NavDropdown>
    </>;

export default NavigationOptionsAdministratorView;