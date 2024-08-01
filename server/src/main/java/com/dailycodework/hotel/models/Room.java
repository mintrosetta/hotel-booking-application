package com.dailycodework.hotel.models;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@Table(name = "rooms")
public class Room {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "room_type")
	private String roomType;
	
	@Column(name = "room_price")
	private BigDecimal roomPrice;
	
	@Column(name = "is_booked")
	private boolean isBooked = false;
	
	@Lob // บอกว่า field นี้จะจัดเก็บข้อมูลขนาดใหญ่ 
	@Column(name = "photo")
	private Blob photo;
	
	@OneToMany( mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<BookedRoom> bookings;
	
	public Room() {
		this.bookings = new ArrayList<>();
	}
	
	public void addBooking(BookedRoom booking) {
		if (this.bookings == null) {
			this.bookings = new ArrayList<>();
		}
		
		booking.setRoom(this);
		
		String bookingCode = RandomStringUtils.randomNumeric(10);
		booking.setBookingConfirmationCode(bookingCode);
		
		this.isBooked = true;
		
		this.bookings.add(booking);
	}
}
