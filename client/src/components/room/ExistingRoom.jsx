import { useEffect, useState } from "react";
import { deleteRoom, getAllRooms } from "../utils/ApiFunction";
import { Col } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { FaTrashAlt, FaEye, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ExistingRoom() {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomPerPage, setRoomPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        fetchRooms();
    }, []);

    useEffect(() => {
        if (selectedRoomType === "") {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter((room) => room.roomType === selectedRoomType);
            setFilteredRooms(filtered);
        }

        setCurrentPage(1);
    }, [rooms, selectedRoomType]);

    const fetchRooms = async () => {
        setIsLoading(true);

        try {
            const result = await getAllRooms();
            setRooms(result);
        } catch (ex) {
            setErrorMsg(ex.message);
        } finally {
            setIsLoading(false);
        }
    }

    const calculateTotalPage = (filteredRooms, roomPerPage, rooms) => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
        return Math.ceil(totalRooms . roomPerPage);
    }

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleDelete = async (roomId) => {
        try {
            const result = await deleteRoom(roomId);

            if (result === "") {
                setSuccessMsg("Room number " + roomId + " was deleted");

                fetchRooms();
            } else {
                console.log("error deleting room: " + result.message);
            }
        } catch (ex) {
            setErrorMsg(ex.message);
        }

        setTimeout(() => {
            setSuccessMsg("");
            setErrorMsg("");
        }, 5000);
    }

    const indexOfLastRoom = currentPage * roomPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
    
    return (
        <>
            {isLoading ? (
                <p>Loding existing room</p>
            ) : (
                <section className="mt-5 mb-5 container">
                    <div className="d-flex justify-content-center mb-3 mt-5">
                        <h2>Existing rooms</h2>
                    </div>
                    <Col md={6} className="mb-3 mb-md-0">
                        <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
                    </Col>

                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr className="text-center">
                                <th>ID</th>
                                <th>Room type</th>
                                <th>Room price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRooms.map((room, index) => (
                                <tr key={room.id} className="text-center">
                                    <td>{room.id}</td>
                                    <td>{room.roomType}</td>
                                    <td>{room.roomPrice}</td>
                                    <td>
                                        <Link to={"/edit-room/" + room.id}>
                                            <span className="btn btn-info btn-sm">
                                                <FaEye />
                                            </span>
                                            <span className="btn btn-warning btn-sm">
                                                <FaEdit />
                                            </span>
                                        </Link>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(room.id)}>
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <RoomPaginator currentPage={currentPage} totalPages={calculateTotalPage(filteredRooms, roomPerPage, rooms)} onPageChange={handlePaginationClick}/>
                </section>
            )}
        </>
    );
}   