import React, { Component } from "react";
import { Button, Row, Col, Image, Form, DropdownButton, Dropdown } from "react-bootstrap";
import styles from "./formpostnilai.module.css";
import Popup from "reactjs-popup";
// import dummy from "../../assets/img/no_image.jpg";
// import Warper from "../Warper/warper"
// import "./css/index.css";
// import { postSiswa } from "../../redux/action/siswa"
import { connect } from "react-redux";



class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kelasVal: "Pilih Kelas",
      kelas: [
        "I A",
        "I B",
        "II A",
        "II B",
        "III A",
        "III B",
        "IV A",
        "IV B",
        "V A",
        "V B",
        "VI A",
        "VI B"
      ],
      form: {
        siswaNama: "",
        siswaNISN: "",
        siswaKelas: "",
        siswaTempatLahir: "",
        siswaTglLahir: "",
        siswaNamaAyah: "",
        siswaNamaIbu: "",
        siswaAlamat: ""
      }
    }
  }
  postData = () => {
    const { form } = this.state;
    delete form.barangImage;
    if (!form.image) {
      delete form.image;
    }
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    this.props
      .postSiswa(formData)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Submit Data Succes !",
            show: true,
          },
          () => {
            window.location.reload();
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
  resetForm = () => {
    this.setState({
      form: {
        siswaNama: "",
        siswaNISN: "",
        siswaKelas: "",
        siswaTempatLahir: "",
        siswaTglLahir: "",
        siswaNamaAyah: "",
        siswaNamaIbu: "",
        siswaAlamat: ""
      }
    });
  };
  handleImage = (event) => {
    if (event.target.files[0]) {
      this.setState({
        form: {
          ...this.state.form,
          barangImage: URL.createObjectURL(event.target.files[0]),
          image: event.target.files[0],
        },
      });
    } else {
      this.setState({
        form: {
          ...this.state.form,
          barangImage: null,
          image: null,
        },
      });
    }
  };
  handleSelectKelas = (event) => {
    console.log(event);
    this.setState({
      kelasVal: event,
      form: {
        ...this.state.form,
        siswaKelas: event,
      }
    });
    console.log(event);
    // console.log(event.split("-")[1]);
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
    // const {
    //   barang_id,
    //   barang_name,
    //   barang_jual,
    //   barang_beli,
    //   barang_stok,
    //   barang_image,
    // } = this.props.data;
    // const { handleUpdate, handleDelete, data } = this.props;
    const {
      siswaNama,
      siswaNISN,
      siswaKelas,
      siswaTempatLahir,
      siswaTglLahir,
      siswaNamaAyah,
      siswaNamaIbu,
      siswaAlamat
    } = this.state.form;
    const {
      kelasVal
    } = this.state;
    // const { dataSiswa } = this.props.barang.siswa

    console.log("kotn", this.state.form);
    console.log("kotn");
    console.log("props", this.props);
    // console.log(dataSiswa)

    return (
      <>
        <div>
          <Popup
            trigger={<Button className={styles.button}> Input Data Nilai Siswa </Button>}
            modal
            contentStyle={{ width: "90%", background: "white" }}
          >
            {close => (
              <div className={styles.modal}>
                <a href className={styles.close} onClick={close}>
                  &times;
                </a>
                <div className={styles.header}> Input Data Nilai Siswa </div>

                <Row>
                  {/* <Col lg={4}>
                    <Image
                      className={`${styles.hero} p-4 mb-4 d-block mx-auto`}
                      src={barangImage ? barangImage : dummy}
                      // src={dummy}
                      fluid
                    />
                  </Col> */}

                  <Form>
                    <Form.Group as={Row}>
                      <Col>
                        <br />
                        <br />
                        <Form.Label>Nama Siswa</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Name Siswa"
                          name="siswaNama"
                          value={siswaNama}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>

                      <Col >
                        <br />
                        <br />
                        <Form.Label>NISN Siswa</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="NISN Siswa"
                          name="siswaNISN"
                          value={siswaNISN}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>

                      <Col>
                        <Form.Label>Kelas</Form.Label>
                        <DropdownButton
                          className={`${styles.dropDown} mb-2 text-right`}
                          name="siswaKelas"
                          value={siswaKelas}
                          variant="secondary"
                          title={kelasVal}
                          id="dropdown-menu-align-right"
                          onSelect={this.handleSelectKelas}
                        >
                          {this.state.kelas.length > 0 ? (
                            this.state.kelas.map((item, index) => {
                              // console.log(item.movie_id);
                              return (
                                <div className="p-3 shadow" key={index}>
                                  <Dropdown.Item
                                    className={styles.semi}
                                    eventKey={item}
                                  // onChange={(event) => this.changeTextForm(event)}

                                  >
                                    {item}
                                  </Dropdown.Item>
                                </div>
                              );
                            })
                          ) : (
                            <p className={styles.notFound}>Movie Not Found !!!</p>
                          )}

                        </DropdownButton>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Col>
                        <p className={styles.textleft}>Kelas</p>
                        <DropdownButton
                          className={`${styles.dropDown} mb-2 text-right`}
                          name="siswaKelas"
                          value={siswaKelas}
                          variant="secondary"
                          title={kelasVal}
                          id="dropdown-menu-align-right"
                          onSelect={this.handleSelectKelas}
                        >
                          {/* {dataSiswa.length > 0 ? (
                            dataSiswa.map((item, index) => {
                              // console.log(item.siswa_nama);
                              return (
                                <div className="p-3 shadow" key={index}>
                                  <Dropdown.Item
                                    className={styles.semi}
                                    eventKey={item.siswa_nama}
                                  // onChange={(event) => this.changeTextForm(event)}

                                  >
                                    {item.siswa_nama}
                                  </Dropdown.Item>
                                </div>
                              );
                            })
                          ) : (
                            <p className={styles.notFound}>Movie Not Found !!!</p>
                          )} */}

                        </DropdownButton>
                      </Col>
                      <Col >
                        <br />
                        <br />
                        <Form.Label>Kelas</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Kelas"
                          name="siswaKelas"
                          value={siswaKelas}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>

                      <Col>
                        <br />
                        <br />
                        <Form.Label>Tempat Lahir</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Tempat Lahir"
                          name="siswaTempatLahir"
                          value={siswaTempatLahir}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>
                      <Col>
                        <br />
                        <br />
                        <Form.Label>Tanggal Lahir</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="Tanggal Lahir"
                          name="siswaTglLahir"
                          value={siswaTglLahir}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>
                      <Col>
                        <br />
                        <br />
                        <Form.Label>Nama Ayah</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nama Ayah"
                          name="siswaNamaAyah"
                          value={siswaNamaAyah}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>
                      <Col>
                        <br />
                        <br />
                        <Form.Label>Nama Ibu</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nama Ibu"
                          name="siswaNamaIbu"
                          value={siswaNamaIbu}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>
                      <Col>
                        <br />
                        <br />
                        <Form.Label>Alamat</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Alamat"
                          name="siswaAlamat"
                          value={siswaAlamat}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>
                    </Form.Group>
                    {/* <Form.Group>
                      <Col>
                        <br />
                        <br />
                        <Form.Label>Name Premiere</Form.Label>
                        <Form.File
                          label="Barang Image"
                          onChange={(event) => this.handleImage(event)}
                        />
                      </Col>
                    </Form.Group> */}
                  </Form>
                </Row>

                <div className={styles.actions}>

                  <button
                    className={styles.button}
                    onClick={() => this.postData()}
                  >
                    Submit
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => {
                      console.log("Cancel ");
                      close();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => ({
  movie: state.movie,
  barang: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(Cards);