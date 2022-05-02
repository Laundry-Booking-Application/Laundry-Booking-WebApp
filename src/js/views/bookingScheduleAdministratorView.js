import { Table, Button } from 'react-bootstrap';

const BookingScheduleAdministratorView = ({weekDays, setWeek, previousWeek, currentWeek, nextWeek, bookingSchedule,  
    setDate, setRoom, setRange, setUsername, showInfo, cancelSlotComponent}) =>
    <>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Week {bookingSchedule.weekNumber}</th>
                    {weekDays.map((day) => <th key={day.split(' ')[0]}>{day.split(' ')[0]} <br /> {day.split(' ')[1]}</th>)}
                </tr>
            </thead>
            <tbody>
                {
                    bookingSchedule.roomPasses.map((room) =>
                        <tr key={"+" + room.roomNum}>
                            <td key={room.roomNum}>Room {room.roomNum}</td>
                            {
                                room.passes.map((pass) =>
                                    <td key={pass.date}>
                                        {
                                            pass.slots.map((slot) =>
                                                {
                                                    if (slot.status === 'Taken') {
                                                        return <div key={pass.date + slot.range}><Button className='m-1' variant='danger' 
                                                        onClick={(e)=> {setDate(pass.date); setRoom(room.roomNum); 
                                                        setRange(slot.range); setUsername(slot.username); showInfo();}}>{slot.range}</Button></div>
                                                    }
                                                    return <div key={pass.date + slot.range}><Button className='m-1' variant='success'>{slot.range}</Button></div>
                                                }
                                            )
                                        }
                                    </td>
                                )
                            }
                        </tr>
                    )
                }
            </tbody>
        </Table>
        <Button className='m-3' variant='outline-secondary' onClick={(e) => { setWeek(previousWeek); }}>Previous Week</Button>
        <Button className='m-3' variant='outline-secondary' onClick={(e) => { setWeek(currentWeek); }}>Current Week</Button>
        <Button className='m-3' variant='outline-secondary' onClick={(e) => { setWeek(nextWeek); }}>Next Week</Button>
        {cancelSlotComponent}
    </>;

export default BookingScheduleAdministratorView;