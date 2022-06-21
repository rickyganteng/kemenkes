import React, { Component } from "react";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/NavBar/NavBar";
import Cards from "../../../components/CardOrderHistory/CardOrderHistory";
import {
  Container,
  Form,
  Row,
  Col,
  Image,
  Button,
  Alert,
} from "react-bootstrap";
import styles from "./Profile.module.css";
import { connect } from "react-redux";
import { updateProfile, getOrderHistory } from "../../../redux/action/user";
import { logout, change } from "../../../redux/action/auth";
import dummy from "../../../assets/img/icon-defauult.png";


class Profile extends Component {
  constructor(props) {
    super(props);
    const { user_name, user_email, user_phone_number } = this.props.auth.data;
    this.state = {
      form: {
        firstName: user_name.split(" ")[0],
        lastName: user_name.split(" ")[1],
        userPhoneNumber: user_phone_number,
        image: null,
        userEmail: user_email,
        userPassword: "",
        confirmUserPassword: "",
      },
      msgChangePass: "",
      isShow: false,
      navSet: true,
      navOrder: false,
    };
  }

  componentDidMount() {
    const id = this.props.auth.data.user_id;
    this.props.getOrderHistory(id);
  }

  changeText = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleUpdateProfile = (event) => {
    const {
      firstName,
      lastName,
      userPhoneNumber,
      image,
      userEmail,
    } = this.state.form;
    const { user_email } = this.props.auth.data;

    event.preventDefault();

    if (user_email !== userEmail) {
      this.props.change({ userEmail: userEmail });
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("userPhoneNumber", userPhoneNumber);
    formData.append("image", image);

    this.props
      .updateProfile(formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        this.setState({
          isShow: true,
        });
        setTimeout(() => {
          // log out here
          this.props.logout();
          this.props.history.push("/login");
        }, 2000);
      });
  };

  handleUpdatePassword = (event) => {
    event.preventDefault();
    const { userPassword, confirmUserPassword } = this.state.form;
    if (
      userPassword !== confirmUserPassword ||
      userPassword.length === 0 ||
      confirmUserPassword === 0
    ) {
      this.setState({ msgChangePass: "Please recheck your confirm password" });
    } else {
      this.props
        .change({ userPassword: userPassword })
        .then((res) => {
          this.setState({
            msgChangePass:
              "Email verification for new password has been sent, please check your email !",
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setTimeout(() => {
            // log out here
            this.props.logout();
            this.props.history.push("/login");
          }, 2000);
        });
    }
  };

  handleImage = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        image: event.target.files[0],
      },
    });
  };

  handeNav = (event) => {
    const name = event.target.name;
    this.setState({
      [name.split(" ")[0]]: true,
      [name.split(" ")[1]]: false,
    });
  };
  render() {
    const { firstName, lastName, userPhoneNumber, userEmail } = this.state.form;
    const { isError, msg } = this.props.update;
    const { user_profile_image } = this.props.auth.data;
    const { isShow, msgChangePass, navSet, navOrder } = this.state;
    const { dataOrder } = this.props.update;
    console.log(dataOrder);

    return (
      <>
        <NavBar isAdminPage={false} />
        <Container className={`${styles.bgCnt} p-4`} fluid>
          <Row>
            <Col md={4}>
              <div className={`${styles.bgDiv} p-4`}>
                <p className={styles.info}>INFO</p>
                <div className="text-center">
                  {user_profile_image ? (
                    <Image
                      src={`http://localhost:3001/backend1/api/${user_profile_image}`}
                      alt="NO PROFILE"
                      style={{ width: "45%" }}
                      roundedCircle
                      className="mb-3"
                    />
                  ) : (
                    <img src={dummy} alt="gambar" />
                  )}
                  <p className={styles.name}>{`${firstName} ${lastName}`}</p>
                  <p className={styles.semi}>Moviegoers</p>
                </div>
              </div>
            </Col>
            <Col md={8}>
              <div className={`${styles.bgDiv} p-4`}>
                <div className="d-flex flex-row">
                  <Button
                    className={`${styles.info} ${navSet ? styles.selectedNavMenu : styles.unselectedNavMenu
                      }`}
                    variant="light"
                    name="navSet navOrder"
                    onClick={(event) => this.handeNav(event)}
                  >
                    Account Settings
                  </Button>
                  <Button
                    className={`${styles.info} ${navOrder
                      ? styles.selectedNavMenu
                      : styles.unselectedNavMenu
                      } ml-5`}
                    variant="light"
                    name="navOrder navSet"
                    onClick={(event) => this.handeNav(event)}
                  >
                    Order History
                  </Button>
                </div>
                <hr />
                {navSet ? (
                  <div>
                    <p className={`${styles.info}`}>Details Information</p>
                    <hr />
                    <Form
                      onSubmit={this.handleUpdateProfile}
                      className={`${styles.form} mb-5`}
                    >
                      <Form.Row>
                        <Form.Group as={Col}>
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            placeholder="your first name"
                            value={firstName}
                            onChange={(event) => this.changeText(event)}
                          />
                        </Form.Group>

                        <Form.Group as={Col}>
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="your last name"
                            value={lastName}
                            onChange={(event) => this.changeText(event)}
                          />
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group as={Col}>
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="userEmail"
                            placeholder="your email"
                            value={userEmail}
                            onChange={(event) => this.changeText(event)}
                          />
                        </Form.Group>

                        <Form.Group as={Col}>
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="text"
                            name="userPhoneNumber"
                            placeholder="your phone number"
                            value={userPhoneNumber}
                            onChange={(event) => this.changeText(event)}
                          />
                        </Form.Group>
                      </Form.Row>
                      <Form.Group>
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control
                          type="file"
                          onChange={(event) => this.handleImage(event)}
                        />
                      </Form.Group>
                      <Button
                        variant="primary"
                        type="submit"
                        className={`${styles.btUpdate} mt-3`}
                      >
                        Update Changes
                      </Button>
                      {isError ? (
                        <Alert className="mt-3" variant="danger">
                          {msg}
                        </Alert>
                      ) : msg.length > 0 && isShow ? (
                        <Alert className="mt-3" variant="success">
                          {msg}
                        </Alert>
                      ) : (
                        ""
                      )}
                    </Form>
                    <p className={`${styles.info}`}>Account and Privacy</p>
                    <hr />
                    <Form
                      onSubmit={this.handleUpdatePassword}
                      className={styles.form}
                    >
                      <Form.Row>
                        <Form.Group as={Col}>
                          <Form.Label>New Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="userPassword"
                            placeholder="enter new password"
                            onChange={(event) => this.changeText(event)}
                          />
                        </Form.Group>
                        <Form.Group as={Col}>
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmUserPassword"
                            placeholder="confirm your new password"
                            onChange={(event) => this.changeText(event)}
                          />
                        </Form.Group>
                      </Form.Row>
                      {msgChangePass.length > 0 ? (
                        <Alert className="mt-3" variant="warning">
                          {msgChangePass}
                        </Alert>
                      ) : (
                        ""
                      )}
                      <Button
                        variant="primary"
                        type="submit"
                        className={`${styles.btUpdate} mt-3`}
                      >
                        Change Password
                      </Button>
                    </Form>
                  </div>
                ) : (
                  dataOrder.map((item, index) => {
                    return <Cards key={index} info={item} />;
                  })
                )}
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Footer />
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  update: state.updateProfile,
});

const mapDispatchToProps = { updateProfile, getOrderHistory, logout, change };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
