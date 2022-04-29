import {Modal, Button} from 'react-bootstrap';

const CancelSlotView = ({date, room, range, username, show, handleClose, cancelBookedPass}) =>
    <div>
        <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Slot information</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Slot date: {date}</p>
                <p>Room: {room}</p>
                <p>Slot range: {range}</p>
                <p>Booked By: {username}</p>
                <Button variant='success' className='my-2' onClick={(e) => {handleClose(); cancelBookedPass();}}>
                    Cancel Booking
                </Button>
            </Modal.Body>

            <Modal.Footer>
                <Button variant='danger' onClick={(e) => handleClose()}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </div>;

export default CancelSlotView;