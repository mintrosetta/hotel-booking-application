import { Col, Container, Row } from "react-bootstrap";

export default function Footer() {
    let toDay = new Date();
    
    return (
        <>
            <Footer className="by-dark text-light py-3 footer mt-lg-5">
                <Container>
                    <Row>
                        <Col xs={12} md={12} className="text-center">
                            <p>&copy; {toDay.getFullYear()} lakeSide hotel</p>
                        </Col>
                    </Row>
                </Container>
            </Footer>
        </>
    );
}