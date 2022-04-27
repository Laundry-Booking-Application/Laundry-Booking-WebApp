import {Table, Button} from 'react-bootstrap';

const BookingScheduleAdministratorView = ({setWeek, bookingSchedule}) =>
    <>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Week {bookingSchedule.weekNumber}</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    <th>Sunday</th>
                </tr>
            </thead>
            <tbody>
                {
                    bookingSchedule.roomPasses.map((room) => 
                        <tr>
                            <td key={room.roomNum}>{room.roomNum}</td>
                            {
                                room.passes.map((pass) => 
                                    <td key={pass.date}>{pass.date}</td>
                                )
                            }
                        </tr>
                    )
                }
            </tbody>
        </Table>
        <Button className='m-3' variant='outline-secondary'onClick={(e) => {setWeek(-1);}}>Previous Week</Button>
        <Button className='m-3' variant='outline-secondary' onClick={(e) => {setWeek(0);}}>Current Week</Button>
        <Button className='m-3' variant='outline-secondary' onClick={(e) => {setWeek(1);}}>Next Week</Button>
    </>;

export default BookingScheduleAdministratorView;