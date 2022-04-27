import {NavDropdown} from 'react-bootstrap';

const NavigationOptionsAdministratorView = ({bookingScheduleHref}) =>
    <>
        <NavDropdown title='Options'>
            <NavDropdown.Item  href={bookingScheduleHref}>
                Booking Schedule
            </NavDropdown.Item>

            <NavDropdown.Item href='#home'>
                Register New Resident Account
            </NavDropdown.Item>

            <NavDropdown.Item href='#home'>
                List Users
            </NavDropdown.Item>
        </NavDropdown>
    </>;

export default NavigationOptionsAdministratorView;