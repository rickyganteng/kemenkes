import React, { Component } from "react";
import moment from "moment";
import ReactPaginate from "react-paginate";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/NavBar/NavBar";
import Card from "../../../components/CardUpdate/CardUpdate";
import { connect } from "react-redux";
import {
  getAllMovie,
  updateMovie,
  postMovie,
  deleteMovie,
} from "../../../redux/action/movie";
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
import styles from "./AdminManageMovie.module.css";
import dummy from "../../../assets/img/no_image.jpg";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownVal: "Sort By",
      sortBy: "movie_name ASC",
      search: "%%",
      form: {
        movieName: "",
        movieCategory: "",
        movieReleaseDate: "",
        movieDuration: "00:00",
        movieDirectedBy: "",
        movieCasts: "",
        movieSynopsis: "",
        movieImage: null,
        image: null,
      },
      id: 0,
      show: false,
      modalMsg: "",
      isUpdate: false,
      page: 1,
      limit: 4,
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.sortBy !== this.state.sortBy
    ) {
      this.setState({ page: 1 }, () => {
        this.getData();
      });
    }

    if (
      prevState.search !== this.state.search ||
      prevState.sortBy !== this.state.sortBy ||
      prevState.page !== this.state.page
    ) {
      this.props.history.push(
        `/main/admin/manage-movie?search=${this.state.search}&sortby=${this.state.sortBy}&page=${this.state.page}`
      );
    }
  }

  getData = () => {
    const { page, limit, sortBy, search } = this.state;

    this.props.getAllMovie(page, limit, sortBy, search);
  };
  postData = () => {
    const { form } = this.state;
    delete form.movieImage;
    if (!form.image) {
      delete form.image;
    }
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    this.props
      .postMovie(formData)
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

  handleSelect = (event) => {
    this.setState({
      dropDownVal: event.split("-")[0],
      sortBy: event.split("-")[1],
    });
  };

  changeText = (event) => {
    this.setState({ [event.target.name]: "%" + event.target.value + "%" });
  };

  changeTextForm = (event) => {
    const { movieDuration } = this.state.form;
    let hour = movieDuration.split(":")[0];
    let minute = movieDuration.split(":")[1];
    if (event.target.name === "movieDurationHour") {
      hour = event.target.value;
      this.setState({
        form: {
          ...this.state.form,
          movieDuration: hour + ":" + minute + ":00",
        },
      });
    } else if (event.target.name === "movieDurationMinute") {
      minute = event.target.value;
      this.setState({
        form: {
          ...this.state.form,
          movieDuration: hour + ":" + minute + ":00",
        },
      });
    } else {
      this.setState({
        form: {
          ...this.state.form,
          [event.target.name]: event.target.value,
        },
      });
    }
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
      this.getData();
    });
  };

  resetForm = () => {
    this.setState({
      form: {
        ...this.state.form,
        movieName: "",
        movieCategory: "",
        movieReleaseDate: "",
        movieDuration: "00:00",
        movieDirectedBy: "",
        movieCasts: "",
        movieSynopsis: "",
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
    this.props
      .deleteMovie(id)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Movie Deleted !",
            show: true,
          },
          () => {
            this.getData();
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
    const { dropDownVal, isUpdate, show, modalMsg } = this.state;
    const {
      movieName,
      movieCategory,
      movieReleaseDate,
      movieDuration,
      movieDirectedBy,
      movieCasts,
      movieSynopsis,
      movieImage,
    } = this.state.form;

    const { dataMovie, pagination } = this.props.movie;

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
            <p className={styles.title}>Movie Description</p>
            <div className={`${styles.bgDiv} ${styles.semi} p-5`}>
              <Row>
                <Col lg={4}>
                  <Image
                    className={`${styles.hero} p-4 mb-4 d-block mx-auto`}
                    src={movieImage ? movieImage : dummy}
                    fluid
                  />
                </Col>
                <Col lg={8}>
                  <Form>
                    <Form.Group>
                      <Form.Label>Movie Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="movieName"
                        name="movieName"
                        value={movieName}
                        onChange={(event) => this.changeTextForm(event)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Movie Category</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="movieCategory"
                        name="movieCategory"
                        value={movieCategory}
                        onChange={(event) => this.changeTextForm(event)}
                      />
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Col xs={6}>
                        <Form.Label>Release Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="movieReleaseDate"
                          value={movieReleaseDate}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>
                      <Col xs={3}>
                        <Form.Label>Hour</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="00"
                          name="movieDurationHour"
                          value={movieDuration.split(":")[0]}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>
                      <Col xs={3}>
                        <Form.Label>Minute</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="00"
                          name="movieDurationMinute"
                          value={movieDuration.split(":")[1]}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group>
                      <Form.File
                        label="Movie Image"
                        onChange={(event) => this.handleImage(event)}
                      />
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form>
                    <Form.Group as={Row}>
                      <Col xs={4}>
                        <Form.Label>Director</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="movieDirector"
                          name="movieDirectedBy"
                          value={movieDirectedBy}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>
                      <Col xs={8}>
                        <Form.Label>Casts</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="movieCasts"
                          name="movieCasts"
                          value={movieCasts}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Synopsis</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        size="lg"
                        type="text"
                        placeholder="movieSynopsis"
                        name="movieSynopsis"
                        value={movieSynopsis}
                        onChange={(event) => this.changeTextForm(event)}
                      />
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
              <Col md={3}>
                <p className={styles.title}>Data Movie</p>
              </Col>
              <Col></Col>
              <Col lg={3}>
                <DropdownButton
                  className={`${styles.dropDown} mb-2 text-right`}
                  variant="secondary"
                  title={dropDownVal}
                  id="dropdown-menu-align-right"
                  onSelect={this.handleSelect}
                >
                  <Dropdown.Item
                    className={styles.semi}
                    eventKey="By Name A to Z-movie_name ASC"
                  >
                    Sort by Name A-Z
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={styles.semi}
                    eventKey="By Name Z to A-movie_name DESC"
                  >
                    Sort by Name Z-A
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={styles.semi}
                    eventKey="By Latest Release Date-movie_release_date ASC"
                  >
                    Sort News by Release Date
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={styles.semi}
                    eventKey="By Oldest Release Date-movie_release_date DESC"
                  >
                    Sort last by Release Date
                  </Dropdown.Item>
                </DropdownButton>
              </Col>
              <Col lg={3}>
                <Form className={styles.searchInput}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Search movie name..."
                      name="search"
                      onChange={(event) => this.changeText(event)}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <div
              className={`${styles.bgDiv} ${styles.semi} pt-5 pb-5 pl-4 pr-4`}
            >
              <Row>
                {dataMovie.map((item, key) => {
                  return (
                    <Col lg={3} md={4} key={key} className="mb-2">
                      <Card
                        data={item}
                        handleUpdate={this.setUpdate.bind(this)}
                        handleDelete={this.deleteData.bind(this)}
                      />
                    </Col>
                  );
                })}
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
              pageCount={pagination.totalPage ? pagination.totalPage : 0}
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

const mapDispatchToProps = { getAllMovie, updateMovie, postMovie, deleteMovie };

const mapStateToProps = (state) => ({
  movie: state.movie,
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
