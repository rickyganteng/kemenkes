import React, { Component } from "react";
// import { Link } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";
import Cards from "../../../components/Card/Cards";
import Card from "../../../components/CardUpdate/CardUpdate";
import axiosApiIntances from "../../../utils/axios";
import ReactPaginate from "react-paginate";
import { Button, Image, Container, Row, Col, Form, Dropdown, DropdownButton, Modal } from "react-bootstrap";
import line from "../../../assets/img/line.png";
import hero1 from "../../../assets/img/g1.png";
import hero2 from "../../../assets/img/g2.png";
import hero3 from "../../../assets/img/g3.png";
import styles from "./DataLaporanUser.module.css";
import { connect } from "react-redux";
import moment from "moment";
import { getPremiereAll } from "../../../redux/action/ruangan"
import { getlaporanRuanganAll, getlaporanRuanganAllTanpaFill, getlaporanRuanganTanggal } from "../../../redux/action/laporanRuangan"
import { getLaporanUser } from "../../../redux/action/user"
import { DataGrid } from '@mui/x-data-grid';
import DateRangeIcon from '@mui/icons-material/DateRange';
import TextField from '@mui/material/TextField';
import { Search } from "react-bootstrap-icons";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownVal: "Sort By",
      sortBy: "id ASC",
      search: "%%",
      photoShow: false,
      modalTanggal: false,
      dataMovPlayNow: [],
      dataMovUpcoming: [],
      tmpDataMovUpcoming: [],
      moon: [
        "January 01",
        "February 02",
        "March 03",
        "April 04",
        "May 05",
        "June 06",
        "July 07",
        "August 08",
        "September 09",
        "October 10",
        "November 11",
        "December 12",
      ],
      pagination: {},
      page: 4,
      limit: 3,
      isShowView1: false,
      smShow: false,
      form: {
        siswaNama: "",
        siswaNISN: "",
        siswaKelas: "",
        siswaTempatLahir: "",
        siswaTglLahir: "",
        siswaNamaAyah: "",
        siswaNamaIbu: "",
        siswaAlamat: "",
        searchtanggal: "",
        FromDate: "",
        ToDate: "",
      }
    };
  }

  componentDidMount() {

    this.getData();
    this.getData1();
    this.getData2();
    this.getData3();
    this.getData4();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.sortBy !== this.state.sortBy
    ) {
      this.setState({ page: 1 }, () => {
        this.getData4();
      });
    }

    if (
      prevState.search !== this.state.search ||
      prevState.sortBy !== this.state.sortBy ||
      prevState.page !== this.state.page
    ) {
      this.props.history.push(
        `datalaporan?search=${this.state.search}&sortby=${this.state.sortBy}`
      );
    }
  }
  getData = () => {

    // this.props.getAllMovie();
  };
  getData1 = () => {
    const { page, limit, sortBy, search } = this.state;
    this.props.getPremiereAll(page, limit, sortBy, search);
  };
  getData2 = () => {
    const { searchtanggal, FromDate, ToDate } = this.state.form;
    this.props.getlaporanRuanganTanggal(searchtanggal, FromDate, ToDate);
  };
  getData4 = () => {
    const { sortBy, search } = this.state;
    this.props.getlaporanRuanganAllTanpaFill(sortBy, search);
  };
  getData3 = () => {
    const id = this.props.auth.data.id;
    this.props.getLaporanUser(id);
  };

  getDataMovieUpcoming = (page, limit, sort) => {
    axiosApiIntances
      .get(`movie?page=${page}&limit=${limit}&sort=${sort}`)
      .then((res) => {
        this.setState({
          dataMovUpcoming: res.data.data,
          tmpDataMovUpcoming: res.data.data,
        });
      })
      .catch((err) => {
        return [];
      });
  };

  getDataMoviePlayNow = (page, limit, sort) => {
    axiosApiIntances
      .get(`movie?page=${page}&limit=${limit}&sort=${sort}`)
      .then((res) => {
        this.setState({
          dataMovPlayNow: res.data.data,
          pagination: res.data.pagination,
        });
      })
      .catch((err) => {
        return [];
      });
  };

  handleMoon = (moon) => {
    const { dataMovUpcoming } = this.state;
    const filterTmp = dataMovUpcoming.filter(
      (e) => e.movie_release_date.split("-")[1] === moon
    );
    this.setState({
      tmpDataMovUpcoming: filterTmp,
    });
  };

  handleView2 = () => {
    this.setState({
      tmpDataMovUpcoming: this.state.dataMovUpcoming,
    });
  };

  handleView1 = () => {
    let { isShowView1 } = this.state;
    isShowView1 ? (isShowView1 = false) : (isShowView1 = true);
    this.setState({
      isShowView1: isShowView1,
    });
  };

  handleBanner = (id) => {
    this.props.history.push(`/main/movie-detail/${id}`);
  };

  handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    this.setState({ page: selectedPage }, () => {
      this.getDataMoviePlayNow(
        this.state.page,
        this.state.limit,
        "movie_release_date DESC"
      );
    });
  };
  handlePageClick2 = (event) => {
    const selectedPage1 = event.selected + 1;
    this.setState({ page: selectedPage1 }, () => {
      this.getData();
    });
  };
  setUpdate = (data) => {
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
  handleSelect = (event) => {
    this.setState({
      dropDownVal: event.split("-")[0],
      sortBy: event.split("-")[1],
    });
  };

  setSmShow = (event) => {
    this.setState({
      smShow: true
    });
  };
  modalClose = (event) => {
    this.setState({
      smShow: false,
      photoShow: false,
      modalTanggal: false
    });
  };
  changeText = (event) => {
    this.setState({ [event.target.name]: "%" + event.target.value + "%" });
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

  handleImageTable = (moon) => {
    this.setState({
      photoSuratDinas: moon.row.booking_ruangan_surat_dinas,
      photoShow: true
    });
  };
  handleTanggal = () => {

    this.setState({
      modalTanggal: true
    });
  };

  changeTextForm = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };
  render() {
    const {
      siswaNama,
      siswaNISN,
      siswaKelas,
      siswaTempatLahir,
      siswaTglLahir,
      siswaNamaAyah,
      siswaNamaIbu,
      siswaAlamat,
      FromDate, ToDate, searchtanggal
    } = this.state.form;
    const { dropDownVal, smShow, photoShow, modalTanggal, photoSuratDinas } = this.state;
    const { laporanruangann } = this.props.laporanruangan;
    const { data } = this.props.auth;
    const { dataLaporanById } = this.props.user;
    const columns = [
      // { field: 'id', headerName: 'ID', width: 70 },
      { field: 'booking_ruangan_nama', headerName: 'Nama', width: 130 },
      { field: 'booking_ruangan_nip', headerName: 'NIP', width: 130 },
      { field: 'booking_ruangan_unitkerja', headerName: 'Unit Kerja', width: 130 },
      {
        field: 'booking_ruangan_tanggal', headerName: 'Tanggal Mulai', width: 130, renderCell: (params) => {
          var confdate = new Date(parseInt(params.row.booking_ruangan_tanggal)).toLocaleDateString("en-CA");
          return (
            <div
              className={` mt-0  mx-auto`}

            >{confdate}</div>
          )
        }
      },
      { field: 'booking_ruangan_nohp', headerName: 'No HP', width: 130 },
      { field: 'booking_ruangan_direktorat', headerName: 'Direktorat', width: 130 },
      { field: 'booking_ruangan_email', headerName: 'Email', width: 170 },
      { field: 'booking_ruangan_penaggung_jawab', headerName: 'Penanggung Jawab', width: 130 },
      { field: 'booking_ruangan_keterangan_kegiatan_acara', headerName: 'Keterangan Kegiatan Acara', width: 130 },
      { field: 'booking_ruangan_ruangan', headerName: 'Ruangan', width: 130 },
      { field: 'booking_ruangan_waktu_penggunaan_awal', headerName: 'Waktu Mulai', width: 130 },
      { field: 'booking_ruangan_waktu_penggunaan_akhir', headerName: 'Waktu Selesai', width: 130 },
      {
        field: 'suratdinasbooking_ruangan_surat_dinas', headerName: 'Surat Dinas', width: 130, renderCell: (params) => {
          return (
            // you will find row info in params
            <Button onClick={() => this.handleImageTable(params)} variant="outline-primary">View Photo</Button>

          )
        }
      },
      { field: 'status_booking_ruangan', headerName: 'Status', width: 130 },

    ];

    const rows = [
      { id: 1, nama: 'Snow', nip: '08374738734', jabatan: 'dirjen', instansi: 'p2p', email: 'abcde@gmail.com', nohp: 62858238492, status: 'selesai' },
      { id: 2, nama: 'Agus', nip: '73748398384', jabatan: 'dirjen', instansi: 'p2p', email: 'abcde@gmail.com', nohp: 62858238492, status: 'selesai' },
      { id: 3, nama: 'Bagas', nip: '83984723874', jabatan: 'dirjen', instansi: 'p2p', email: 'abcde@gmail.com', nohp: 62858238492, status: 'selesai' },
      { id: 4, nama: 'Candra', nip: '83928749849', jabatan: 'dirjen', instansi: 'p2p', email: 'abcde@gmail.com', nohp: 62858238492, status: 'selesai' },
      { id: 5, nama: 'Edriana', nip: '82387387382', jabatan: 'dirjen', instansi: 'p2p', email: 'abcde@gmail.com', nohp: 62858238492, status: 'selesai' },
      { id: 6, nama: 'Fandy', nip: '11239849894', jabatan: 'dirjen', instansi: 'p2p', email: 'abcde@gmail.com', nohp: 62858238492, status: 'selesai' },

    ];
    return (
      <>

        <NavBar isAdminPage={false} />


        <Container>
          <Row>
            {data.user_role === "admin" ? (
              <Col>
                <h2 className="mt-5 mb-3">DATA LAPORAN</h2>
              </Col>
            ) : (
              <Col>
                <h2 className="mt-5 mb-3">Riwayat Booking</h2>
              </Col>
            )}

            <Col lg={3} className="mt-5 mb-3">
              <Form className={styles.searchInput}>
                <Form.Group>
                  {data.user_role === "admin" ? (
                    <Form.Control
                      type="text"
                      placeholder="Cari Nama Unit Kerja..."
                      name="search"
                      onChange={(event) => this.changeText(event)}
                    />
                  ) : (
                    ""
                  )}

                </Form.Group>
              </Form>
            </Col>
            {/* <Col xs={1}><Button onClick={() => this.handleTanggal()}><DateRangeIcon /></Button></Col> */}
          </Row>
          {/* <Button onClick={() => this.setSmShow()} className="me-2">Input Data Laporan</Button> */}
          <div style={{ height: 740, width: '100%' }}>
            {/* {this.state.form.FromDate === "" ? (<p>heheheh</p>) : (<p>huhuhuh</p>)} */}

            {data.user_role === "admin" ? (
              <DataGrid
                rows={laporanruangann}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[10, 15, 25]}
                getRowHeight={() => 100}
              />
            ) : (
              <DataGrid
                rows={dataLaporanById}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[10, 15, 25]}
                getRowHeight={() => 100}
              />
            )}
          </div>

          <Modal
            size="xl"
            centered
            show={photoShow}
            onHide={() => this.modalClose()}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Photo Surat Dinas
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Image
                className={`${styles.hero} p-4 mb-4 d-block mx-auto`}
                src={`http://localhost:3001/backend1/api/${photoSuratDinas}`}
                fluid
              />
            </Modal.Body>
          </Modal >
          <Modal
            size="xl"
            centered
            show={modalTanggal}
            onHide={() => this.modalClose()}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Filter Date
              </Modal.Title>

            </Modal.Header>
            <Modal.Body>

              <Row>
                <Col>

                  <TextField
                    required
                    fullWidth
                    id="outlined-password-input"
                    label="From Date"
                    type="date"
                    // defaultValue="05/04/2022"
                    name="FromDate"
                    value={FromDate}
                    onChange={(event) => this.changeTextForm(event)}
                  />
                </Col>
                <Col>

                  <TextField
                    required
                    fullWidth
                    id="outlined-password-input"
                    label="To Date"
                    type="date"
                    defaultValue="05/04/2022"
                    name="ToDate"
                    value={ToDate}
                    onChange={(event) => this.changeTextForm(event)}
                  />
                </Col>
                <Col lg={3}>
                  <TextField
                    fullWidth
                    id="outlined-password-input"
                    label="Search Unit Kerja"
                    type="text"
                    name="searchtanggal"
                    value={searchtanggal}
                    onChange={(event) => this.changeTextForm(event)}
                  />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Row>
                <Col>
                  <Button
                    className={`${styles.btReset} mb-2`}
                    onClick={() => this.modalClose()}

                    variant="outline-primary">Cancel</Button>
                </Col>
                <Col>
                  <Button
                    className={styles.btSubmit}
                    variant="primary"
                    onClick={() => this.sendData()}
                  >
                    {/* {isUpdate ? "Update" : "Submit"} */}
                    search
                  </Button>
                </Col>
              </Row>
            </Modal.Footer>
          </Modal >
          <Footer />
        </Container >

      </>
    );
  }
}
const mapDispatchToProps = { getPremiereAll, getlaporanRuanganAll, getLaporanUser, getlaporanRuanganAllTanpaFill, getlaporanRuanganTanggal };

const mapStateToProps = (state) => ({
  movie: state.movie,
  ruangan: state.ruangan,
  bookingruangan: state.bookingruangan,
  laporanruangan: state.laporanruangan,
  laporanUser: state,
  auth: state.auth,
  coba: state,
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home;
