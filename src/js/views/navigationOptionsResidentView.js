import {NavDropdown} from 'react-bootstrap';

const NavigationOptionsResidentView = ({bookingScheduleHref, showBookedPassComponent }) =>
    <>
        <NavDropdown title='Options' variant='dark' menuVariant='dark' onClick={(e) => e.stopPropagation()}>
            <NavDropdown.Item  href={bookingScheduleHref}>
                Booking Schedule
            </NavDropdown.Item>

            {showBookedPassComponent}
        </NavDropdown>
    </>;

export default NavigationOptionsResidentView;