import { Container, Row, Col } from "react-bootstrap";
import {
    FaFacebookSquare,
    FaTwitterSquare,
    FaWhatsappSquare,
} from "react-icons/fa";

function Footer() {
    const socialMediaColors = {
        facebook: "black",
        instagram: "black",
        twitter: "black",
    };

    return (
        <footer style={{ backgroundColor: "#F0F0F0", padding: "30px 0" }}>
            <Container>
                <Row>
                    <Col xs={12} md={6} lg={3}>
                        <h5>About Us</h5>
                        <p>Learn more about our fitness app and mission.</p>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <h5>Workouts</h5>
                        <p>Discover various workout routines and plans.</p>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <h5>Meal Plans</h5>
                        <p>Explore nutrition guides and meal plans.</p>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <h5>Follow Us On</h5>
                        <div>
                            {/* facebook */}
                            <a
                                style={{
                                    marginRight: "10px",
                                    color: socialMediaColors.facebook,
                                }}
                            >
                                <FaFacebookSquare
                                    style={{ height: "30px", width: "30px" }}
                                />
                            </a>
                            {/* twitter */}
                            <a
                                style={{
                                    marginRight: "10px",
                                    color: socialMediaColors.twitter,
                                }}
                            >
                                <FaTwitterSquare
                                    style={{ height: "30px", width: "30px" }}
                                />
                            </a>
                            <a style={{ color: socialMediaColors.twitter }}>
                                <FaWhatsappSquare
                                    style={{ height: "30px", width: "30px" }}
                                />
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mt-4">
                        <p>
                            &copy; {new Date().getFullYear()} All rights
                            reserved FitHub
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
