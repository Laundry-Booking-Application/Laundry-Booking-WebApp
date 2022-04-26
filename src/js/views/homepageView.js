import {Container, Row, Card} from 'react-bootstrap';

const HomepageView = () =>
    <Container className='mt-fix'>
        <Card className='shadow p-3 mb-5 mt-5 bg-light roundedBoxBorder'>
            <Row>
                <div className='textAlignJustify p-5'>
                    <h1 data-testid='titleTextElement' className='pt-4 color-text-blue darken-4 font-weight-bolder '>Laundry Booking Application</h1>
                    <h5 data-testid='welcomeTextElement' className='pt-2 pb-3'>Welcome to the Laundry Booking Website</h5>

                    <h6 className='mt-4 color-text-red font-weight-bold'>Explanation!</h6>
                    <p className='mr-5'>
                        Text about the explanation.
                    </p>

                    <h6 className='mt-4 color-text-red font-weight-bold'>Usage!</h6>
                    <p className='mr-5 mb-4'>
                        How to use.
                    </p>
                </div>
            </Row>
        </Card>
    </Container>
    ;

export default HomepageView;