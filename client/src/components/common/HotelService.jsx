import { Card, Col, Container, Row } from "react-bootstrap";
import Header from "./Header";
import { FaClock, FaCocktail, FaTshirt, FaUtensils, FaWifi } from "react-icons/fa";

export default function HotelService() {
    return (
        <>
            <Container className="mb-2">
                <Header title={"Our Service"} />
                <Row>
                    <h4 className="text-center">
                        Services at <span className="hotel-color">lakeSide Hotel</span> 
                        <span className="gap-2">
                            <FaClock /> 24-Hour Front Desk
                        </span>
                    </h4>
                </Row>
                <hr />
                <Row xs={1} md={2} lg={3} className="g-4 mt-2">
                    <Col>
                        <Card.Body>
                            <Card.Title className="hotel=color">
                                <FaWifi /> WiFi
                            </Card.Title>
                            <Card.Text>Stay connected with high-speed internet access.</Card.Text>
                        </Card.Body>
                    </Col>
                    <Col>
                        <Card.Body>
                            <Card.Title className="hotel=color">
                                <FaUtensils /> Breakfast
                            </Card.Title>
                            <Card.Text>Star</Card.Text>
                        </Card.Body>
                    </Col>
                    <Col>
                        <Card.Body>
                            <Card.Title className="hotel=color">
                                <FaTshirt /> Landry
                            </Card.Title>
                            <Card.Text>Keep your clothes clean and fresh with our landry service.</Card.Text>
                        </Card.Body>
                    </Col>
                    <Col>
                        <Card.Body>
                            <Card.Title className="hotel=color">
                                <FaCocktail /> Mini-bar
                            </Card.Title>
                            <Card.Text>Enjoy a refreshing drink or snack from our in-room mini-bar.</Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Container>
        </>
    )
}