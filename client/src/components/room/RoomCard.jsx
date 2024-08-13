import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function RoomCard({room}) {

    return (
        <Col key={room.id} className="mb-4" xs={12}>
            <Card>
                <Card.Body className="d-flex flex-wrap align-items-center">
                    <div className="flex-shrink-0 mr-3 mt-3 mb-md-0">
                        <Card.Img 
                            variant="top" 
                            src={'data:image/png; base64,' + room.photo} 
                            alt="Room photo" 
                            style={{ width: "100%", maxWidth: "200px", height: "auto"}} />
                    </div>
                    <div className="flex-grow-1 ml-3 px-5">
                        <Card.Title className="hotel-column">{room.roomType}</Card.Title>
                        <Card.Title className="room-price">{room.roomPrice}</Card.Title>
                        <Card.Text className="">Some room information goes here the guest to read throungh</Card.Text>
                    </div>
                    <div className="flex-shrink-0 mt-3">
                        <Link to={"bookings/" + room.id} className="btn btn-hotel btn-sm">View / Book</Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
} 