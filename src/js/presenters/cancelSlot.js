import React from 'react';
import useModelProp from '../useModelProp';
import CancelSlotView from '../views/cancelSlotView';

/**
 * The presenter for creating the form for canceling a laundry pass as an admin.
 * @param {BookingModel} bookingModel The booking model that contains the necessary functionalities for cancelling laundry passes.
 * @return {CancelSlotView} An element with the form for canceling a laundry pass as an admin.
 */
function CancelSlot({bookingModel}) {
    const date = useModelProp(bookingModel, 'selectedDate');
    const room = useModelProp(bookingModel, 'selectedRoomNum');
    const range = useModelProp(bookingModel, 'selectedRange');
    const username = useModelProp(bookingModel, 'selectedUsername');
    const show = useModelProp(bookingModel, 'showInfo');

    return React.createElement(CancelSlotView, {
        date: date,
        room: room,
        range: range,
        username: username,
        show: show,
        handleShow: () => bookingModel.setShowInfo(true),
        handleClose: () => bookingModel.setShowInfo(false),
        cancelBookedPass: () => bookingModel.cancelBookedPassAsAdmin(room, date, range, username),
    });
}

export default CancelSlot;
