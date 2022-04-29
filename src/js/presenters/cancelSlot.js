import React from 'react';
import useModelProp from '../useModelProp';
import CancelSlotView from '../views/cancelSlotView';

function CancelSlot({bookingModel}) {
    let date = useModelProp(bookingModel, 'selectedDate');
    let room = useModelProp(bookingModel, 'selectedRoomNum');
    let range = useModelProp(bookingModel, 'selectedRange');
    let username = useModelProp(bookingModel, 'selectedUsername');
    let show = useModelProp(bookingModel, 'showInfo');
    
    return React.createElement(CancelSlotView, {
        date: date, 
        room: room, 
        range: range,
        username: username, 
        show: show, 
        handleShow: () => bookingModel.setShowInfo(true), 
        handleClose: () => bookingModel.setShowInfo(false),
        cancelBookedPass: () => bookingModel.cancelBookedPassAsAdmin(room, date, range, username)
    });
}

export default CancelSlot;