import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import HomePageImg2 from '../img/slide 1.jpg';
import HomePageImg3 from '../img/slide 1.jpg';
import HomePageImg4 from '../img/slide 1.jpg';
import CasualIMG from '../img/home_page_casual.jpg';
import TailoredIMG from '../img/home _page_ tailored.jpg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ButtonMaleBox from '../components/ButtonMaleBox';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';


const Home = () => {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1

    };

    return (
        <>
            <NavBar></NavBar>
            <div className="header_home_page">
                <Container >
                    <Row className="top_home_page">
                        <Slider className="carousel" {...settings}>
                            <img className="HomePageImage" src={HomePageImg2} alt="" />
                            <img className="HomePageImage" src={HomePageImg3} alt="" />
                            <img className="HomePageImage" src={HomePageImg4} alt="" />

                        </Slider>
                        {/* <div className="onImage"> */}
                        {/* <img src={LogoMaleBox} alt="" /> */}
                        <div className="tracking-in-contract-bck">
                            <h1>male box</h1>
                            <div className="btn-top-hp">
                            <ButtonMaleBox  link="/store/הכל" text="&lt; 	&nbsp;	&nbsp;Let's Go"></ButtonMaleBox>
                            </div>
                        </div>

                        {/* </div> */}
                    </Row>
                </Container>
            </div>
            <div className="content_home_page">
                <Container>
                    <Row className="categotries_home_page">
                        <Col md="6">
                            <div className="category">
                                <Link to="/gallery">
                                    <img className="categoryImage" src={TailoredIMG} alt="" />
                                    <div className="btn-category">
                                        <ButtonMaleBox link='/gallery' text='&lt; 	&nbsp;	&nbsp;Tailored'></ButtonMaleBox>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="category">
                                <Link to="/store">
                                    <img className="categoryImage" src={CasualIMG} alt="" />
                                    <div className="btn-category">
                                        <ButtonMaleBox link='/store' text='&lt; 	&nbsp;	&nbsp;Casual'></ButtonMaleBox>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="about_us">
                <Container>
                    <Row className="about_us_h_p">
                        <div className="title_about_us">

                            <Col md="12">
                                <h1>מיכאל שליו ובני כהן שור</h1>
                            </Col>
                        </div>
                        <div className="text_about_us">
                            <Col md="12">
                                <p dir="rtl">תחת המותג malebox מציגים המעצבים מיכאל שליו ובני כהן שור את קולקציית בגדי הגברים שלהם, כבר למעלה מ20 שנה. המעצבים, בוגרי האקדמיה לאופנה שנקר מציעים קולקציה המבטאת אינטרפטציה אישית לטרנדים העולמיים באופנה ושילובם בנוף האורבני התל אביבי. התוצאה היא דגמים על זמניים כשהסוד הוא בגזרה ובאיכות ללא פשרות. כל דגם מיוצר בסטודיו בת״א, & hand made Custom made
                                </p>
                            </Col>
                        </div>
                        <div className="btn-about_us">
                            <ButtonMaleBox link='/' text='&lt; 	&nbsp;	&nbsp;אודות'></ButtonMaleBox>
                        </div>

                    </Row>
                </Container>
            </div>

            <Footer></Footer>

        </>
    )
}
export default Home;