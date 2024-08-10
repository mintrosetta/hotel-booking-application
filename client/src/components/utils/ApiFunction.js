import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:9192/api"
});

// create new room to database
export async function createRoom(photo, type, price) {
    const formData = new FormData();
    formData.append("img", photo);
    formData.append("type", type);
    formData.append("price", price);

    const response = await api.post("/rooms", formData);

    if (response.status === 201) {
        return true;
    } else {
        return false;
    }
}

// get app room type form database
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/types");
        return response.data;
    } catch (ex) {
        throw new Error("Error fetchig room types");
    }
}

// get all room from database
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms");

        return result.data;
    } catch (ex) {
        throw new Error("Error fetching rooms");
    }
}

// delete room by id
export async function deleteRoom(roomId) {
    try {
        const result = await api.delete("/rooms/" + roomId);
        return result.data;
    } catch (ex) {
        throw new Error("Error deleting room " + ex.message);
    }
}

// update room
export async function updateRoom(roomId, roomData) {
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    formData.append("photo", roomData.photo);

    const response = await api.put("/rooms/" + roomId);
    
    return response.data;
}

// get room by id
export async function getRoomById(roomId) {
    try {
        const result = await api.get('/rooms/' + roomId);

        return result.data;
    } catch (ex) {
        throw new Error('Error fetching room by id' + ex.message);
    }
}