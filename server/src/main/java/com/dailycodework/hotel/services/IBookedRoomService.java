package com.dailycodework.hotel.services;

import java.util.List;

import com.dailycodework.hotel.models.BookedRoom;

public interface IBookedRoomService {

	List<BookedRoom> getBookingByRoomId(Long roomId);

}
