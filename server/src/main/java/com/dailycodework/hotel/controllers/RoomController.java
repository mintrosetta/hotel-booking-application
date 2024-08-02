package com.dailycodework.hotel.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import java.math.BigDecimal;

import com.dailycodework.hotel.models.Room;
import com.dailycodework.hotel.responses.RoomResponse;
import com.dailycodework.hotel.services.IRoomService;

@Controller
@RequestMapping("/rooms")
public class RoomController {
	private final IRoomService roomService;

	public RoomController(IRoomService roomService) {
		this.roomService = roomService;
	}

	@PostMapping("")
	public ResponseEntity<RoomResponse> createRoom(@RequestParam("img") MultipartFile photo,
			@RequestParam("type") String roomType, @RequestParam("price") BigDecimal roomPrice) {
		try {
			Room room = this.roomService.createRoom(photo, roomType, roomPrice);

			RoomResponse response = new RoomResponse(room.getId(), room.getRoomType(), room.getRoomPrice());

			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
	}

}
