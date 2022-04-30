import React from 'react';
import useModelProp from '../useModelProp';
import BookSlotView from '../views/bookSlotView';

/**
 * The presenter for creating the laundry pass slot information form.
 * @param {BookingModel} bookingModel The booking model that contains the necessary functionalities for booking laundry passes.
 * @return {BookSlotView} An element with the laundry pass slot information form.
 */
function BookSlot({bookingModel}) {
    const date = useModelProp(bookingModel, 'selectedDate');
    const room = useModelProp(bookingModel, 'selectedRoomNum');
    const range = useModelProp(bookingModel, 'selectedRange');
    const show = useModelProp(bookingModel, 'showInfo');

    return React.createElement(BookSlotView, {
        date: date,
        room: room,
        range: range,
        show: show,
        handleShow: () => bookingModel.setShowInfo(true),
        handleClose: () => bookingModel.setShowInfo(false),
        handleCloseUnlock: () => {
            bookingModel.unlockPass(); bookingModel.setShowInfo(false);
        },
        bookChosenSlot: () => {
            bookingModel.bookChosenSlot(room, date, range);
        },
    });
}

export default BookSlot;
