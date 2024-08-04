package com.dailycodework.hotel.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import com.dailycodework.hotel.exceptions.PhotoRetrivalException;
import com.dailycodework.hotel.models.BookedRoom;
import com.dailycodework.hotel.models.Room;
import com.dailycodework.hotel.responses.BookedRoomResponse;
import com.dailycodework.hotel.responses.RoomResponse;
import com.dailycodework.hotel.services.IBookedRoomService;
import com.dailycodework.hotel.services.IRoomService;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/rooms")
public class RoomController {
	private final IRoomService roomService;
	private final IBookedRoomService bookedRoomService;

	public RoomController(IRoomService roomService, IBookedRoomService bookedRoomService) {
		this.roomService = roomService;
		this.bookedRoomService = bookedRoomService;
	}

	@PostMapping("")
	public ResponseEntity<RoomResponse> createRoom(@RequestParam("img") MultipartFile photo,
			@RequestParam("type") String roomType, @RequestParam("price") BigDecimal roomPrice) {
		try {
			Room room = this.roomService.createRoom(photo, roomType, roomPrice);

			RoomResponse response = new RoomResponse(room.getId(), room.getRoomType(), room.getRoomPrice());

			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
	}
	
	@GetMapping("/types")
	public ResponseEntity<List<String>> getRoomTypes() {
		try {
			List<String> roomTypes = this.roomService.getRoomTypes();
			
			return ResponseEntity.status(HttpStatus.OK).body(roomTypes);
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}	
	}
	
	@GetMapping("")
	public ResponseEntity<List<RoomResponse>> getRooms() {
		try {
			List<Room> rooms = this.roomService.getRooms();
			
			List<RoomResponse> responses = new ArrayList<>();
			for (Room room : rooms) {
				byte[] photoBytes = this.roomService.getRoomPhotoByRoomId(room.getId());
				
				if (photoBytes != null && photoBytes.length > 0) {
					String bsae64Photo = Base64.getDecoder().decode(photoBytes).toString();
					RoomResponse roomResponse = getRoomResponse(room);
					roomResponse.setPhoto(bsae64Photo);
					
					responses.add(roomResponse);
				}
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(responses);
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
			
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
		
	}

	private RoomResponse getRoomResponse(Room room) {
		List<BookedRoom> bookedRooms = gettBookingByRoomId(room.getId());
		List<BookedRoomResponse> bookedResponse = bookedRooms
				.stream()
				.map(bookedRoom -> new BookedRoomResponse(
						bookedRoom.getBookingId(), 
						bookedRoom.getCheckInDate(), 
						bookedRoom.getCheckOutDate(), 
						bookedRoom.getBookingConfirmationCode()))
				.toList();
		byte[] photoBytes = null;
		Blob photoBlob = room.getPhoto();
		if (photoBlob != null) {
			try {
				photoBytes = photoBlob.getBytes(1, (int) photoBlob.length());
			} catch (SQLException ex) {
				throw new PhotoRetrivalException("Error retreving photo");
			}
		}
		
		return new RoomResponse(
				room.getId(), 
				room.getRoomType(), 
				room.getRoomPrice(), 
				room.isBooked(),
				photoBytes,
				bookedResponse);
	}

	private List<BookedRoom> gettBookingByRoomId(Long roomId) {
		return this.bookedRoomService.getBookingByRoomId(roomId);
	}
}
