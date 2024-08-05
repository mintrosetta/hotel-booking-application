import { useState } from "react"

export default function RoomFilter({ data, setFilteredData }) {
    const [filter, setFilter] = useState("");

    const handleSelectChange = (e) => {
        const selectedRoomType = e.target.value;
        setFilter(selectedRoomType);

        const filteredData = data.filter((room) => room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase()));
        setFilteredData(filteredData);
    }

    const clearFilter =() => {
        setFilter("");
        setFilteredData(data);
    }

    const roomTypes = ["", new Set(data.map((room) => room.roomType))]

    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="roomTypeFilter">Filter room by type</span>
                <select className="form-select" value={filter} onChange={handleSelectChange}>
                    <option value={""}>Select room type</option>
                    {roomTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </select>
                <button className="btn btn-primary" type="button" onClick={clearFilter}>Clear</button>
            </div>
        </>
    )
}