import React, { Component } from "react";
import styles from "./Register.module.css";
import {
  Row,
  Col,
  Button,
  Container,
  Form,
  Image,
  Alert,
} from "react-bootstrap";
import { Google, Facebook } from "react-bootstrap-icons";
import { connect } from "react-redux";
import { register } from "../../../redux/action/auth";
import logo from "../../../assets/img/logo_0.png";
import line from "../../../assets/img/line_long.png";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        firstName: "",
        lastName: "",
        userEmail: "",
        userPhoneNumber: "",
        userPassword: "",
      },
      isShow: ["danger", false],
      msg: "",
      firstNameValid: "valid",
      lastNameValid: "valid",
      phoneNumberValid: "valid",
      passwordValid: "valid",
    };
  }

  changeText = (event) => {
    // validation
    const name = event.target.name;
    const value = event.target.value;

    if (name === "firstName") {
      /^[A-Za-z ]+$/.test(value)
        ? this.setState({ firstNameValid: "valid" })
        : this.setState({
          firstNameValid: "Invalid",
          msg: "Please enter A-Z character",
        });
    } else if (name === "lastName") {
      /^[A-Za-z ]+$/.test(value) || value.length === 0
        ? this.setState({ lastNameValid: "valid" })
        : this.setState({
          lastNameValid: "Invalid",
          msg: "Please enter A-Z character",
        });
    } else if (name === "userPhoneNumber") {
      /^[0-9]+$/.test(value) && value.length <= 12
        ? this.setState({ phoneNumberValid: "valid" })
        : this.setState({
          phoneNumberValid: "Invalid",
          msg: "Please enter a maximum of 12 digit numbers",
        });
    } else if (name === "userPassword") {
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(value)
        ? this.setState({ passwordValid: "valid" })
        : this.setState({
          passwordValid: "Invalid",
          msg:
            "Minimum 4 characters, at least one letter and one number:",
        });
    }
    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
    });
  };

  handleRegister = (event) => {
    event.preventDefault();
    const {
      firstNameValid,
      phoneNumberValid,
      passwordValid,
      msg,
      form,
    } = this.state;
    const { register } = this.props;

    if (
      firstNameValid === "valid" &&
      phoneNumberValid === "valid" &&
      passwordValid === "valid" &&
      msg.length > 0 &&
      form.userEmail.length > 0
    ) {
      register(form)
        .then((res) => {
          this.setState({
            msg: res.value.data.msg,
            isShow: ["success", true],
          });
          setTimeout(() => {
            this.props.history.push("/login");
          }, 3000);
        })
        .catch((err) => {
          this.setState({
            msg: "Error: " + err.response.data.msg,
            isShow: ["danger", true],
          });
        });
    }
  };

  render() {
    const {
      userEmail,
      firstName,
      lastName,
      userPhoneNumber,
      userPassword,
      firstNameValid,
      lastNameValid,
      phoneNumberValid,
      passwordValid,
      isShow,
      msg,
    } = this.state;


    return (
      <>
        <Container >
          {/* <Col md={7}>
              <div className={styles.left}>
                <div className={`${styles.leftIn} p-5`}>
                  <Image src={logo} className={`${styles.logo} mb-5`} />
                  <p className={`${styles.mainTitle} mt-3`}>
                    Lets build your account
                  </p>
                  <p className={`${styles.semiTitle} mb-5`}>
                    To be a loyal moviegoer and access all of features, your
                    details are required.
                  </p>
                  <div className="d-flex flex-row mb-3">
                    <div className={`${styles.dot} pt-1`}>1</div>
                    <p className={`${styles.semiTitle} pt-1 ml-4`}>
                      Fill your additional details
                    </p>
                  </div>
                  <div className="d-flex flex-row mb-3">
                    <div className={`${styles.dot} pt-1`}>2</div>
                    <p className={`${styles.semiTitle} pt-1 ml-4`}>
                      Activate your account
                    </p>
                  </div>
                  <div className="d-flex flex-row">
                    <div className={`${styles.dot} pt-1`}>3</div>
                    <p className={`${styles.semiTitle} pt-1 ml-4`}>Done</p>
                  </div>
                </div>
              </div>
            </Col> */}
          <div className="d-flex justify-content-center">

            <h3 className="mt-5">Register Account</h3>
          </div>
          <div className="justify-content-center">

            <Form onSubmit={this.handleRegister} className="mt-4">
              <Form.Group>
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="firstName"
                  value={firstName}
                  onChange={(event) => this.changeText(event)}
                />
                <Form.Control.Feedback type={firstNameValid}>
                  <p className={styles.warning}>{msg}</p>
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>NIP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="NIP"
                  name="lastName"
                  value={lastName}
                  onChange={(event) => this.changeText(event)}
                />
                <Form.Control.Feedback type={lastNameValid}>
                  <p className={styles.warning}>{msg}</p>
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>No HP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="No HP"
                  name="userPhoneNumber"
                  value={userPhoneNumber}
                  onChange={(event) => this.changeText(event)}
                />
                <Form.Control.Feedback type={phoneNumberValid}>
                  <p className={styles.warning}>{msg}</p>
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="userEmail"
                  value={userEmail}
                  onChange={(event) => this.changeText(event)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="userPassword"
                  value={userPassword}
                  onChange={(event) => this.changeText(event)}
                />
                <Form.Control.Feedback type={passwordValid}>
                  <p className={styles.warning}>{msg}</p>
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className={`${styles.btSubmit} mt-3`}
              >
                Join for free now
              </Button>
            </Form>
            <Alert
              show={isShow[1]}
              variant={isShow[0]}
              className="text-center mt-4"
            >
              {msg}
            </Alert>
          </div>
        </Container>
      </>
    );
  }
}

const mapDispatchToProps = { register };

export default connect(null, mapDispatchToProps)(Register);
