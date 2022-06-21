import React, { Component } from "react";
// import { Link } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import Cards from "../../../components/Card/Cards";
import Card from "../../../components/CardUpdate/CardUpdate";
import axiosApiIntances from "../../../utils/axios";
import ReactPaginate from "react-paginate";
import { Button, Image, Container, Row, Col, Form, Dropdown, DropdownButton, Modal } from "react-bootstrap";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import line from "../../../assets/img/line.png";
import hero1 from "../../../assets/img/g1.png";
import hero2 from "../../../assets/img/g2.png";
import hero3 from "../../../assets/img/g3.png";
import styles from "./Homebook.module.css";
import { connect } from "react-redux";
import moment from "moment";
import {
  getAllMovie,
  updateMovie,
  postMovie,
  deleteMovie,
} from "../../../redux/action/movie";
import { getPremiereAll, postRuangan, deleteRuangan } from "../../../redux/action/ruangan"
import { getbookingRuanganAll, postbookingRuangan, getbookingRuanganAllTanpaFill, deleteBookingRuangan, updateDataBooking } from "../../../redux/action/bookingRuangan"
import { getwaitinglistAllTanpaFill, deletewaitinglist, postwaitinglist, postWaitingListLebihSatu } from "../../../redux/action/waitingList"
import { postlaporanRuangan } from "../../../redux/action/laporanRuangan"
import { getBookingUser, getWaitingListUser } from "../../../redux/action/user"
import { DataGrid } from '@mui/x-data-grid';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import dummy from "../../../assets/img/no_image.jpg";
import TextField from '@mui/material/TextField';
import Footer from "../../../components/Footer/Footer";

