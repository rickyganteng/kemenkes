import React, { Component } from "react";
import moment from "moment";
import axiosApiIntances from "../../../utils/axios";
import ReactPaginate from "react-paginate";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/NavBar/NavBar";
import Card from "../../../components/CardBookUpdate/CardBookUpdate";
import { getDataLocation } from "../../../redux/action/location";
import { getMovieName } from "../../../redux/action/movie";
import { postSchedule } from "../../../redux/action/schedule";
import { deletePremiere } from "../../../redux/action/premiere";
import { connect } from "react-redux";
import {
  getAllMovie,
  updateMovie,
  // postSchedule,
  deleteMovie
} from "../../../redux/action/movie";
import {
  getDataShowTime
} from "../../../redux/action/showtime";
import {
  Container,
  Form,
  Row,
  Col,
  Image,
  Button,
  DropdownButton,
  Dropdown,
  Modal,
} from "react-bootstrap";
import styles from "./AdminManageSchedule.module.css";
import dummy from "../../../assets/img/no_image.jpg";
import ebvid from "../../../assets/img/logo_2.png";
import cineone from "../../../assets/img/logo_3.png";
import hiflix from "../../../assets/img/logo_4.png";

class AdminSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageMovie: "",
      premiere_desc: [],
      show_time_date: "",
      premiere_location: "",
      locationn: {},
      movieNamee: {},
      movieNameVal: "Selected Movie",
      dropDownVal2: "Selected Location",
      ById: 2,
      search: "%%",
      orderBy: "premiere_name ASC",
      form: {
        premiereName: "",
        showTimeDate: "",
        premierePrice: "",
        showTimeDateEnd: "",
        showTimeClock: "",
        movieId: "",
        locationId: "",
        premiereMethod: "",
      },
      pagination: {},
      id: 0,
      show: false,
      modalMsg: "",
      isUpdate: false,
      page: 1,
      limit: 9,
      listPremiere: [
        [ebvid, "2021-04-30T13-41-23.136Zlogo_2.png"],
        [cineone, "2021-04-30T13-42-24.022Zlogo_3.png"],
        [hiflix, "2021-04-30T13-43-45.638Zlogo_4.png"],
      ],
    };
  }

  componentDidMount() {
    this.getData();
    this.props.getDataLocation().then((res) => {
      this.setState({ locationn: res.action.payload.data.data });
      console.log(res.action.payload.data.data);

    });
    this.props.getMovieName().then((res) => {
      this.setState({ movieNamee: res.action.payload.data.data });
      console.log(res.action.payload.data);
    });
    // this.getDataMovieDetail();
    this.getDataPremiere();

  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.sortBy !== this.state.sortBy
    ) {
      this.setState({ page: 1 }, () => {
        this.getDataPremiere();
      });
    }

    if (
      prevState.sortBy !== this.state.sortBy ||
      prevState.page !== this.state.page
    ) {
      this.props.history.push(
        `/main/admin/manage-schedule?search=sortby=${this.state.orderBy}&page=${this.state.page}`
      );
    }
  }
  getDataPremiere = () => {
    // const { movie_id } = this.state;
    let { show_time_date, premiere_location, limit, page } = this.state;
    console.log(this.state);
    premiere_location = "%" + premiere_location + "%";
    show_time_date = "%" + show_time_date + "%";
    console.log(
      "Get Data Premiere!",
      show_time_date,
      "+",
      premiere_location,
      // "+",
      // movie_id
    );
    axiosApiIntances
      .get(
        `premiere/ray/premiere/pre?loc=${premiere_location}&limit=${limit}&page=${page}`
      )
      .then((res) => {
        this.setState({
          premiere_desc: res.data.data,
          pagination: res.data.pagination
        });
        console.log(res.data.pagination);
      })
      .catch((err) => {
        return [];
      });
  };

  getData = () => {
    // const { page, limit, sortBy, search } = this.state;

    this.props.getDataShowTime();
  };
  postData = () => {
    const { form } = this.state;
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    this.props
      .postSchedule(formData)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Submit Data Succes !",
            show: true,
          },
          () => {
            this.getData();
          }
        );
        this.resetForm();
      })
      .catch((err) => {
        this.setState({
          modalMsg: "Submit Data Failed !",
          show: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ show: false });
        }, 1000);
      });
  };

  handlePremiere = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        premiereMethod: event,
      },
      premiereMethod: event,
    });
  };

  updateData = () => {
    const { form, id } = this.state;
    delete form.movieImage;
    if (!form.image) {
      delete form.image;
    }
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    // for (var pair of formData.entries()) {
    // }
    this.props
      .updateMovie(id, formData)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Update Data Succes !",
            show: true,
            isUpdate: false,
          },
          () => {
            this.getData();
          }
        );
        this.resetForm();
      })
      .catch((err) => {
        this.setState({
          modalMsg: "Update Data Failed !",
          show: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ show: false });
        }, 1000);
      });
  };

  handleSelectMovie = (event) => {
    console.log(event);
    this.setState({
      movieNameVal: event.split("_")[0],
      ById: event.split("_")[1],
      imageMovie: event.split("_")[2],
      form: {
        ...this.state.form,
        movieId: event.split("_")[1],
      }
    });
    console.log(event.split("_")[0]);
    // console.log(event.split("-")[1]);
  };
  handleSelectLocation = (event) => {
    this.setState({
      dropDownVal2: event,
      form: {
        ...this.state.form,
        locationId: event.split("_")[1],
      }
      // sortBy: event.split("-")[1],
    });
  };
  handleSelect = (event) => {
    this.setState({
      movieNameVal: event,
      // sortBy: event.split("-")[1],
    });
  };

  changeText = (event) => {
    this.setState({ [event.target.name]: "%" + event.target.value + "%" });
  };

  changeTextForm = (event) => {
    console.log(event.target.value);
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleImage = (event) => {
    if (event.target.files[0]) {
      this.setState({
        form: {
          ...this.state.form,
          movieImage: URL.createObjectURL(event.target.files[0]),
          image: event.target.files[0],
        },
      });
    } else {
      this.setState({
        form: {
          ...this.state.form,
          movieImage: null,
          image: null,
        },
      });
    }
  };

  handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    this.setState({ page: selectedPage }, () => {
      this.getDataPremiere();
    });
  };

  resetForm = () => {
    this.setState({
      form: {
        premiereName: "",
        showTimeDate: "",
        premierePrice: "",
        showTimeDateEnd: "",
        showTimeClock: "",
        movieId: "",
      },
    });
  };

  sendData = () => {
    const { isUpdate } = this.state;
    if (isUpdate) {
      this.updateData();
    } else {
      this.postData();
    }
  };

  setUpdate = (data) => {
    // console.log(data);
    this.setState({
      isUpdate: true,
      id: data.movie_id,
      form: {
        movieName: data.movie_name,
        movieCategory: data.movie_category,
        movieReleaseDate: moment(data.movie_release_date).format("YYYY-MM-DD"),
        movieDuration: data.movie_duration,
        movieDirectedBy: data.movie_directed_by,
        movieCasts: data.movie_casts,
        movieSynopsis: data.movie_synopsis,
        movieImage: `http://localhost:3001/backend1/api/${data.movie_image}`,
        image: null,
      },
    });
  };

  deleteData = (id) => {
    // console.log(this.props);
    this.props
      .deletePremiere(id)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Premiere Deleted !",
            show: true,
          },
          () => {
            this.getDataPremiere();
          }
        );
      })
      .catch((err) => {
        this.setState({
          modalMsg: "Deleted Failed !",
          show: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ show: false });
        }, 1000);
      });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    const {
      movieNameVal,
      dropDownVal2,
      isUpdate,
      ById,
      show,
      modalMsg,
      listPremiere,
      premiereMethod,
      premiere_desc
    } = this.state;
    console.log(this.state);
    const {
      // movieName,
      premiereName,
      showTimeDate,
      premierePrice,
      showTimeDateEnd,
      showTimeClock,
      movieId = this.state.ById,
      locationId = this.state.ById
    } = this.state.form;
    console.log(ById);
    return (
      <>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className={styles.modal}>{modalMsg}</Modal.Title>
          </Modal.Header>
        </Modal>
        <NavBar isAdminPage={true} />
        <Container className={`${styles.bgCnt} pt-5 pb-5`} fluid>
          <Container className={styles.bgCnt}>
            <p className={styles.title}>Form Schedule</p>
            <div className={`${styles.bgDiv} ${styles.semi} p-5`}>
              <Row>
                <Col lg={4}>
                  <Image
                    className={`${styles.hero} p-4 mb-4 d-block mx-auto`}
                    src={this.state.imageMovie ? `http://localhost:3001/backend1/api/${this.state.imageMovie}` : dummy}
                    fluid
                  />
                </Col>
                <Col lg={8}>
                  <Form>
                    <Form.Group as={Row}>
                      <Col xs={6}>
                        <p className={styles.textleft}>Name Movie</p>
                        <DropdownButton
                          className={`${styles.dropDown} mb-2 text-right`}
                          name="movieId"
                          value={movieId}
                          variant="secondary"
                          title={movieNameVal}
                          id="dropdown-menu-align-right"
                          onSelect={this.handleSelectMovie}
                        >
                          {this.state.movieNamee.length > 0 ? (
                            this.state.movieNamee.map((item, index) => {
                              // console.log(item.movie_id);
                              return (
                                <div className="p-3 shadow" key={index}>
                                  <Dropdown.Item
                                    className={styles.semi}
                                    eventKey={`${item.movie_name}_${item.movie_id}_${item.movie_image}`}
                                  // onChange={(event) => this.changeTextForm(event)}

                                  >
                                    {item.movie_name}
                                  </Dropdown.Item>
                                </div>
                              );
                            })
                          ) : (
                            <p className={styles.notFound}>Movie Not Found !!!</p>
                          )}

                        </DropdownButton>
                      </Col>
                      <Col xs={6}>
                        <p className={styles.textleft}>Name Location</p>
                        <DropdownButton
                          className={`${styles.dropDown}  text-left`}
                          variant="secondary"
                          name="locationId"
                          value={locationId}
                          title={dropDownVal2}
                          id="dropdown-menu-align-right"
                          onSelect={this.handleSelectLocation}

                        >
                          {this.state.locationn.length > 0 ? (
                            this.state.locationn.map((item, index) => {
                              console.log(item.location_city);
                              return (
                                <div className="p-3 shadow" key={index}>
                                  <Dropdown.Item
                                    className={styles.semi}
                                    eventKey={`${item.location_city}_${item.location_id}`}
                                    onChange={(event) => this.changeTextForm(event)}

                                  >
                                    {item.location_city}
                                  </Dropdown.Item>
                                </div>
                              );
                            })
                          ) : (
                            <p className={styles.notFound}>Location Not Found !!!</p>
                          )}
                        </DropdownButton>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Col xs={3}>
                        <Form.Label>Name Premiere</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="movieName"
                          name="premiereName"
                          value={premiereName}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>
                      <Col xs={3}>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="00"
                          name="premierePrice"
                          value={premierePrice}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>
                      <Col xs={3}>
                        <Form.Label>Date Start</Form.Label>
                        <Form.Control
                          type="date"
                          name="showTimeDate"
                          value={showTimeDate}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>
                      <Col xs={3}>
                        <Form.Label>Date End</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="00"
                          name="showTimeDateEnd"
                          value={showTimeDateEnd}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Col xs={6}>
                        <p className={styles.textleft}>Premiere</p>
                        <Row className="mb-4">
                          {listPremiere.map((item, index) => {
                            return (
                              <Col key={index}>
                                <Button
                                  className={`${styles.btnPayment} ${premiereMethod === item[1]
                                    ? styles.btnPaymentSelect
                                    : ""
                                    }`}
                                  variant="outline-secondary"
                                  onClick={() => {
                                    this.handlePremiere(item[1]);
                                  }}
                                >
                                  <Image src={item[0]} fluid />
                                </Button>
                              </Col>
                            );
                          })}
                        </Row>
                      </Col>
                      <Col xs={6}>
                        <p className={styles.textleft}>Time</p>
                        <Form.Control
                          type="text"
                          placeholder="00"
                          name="showTimeClock"
                          value={showTimeClock}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col></Col>
                <Col md={2}>
                  <Button
                    className={`${styles.btReset} mb-2`}
                    variant="outline-primary"
                    onClick={() => this.resetForm()}
                  >
                    Reset
                  </Button>
                </Col>
                <Col md={2}>
                  <Button
                    className={styles.btSubmit}
                    variant="primary"
                    onClick={() => this.sendData()}
                  >
                    {isUpdate ? "Update" : "Submit"}
                  </Button>
                </Col>
              </Row>
            </div>
          </Container>

          <Container className="mt-5">
            <Row>
              <Col md={8}>
                <p className={styles.title}>Data Schedule</p>
              </Col>
            </Row>
            <div
              className={`${styles.bgDiv} ${styles.semi} pt-5 pb-5 pl-3 pr-3`}
            >
              <Row>
                {premiere_desc.length > 0 ? (
                  <div className="d-flex flex-wrap justify-content-center">
                    {premiere_desc.map((e, i) => {
                      return (
                        <Card
                          data={e} key={i}
                          handleDelete={this.deleteData.bind(this)}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <p className={`${styles.semiTitleBlack} text-center`}>
                    Premiere Not Found !
                  </p>
                )}

              </Row>
            </div>
          </Container>
        </Container>
        <Container className={styles.bgCnt} fluid>
          <div className="d-flex justify-content-center">
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pagination.totalPage ? this.state.pagination.totalPage : 0}
              marginPagesDisplayed={5}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={styles.pagination}
              subContainerClassName={`${styles.pages} ${styles.pagination}`}
              activeClassName={styles.active}
            />
          </div>
        </Container>
        <Container>
          <Footer />
        </Container>
      </>
    );
  }
}

const mapDispatchToProps = { getAllMovie, updateMovie, postSchedule, deleteMovie, deletePremiere, getDataShowTime, getDataLocation, getMovieName };

const mapStateToProps = (state) => ({
  movie: state.movie,
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminSchedule);