import { useEffect, useState } from "react"
import { getRoomTypes } from "../utils/ApiFunction";

export default function RoomTypeSelector({ handleRoomInputChange, newRoom }) {
    const [roomTypes, setRoomTypes] = useState([""]);
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
    const [newRoomType, setNewRommType] = useState("");

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data);
        });
    }, []);

    const handleNewRoomTypeInputChange = (e) => {
        setNewRommType(e.target.value);
    }

    const handleAddNewRoomType = () => {
        if (newRoomType !== "") {
            setRoomTypes([...roomTypes, newRoomType]);
            setNewRommType("");
            setShowNewRoomTypeInput(false);
        }
    }

    return (
        <>
            {roomTypes.length > 0 && (
                <div>
                    <select className="form-select" id="type" name="type" value={newRoom.type} onChange={(e) => {
                        if (e.target.value === "Add new") {
                            setShowNewRoomTypeInput(true);
                        } else {
                            handleRoomInputChange(e);
                        }
                    }}>
                        <option value="">Select a room type</option>
                        <option value="Add new">Add new</option>
                        {roomTypes.map((type, index) => <option value={type} key={index}>{type}</option>)}
                    </select>
                    {showNewRoomTypeInput && (
                        <div className="input-group mt-3">
                            <input type="text" className="form-control" placeholder="Enter a new room type" onChange={handleNewRoomTypeInputChange}/>
                            <button className="btn btn-primary" type="button" onClick={handleAddNewRoomType}>Add</button>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}