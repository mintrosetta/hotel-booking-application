package com.dailycodework.hotel.responses;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookedRoomResponse {
	private Long id;
	private LocalDate checkInDate;
	private LocalDate checkOutDate;
	private String guestName;
	private String guestEmail;
	private int numOfAdults;
	private int numOfChildren;
	private int totalNumOfGuest;
	private String bookingConfirmationCode;
	private RoomResponse room;
	
	public BookedRoomResponse(Long id, LocalDate checkInDate, LocalDate checkOutDate, String bookingConfirmationCode) {
		this.id = id;
		this.checkInDate = checkInDate;
		this.checkOutDate = checkOutDate;
		this.bookingConfirmationCode = bookingConfirmationCode;
	}
	
}
