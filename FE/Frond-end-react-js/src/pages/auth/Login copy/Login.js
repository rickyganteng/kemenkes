import React, { Component } from "react";
import styles from "./Login.module.css";
import { Row, Col, Button, Container, Form, Image } from "react-bootstrap";
import { Google, Facebook } from "react-bootstrap-icons";
import { connect } from "react-redux";
import { login } from "../../../redux/action/auth";
import logo from "../../../assets/img/logo_0.png";
import line from "../../../assets/img/line_long.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        userEmail: "",
        userPassword: "",
      },
      msg: "",
      emailValid: "valid",
      passwordValid: "valid",
    };
  }

  changeText = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleLogin = (event) => {
    event.preventDefault();
    this.props
      .login(this.state.form)
      .then((res) => {
        localStorage.setItem("token", this.props.auth.data.token);
        localStorage.setItem("user", this.props.auth.data.user_id);
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          msg: err.response.data.msg,
          emailValid: err.response.data.status === 404 ? "Invalid" : "valid",
          passwordValid: err.response.data.status === 400 ? "Invalid" : "valid",
        });
      });
  };

  handleRegister = () => {
    this.props.history.push("/register");
  };

  render() {
    const {
      userEmail,
      userPassword,
      emailValid,
      passwordValid,
      msg,
    } = this.state;

    return (
      <>
        <Container fluid>
          <Row>
            <Col md={7}>
              <div className={styles.left}>
                <div className={styles.leftIn}>
                  <div className={`${styles.center}`}>
                    <Image src={logo} className={styles.logo} />
                    <p className="text-center">wait, watch, wow!</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={5}>
              <div className="mt-5 mx-auto p-4">
                <h1 className="mt-5">Sign In</h1>
                <p className={styles.semi}>
                  Sign in with your data that you entered during your
                  registration
                </p>
                <Form onSubmit={this.handleLogin} className="mt-5">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="userEmail"
                      value={userEmail}
                      onChange={(event) => this.changeText(event)}
                    />
                    <Form.Control.Feedback type={emailValid}>
                      <p className={styles.warning}>{msg}</p>
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
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
                    Sign in
                  </Button>
                </Form>
                <p
                  className={`${styles.semi} text-center mt-2`}
                  style={{ fontSize: "15px" }}
                >
                  <span>Forgot your password? </span>
                  <span
                    className={styles.resetBtn}
                    style={{ color: "#5F2EEA" }}
                  >
                    Reset now,
                  </span>
                  <p>
                    <span>don't have an account? </span>
                    <span
                      className={styles.resetBtn}
                      style={{ color: "#5F2EEA" }}
                      onClick={() => this.handleRegister()}
                    >
                      Register now
                    </span>
                  </p>
                </p>
                <div className="d-flex flex-row justify-content-center mt-4 mb-5">
                  <div>
                    <Image src={line} className={styles.line} />
                  </div>
                  <p className={styles.semi} style={{ fontSize: "11px" }}>
                    Or
                  </p>
                  <div>
                    <Image src={line} className={styles.line} />
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-center">
                  <div className="mr-1">
                    <Button variant="light" className="shadow">
                      <span>
                        <Google />
                      </span>
                      <span
                        className={styles.semi}
                        style={{ fontSize: "13px" }}
                      >
                        {" "}
                        Google
                      </span>
                    </Button>
                  </div>
                  <div className="ml-2">
                    <Button variant="light" className="shadow">
                      <span>
                        <Facebook />
                      </span>
                      <span
                        className={styles.semi}
                        style={{ fontSize: "13px" }}
                      >
                        {" "}
                        Facebook
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
