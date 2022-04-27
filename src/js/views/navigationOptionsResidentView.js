import {NavDropdown} from 'react-bootstrap';

const NavigationOptionsResidentView = ({bookingScheduleHref}) =>
    <>
        <NavDropdown title='Options'>
            <NavDropdown.Item  href={bookingScheduleHref}>
                Booking Schedule
            </NavDropdown.Item>

            <NavDropdown.Item href='#home'>
                My Booking
            </NavDropdown.Item>
        </NavDropdown>
    </>;

export default NavigationOptionsResidentView;