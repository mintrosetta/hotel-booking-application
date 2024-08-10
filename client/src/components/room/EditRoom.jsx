import { useEffect, useState } from "react";
import { getRoomById, updateRoom } from "../utils/ApiFunction";
import { useParams } from "react-router-dom";

export default function EditRoom() {
    const [room, setRoom] = useState({
        photo: null,
        type: "",
        price: ""
    });
    const [photoPreview, setPhotoPreview] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const { roomId } = useParams();
    
    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await getRoomById(roomId);

                setRoom(roomData);
                setPhotoPreview(roomData.photo);
            } catch (ex) {
                console.log(ex.message);
            }
        }

        fetchRoom();
    }, [roomId]);

    const handleRoomInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        if (name === "price") {
            if (!isNaN(value)) {
                value = parseInt(value);
            }
            else {
                value = ""
            }
        }

        setRoom({...room, [name]: value});
    } 

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        console.log(selectedImage);

        setRoom({...room, photo: selectedImage});
        setPhotoPreview(URL.createObjectURL(selectedImage));

        console.log(room)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const success = await updateRoom(0, {
                roomType: room.type,
                roomPrice: room.price,
                photo: room.photo
            });

            if (success !== undefined && success.status === 200) {
                setSuccessMsg("Room update successfully!");
                
                const updatedRoomData = await getRoomById(roomId);
                setRoom(updatedRoomData);

                setPhotoPreview(updatedRoomData.photo);
                setErrorMsg("");
                document.getElementById("photo").value = null; // for clear input file
            } else {
                setErrorMsg("Error update room");
            }
        } catch (ex) {
            setErrorMsg(ex.message);
        }
    }

    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Create room</h2>
                        {successMsg && <p className="alert alert-success">{successMsg}</p>}
                        {errorMsg && <p className="alert alert-danger">{errorMsg}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="roomType">Room type</label>
                                <div>
                                    <RoomTypeSelector newRoom={room} handleRoomInputChange={handleRoomInputChange} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="roomPrice">Room price</label>
                                <input type="number" className="form-control" id="price" name="price" required value={room.price} onChange={handleRoomInputChange}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="photo">Room photo</label>
                                <input type="file" id="photo" name="photo" className="form-control" onChange={handleImageChange}/>
                                {photoPreview && <img src={photoPreview} alt="image preview room photo" style={{ maxWidth: "400px", maxHeight: "400px" }} className="mb-3"/>}
                            </div>
                            <div className="d-grid d-md-flex mt-2">
                                <button className="btn btn-outline-primary ml-5">Edit Room</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}