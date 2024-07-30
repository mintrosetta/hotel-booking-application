package com.dailycodework.hotel.models;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "booked_rooms")
public class BookedRoom {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "booking_id")
	private Long bookingId;
	
	@Column(name = "check_in")
	private LocalDate checkInDate;
	
	@Column(name = "check_out")
	private LocalDate checkOutDate;
	
	@Column(name = "guest_full_name")
	private String guestFullName;
	
	@Column(name = "guest_email")
	private String guestEmail;
	
	@Column(name = "adults")
	private int numberOfAdults;
	
	@Column(name = "childrens")
	private int numberOfChildren;
	
	@Column(name = "total_guest")
	private int totalNumberOfGuest;
	
	@Column(name = "confirmation_code")
	private String bookingConfirmationCode;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "room_id")
	private Room room;
	
	public BookedRoom(String bookingConfirmationCode) {
		this.bookingConfirmationCode = bookingConfirmationCode;
	}

	public void calculateNumberOfGuest() {
		this.totalNumberOfGuest = this.numberOfAdults + this.numberOfChildren;
	}

	public int getNumberOfAdults() {
		return numberOfAdults;
	}

	public void setNumberOfAdults(int numberOfAdults) {
		this.numberOfAdults = numberOfAdults;
		this.calculateNumberOfGuest();
	}

	public int getNumberOfChildren() {
		return numberOfChildren;
	}

	public void setNumberOfChildren(int numberOfChildren) {
		this.numberOfChildren = numberOfChildren;
		this.calculateNumberOfGuest();
	}

	public void setBookingConfirmationCode(String bookingConfirmationCode) {
		this.bookingConfirmationCode = bookingConfirmationCode;
	}
	
}
