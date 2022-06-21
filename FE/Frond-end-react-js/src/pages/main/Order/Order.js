import React, { Component } from "react";
import { Link } from "react-router-dom";
import axiosApiIntances from "../../../utils/axios";
import Moment from "react-moment";
import NavBar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";
import Seat from "../../../components/Seat/Seat";
import {
  Button,
  Image,
  Container,
  Row,
  Col,
  Card,
  Modal,
} from "react-bootstrap";
import styles from "./Order.module.css";
// import dummyPremiere from "../../../assets/img/logo_2.png";
import line from "../../../assets/img/line_order.png";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      movieName: "",
      premiereName: "",
      premiereImage: "",
      showTimeDate: "",
      showTimeClock: "",
      premierePrice: 0,
      selectedSeat: [],
      reservedSeat: [],
      setSeatAlphabet: ["A", "B", "C", "D", "E", "F", "G"],
      setSeatNumberA: ["1", "2", "3", "4", "5", "6", "7"],
      setSeatNumberB: ["8", "9", "10", "11", "12", "13", "14"],
      show: false,
    };
  }

  componentDidMount() {
    const bookingInfo = JSON.parse(localStorage.getItem("bookingInfo"));
    const userId = JSON.parse(localStorage.getItem("user"));
    const user = userId;
    const { movieId, premiereId, showTimeId } = bookingInfo;
    this.getDataUser(user);
    this.getDataMovie(movieId);
    this.getDataPremiere(premiereId);
    this.getDataShowTime(showTimeId);
    this.getDataSeat(premiereId, showTimeId);
  }

  getDataUser = (id) => {
    axiosApiIntances
      .get(`user/${id}`)
      .then((res) => {
        this.setState({
          userIDD: res.data.data[0].user_id,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  getDataMovie = (id) => {
    axiosApiIntances
      .get(`movie/${id}`)
      .then((res) => {
        this.setState({
          movieName: res.data.data[0].movie_name,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  getDataPremiere = (id) => {
    axiosApiIntances
      .get(`premiere/main/${id}`)
      .then((res) => {
        this.setState({
          premiereName: res.data.data[0].premiere_name,
          premiereImage: res.data.data[0].premiere_logo,
          premierePrice: res.data.data[0].premiere_price,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  getDataShowTime = (id) => {
    axiosApiIntances
      .get(`show_time/${id}`)
      .then((res) => {
        this.setState({
          showTimeDate: res.data.data[0].show_time_date,
          showTimeClock: res.data.data[0].show_time_clock,
        });
        console.log(res.data.data);
      })
      .catch((err) => {
        return [];
      });
  };

  getDataSeat = (preId, showId) => {
    axiosApiIntances
      .get(`booking/book-seat?premiereId=${preId}&showTimeId=${showId}`)
      .then((res) => {
        let reservedSeat = [];
        res.data.data.map((e) => {
          reservedSeat.push(e.booking_seat_location);
          return true;
        });
        this.setState({
          reservedSeat: reservedSeat,
        });
      })
      .catch((err) => {
        return [];
      });
  };

  bookingSeat = (seat) => {
    let tmpSelectedSeat = this.state.selectedSeat;
    const index = tmpSelectedSeat.indexOf(seat);
    if (this.state.reservedSeat.indexOf(seat) < 0) {
      if (index < 0) {
        this.setState({
          selectedSeat: [...this.state.selectedSeat, seat],
        });
      } else {
        tmpSelectedSeat.splice(index, 1);
        this.setState({
          selectedSeat: tmpSelectedSeat,
        });
      }
    } else {
    }
  };

  handleCheckOut = () => {
    const {
      userIDD,
      selectedSeat,
      movieName,
      premiereName,
      premiereImage,
      showTimeDate,
      showTimeClock,
      premierePrice,
    } = this.state;
    if (selectedSeat.length > 0) {
      const bookingInfo = JSON.parse(localStorage.getItem("bookingInfo"));
      const newBookingInfo = JSON.stringify({
        ...bookingInfo,
        userIDD: userIDD,
        selectedSeat: selectedSeat,
        movieName: movieName,
        premiereName: premiereName,
        premiereImage: premiereImage,
        showTimeDate: showTimeDate,
        showTimeClock: showTimeClock,
        premierePrice: premierePrice,
      });
      localStorage.setItem("bookingInfo", newBookingInfo);
      this.props.history.push(`/main/payment`);
    } else {
      this.setState({
        show: true,
      });
    }
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    const {
      reservedSeat,
      selectedSeat,
      setSeatAlphabet,
      setSeatNumberA,
      setSeatNumberB,
      movieName,
      premiereName,
      premiereImage,
      showTimeDate,
      showTimeClock,
      premierePrice,
      show,
    } = this.state;

    return (
      <>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className={styles.modal}>
              Please select your seat
            </Modal.Title>
          </Modal.Header>
        </Modal>
        <NavBar isAdminPage={false} />
        <Container
          className={`${styles.movieBtn} d-flex flex-row justify-content-between pl-5 pr-5 pt-3 pb-3`}
          fluid
        >
          <p className={styles.textMovieBtn}>{movieName}</p>
          <Button className={styles.changeMovieBtn} variant="light">
            <Link to="/">Change movie</Link>
          </Button>
        </Container>
        <Container className={styles.bgCnt} fluid>
          <Container className={styles.bgCnt}>
            <Row className="pb-5">
              <Col className="pt-5" lg={8}>
                <p className={styles.title}>Choose Your Seat</p>
                <div className={`${styles.bgDiv} p-5 overflow-auto`}>
                  <Card className={styles.cardScreen}>
                    <Card.Body>
                      <div className={styles.screen}>
                        <p
                          className="text-center"
                          style={{ marginBottom: "-5px" }}
                        >
                          screen
                        </p>
                        <Image src={line} fluid />
                      </div>
                      {setSeatAlphabet.map((item, index) => {
                        return (
                          <Seat
                            key={index}
                            seatAlphabet={item}
                            reserved={reservedSeat}
                            selected={selectedSeat}
                            bookingSeat={this.bookingSeat.bind(this)}
                          />
                        );
                      })}
                      <Row className={styles.rowSeat}>
                        <Col className={styles.colSeat}>
                          <div className={styles.seat}></div>
                        </Col>
                        {setSeatNumberA.map((item, index) => {
                          return (
                            <Col key={index} className={styles.colSeat}>
                              <div className={`${styles.seat} text-center`}>
                                {item}
                              </div>
                            </Col>
                          );
                        })}

                        <Col className={styles.colSeat}></Col>

                        {setSeatNumberB.map((item, index) => {
                          return (
                            <Col key={index} className={styles.colSeat}>
                              <div className={`${styles.seat} text-center`}>
                                {item}
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                    </Card.Body>
                    <Card.Body>
                      <p className={styles.titleSmall}>Seating Key</p>
                      <div className="d-flex flex-row">
                        <div
                          className={`${styles.seat} ${styles.avaliable}`}
                        ></div>
                        <div className={`${styles.semi} pl-2 pr-5`}>
                          Avaliable
                        </div>
                        <div
                          className={`${styles.seat} ${styles.selected}`}
                        ></div>
                        <div className={`${styles.semi} pl-2 pr-5`}>
                          Selected
                        </div>
                        <div className={`${styles.seat} ${styles.sold}`}></div>
                        <div className={`${styles.semi} pl-2 pr-5`}>Sold</div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
                <div className={`${styles.down1} d-flex flex-sm-row flex-column justify-content-sm-between justify-content-end mt-5`}>
                  <Button
                    className={`${styles.btPrevious} mb-3`}
                    variant="outline-primary"
                  >
                    <Link to="/">Change your Movie</Link>
                  </Button>
                  <Button
                    className={styles.btPay}
                    variant="primary"
                    onClick={() => {
                      this.handleCheckOut();
                    }}
                  >
                    Checkout Now
                  </Button>
                </div>
              </Col>
              <Col className={`${styles.down} pt-5`} lg={4}>
                <p className={styles.title}>Order Info</p>
                <Card
                  style={{ width: "382px", margin: "auto" }}
                  className="shadow"
                >
                  <Card.Body className="pb-3 mt-3">
                    <div className={styles.cardImg}>
                      <Image src={`http://localhost:3001/backend1/api/${premiereImage}`} style={{ width: "120px" }} />
                      <p className={`${styles.titleSmall} pt-2`}>
                        {premiereName} <span>Cinema</span>
                      </p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      <p className={styles.semi}>Movie selected</p>
                      <p className={styles.semi} style={{ color: "black" }}>
                        {movieName}
                      </p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      <p className={styles.semi}>
                        <Moment format="dddd, LL">{showTimeDate}</Moment>
                        {/* {showTimeDate} */}
                      </p>
                      <p className={styles.semi} style={{ color: "black" }}>
                        {showTimeClock}
                      </p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      <p className={styles.semi}>One ticket price</p>
                      <p className={styles.semi} style={{ color: "black" }}>
                        <span>$</span>
                        {premierePrice}
                      </p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      <p className={styles.semi}>Seat choosed</p>
                      <p className={styles.semi} style={{ color: "black" }}>
                        {selectedSeat.map((item, index) => {
                          return <span key={index}>{`${item}, `}</span>;
                        })}
                      </p>
                    </div>
                    <hr />
                    <div className="d-flex flex-row justify-content-between">
                      <p
                        className={styles.titleSmall}
                        style={{ fontWeight: "600" }}
                      >
                        Total payment
                      </p>
                      <p
                        className={styles.titleSmall}
                        style={{ fontWeight: "600", color: "#5F2EEA" }}
                      >
                        <span>$</span>
                        {selectedSeat.length * premierePrice}
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Container>
        <Container>
          <Footer />
        </Container>
      </>
    );
  }
}

export default Home;
