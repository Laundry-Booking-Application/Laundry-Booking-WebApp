import { NavDropdown, Form, Modal, Button } from 'react-bootstrap'

const RegisterResidentView = ({ setFirstName, setLastName, setPersonNumber, setEmail, setUsername, setPassword, handleRegister, show, handleShow, handleClose }) => {

    return (
        <>
            <NavDropdown.Item onClick={() => handleShow()} className='dropdownItem'>
                Register New Resident Account
            </NavDropdown.Item>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Register a new resident account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicFirstName" className='py-1'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control onChange={e => setFirstName(e.target.value)} type="text" placeholder="Svea" />
                        </Form.Group>

                        <Form.Group controlId="formBasicLastName" className='py-1'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control onChange={e => setLastName(e.target.value)} type="text" placeholder="Jackson" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPersonNumber" className='py-1'>
                            <Form.Label>Personal Number</Form.Label>
                            <Form.Control onChange={e => setPersonNumber(e.target.value)} type="text" placeholder="12340101-1234" />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" className='py-1'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicUsername" className='py-1'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control onChange={e => setUsername(e.target.value)} type="text" placeholder="SveaJ123" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className='py-1'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder="Password (Min. 8 characters)" />
                        </Form.Group>

                        <Button variant="success" className='my-2' onClick={(e) => { e.preventDefault(); handleClose(); handleRegister(); }}>
                            Register resident account
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>)

}




export default RegisterResidentView;
