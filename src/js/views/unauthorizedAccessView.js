import {Card} from 'react-bootstrap';

const UnauthorizedAccessView = () =>
    <Card className='shadow p-3 m-5 roundedBoxBorder' border='danger' text='dark' bg='light'>
        <Card.Body>
            <h1>You are either not logged in, or lack the privileges to view this page.</h1>
            <h2>If you think that this is an error, please contact the support staff!</h2>
        </Card.Body>
    </Card>;

export default UnauthorizedAccessView;