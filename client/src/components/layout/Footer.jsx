import { Col, Container, Row } from "react-bootstrap";

export default function Footer() {
    let toDay = new Date();
    
    return (
        <>
            <div className="by-dark text-light py-3 footer mt-lg-5">
                <Container>
                    <Row>
                        <Col xs={12} md={12} className="text-center">
                            <p className="text-danger">&copy; {toDay.getFullYear()} lakeSide hotel</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}