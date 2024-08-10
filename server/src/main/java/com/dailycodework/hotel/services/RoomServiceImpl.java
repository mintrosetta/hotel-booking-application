package com.dailycodework.hotel.services;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dailycodework.hotel.exceptions.InternalServerException;
import com.dailycodework.hotel.exceptions.ResourceNotFoundException;
import com.dailycodework.hotel.models.Room;
import com.dailycodework.hotel.repositories.RoomRepository;

@Service
public class RoomServiceImpl implements IRoomService {
	
	private final RoomRepository roomRepository; 
	
	public RoomServiceImpl(RoomRepository roomRepository) {
		this.roomRepository = roomRepository;
	}

	@Override
	public Room createRoom(MultipartFile photo, String roomType, BigDecimal roomPrice) throws IOException, SerialException, SQLException {
		Room room = new Room();
		room.setRoomType(roomType);
		room.setRoomPrice(roomPrice);
		
		if (!photo.isEmpty()) {
			byte[] photoBytes = photo.getBytes();
			Blob photoBlob = new SerialBlob(photoBytes);
			room.setPhoto(photoBlob);
		}
		
		return this.roomRepository.save(room);
	}

	@Override
	public List<String> getRoomTypes() {
		return this.roomRepository.findDistinctRoomType();
	}

	@Override
	public List<Room> getRooms() {
		return this.roomRepository.findAll();
	}

	@Override
	public byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException {
		Optional<Room> optionalRoom = this.roomRepository.findById(roomId);
		
		if (optionalRoom.isEmpty()) {
			throw new ResourceNotFoundException("Sorry, Room not found");
		}
		
		Blob photoBlob = optionalRoom.get().getPhoto();
		if (photoBlob != null) {
			// photoBlob.getBytes(indexStart, length)
			return photoBlob.getBytes(1, (int) photoBlob.length()); // get from first byte to last byte
		}
		
		return null;
	}

	@Override
	public void deleteRoom(Long id) {
		Optional<Room> optionalRoom = this.roomRepository.findById(id);
		
		if (optionalRoom.isPresent()) {
			this.roomRepository.deleteById(id);
		}
	}

	@Override
	public Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, byte[] photoBytes) {
		Room room = this.roomRepository.findById(roomId).orElseThrow(() -> new ResourceNotFoundException("Room not found"));
		
		if (roomType != null) room.setRoomType(roomType);
		if (roomPrice != null) room.setRoomPrice(roomPrice);
		if (photoBytes != null && photoBytes.length > 0) {
			try {
				room.setPhoto(new SerialBlob(photoBytes));
			} catch (SQLException ex) {
				throw new InternalServerException("Error updating room");
			}
		};
		
		return this.roomRepository.save(room);
	}

}
