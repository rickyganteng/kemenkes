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
import styles from "./DataPeminjam.module.css";
import { connect } from "react-redux";
import moment from "moment";
import {
  getAllMovie,
  updateMovie,
  postMovie,
  deleteMovie,
} from "../../../redux/action/movie";
import { getUserAllTanpaFill, postUser, updateDataUser, deleteUser } from "../../../redux/action/user"
import EditIcon from '@mui/icons-material/Edit';
import { getPremiereAll } from "../../../redux/action/ruangan"
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownVal: "Sort By",
      sortBy: "movie_name ASC",
      search: "%%",
      dropDownUserRole: "select user role",
      dropDownVal2: "Pilih Unit Kerja",
      listUserRole: ["admin", "basic"],
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
      unitkerja: [
        "Sekertariat P2P (Program dan Informasi)",
        "Sekertariat P2P (Hukum, Organisasi dan Hubungan Masyarakat)",
        "Sekertariat P2P (Keuangan dan BMN)",
        "Sekertariat P2P (Kepegawaian dan Umum)",
        "P2PM (Turbeckulosis dan infeksisaluran pernapasan akut (ISPA))",
        "P2PM (Turbeckulosis dan infeksisaluran pernapasan akut (ISPA))",
        "P2PM (HIV, Penyakit Infeksi Menular Seksual (PIMS), Hepatitis dan Penyakit saluran Infeksi Pernapasa (PISP))",
        "P2PM (Neglected Disease (Penyakit Tropis Terabaikan))",
        "P2PM (Zoonosis dan Penyakit Akibat Gigitan Hewan Berbisa dan Tanaman Beracun)",
        "P2PM (Penyakit Tular Vektor)",
        "Pengelolaan Imunisasi (Imunisasi Dasar dan Anak Usia di bawah dua tahun (Baduta))",
        "Pengelolaan Imunisasi (Imunisasi Tambahan Dan Khusus)",
        "Pengelolaan Imunisasi (Imunisasi Wanita Usia Subur (WUS) dan Surveilan Penyakit yang Dapat Dicegah Dengan Imunisasi (PD31),(KIPI))",
        "Pengelolaan Imunisasi (Imunisasi Usia Sekolah dan Sumber Daya Imunisasi)",
        "P2PTM (Gangguan Indra Dan Funsional)",
        "P2PTM (Diabetes Melitus dan Gangguan Metabolik)",
        "P2PTM (Jantung Dan Pembulu Darah)",
        "P2PTM (Kangker dan Kelainan Darah)",
        "P2PTM (Paru Kronik dan Gangguan Imunologi)",
        "Penyehatan Lingkungan (Penyehatan Air dan Sanitasi Dasar)",
        "Penyehatan Lingkungan (Penyehatan Pangan)",
        "Penyehatan Lingkungan (Penyehatan Udara,Tanah dan Kawasan)",
        "Penyehatan Lingkungan (Pengamanan Limbah dan Radiasi)",
        "Penyehatan Lingkungan (Adaptasi Perubahan Iklim dan Kebencanaan Lingkungan )",
        "SUKARKES (Kekarantinaan Kesehatan)",
        "SUKARKES (Pengelolaan Laboratorium Kesehatan Masyarakat)",
        "SUKARKES (Pengendalian Vektor)",
        "SUKARKES (Penyakit Infeksi Emerging)",
        "SUKARKES (Surveilans)",
      ],
      pagination: {},
      page: 1,
      limit: 4,
      isShowView1: false,
      isUpdate: false,
      smShow: false,
      showw: false,
      msgNotif: "",
      form: {
        siswaNama: "",
        siswaNISN: "",
        siswaKelas: "",
        siswaTempatLahir: "",
        siswaTglLahir: "",
        siswaNamaAyah: "",
        siswaNamaIbu: "",
        siswaAlamat: "",

        NamaLengkapPeminjam: "",
        nip: "",
        email: "",
        nohp: "",
        password: "",
        userRole: "",
        userUnitKerja: "",
        userVerif: "succes"
      }
    };
  }

  componentDidMount() {
    this.getDataMovieUpcoming(1, 9, "movie_release_date DESC");
    this.getDataMoviePlayNow(
      this.state.page,
      this.state.limit,
      "movie_release_date DESC"
    );
    // this.getData();
    // this.getData1();
    this.getData2();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.sortBy !== this.state.sortBy
    ) {
      this.setState({ page: 1 }, () => {
        this.getData2();
      });
    }

    if (
      prevState.search !== this.state.search ||
      prevState.sortBy !== this.state.sortBy ||
      prevState.page !== this.state.page
    ) {
      this.props.history.push(
        `/?search=${this.state.search}&sortby=${this.state.sortBy}&page=${this.state.page}`
      );
    }
  }
  // getData = () => {
  //   const { page, limit, sortBy, search } = this.state;

  //   this.props.getAllMovie(page, limit, sortBy, search);
  // };
  // getData1 = () => {
  //   const { page, limit, sortBy, search } = this.state;
  //   this.props.getPremiereAll(page, limit, sortBy, search);
  // };
  getData2 = () => {
    const { page, limit, sortBy, search } = this.state;
    this.props.getUserAllTanpaFill();
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
    console.log(data);
    this.setState({
      smShow: true,
      isUpdate: true,
      id: data.row.id,
      dropDownUserRole: data.row.user_role,
      dropDownVal2: data.row.user_unit_kerja,
      form: {
        NamaLengkapPeminjam: data.row.user_name,
        nip: data.row.user_nip,
        email: data.row.user_email,
        nohp: data.row.user_phone_number,
        password: data.row.user_password,
        userRole: data.row.user_role,
        userUnitKerja: data.row.user_unit_kerja,
        userVerif: "succes",
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
    console.log('halooooooo');
    this.setState({
      smShow: true
    });
  };
  modalClose = (event) => {
    console.log('halo');
    this.setState({
      isUpdate: false,
      smShow: false,
      dropDownUserRole: "select user role",
      dropDownVal2: "Pilih Unit Kerja",
      form: {
        ...this.state.form,
        NamaLengkapPeminjam: "",
        nip: "",
        email: "",
        nohp: "",
        password: "",
        userRole: "",
        userUnitKerja: ""
      },
    });
  };
  deleteDataUser = (id) => {
    this.props
      .deleteUser(id.id)
      .then((res) => {
        this.setState(
          {
            msgNotif: "Data Akun Peminjam Deleted !",
            showw: true,
          },
          () => {
            this.getData2();
          }
        );
      })
      .catch((err) => {
        this.setState({
          msgNotif: "Deleted Failed !",
          showw: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ show: false });
        }, 1000);
      });
  };

  resetForm = () => {
    this.setState({
      dropDownUserRole: "select user role",
      dropDownVal2: "Pilih Unit Kerja",
      form: {
        ...this.state.form,
        NamaLengkapPeminjam: "",
        nip: "",
        email: "",
        nohp: "",
        password: "",
        userRole: "",
        userUnitKerja: ""
      },
    });
  };

  postDataUser = () => {
    console.log("pos");
    const { form } = this.state;
    console.log(form);
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    if (
      form.NamaLengkapPeminjam == "" ||
      form.nip == "" ||
      form.email == "" ||
      form.nohp == "" ||
      form.password == "" ||
      form.userRole == "" ||
      form.userUnitKerja == ""
    ) {
      console.log("rabiso weee");

      this.setState({
        // modalMsg: err.response.data.msg,
        showw: true,
        // smShowInput: true,
        msgNotif: "Lengkapi data dengan benar !"
      });
    } else {
      this.props
        .postUser(formData)
        .then((res) => {
          this.setState(
            {
              modalMsg: "Submit Data Succes !",
              show: true,
              smShow: false,
            },
            () => {
              // this.getData();
              // this.getData1();
              this.getData2();
            }
          );
          this.resetForm();

        })
        .catch((err) => {
          console.log(err.response.data.msg);
          this.setState({
            // modalMsg: err.response.data.msg,
            showw: true,
            msgNotif: err.response.data.msg,

          });
        })
        .finally(() => {
          setTimeout(() => {
            this.setState({ show: false });
          }, 1000);
        });
    }

  };
  handleSelectUserRole = (event) => {
    console.log(event);
    this.setState({
      dropDownUserRole: event,
      form: {
        ...this.state.form,
        userRole: event,
      }
      // sortBy: event.split("-")[1],
    });
  };
  EditDataUser = () => {
    const { form, id } = this.state;
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    // for (var pair of formData.entries()) {
    // }
    this.props
      .updateDataUser(id, formData)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Update Data User Succes !",
            show: true,
            isUpdate: false,
            smShow: false,
            showModalSucces: true,
          },
          () => {
            this.getData2();
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
  sendData = () => {
    const { isUpdate } = this.state;
    if (isUpdate) {
      this.EditDataUser();
    } else {
      this.postDataUser();
    }
  };
  modalPhotoClose = (event) => {
    console.log('halo');
    this.setState({
      photoShow: false,
      photoShowPdf: false,
      showw: false,
      // smShowInput: false,
      showModalSucces: false
    });
  };
  handleSelectUnitKerja = (event) => {
    console.log(event);
    this.setState({
      dropDownVal2: event,
      form: {
        ...this.state.form,
        userUnitKerja: event,
      }
      // sortBy: event.split("-")[1],
    });
  };

  // setUpdate = (data) => {
  //   console.log(data);

  //   this.setState({
  //     smShow: true,
  //     isUpdate: true,
  //     id: data.row.id,
  //     dropDownVal2: data.row.booking_ruangan_unitkerja,
  //     dropDownVal3: data.row.booking_ruangan_direktorat,
  //     form: {
  //       ruangNamaPeminjam: data.row.booking_ruangan_nama,
  //       ruangNIP: data.row.booking_ruangan_nip,
  //       ruangNoHP: data.row.booking_ruangan_nohp,
  //       ruangEmail: data.row.booking_ruangan_email,
  //       ruangSatker: data.row.booking_ruangan_unitkerja,
  //       ruangDirektorat: data.row.booking_ruangan_direktorat,
  //       ruangTanggalBooking: data.row.booking_ruangan_tanggal,
  //       ruangKeteranganAcara: data.row.booking_ruangan_keterangan_kegiatan_acara,
  //       ruangPenanggungJawab: data.row.booking_ruangan_penaggung_jawab,
  //       ruangYangDigunakan: data.row.booking_ruangan_ruangan,
  //       ruangWaktuMulai: data.row.booking_ruangan_waktu_penggunaan_awal,
  //       ruangWaktuAkhir: data.row.booking_ruangan_waktu_penggunaan_akhir,
  //       ruangJumlahPeserta: data.row.booking_ruangan_jumlah_peserta,
  //       ruangBuktiSuratDinas: `http://localhost:3001/backend1/api/${data.row.booking_ruangan_surat_dinas}`,
  //       image: null,

  //     },
  //   });
  // };

  changeTextForm = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };
  render() {
    console.log(this.props);
    const {
      siswaNama,
      siswaNISN,
      siswaKelas,
      siswaTempatLahir,
      siswaTglLahir,
      siswaNamaAyah,
      siswaNamaIbu,
      siswaAlamat,

      NamaLengkapPeminjam,
      nip,
      email,
      nohp,
      password,
      userRole,
      userUnitKerja,
      userVerif
    } = this.state.form;
    const { dropDownVal, smShow, dropDownUserRole, listUserRole, dropDownVal2, isUpdate, showw, msgNotif } = this.state;
    // console.log("DataMovUpcoming", this.state.dataMovUpcoming);
    const { dataMovie, pagination } = this.props.movie;
    const { dataUser } = this.props.user
    // const { dataRuangan } = this.props.ruangan;
    console.log(dataUser);

    const columns = [
      // { field: 'id', headerName: 'NO', width: 70 },
      { field: 'user_name', headerName: 'Nama', width: 300 },
      { field: 'user_nip', headerName: 'NIP', width: 220 },
      { field: 'user_email', headerName: 'Email', width: 200 },
      { field: 'user_phone_number', headerName: 'No Hp', width: 150 },
      { field: 'user_unit_kerja', headerName: 'Unit Kerja', width: 300 },
      {
        field: 'suratdinasbooking_ruangan_surat_dinas', headerName: 'Action', width: 150, renderCell: (params) => {
          return (
            // you will find row info in params
            <Row>
              <Col>
                <Button onClick={() => this.setUpdate(params)} variant="warning">  < EditIcon /></Button>
              </Col>
              <Col>
                <Button onClick={() => this.deleteDataUser(params)} variant="danger">  <DeleteIcon /></Button>
              </Col>
            </Row>
          )
        }
      },
    ];

    const rows = [
      { id: 1, nama: 'Snow', nip: '08374738734', jabatan: 'dirjen', instansi: 'p2p', email: 'abcde@gmail.com', nohp: 62858238492 },
      { id: 2, nama: 'Agus', nip: '73748398384', jabatan: 'dirjen', instansi: 'p2p', email: 'abcde@gmail.com', nohp: 62858238492 },
      { id: 3, nama: 'Bagas', nip: '83984723874', jabatan: 'dirjen', instansi: 'p2p', email: 'abcde@gmail.com', nohp: 62858238492 },
      { id: 4, nama: 'Candra', nip: '83928749849', jabatan: 'dirjen', instansi: 'p2p', email: 'abcde@gmail.com', nohp: 62858238492 },
      { id: 5, nama: 'Edriana', nip: '82387387382', jabatan: 'dirjen', instansi: 'p2p', email: 'abcde@gmail.com', nohp: 62858238492 },
      { id: 6, nama: 'Fandy', nip: '11239849894', jabatan: 'dirjen', instansi: 'p2p', email: 'abcde@gmail.com', nohp: 62858238492 },

    ];
    return (
      <>

        <NavBar isAdminPage={false} />


        <Container>
          <h2
            className="mt-5 mb-3">DATA PEMINJAMAN</h2 >
          <Button onClick={() => this.setSmShow()} className="mb-3">Input Data Peminjam</Button>

          <div style={{ height: 400, width: '100%', }}>
            <DataGrid
              autoHeight
              rows={dataUser}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[10, 15, 25]}
            />
          </div>
          <Modal
            size="xl"
            centered
            backdrop="static"
            keyboard={false}
            show={smShow}
            onHide={() => this.modalClose()}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                {isUpdate ? "Update" : "Submit"} Data Peminjam
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group as={Row}>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Nama Lengkap"
                      name="NamaLengkapPeminjam"
                      value={NamaLengkapPeminjam}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="NIP"
                      name="nip"
                      value={nip}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Email"
                      type="text"
                      name="email"
                      value={email}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="No HP"
                      name="nohp"
                      value={nohp}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>

                  <Col >
                    <DropdownButton
                      className={`${styles.dropDown}  text-left`}
                      variant="secondary"
                      name="ruangSatker"
                      value={userUnitKerja}
                      title={dropDownVal2}
                      id="dropdown-menu-align-right"
                      onSelect={this.handleSelectUnitKerja}

                    >
                      {this.state.unitkerja.length > 0 ? (
                        this.state.unitkerja.map((item, index) => {
                          // console.log(item);
                          return (
                            <div className="p-3 shadow" key={index}>
                              <Dropdown.Item
                                className={styles.semi}
                                eventKey={`${item}`}
                                onChange={(event) => this.changeTextForm(event)}

                              >
                                {item}
                              </Dropdown.Item>
                            </div>
                          );
                        })
                      ) : (
                        <p className={styles.notFound}>Unit Kerja Not Found !!!</p>
                      )}
                    </DropdownButton>
                  </Col>
                  {/* <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Unit Kerja"
                      name="userUnitKerja"
                      value={userUnitKerja}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col> */}
                </Form.Group>
                <Form.Group as={Row}>
                  <Col >
                    <DropdownButton
                      className={`${styles.dropDown}  text-left`}
                      variant="secondary"
                      name="ruangSatker"
                      value={userRole}
                      title={dropDownUserRole}
                      id="dropdown-menu-align-right"
                      onSelect={this.handleSelectUserRole}

                    >
                      {this.state.listUserRole.length > 0 ? (
                        this.state.listUserRole.map((item, index) => {
                          // console.log(item);
                          return (
                            <div className="p-3 shadow" key={index}>
                              <Dropdown.Item
                                className={styles.semi}
                                eventKey={`${item}`}
                                onChange={(event) => this.changeTextForm(event)}

                              >
                                {item}
                              </Dropdown.Item>
                            </div>
                          );
                        })
                      ) : (
                        <p className={styles.notFound}>Unit Kerja Not Found !!!</p>
                      )}
                    </DropdownButton>
                  </Col>

                </Form.Group>
                <Form.Group as={Row}>
                </Form.Group>
              </Form>
              <Row>
                <Col xs={2}>
                  <Button
                    className={`${styles.btReset} mb-2`}
                    onClick={() => this.modalClose()}
                    variant="outline-primary">Cancel</Button>
                </Col>
                <Col xs={2}>
                  <Button
                    className={styles.btSubmit}
                    variant="primary"
                    onClick={() => this.sendData()}
                  >{isUpdate ? "Update" : "Submit"}</Button>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>

          <Modal
            // size="xl"
            centered
            show={showw}
            onHide={() => this.modalPhotoClose()}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
              {msgNotif}
            </Modal.Body>
          </Modal >
          <Footer />
        </Container >

      </>
    );
  }
}
const mapDispatchToProps = { getAllMovie, getPremiereAll, getUserAllTanpaFill, postUser, updateDataUser, deleteUser };

const mapStateToProps = (state) => ({
  movie: state.movie,
  user: state.user
  // ruangan: state.ruangan
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home;
