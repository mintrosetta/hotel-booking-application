import { useEffect, useState } from "react"
import { getAllRooms } from "../utils/ApiFunction";
import RoomCard from "./RoomCard";
import { Col, Container, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";

export default function Room() {
    const [data, setData] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomPerPage] = useState(3);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getAllRooms().then((data) => {
            console.log(data)
            setData(data);
            setFilteredData(data);
        }).catch((ex) => {
            setErrorMsg(ex.message);
        }).finally(() => {
            setIsLoading(false);
        });

    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const totalPages = Math.ceil(filteredData.length / roomPerPage);
    const renderRooms = () => {
        const startIndex = (currentPage - 1) * roomPerPage;
        const endIndex = (currentPage * roomPerPage);

        return filteredData.slice(startIndex, endIndex).map((room) => <RoomCard key={room.id} room={room} />);
    }

    if (isLoading) {
        return (
            <div>
                Loading rooms
            </div>
        )
    }

    if (errorMsg !== "") {
        return <div className="text-danger">{errorMsg}</div>
    }

    return (
        <>
            <Container>
                <Row>
                    <Col md={6} className="mb-3 mb-md-0">
                        <RoomFilter data={data} setFilteredData={setFilteredData} />
                    </Col>

                    <Col md={6} className="d-flex align-items-center justify-content-end">
                        <RoomPaginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </Col>
                </Row>

                <Row>
                    {renderRooms()}
                </Row>

                <Row>
                    <Col md={6} className="d-flex align-items-center justify-content-end">
                        <RoomPaginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}