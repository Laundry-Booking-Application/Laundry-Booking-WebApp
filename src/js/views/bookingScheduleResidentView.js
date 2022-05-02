import {Table, Button} from 'react-bootstrap';

const BookingScheduleResidentView = ({ weekDays, setWeek, previousWeek, currentWeek, nextWeek, bookingSchedule,  
    setDate, setRoom, setRange, applyLock, showInfo, bookSlotComponent}) =>
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
                                            pass.slots.map((slot) => {
                                                if (slot.status === 'SelfBooking') {
                                                    return <div key={pass.date + slot.range}><Button className='m-1' variant='info'>{slot.range}</Button></div>
                                                }
                                                if (slot.status === 'Taken') {
                                                    return <div key={pass.date + slot.range}><Button className='m-1' variant='danger' disabled>{slot.range}</Button></div>
                                                }
                                                return <div key={pass.date + slot.range}><Button className='m-1' variant='success' 
                                                onClick={(e)=> {setDate(pass.date); setRoom(room.roomNum); 
                                                setRange(slot.range); applyLock(room.roomNum, pass.date, slot.range); showInfo();}}>{slot.range}</Button></div>
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
        {bookSlotComponent}
    </>;

export default BookingScheduleResidentView;