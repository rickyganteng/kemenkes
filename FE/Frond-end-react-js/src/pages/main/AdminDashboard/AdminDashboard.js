import React, { Component } from "react";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/NavBar/NavBar";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { ResponsiveLine } from "@nivo/line";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./AdminDashboard.module.css";
import { connect } from "react-redux";
import { getMovieName } from "../../../redux/action/movie";
import {
  getPremiereName,
  getPremiereLocation,
} from "../../../redux/action/premiere";
import { getSalesIncome } from "../../../redux/action/booking";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      data: [{ id: "income", data: [] }],
      movieName: [],
      premiereName: [],
      premiereLocation: [],
      selectedMovie: [],
      selectedPremiere: [],
      selectedLocation: [],
    };
  }

  componentDidMount() {
    this.props.getMovieName().then((res) => {
      this.setState({ movieName: res.action.payload.data.data });
    });
    this.props.getPremiereName().then((res) => {
      this.setState({ premiereName: res.action.payload.data.data });
    });
    this.props.getPremiereLocation().then((res) => {
      this.setState({ premiereLocation: res.action.payload.data.data });
    });
  }

  resetThenSet = (id, title, key) => {
    // this.setState({ selected: [id, title, key] });
    // console.log("SELECT---", id, title, key);
    this.setState({
      ...this.state,
      [key]: [id, title],
    });
  };

  handleReset = () => {
    this.setState({ data: [{ id: "income", data: [] }] });
  };

  handleFilter = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const { selectedMovie, selectedPremiere, selectedLocation } = this.state;
    this.props
      .getSalesIncome(
        selectedPremiere[1],
        selectedMovie[0],
        selectedLocation[1]
      )
      .then((res) => {
        this.setState({
          data: [
            {
              id: "income",
              data: res.action.payload.data.data.map((item) => {
                return { x: monthNames[item.month], y: parseInt(item.total) };
              }),
            },
          ],
        });
        console.log([
          {
            id: "income",
            data: res.action.payload.data.data.map((item) => {
              return { x: item.month.toString(), y: parseInt(item.total) };
            }),
          },
        ]);
      });
  };

  render() {
    const { data, movieName, premiereName, premiereLocation } = this.state;
    // console.log("this state parent", this.state);
    return (
      <>
        <NavBar isAdminPage={true} />
        <Container className={styles.bgCnt} fluid>
          <Container className={styles.bgCnt}>
            <Row>
              <Col md={8} className="mt-3">
                <p className={styles.title}>Dashboard</p>
                <div
                  className={`${styles.bgDiv} p-1 text-center`}
                  style={{ height: "400px" }}
                >
                  {" "}
                  {data[0].data.length === 0 ? (
                    <h1 styles={styles.noData}><br />Page Chart</h1>
                  ) : (
                    <ResponsiveLine
                      className={styles.text}
                      data={data}
                      margin={{
                        top: 40,
                        right: 30,
                        bottom: 40,
                        left: 50,
                      }}
                      curve="cardinal"
                      yScale={{
                        type: "linear",
                        min: "auto",
                        max: "auto",
                        stacked: true,
                        reverse: false,
                      }}
                      xScale={{
                        type: "point",
                      }}
                      axisBottom={{
                        orient: "bottom",
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                      }}
                      axisLeft={{
                        format: (value) => `$ ${value}`,
                      }}
                      colors="#5F2EEA"
                      pointSize={10}
                      pointColor="white"
                      pointBorderWidth={2}
                      pointBorderColor={{ from: "serieColor" }}
                      useMesh={true}
                      enableGridX={false}
                      enableGridY={false}
                    />
                  )}
                </div>
              </Col>
              <Col md={4} className="mt-3">
                <p className={styles.title}>Filtered</p>
                <div className={`${styles.bgDiv} p-4`}>
                  <Dropdown
                    title="Select Movie"
                    list={movieName.map((item) => {
                      return {
                        id: item.movie_id,
                        key: "selectedMovie",
                        title: item.movie_name,
                      };
                    })}
                    resetThenSet={this.resetThenSet}
                  />
                  <Dropdown
                    title="Select Premiere"
                    list={premiereName.map((item, index) => {
                      return {
                        id: index,
                        key: "selectedPremiere",
                        title: item.premiere_name,
                      };
                    })}
                    resetThenSet={this.resetThenSet}
                  />
                  <Dropdown
                    title="Select Location"
                    list={premiereLocation.map((item) => {
                      return {
                        id: item.location_id,
                        title: item.location_addres,
                        key: "selectedLocation",
                      };
                    })}
                    resetThenSet={this.resetThenSet}
                  />
                  <div className="d-flex flex-column">
                    <Button
                      variant="primary"
                      className={`${styles.btnFilter} mb-2`}
                      onClick={() => {
                        this.handleFilter();
                      }}
                    >
                      Filter
                    </Button>
                    <Button
                      variant="primary"
                      className={styles.btnReset}
                      onClick={() => {
                        this.handleReset();
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
            <br />
          </Container>
        </Container>
        <Footer />
      </>
    );
  }
}

const mapDispatchToProps = {
  getMovieName,
  getPremiereName,
  getPremiereLocation,
  getSalesIncome,
};

export default connect(null, mapDispatchToProps)(Dashboard);
