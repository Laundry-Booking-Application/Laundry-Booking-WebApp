import React from 'react';
import useModelProp from '../useModelProp';
import ShowBookedPassView from '../views/showBookedPassView';

/**
 * The presenter that is responsible upon creating a form (Modal) that contains information about the booked laundry pass.
 * @param {BookingModel} bookingModel The booking model that contains the necessary information about the booked laundry pass.
 * @return {ShowBookedPassView} ShowBookedPassView The view that contains the booked laundry pass information form (Modal).
 */
function ShowBookedPass({bookingModel}) {
    const bookedPassDate = useModelProp(bookingModel, 'bookedPassDate');
    const bookedPassRoomNumber = useModelProp(bookingModel, 'bookedPassRoomNumber');
    const bookedPassRange = useModelProp(bookingModel, 'bookedPassRange');
    const [showBooked, setShowBooked] = React.useState(false);
    const [date, setDate] = React.useState('No booked pass');
    const [roomNumber, setRoomNumber] = React.useState('No booked pass');
    const [passRange, setPassRange] = React.useState('No booked pass');
    const [cancelButtonDisabled, setCancelButtonDisabled] = React.useState(true);

    React.useEffect(() => {
        if (bookedPassDate === null) {
            setDate('No booked pass');
            setRoomNumber('No booked pass');
            setPassRange('No booked pass');
            setCancelButtonDisabled(true);
            bookingModel.getBookedPass();
        } else if (bookedPassDate !== null) {
            setDate(bookedPassDate);
            setRoomNumber(bookedPassRoomNumber);
            setPassRange(bookedPassRange);
            setCancelButtonDisabled(false);
        }
    }, [bookingModel, bookedPassDate, bookedPassRoomNumber, bookedPassRange],
    );

    return React.createElement(ShowBookedPassView, {
        date: date,
        roomNumber: roomNumber,
        passRange: passRange,
        cancelButtonDisabled: cancelButtonDisabled,
        cancelBookedPass: () => bookingModel.cancelBookedPass(bookedPassRoomNumber, bookedPassDate, bookedPassRange),
        show: showBooked,
        handleShow: () => setShowBooked(true),
        handleClose: () => setShowBooked(false),
    });
}

export default ShowBookedPass;
