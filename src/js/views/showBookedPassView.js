import { NavDropdown, Modal, Button } from 'react-bootstrap'

const ShowBookedPassView = ({ date, roomNumber, passRange, cancelButtonDisabled, cancelBookedPass, show, handleShow, handleClose }) => {

    return (
        <>
            <NavDropdown.Item onClick={() => handleShow()} className='dropdownItem'>
                My Booking
            </NavDropdown.Item>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Your booked pass information:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Slot date: {date}</p>
                    <p>Room: {roomNumber}</p>
                    <p>Slot range: {passRange}</p>
                    <Button disabled={cancelButtonDisabled} variant='success' className='my-2' onClick={(e) => { cancelBookedPass(); handleClose(); }} >
                        Cancel booked pass
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>)

}




export default ShowBookedPassView;