const inputOpenFileRef = React.createRef();
class Home extends Component {
  constructor(props) {

    super(props);

    // const { id } = this.props.auth.data
    this.state = {
      actionPilihan: "",
      photoSuratDinas: '',
      dropDownVal: "Sort By",
      sortBy: "id_r ASC",
      search: "%%",
      sortBy2: "id ASC",
      search2: "%%",
      dropDownVal2: "Pilih Unit Kerja",
      dropDownVal3: "Pilih Direktorat",
      phoneNumberValid: "valid",
      NIPValid: "valid",
      EmailValid: "valid",
      WaktuAkhirValid: "valid",
      WaktuAwalValid: "valid",
      msg: "",
      namaruang: "",
      modalMsg: "",
      msgNotif: "",
      page: 1,
      page2: 1,
      limit: 4,
      limit2: 4,
      dataMovPlayNow: [],
      dataMovUpcoming: [],
      tmpDataMovUpcoming: [],
      foo: [],
      direktorat: ["Sekertariat P2P", "P2PM", "Pengelolaan  Imunisasi", "P2PTM", "Penyehatan Lingkungan (PL)", "SUKARKES"],
      namaUnitKerja: {
        'Sekertariat P2P': [
          "Tu. Dirjen",
          "Tu.sesditjen",
          "Subag Adum Sekertariat P2P",
          "Program dan Informasi",
          "Hukum, Organisasi dan Hubungan Masyarakat",
          "Keuangan dan BMN",
          "Kepegawaian dan Umum"],
        'P2PM': [
          "Subag Adum P2PM",
          "Turbeckulosis dan infeksisaluran pernapasan akut (ISPA)",
          "HIV, Penyakit Infeksi Menular Seksual (PIMS), Hepatitis dan (PISP)",
          "Neglected Disease (Penyakit Tropis Terabaikan)",
          "Zoonosis dan Penyakit Akibat Gigitan Hewan Berbisa dan Tanaman Beracun",
          "Penyakit Tular Vektor"],
        'Pengelolaan  Imunisasi': [
          "Subag Adum Pengelolaan Imunisasi",
          "Imunisasi Dasar dan Anak Usia di bawah dua tahun (Baduta)",
          "Imunisasi Tambahan Dan Khusus",
          "Imunisasi Wanita Usia Subur (WUS) dan (PD31),(KIPI)",
          "Imunisasi Usia Sekolah dan Sumber Daya Imunisasi"
        ],
        'P2PTM': [
          "Subag Adum P2PTM",
          "Gangguan Indra Dan Funsional",
          "Diabetes Melitus dan Gangguan Metabolik",
          "Jantung Dan Pembulu Darah",
          "Kangker dan Kelainan Darah",
          "Paru Kronik dan Gangguan Imunologi"
        ],
        'Penyehatan Lingkungan (PL)': [
          "Subag Adum  PL",
          "Penyehatan Air dan Sanitasi Dasar",
          "Penyehatan Pangan",
          "Penyehatan Udara,Tanah dan Kawasan",
          "Pengamanan Limbah dan Radiasi",
          "Adaptasi Perubahan Iklim dan Kebencanaan Lingkungan"
        ],
        'SUKARKES': [
          "Subag Adum SUKARKES",
          "Kekarantinaan Kesehatan",
          "Pengelolaan Laboratorium Kesehatan Masyarakat",
          "Pengendalian Vektor",
          "Penyakit Infeksi Emerging",
          "Surveilans"
        ]
      },


      unitkerja: [
        "Sekertariat P2P (Program dan Informasi)",
        "Sekertariat P2P (Hukum, Organisasi dan Hubungan Masyarakat)",
        "Sekertariat P2P (Keuangan dan BMN)"
      ],

      pagination: {},
      paginationn: {},
      isShowView1: false,
      smShow: false,
      smShowInput: false,
      showw: false,
      showModalSucces: false,
      photoShow: false,
      photoShowPdf: false,
      isUpdate: false,


      form: {
        // siswaNama: "",
        // siswaNISN: "",
        // siswaKelas: "",
        // siswaTempatLahir: "",
        // siswaTglLahir: "",
        // siswaNamaAyah: "",
        // siswaNamaIbu: "",
        // siswaAlamat: ""
        NamaRuang: "",
        LantaiRuang: "",
        TempatRuang: "",
        JumlahKursi: "",

        ruangNamaPeminjam: "",
        ruangNIP: "",
        ruangNoHP: "",
        ruangEmail: "",
        ruangSatker: "",
        ruangDirektorat: "",
        ruangTanggalBooking: "",
        // ruangTanggalBookingAkhir: "",``
        ruangKeteranganAcara: "",
        ruangPenanggungJawab: "",
        ruangYangDigunakan: "",
        ruangWaktuMulai: "",
        ruangWaktuAkhir: "",
        ruangBuktiSuratDinas: null,
        image: null,
        idUserr: this.props.auth.data.id,

        laporanruangNamaPeminjam: "",
        laporanruangNIP: "",
        laporanruangNoHP: "",
        laporanruangEmail: "",
        laporanruangSatker: "",
        laporanruangDirektorat: "",
        laporanruangTanggalBooking: "",
        laporanruangKeteranganAcara: "",
        laporanruangPenanggungJawab: "",
        laporanruangYangDigunakan: "",
        laporanruangWaktuMulai: "",
        laporanruangWaktuAkhir: "",
        laporanruangBuktiSuratDinas: null,

      }
    };
  }
  componentDidMount() {
    // this.getDataMovieUpcoming(1, 9, "movie_release_date DESC");
    // this.getDataMoviePlayNow(
    //   this.state.page,
    //   this.state.limit,
    //   "movie_release_date DESC"
    // );
    this.getData();
    this.getData1();
    this.getData2();
    this.getData3();
    this.getData4();
    this.getData5();

  }


  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.sortBy !== this.state.sortBy
    ) {
      this.setState({ page: 1 }, () => {
        this.getData();
        this.getData1();
        this.getData2();
        this.getData3();
        this.getData4();
        this.getData5();

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

  getData = () => {
    const { page2, limit2, sortBy2, search2 } = this.state;

    this.props.getbookingRuanganAllTanpaFill(page2, limit2, sortBy2, search2);
  };
  getData1 = () => {
    const { page, limit, sortBy, search } = this.state;
    this.props.getPremiereAll(page, limit, sortBy, search);
  };
  getData2 = () => {
    const { page2, limit2, sortBy2, search2 } = this.state;
    this.props.getbookingRuanganAll(page2, limit2, sortBy2, search2);
  };
  getData3 = () => {
    // const id = this.props.auth.data.id;
    // console.log(this.state.form.idUserr);
    this.props.getBookingUser(this.state.form.idUserr);
  };
  getData4 = () => {
    const { page, limit, sortBy, search } = this.state;

    this.props.getwaitinglistAllTanpaFill();
  };
  getData5 = () => {
    // const id = this.props.auth.data.id;
    // console.log(this.state.form.idUserr);
    this.props.getWaitingListUser(this.state.form.idUserr);
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
      this.getData1();
    });
  };
  postData = () => {
    const { form } = this.state;
    console.log("pos", form);

    delete form.ruangBuktiSuratDinas;
    // if (!form.image) {
    //   delete form.image;
    // }
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    if (
      form.ruangEmail == "" &&
      form.ruangKeteranganAcara == "" &&
      form.ruangNamaPeminjam == "" &&
      form.ruangNIP == "" &&
      form.ruangNoHP == "" &&
      form.ruangSatker == "" &&
      form.ruangDirektorat == [] &&
      form.ruangTanggalBooking == "" &&
      form.ruangPenanggungJawab == "" &&
      form.ruangYangDigunakan == "" &&
      form.ruangWaktuMulai == "" &&
      form.ruangWaktuAkhir == "" &&
      form.ruangBuktiSuratDinas == null &&
      form.image == null &&
      this.state.phoneNumberValid === "Invalid" &&
      this.state.NIPValid === "Invalid" &&
      this.state.EmailValid === "Invalid" &&
      this.state.WaktuAkhirValid === "Invalid"
      // this.state.WaktuAwalValid === "Invalid"
    ) {
      console.log("kosong");
      this.setState({
        // modalMsg: err.response.data.msg,
        showw: true,
        msgNotif: "Lengkapi data dengan benar !"
      });
    } else if (
      form.ruangEmail !== "" &&
      form.ruangKeteranganAcara !== "" &&
      form.ruangNamaPeminjam !== "" &&
      form.ruangNIP !== "" &&
      form.ruangNoHP !== "" &&
      form.ruangSatker !== "" &&
      form.ruangDirektorat !== [] &&
      form.ruangTanggalBooking !== "" &&
      // form.ruangTanggalBookingAkhir !== "" &&
      form.ruangPenanggungJawab !== "" &&
      form.ruangYangDigunakan !== "" &&
      form.ruangWaktuMulai !== "" &&
      form.ruangWaktuAkhir !== "" &&
      form.ruangBuktiSuratDinas !== null &&
      form.image !== null &&
      this.state.phoneNumberValid === "valid" &&
      this.state.NIPValid === "valid" &&
      this.state.EmailValid === "valid" &&
      this.state.WaktuAkhirValid === "valid"
      // this.state.WaktuAwalValid === "valid"
    ) {
      this.props
        .postWaitingListLebihSatu(formData)
        .then((res) => {
          this.setState(
            {
              msg: res.value.data.msg,
              modalMsg: "Submit Data Booking Succes !",
              show: true,
              smShow: false,
              dropDownVal2: "Pilih Unit Kerja",
              dropDownVal3: "Pilih Direktorat",
              showModalSucces: true
            },
            () => {
              this.getData();
              this.getData1();
              this.getData2();
              this.getData3();
              this.getData4();
            }
          );
          this.resetForm();

        })
        .catch((err) => {
          console.log(err);
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

    } else {
      this.setState({
        // modalMsg: err.response.data.msg,
        showw: true,
        msgNotif: "Isi data dengan benar !"
      });
    }

  };

  postDataRuangan = () => {
    console.log("pos");
    const { form } = this.state;
    delete form.ruangBuktiSuratDinas;
    // if (!form.image) {
    //   delete form.image;
    // }
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    if (
      form.NamaRuang == "" ||
      form.LantaiRuang == "" ||
      form.TempatRuang == "" ||
      form.JumlahKursi == "" ||
      form.ruangBuktiSuratDinas == "") {
      console.log("rabiso weee");

      this.setState({
        // modalMsg: err.response.data.msg,
        showw: true,
        // smShowInput: true,
        msgNotif: "Lengkapi data dengan benar !"
      });
    } else {
      this.props
        .postRuangan(formData)
        .then((res) => {
          this.setState(
            {
              modalMsg: "Submit Data Ruangan Succes !",
              show: true,
              smShow: false,
              dropDownVal2: "Pilih Unit Kerja",
              dropDownVal3: "Pilih Direktorat",
              showModalSucces: true
            },
            () => {
              this.getData();
              this.getData1();
              this.getData2();
              this.getData3();
              this.getData4();
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
    };
  }
  resetForm = () => {
    this.setState({
      dropDownVal2: "Pilih Unit Kerja",
      dropDownVal3: "Pilih Direktorat",
      form: {
        ...this.state.form,
        NamaRuang: "",
        LantaiRuang: "",
        TempatRuang: "",
        JumlahKursi: "",

        ruangNamaPeminjam: "",
        ruangNIP: "",
        ruangNoHP: "",
        ruangEmail: "",
        ruangSatker: "",
        ruangDirektorat: [],
        ruangTanggalBooking: "",
        // ruangTanggalBookingAkhir: "",
        ruangKeteranganAcara: "",
        ruangPenanggungJawab: "",
        ruangYangDigunakan: "",
        ruangWaktuMulai: "",
        ruangWaktuAkhir: "",
        ruangBuktiSuratDinas: null,
        image: null,
        idUserr: this.props.auth.data.id,

        laporanruangNamaPeminjam: "",
        laporanruangNIP: "",
        laporanruangNoHP: "",
        laporanruangEmail: "",
        laporanruangSatker: "",
        laporanruangDirektorat: "",
        laporanruangTanggalBooking: "",
        laporanruangKeteranganAcara: "",
        laporanruangPenanggungJawab: "",
        laporanruangYangDigunakan: "",
        laporanruangWaktuMulai: "",
        laporanruangWaktuAkhir: "",
        laporanruangBuktiSuratDinas: null,
      },
    });
  };
  EditDataBooking = () => {
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
      .updateDataBooking(id, formData)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Update Data Booking Succes !",
            show: true,
            isUpdate: false,
            smShow: false,
            showModalSucces: true
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
  setUpdate = (data) => {
    console.log(data);
    this.setState({
      smShow: true,
      isUpdate: true,
      id: data.row.id,
      dropDownVal2: data.row.booking_ruangan_unitkerja,
      dropDownVal3: data.row.booking_ruangan_direktorat,
      form: {
        ruangNamaPeminjam: data.row.booking_ruangan_nama,
        ruangNIP: data.row.booking_ruangan_nip,
        ruangNoHP: data.row.booking_ruangan_nohp,
        ruangEmail: data.row.booking_ruangan_email,
        ruangSatker: data.row.booking_ruangan_unitkerja,
        ruangDirektorat: data.row.booking_ruangan_direktorat,
        ruangTanggalBooking: data.row.booking_ruangan_tanggal,
        // ruangTanggalBookingAkhir: data.row.booking_ruangan_tanggal,
        ruangKeteranganAcara: data.row.booking_ruangan_keterangan_kegiatan_acara,
        ruangPenanggungJawab: data.row.booking_ruangan_penaggung_jawab,
        ruangYangDigunakan: data.row.booking_ruangan_ruangan,
        ruangWaktuMulai: data.row.booking_ruangan_waktu_penggunaan_awal,
        ruangWaktuAkhir: data.row.booking_ruangan_waktu_penggunaan_akhir,
        idUserr: data.row.id_peminjam,
        ruangBuktiSuratDinas: `http://localhost:3001/backend1/api/${data.row.booking_ruangan_surat_dinas}`,
        image: null,

        // movieName: data.movie_name,
        // movieCategory: data.movie_category,
        // movieReleaseDate: moment(data.movie_release_date).format("YYYY-MM-DD"),
        // movieDuration: data.movie_duration,
        // movieDirectedBy: data.movie_directed_by,
        // movieCasts: data.movie_casts,
        // movieSynopsis: data.movie_synopsis,
        // movieImage: `http://localhost:3001/backend1/api/${data.movie_image}`,
        // image: null,
      },
    });
  };
  sendData = () => {
    const { isUpdate } = this.state;
    if (isUpdate) {
      this.EditDataBooking();
    } else {
      this.postData();
    }
  };
  handleSelect = (event) => {
    this.setState({
      dropDownVal: event.split("-")[0],
      sortBy: event.split("-")[1],
    });
  };

  setSmShow = (event) => {
    console.log(event);
    console.log(event.namaruang_r);
    this.state.form.ruangYangDigunakan = event.namaruang_r;
    this.setState({
      smShow: true
    });
  };
  setPhotoShow = (event) => {
    console.log(event);
    console.log(event.namaruang_r);
    this.state.namaruang = event.namaruang_r;
    this.setState({
      photoShow: true
    });
  };
  modalClose = (event) => {
    console.log('halo');
    this.setState({
      isUpdate: false,
      smShow: false,
      smShowInput: false
    });
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
  deleteDataRuangan = (id) => {
    this.props
      .deleteRuangan(id)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Ruangan Deleted !",
            show: true,
            showModalSucces: true
          },
          () => {
            this.getData();
            this.getData1();
            this.getData2();
            this.getData3();
            this.getData4();
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

  deleteDataBook = (id) => {
    this.props
      .deletewaitinglist(id)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Booking Ruangan Deleted !",
            show: true,
          },
          () => {
            this.getData();
            this.getData1();
            this.getData2();
            this.getData3();
            this.getData4();
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



  changeTextForm = (event) => {
    console.log(event);
    console.log(this.state.form.ruangWaktuMulai);
    const name = event.target.name;
    const value = event.target.value;
    if (name === "ruangNoHP") {
      /^[0-9]+$/.test(value) && value.length <= 12
        ? this.setState({ phoneNumberValid: "valid" })
        : this.setState({
          phoneNumberValid: "Invalid",
          msg: "Masukkan nomor tidak lebih dari 12 angka",
        });
    }
    else if (name === "ruangNIP") {
      /^[0-9]+$/.test(value)
        ? this.setState({ NIPValid: "valid" })
        : this.setState({
          NIPValid: "Invalid",
          msg: "Masukkan nomor NIP dengan angka",
        });
    }
    else if (name === "ruangEmail") {
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        ? this.setState({ EmailValid: "valid" })
        : this.setState({
          EmailValid: "Invalid",
          msg: "Masukkan email dengan benar",
        });
    }
    else if (name === "ruangWaktuAkhir") {
      this.state.form.ruangWaktuMulai < value
        ? this.setState({ WaktuAkhirValid: "valid" })
        : this.setState({
          WaktuAkhirValid: "Invalid",
          msg: "Masukkan Waktu lebih dari Waktu Mulai",
        });
    }
    // else if (name === "ruangWaktuMulai") {
    //   this.state.form.ruangWaktuAkhir > value
    //     ? this.setState({ WaktuAwalValid: "valid" })
    //     : this.setState({
    //       WaktuAwalValid: "Invalid",
    //       msg: "Masukkan Waktu kurang dari Waktu Mulai",
    //     });
    // }
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };
  changeTextFormDirektorat = (event) => {
    console.log(event);
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
        // ruangDirektorat: event.target.value,
      },
      foo: this.state.namaUnitKerja[event.target.value]
    });
    console.log(this.state.foo);
  };
  changeImage = (event) => {
    if (event.target.files[0]) {
      this.setState({
        form: {
          ...this.state.form,
          ruangBuktiSuratDinas: URL.createObjectURL(event.target.files[0]),
          image: event.target.files[0],
        },
      });
    } else {
      this.setState({
        form: {
          ...this.state.form,
          ruangBuktiSuratDinas: null,
          image: null,
        },
      });
    }
  };

  showOpenFileDlg = () => {
    inputOpenFileRef.current.click();
  };

  deleteImage = () => {
    console.log('halo');
  };
  postBookingData = (data) => {
    console.log(data);
    const ID = data.id
    axiosApiIntances
      .post("bookingruangan", data)
      .then((res) => {
        // this.setState({
        //   modalMsg: "Booking Succes !",
        //   showModal: true,
        console.log(data);

        this.deleteDataBook(ID);
        // });
        setTimeout(() => {
          // this.setState({ showModal: false });
          this.props.history.push(`/`);
        }, 2000);
        console.log("booking selesi");
      })
      .catch((err) => {
        // this.setState({
        //   modalMsg: "Booking Failed !",
        //   showModal: true,
        // });
        console.log(err);
      });
  };
  handleDibatalkan = (e) => {
    console.log(e);

    // this.setState({
    //   actionPilihan: "Dibatalkan",
    // })
    // const laporan = {
    //   laporanruangNamaPeminjam: e.row.booking_ruangan_nama,
    //   laporanruangNIP: e.row.booking_ruangan_nip,
    //   laporanruangNoHP: e.row.booking_ruangan_nohp,
    //   laporanruangEmail: e.row.booking_ruangan_email,
    //   laporanruangSatker: e.row.booking_ruangan_unitkerja,
    //   laporanruangDirektorat: e.row.booking_ruangan_direktorat,
    //   laporanruangTanggalBooking: e.row.booking_ruangan_tanggal,
    //   laporanruangKeteranganAcara: e.row.booking_ruangan_keterangan_kegiatan_acara,
    //   laporanruangPenanggungJawab: e.row.booking_ruangan_penaggung_jawab,
    //   laporanruangYangDigunakan: e.row.booking_ruangan_ruangan,
    //   laporanruangWaktuMulai: e.row.booking_ruangan_waktu_penggunaan_awal,
    //   laporanruangWaktuAkhir: e.row.booking_ruangan_waktu_penggunaan_akhir,
    //   laporanruangJumlahPeserta: e.row.booking_ruangan_jumlah_peserta,
    //   laporanruangBuktiSuratDinas: e.row.booking_ruangan_surat_dinas,
    //   image: e.row.booking_ruangan_surat_dinas,
    //   idUserr: e.row.id_peminjam,
    //   statusBooking: "Dibatalkan",
    //   id: e.row.id

    // }
    // console.log(laporan);
    // this.postBookingData(laporan);
  };
  changeText = (event) => {
    this.setState({ [event.target.name]: "%" + event.target.value + "%" });
  };
  handleSelesai = (e) => {
    console.log(e.row);

    this.setState({
      actionPilihan: "Selesai",
    })
    const laporan = {
      ruangNamaPeminjam: e.row.booking_ruangan_nama,
      ruangNIP: e.row.booking_ruangan_nip,
      ruangNoHP: e.row.booking_ruangan_nohp,
      ruangEmail: e.row.booking_ruangan_email,
      ruangSatker: e.row.booking_ruangan_unitkerja,
      ruangDirektorat: e.row.booking_ruangan_direktorat,
      ruangTanggalBooking: e.row.booking_ruangan_tanggal,
      // ruangTanggalBookingAkhir: e.row.booking_ruangan_tanggal,
      ruangKeteranganAcara: e.row.booking_ruangan_keterangan_kegiatan_acara,
      ruangPenanggungJawab: e.row.booking_ruangan_penaggung_jawab,
      ruangYangDigunakan: e.row.booking_ruangan_ruangan,
      ruangWaktuMulai: e.row.booking_ruangan_waktu_penggunaan_awal,
      ruangWaktuAkhir: e.row.booking_ruangan_waktu_penggunaan_akhir,
      idUserr: e.row.id_peminjam,
      image: e.row.booking_ruangan_surat_dinas,
      ruangBuktiSuratDinas: e.row.booking_ruangan_surat_dinas,
      id: e.row.id
      // statusBooking: "Selesai",
    }
    console.log(laporan.booking_ruangan_surat_dinas);
    console.log(laporan.ruangBuktiSuratDinas);
    this.postBookingData(laporan);
    // this.deleteDataBook(e.row.id);

  };
  handleSelectUnitKerja = (event) => {
    console.log(event);
    this.setState({
      dropDownVal2: event,
      form: {
        ...this.state.form,
        ruangSatker: event,
      }
      // sortBy: event.split("-")[1],
    });
  };

  handleImageTable = (moon) => {
    console.log(moon.row.booking_ruangan_surat_dinas);
    let filePdf = moon.row.booking_ruangan_surat_dinas
    console.log(filePdf);
    let pos = filePdf.indexOf(".pdf");
    console.log(pos);

    if (pos > 1) {
      this.setState({
        photoSuratDinas: moon.row.booking_ruangan_surat_dinas,
        photoShowPdf: true,
      });
    } else {
      this.setState({

        photoSuratDinas: moon.row.booking_ruangan_surat_dinas,
        photoShow: true,
      });

    }

    // for (let index = 0; index < filePdf.length; index++) {
    //   // const element = array[index];
    //   console.log(filePdf[index]);
    //   if (filePdf[index] == "pdf") {
    //     const jajal = filePdf[index];
    //     this.state.cekpdf.push(jajal)
    //   }
    // }
    // console.log(this.state.cekpdf);
    // if (this.state.cekpdf > 0) {
    //   this.setState({
    //     photoSuratDinas: moon.row.booking_ruangan_surat_dinas,
    //     photoShowPdf: true,
    //     cekpdf: []
    //   });
    // } else {
    //   this.setState({
    //     photoSuratDinas: moon.row.booking_ruangan_surat_dinas,
    //     photoShow: true,
    //     // cekpdf: []

    //   })
    // }

  };

  setSmShowInput = (event) => {
    console.log('halooooooo');
    this.setState({
      smShowInput: true
    });
  };

  render() {
    console.log(this.props);
    // console.log(this.state.namaUnitKerja["SUKARKES"]);
    // console.log('weh', this.state.tanggal.toLocaleDateString('zh-Hans-CN'))


    const {
      siswaNama,
      siswaNISN,
      siswaKelas,
      siswaTempatLahir,
      siswaTglLahir,
      siswaNamaAyah,
      siswaNamaIbu,
      siswaAlamat,

      NamaRuang,
      LantaiRuang,
      TempatRuang,
      JumlahKursi,


      ruangBuktiSuratDinas,
      ruangDirektorat,
      ruangEmail,
      ruangKeteranganAcara,
      ruangNIP,
      ruangNamaPeminjam,
      ruangNoHP,
      ruangPenanggungJawab,
      ruangSatker,
      ruangTanggalBooking,
      // ruangTanggalBookingAkhir,
      ruangWaktuAkhir,
      ruangWaktuMulai,
      idUserr,
      ruangYangDigunakan = "tol",
      image
    } = this.state.form;
    const {
      dropDownVal,
      smShow,
      smShowInput,
      namaruang,
      photoShow,
      photoShowPdf,
      photoSuratDinas,
      actionPilihan,
      msgNotif,
      showw,
      dropDownVal2,
      dropDownVal3,
      isUpdate,
      modalMsg,
      showModalSucces,
      foo,
      phoneNumberValid,
      NIPValid,
      EmailValid,
      WaktuAkhirValid,
      WaktuAwalValid,
      msg
    } = this.state;
    // console.log(this.state.form);
    // console.log(this.state.form.idUserr);
    console.log(photoShowPdf);
    console.log(EmailValid);
    console.log(ruangBuktiSuratDinas);

    // console.log(this.state.tanggal.toLocaleTimeString('en-GB'));
    const hasil1 = this.state.tanggal;
    // console.log(typeof (hasil1));


    // console.log("DataMovUpcoming", this.state.dataMovUpcoming);
    const { dataMovie, pagination } = this.props.movie;
    const { dataRuangan, paginationn } = this.props.ruangan;
    const { til, bismillah } = this.props.bookingruangan;
    const { waitingtanpafill } = this.props.waitingList;
    const { data } = this.props.auth;
    const { dataBookingById, dataWaitingById } = this.props.idUser;
    // console.log('ruang direk', waitingtanpafill);
    // const { dataRuangan } = this.props.ruangan;
    // console.log(dataRuangan );

    const columns = [
      // { field: 'id', headerName: 'ID', width: 70 },

      { field: 'booking_ruangan_nama', headerName: 'Nama', width: 130 },
      { field: 'booking_ruangan_nip', headerName: 'NIP', width: 130 },
      { field: 'booking_ruangan_unitkerja', headerName: 'Unit Kerja', width: 130 },
      {
        field: 'booking_ruangan_tanggal', headerName: 'Tanggal Mulai', width: 130, renderCell: (params) => {
          var confdate = new Date(parseInt(params.row.booking_ruangan_tanggal)).toLocaleDateString("en-CA");
          console.log(confdate);

          // const date = confdate.toLocaleDateString("en-CA")
          // console.log(confdate.toLocaleDateString("en-CA"))
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
      // {field: 'booking_ruangan_jumlah_peserta', headerName: 'Jumlah Peserta', width: 130 },
      {
        field: 'suratdinasbooking_ruangan_surat_dinas', headerName: 'Surat Dinas', width: 80, renderCell: (params) => {
          return (
            // you will find row info in params
            <Button onClick={() => this.handleImageTable(params)} variant="outline-primary">View</Button>
          )

        }
      },
      {
        field: 'action', headerName: 'Status', width: 120, renderCell: (params) => {
          return (
            // you will find row info in params
            // <Row>

            //   <Col>
            //     <Button
            //       onClick={() => this.setUpdate(params)}
            //       variant="warning">
            //       < EditIcon /></Button>
            //   </Col>
            //   <Col>
            //     <Button onClick={() => this.handleSelesai(params)}
            //       variant="primary"><CheckIcon /></Button>
            //   </Col>
            //   {
            //     data.user_role === "admin" ? (
            //       <Col>
            //         <Button onClick={() => this.handleDibatalkan(params)}
            //           variant="danger"><CancelIcon /></Button>
            //       </Col>
            //     ) : (
            //       ""
            //     )
            //   }

            data.user_role === "admin" ? (
              <Col>
                <Button onClick={() => this.handleSelesai(params)}
                  variant="danger">Acc</Button>
              </Col>
            ) : (
              <div
                className={` mt-1  mx-auto`}
              >Process Admin</div>
            )
          )
        }
      },

    ];

    const rows = [
      { id: 1, nama: 'Snow', nip: 'Jon', jabatan: 35, instansi: 35, email: 35, nohp: 35, keterangankegiatan: 35, ruangan: 35, tanggal: 35, jumlahpeserta: 35, status: 35 },
      { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];
    return (
      <>

        <NavBar isAdminPage={false} />
        <Container className="mt-5">
          {/* <h1 className="mb-5"> Selamat datang <p />di ruang rapat Ditjen P2P</h1> */}
          <Row>
            <Col xs={2}>
              {data.user_role === "admin" ? (
                <Button onClick={() => this.setSmShowInput()}>Input Ruangan</Button>

              ) : (
                "")}
            </Col>
            <Col></Col>
            <Col xs={2}>
              <DropdownButton
                className={`${styles.dropDown} mb-2 text-right`}
                variant="secondary"
                title={dropDownVal}
                id="dropdown-menu-align-right"
                onSelect={this.handleSelect}
              >
                <Dropdown.Item
                  className={styles.semi}
                  eventKey="By Name A to Z-namaruang_r ASC"
                >
                  Sort by Name A-Z
                </Dropdown.Item>
                <Dropdown.Item
                  className={styles.semi}
                  eventKey="By Name Z to A-namaruang_r DESC"
                >
                  Sort by Name Z-A
                </Dropdown.Item>
                <Dropdown.Item
                  className={styles.semi}
                  eventKey="By Latest Release Date-ruangan_created_at ASC"
                >
                  News by Release Date
                </Dropdown.Item>
                <Dropdown.Item
                  className={styles.semi}
                  eventKey="By Oldest Release Date-ruangan_created_at DESC"
                >
                  last by Release Date
                </Dropdown.Item>
              </DropdownButton>
            </Col>
            <Col lg={3}>
              <Form className={styles.searchInput}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Cari Nama Unit Kerja..."
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
              {dataRuangan.map((item, key) => {
                return (
                  <Col lg={3} md={4} key={key} className="mb-2">
                    < Card
                      data={item}
                      // handleUpdate={this.setUpdate.bind(this)}
                      handleDelete={this.deleteDataRuangan.bind(this)}
                      btBooking={this.setSmShow.bind(this)}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>
        </Container>

        <Container >
          <div className="d-flex justify-content-center">
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={paginationn.totalPage ? paginationn.totalPage : 0}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={this.handlePageClick2}
              containerClassName={styles.pagination}
              subContainerClassName={`${styles.pages} ${styles.pagination}`}
              activeClassName={styles.active}
            />
          </div>
        </Container>
        <Container className="mt-5">
          {/* <Button onClick={() => this.setSmShow()} className="me-2">Input Data Booking</Button> */}
          <h3>Data Waiting List</h3>
          <div style={{ height: 400, width: '100%' }}>
            {data.user_role === "admin" ? (
              <DataGrid
                rows={waitingtanpafill}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowHeight={() => 100}
              />
            ) : (
              <DataGrid
                rows={dataWaitingById}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowHeight={() => 100}
              />
            )}
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
                {isUpdate ? "Update" : "Submit"} Booking
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
                      label="Nama Peminjam"
                      name="ruangNamaPeminjam"
                      value={ruangNamaPeminjam}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="NIP Peminjam"
                      name="ruangNIP"
                      value={ruangNIP}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    <Form.Control.Feedback type={NIPValid}>
                      <p className={styles.warning}>{msg}</p>
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="No Hp"
                      type="text"
                      name="ruangNoHP"
                      value={ruangNoHP}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    <Form.Control.Feedback type={phoneNumberValid}>
                      <p className={styles.warning}>{msg}</p>
                    </Form.Control.Feedback>
                  </Col>

                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Email"
                      name="ruangEmail"
                      value={ruangEmail}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    <Form.Control.Feedback type={EmailValid}>
                      <p className={styles.warning}>{msg}</p>
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>

                  <Col >
                    {/* <DropdownButton
                      className={`${styles.dropDown}  text-left`}
                      variant="secondary"
                      name="ruangSatker"
                      value={ruangDirektorat}
                      title={dropDownVal3}
                      id="dropdown-menu-align-right"
                      onSelect={this.handleSelectDirektorat}

                    >
                      {this.state.direktorat.length > 0 ? (
                        this.state.direktorat.map((item, index) => {
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
                    </DropdownButton>*/}

                    <InputLabel id="demo-simple-select-helper-label"> Direktorat</InputLabel>
                    <Select

                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select"
                      value={ruangDirektorat}
                      name="ruangDirektorat"
                      onChange={(event) => this.changeTextFormDirektorat(event)}
                    >
                      {this.state.direktorat.length > 0 ? (
                        this.state.direktorat.map((item, index) => {
                          return (
                            <MenuItem value={item}>{index + 1}. {item}</MenuItem>
                          );
                        })
                      ) : (
                        <p className={styles.notFound}>Unit Kerja Not Found !!!</p>
                      )}
                    </Select>
                  </Col>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      label="Penanggung Jawab"
                      name="ruangPenanggungJawab"
                      value={ruangPenanggungJawab}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>



                </Form.Group>
                <Form.Group as={Row}>
                  <Col xs={6}>
                    <InputLabel id="demo-simple-select-helper-label"> Unit Kerja</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select"
                      value={ruangSatker}
                      name="ruangSatker"
                      onChange={(event) => this.changeTextForm(event)}
                    >
                      {foo.length > 0 ? (
                        foo.map((item, index) => {
                          console.log(item);
                          return (
                            <MenuItem value={item}
                            >{index + 1}. {item}</MenuItem>
                          );
                        })
                      ) : (
                        <p className={styles.notFound}>Please select Direktorat !!!</p>
                      )}
                    </Select>
                  </Col>


                  <Col>
                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Ruangan yang Digunakan"
                      type="text"
                      name="ruangYangDigunakan"
                      value={ruangYangDigunakan}
                      onChange={(event) => this.changeTextForm(event)}
                      InputProps={{
                        readOnly: true,
                      }}
                    />

                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  {/* <Col xs={6}>
                    <InputLabel id="demo-simple-select-label">Jumlah Booking Hari</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={jumlahhari}
                      name="jumlahhari"
                      label="Age"
                      onChange={(event) => this.changeTextForm(event)}

                    >
                      <MenuItem value={false}>satu hari</MenuItem>
                      <MenuItem value={true}>Lebih dari 1 hari</MenuItem>
                    </Select>
                  </Col> */}




                </Form.Group>

                {/* {
                  jumlahhari === true ? ( */}
                <Form.Group as={Row}>

                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Keterangan Acara"
                      name="ruangKeteranganAcara"
                      value={ruangKeteranganAcara}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                  <Col xs={6}>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Tanggal Booking Mulai"
                      type="date"
                      defaultValue="05/04/2022"
                      name="ruangTanggalBooking"
                      value={ruangTanggalBooking}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                  {/* <Col xs={6}>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Tanggal Booking Mulai"
                      type="date"
                      defaultValue="05/04/2022"
                      name="ruangTanggalBooking"
                      value={ruangTanggalBooking}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col> */}

                  {/* <Col>

                        <TextField
                          required
                          fullWidth
                          id="outlined-password-input"
                          label="Tanggal Booking Akhir"
                          type="date"
                          defaultValue="05/04/2022"
                          name="ruangTanggalBookingAkhir"
                          value={ruangTanggalBookingAkhir}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col> */}
                </Form.Group>

                {/* ) : ( */}
                {/* <Form.Group as={Row}>


                </Form.Group> */}
                {/* )
                } */}


                <Form.Group as={Row}>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Waktu dimulai"
                      type="time"
                      name="ruangWaktuMulai"
                      value={ruangWaktuMulai}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    <Form.Control.Feedback type={WaktuAwalValid}>
                      <p className={styles.warning}>{msg}</p>
                    </Form.Control.Feedback>
                  </Col>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Waktu berkahir"
                      type="time"
                      name="ruangWaktuAkhir"
                      value={ruangWaktuAkhir}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    <Form.Control.Feedback type={WaktuAkhirValid}>
                      <p className={styles.warning}>{msg}</p>
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  {/* <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Jumlah Peserta"
                      name="ruangJumlahPeserta"
                      value={ruangJumlahPeserta}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col> */}
                  <Col>
                    <Form.Group as={Row}>
                      <Col xs={4}>
                        {/* <Form.Group>
                          <Form.Label>Bukti Surat Dinas</Form.Label>
                          <div className={styles.rowEdit}>
                            <div
                              className={styles.edit}
                              onChange={(event) => this.changeImage(event)}
                              onClick={this.showOpenFileDlg}
                            >
                              <AddAPhotoIcon />
                              <input
                                ref={inputOpenFileRef}
                                type="file"
                                style={{ display: "none" }}
                              />
                            </div>
                            <img
                              src="/iconDelete.png"
                              alt=""
                              className={styles.iconDelete}
                              onClick={this.deleteImage}
                            />
                          </div>
                        </Form.Group> */}
                        <Form.Group>
                          <Form.File
                            label="Upload Bukti Surat Dinas"
                            onChange={(event) => this.changeImage(event)}
                          // onClick={this.showOpenFileDlg}
                          />
                        </Form.Group>
                      </Col>
                      {/* <Col lg={4}>
                        <Image
                          className={`${styles.hero} p-4 mb-4 d-block mx-auto`}
                          src={ruangBuktiSuratDinas ? ruangBuktiSuratDinas : dummy}
                          fluid
                        />
                      </Col> */}
                    </Form.Group>
                  </Col>

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
                  >
                    {isUpdate ? "Update" : "Submit"}
                  </Button>
                </Col>
              </Row>
            </Modal.Body>
          </Modal >

          {photoShowPdf === true ? (
            <Col >
              <object width="100%" height="400" data={`http://localhost:3001/backend1/api/${photoSuratDinas}`} type="application/pdf"></object>
            </Col>
          ) : (
            ""
          )}


          <Modal
            size="xl"
            centered
            show={photoShow}
            onHide={() => this.modalPhotoClose()}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Photo Surat Dinas
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Col>
                <Image
                  className={`${styles.hero} p-4 mb-4 d-block mx-auto`}
                  src={`http://localhost:3001/backend1/api/${photoSuratDinas}`}
                  fluid
                />
              </Col>
            </Modal.Body>
          </Modal >

          <Modal
            size="xl"
            centered
            backdrop="static"
            keyboard={false}
            show={smShowInput}
            onHide={() => this.modalClose()}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Input Data Ruangan
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
                      label="Nama Ruang"
                      name="NamaRuang"
                      value={NamaRuang}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Lantai Ruang"
                      name="LantaiRuang"
                      value={LantaiRuang}
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
                      label="Tempat Ruang"
                      type="text"
                      name="TempatRuang"
                      value={TempatRuang}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Jumlah Kursi"
                      name="JumlahKursi"
                      value={JumlahKursi}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Col>
                    <Form.Group as={Row}>
                      <Col xs={4}>
                        <Form.Group>
                          <Form.Label>Upload Foto Ruangan</Form.Label>
                          <div className={styles.rowEdit}>
                            <div
                              className={styles.edit}
                              onChange={(event) => this.changeImage(event)}
                              onClick={this.showOpenFileDlg}
                            >
                              <AddAPhotoIcon />
                              <input
                                ref={inputOpenFileRef}
                                type="file"
                                style={{ display: "none" }}
                              />
                            </div>
                            <img
                              src="/iconDelete.png"
                              alt=""
                              className={styles.iconDelete}
                              onClick={this.deleteImage}
                            />
                          </div>
                        </Form.Group>
                      </Col>
                      <Col lg={4}>
                        <Image
                          className={`${styles.hero} p-4 mb-4 d-block mx-auto`}
                          src={ruangBuktiSuratDinas ? ruangBuktiSuratDinas : dummy}
                          fluid
                        />
                      </Col>
                    </Form.Group>
                  </Col>
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
                    onClick={() => this.postDataRuangan()}
                  >Apply</Button>
                </Col>
              </Row>
            </Modal.Body>
          </Modal >

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
          <Modal
            // size="xl"
            centered
            show={showModalSucces}
            onHide={() => this.modalPhotoClose()}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
              {modalMsg}
            </Modal.Body>
          </Modal >
          <Footer />
        </Container >

      </>
    );
  }
}
const mapDispatchToProps = { getAllMovie, getPremiereAll, postRuangan, deleteRuangan, getbookingRuanganAll, postbookingRuangan, postwaitinglist, postWaitingListLebihSatu, getbookingRuanganAllTanpaFill, getwaitinglistAllTanpaFill, postlaporanRuangan, deleteBookingRuangan, getBookingUser, getWaitingListUser, updateDataBooking, deletewaitinglist };

const mapStateToProps = (state) => ({
  movie: state.movie,
  ruangan: state.ruangan,
  bookingruangan: state.bookingruangan,
  idUser: state.user,
  auth: state.auth,
  datacoba: state.waitingList,
  waitingList: state.waitingList
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home;
