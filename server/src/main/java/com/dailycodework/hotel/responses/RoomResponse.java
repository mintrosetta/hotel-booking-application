package com.dailycodework.hotel.responses;

import java.math.BigDecimal;
import java.util.Base64;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RoomResponse {
	private Long id;
	private String roomType;
	private BigDecimal roomPrice;
	private boolean isBooked;
	private String photo;
	private List<BookedRoomResponse> bookings;

	public RoomResponse(Long id, String roomType, BigDecimal roomPrice) {
		this.id = id;
		this.roomType = roomType;
		this.roomPrice = roomPrice;
	}

	public RoomResponse(Long id, String roomType, BigDecimal roomPrice, boolean isBooked, byte[] photoBytes,
			List<BookedRoomResponse> bookings) {
		this.id = id;
		this.roomType = roomType;
		this.roomPrice = roomPrice;
		this.isBooked = isBooked;
		this.photo = photoBytes != null ? new String(Base64.getDecoder().decode(photoBytes)) : null;
		this.bookings = bookings;
	}

}
