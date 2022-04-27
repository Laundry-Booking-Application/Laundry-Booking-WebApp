import {Container, Spinner} from "react-bootstrap";

const WaitingDataView = () =>
    <Container className = "d-flex justify-content-center mt-5">
        <Spinner className = "m-50" animation="grow" role="status"/>
    </Container>;

export default WaitingDataView;
