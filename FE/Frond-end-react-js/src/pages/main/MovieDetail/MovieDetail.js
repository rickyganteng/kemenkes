import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axiosApiIntances from "../../../utils/axios";
import Footer from "../../../components/Footer/Footer";
import { Container, Form, Row, Col, Image } from "react-bootstrap";
import styles from "./MovieDetail.module.css";
import line from "../../../assets/img/line_long.png";
import Cards from "../../../components/CardBook/CardBook";
import NavBar from "../../../components/NavBar/NavBar";

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        movie_id: this.props.match.params.id,
        movie_name: "",
        movie_category: "",
        movie_duration: "",
        movie_release_date: "",
        movie_directed_by: "",
        movie_casts: "",
        movie_synopsis: "",
      },
      premiere_desc: [],
      show_time_date: "",
      premiere_location: "",
      pagination: {},
      page: 1,
      limit: 6,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.premiere_location !== this.state.premiere_location ||
      prevState.show_time_date !== this.state.show_time_date
    ) {

      this.getDataPremiere();
    }
  }

  componentDidMount() {
    this.getDataMovieDetail();
    this.getDataPremiere();
  }

  getDataMovieDetail = () => {
    const { movie_id } = this.state.data;
    axiosApiIntances
      .get(`movie/${movie_id}`)
      .then((res) => {
        this.setState({
          data: {
            ...this.state.data,
            ...res.data.data[0],
          },
        });
      })
      .catch((err) => {
        return [];
      });
  };

  getDataPremiere = () => {
    const { movie_id } = this.state.data;
    let { show_time_date, premiere_location, limit } = this.state;
    premiere_location = "%" + premiere_location + "%";
    show_time_date = "%" + show_time_date + "%";
    console.log(
      "Get Data Premiere!",
      show_time_date,
      "+",
      premiere_location,
      "+",
      movie_id
    );
    axiosApiIntances
      .get(
        `premiere/premiere-movie?loc=${premiere_location}&movieId=${movie_id}&limit=${limit}`
      )
      .then((res) => {
        this.setState({
          premiere_desc: res.data.data,
        });
      })
      .catch((err) => {
        return [];
      });
  };

  changeText = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      movie_id,
      movie_name,
      movie_category,
      movie_duration,
      movie_release_date,
      movie_directed_by,
      movie_casts,
      movie_synopsis,
      movie_image,
    } = this.state.data;

    const { premiere_desc } = this.state;


    return (
      <>
        <NavBar isAdminPage={false} />
        <Container className="mt-3">
          <Row>
            <Col sm={3} className="mt-4">
              <div className={styles.hero}>
                {movie_image ? (
                  <Image
                    className={`${styles.heroImg} p-4`}
                    src={`http://localhost:3001/backend1/api/${movie_image}`}
                    fluid
                  />
                ) : (
                  ""
                )}
              </div>
            </Col>
            <Col sm={9} className="mt-4">
              <div className="text-sm-left text-center mb-4">
                <p className={styles.title}>{movie_name}</p>
                <p className={styles.semiTitle}>{movie_category}</p>
              </div>
              <div className="d-flex flex-sm-column flex-row justify-content-between">
                <div>
                  <p className={styles.semi}>Release date</p>
                  <p className={styles.semiBlack}>
                    {movie_release_date.slice(0, 10)}
                  </p>
                  <p className={styles.semi}>Duration</p>
                  <p className={styles.semiBlack}>
                    {movie_duration.slice(0, 5)}
                  </p>
                </div>
                <div>
                  <p className={styles.semi}>Directed by</p>
                  <p className={styles.semiBlack}>{movie_directed_by}</p>
                  <p className={styles.semi}>Casts</p>
                  <p className={styles.semiBlack}>{movie_casts}</p>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <p className={styles.semiTitleBlack}>Synopsis</p>
              <p className={styles.semi}>{movie_synopsis}</p>
            </Col>
          </Row>
        </Container>
        <Container className="mt-5">
          <Row>
            <Col className={`${styles.semiTitleBlack} text-center`}>
              Showtimes and Tickets
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <Form.Group className="d-flex flex-sm-row flex-column justify-content-center mt-3 mb-5">
                  <div className="mr-2 ml-2 mt-3">
                    <Form.Control
                      type="date"
                      name="show_time_date"
                      onChange={(event) => this.changeText(event)}
                    />
                  </div>
                  <div className="ml-2 mr-2 mt-3">
                    <Form.Control
                      type="text"
                      name="premiere_location"
                      placeholder="City name"
                      onChange={(event) => this.changeText(event)}
                    />
                  </div>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              {premiere_desc.length > 0 ? (
                <div className="d-flex flex-wrap justify-content-center">
                  {premiere_desc.map((e, i) => {
                    return <Cards data={[movie_id, e]} key={i} />;
                  })}
                </div>
              ) : (
                <p className={`${styles.semiTitleBlack} text-center`}>
                  Premiere Not Found !
                </p>
              )}
            </Col>
          </Row>
        </Container>
        <Container>
          <div className="d-flex flex-row justify-content-center">
            <div>
              <Image src={line} fluid />
            </div>
            <a href="#home" className={styles.viewAll}>
              view all
            </a>
            <div>
              <Image src={line} fluid />
            </div>
          </div>
        </Container>
        <Container>
          <Footer />
        </Container>
      </>
    );
  }
}
export default MovieDetail;
