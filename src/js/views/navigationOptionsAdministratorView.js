import { NavDropdown } from 'react-bootstrap';

const NavigationOptionsAdministratorView = ({ bookingScheduleHref, registerResidentComponent }) =>
    <>
        <NavDropdown title='Options' variant='dark' menuVariant='dark' onClick={(e) => e.stopPropagation()}>
            <NavDropdown.Item href={bookingScheduleHref} >
                Booking Schedule
            </NavDropdown.Item>

            {registerResidentComponent}

            <NavDropdown.Item href='#usersList'>
                Users list
            </NavDropdown.Item>
        </NavDropdown>

    </>;

export default NavigationOptionsAdministratorView;