import {Container, Row, Card} from 'react-bootstrap';

const HomepageView = () =>
    <Container className='mt-5'>
        <Card className='shadow p-5 bg-light roundedBoxBorder'>
            <Row>
                <div className='px-5 py-5'>
                    <h1 className='m-2'>Laundry Booking Application</h1>
                    <h5 className='m-2'>Welcome to the Laundry Booking Website</h5>

                    <h5 className='mt-5'>Explanation</h5>
                    <p className='m-1 px-1'>
                        The website is a system for booking laundry slots for the rooms present. 
                        The website allows the residents to log in and check the weekly booking schedule, 
                        book desired spaces, view booked slots, and cancel booked slot.
                    </p>

                    <h5 className='mt-4'>Usage</h5>
                    <p className='m-1 px-1'>
                        This home page allows you to log in using the login button located on the top right of the page. 
                        After entering the correct login information, you get an options menu located in the same place. 
                        The menu contains the actions that you can perform.
                    </p>

                    <h5 className='mt-4'>Rules</h5>
                    <p className='m-1 px-1'>
                        You can have one booking active at one time, which can be for the current or next week. 
                        You can have at most six bookings for the whole month. 
                        Note that administrators can cancel your booking if deemed necessary.
                    </p>
                </div>
            </Row>
        </Card>
    </Container>
    ;

export default HomepageView;