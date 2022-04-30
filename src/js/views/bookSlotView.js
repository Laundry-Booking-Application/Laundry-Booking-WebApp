import {Modal, Button} from 'react-bootstrap';

const BookSlotView = ({date, room, range, show, handleClose, handleCloseUnlock, bookChosenSlot}) =>
    <div>
        <Modal show={show} onHide={handleCloseUnlock} backdrop='static' keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Slot information</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Slot date: {date}</p>
                <p>Room: {room}</p>
                <p>Slot range: {range}</p>
                <Button variant='success' className='my-2' onClick={(e) => { bookChosenSlot(); handleClose();}}>
                    Book
                </Button>
            </Modal.Body>

            <Modal.Footer>
                <Button variant='danger' onClick={(e) => handleCloseUnlock()}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </div>;

export default BookSlotView;