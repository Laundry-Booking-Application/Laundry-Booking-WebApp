import React from 'react';
import useModelProp from '../useModelProp';
import BookSlotView from '../views/bookSlotView';

function BookSlot({bookingModel}) {
    let date = useModelProp(bookingModel, 'selectedDate');
    let room = useModelProp(bookingModel, 'selectedRoomNum');
    let range = useModelProp(bookingModel, 'selectedRange');
    let show = useModelProp(bookingModel, 'showInfo');
    
    return React.createElement(BookSlotView, {
        date: date, 
        room: room, 
        range: range, 
        show: show, 
        handleShow: () => bookingModel.setShowInfo(true), 
        handleClose: () => bookingModel.setShowInfo(false),
        bookChosenSlot: () => bookingModel.bookChosenSlot(room, date, range)
    });
}

export default BookSlot;