package com.dailycodework.hotel.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dailycodework.hotel.models.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

}
