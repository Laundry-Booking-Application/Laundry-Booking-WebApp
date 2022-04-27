import {Card} from 'react-bootstrap';

const UnauthorizedAccessView = () =>
    <Card className='shadow p-3 m-5 roundedBoxBorder' border='danger' text='dark' bg='light'>
        <Card.Body><h1>Please go back to the home page and login first to access this section</h1></Card.Body>
    </Card>;

export default UnauthorizedAccessView;