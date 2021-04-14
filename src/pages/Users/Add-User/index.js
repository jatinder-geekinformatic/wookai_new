import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  CardTitle,
  CardSubtitle,
  Label,
  Input,
  Container,
  CustomInput,
} from "reactstrap";
import { AvForm, AvField, AvInput } from "availity-reactstrap-validation";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  successToaster,
  errorToaster,
} from "../../../components/Common/Toaster";

import {
  setUser,
  addUser,
  editUser,
  emptyUser,
  updateUser,
  getBusinessLocations,
  getVendors,
} from "../../../store/actions";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

class UserAdd extends React.Component {
  /**
   * component state
   */
  state = {
    id: "",
    loggedInLocation: localStorage.getItem("businessLocation"),
    confirmPassword: "",
  };

  /**
   * Component Did Mount
   */
  componentDidMount() {
    const { loggedInLocation } = this.state;
    this.props.getBusinessLocations();
    this.props.getVendors();
    const route = this.props.location.pathname;
    let arr = route.split("/");
    let id = arr[3];
    if (id !== undefined) {
      this.props.editUser(id);
      this.setState({
        id,
      });
    }

    //set profile id
    this.props.setUser({
      field: "fk_profile_id",
      value: loggedInLocation,
    });
  }

  /**
   * component Will Unmount
   */
  componentWillUnmount() {
    this.props.emptyUser();
  }

  /**
   * submit handle
   */
  handleSubmit = (e) => {
    e.persist();

    const {
      user: { email, password, full_name, user_type, fk_profile_id },
    } = this.props;

    const { id, confirmPassword } = this.state;

    if (password != confirmPassword) {
      errorToaster("Password does not match", "Error");
      return false;
    }

    if (!email || !password || !full_name || !user_type || !fk_profile_id) {
      errorToaster("Please fill required fields", "Error");
      return false;
    }

    if (id) this.props.updateUser(this.props.history, id);
    else this.props.addUser(this.props.history);
  };

  //Redux state Form Input onChange
  changeHandeler = (event) => {
    this.props.setUser({
      field: event.target.name,
      value: event.target.value,
    });
  };

  //Local state Form Input onChange
  stateChangeHandeler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  /**
   * profile checkbox change
   */
  profileChange = () => {
    const {
      user: { user_type, fk_profile_id },
    } = this.props;
    const { loggedInLocation } = this.state;

    if (user_type == "Mid-Level" || user_type == "Low-Level") return false;
  };

  /**
   * user type select change
   */
  userTypeChange = (e) => {
    const { loggedInLocation } = this.state;

    this.props.setUser({
      field: e.target.name,
      value: e.target.value,
    });

    this.props.setUser({
      field: "fk_profile_id",
      value: loggedInLocation,
    });
  };

  /**
   * render component
   */
  render() {
    const {
      businessLocations,
      user: {
        email,
        password,
        full_name,
        user_type,
        fk_profile_id,
        rep_portal,
      },
    } = this.props;

    const { loggedInLocation, confirmPassword, id } = this.state;

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Users" breadcrumbItem="Add" />
            <Row>
              <Col xl="12">
                <Card>
                  <CardBody>
                    {/* <h4 className='card-title'>React Validation - Normal</h4>
                    <p className='card-title-desc'>
                      Provide valuable, actionable feedback to your users with
                      HTML5 form validation–available in all our supported
                      browsers.
                    </p> */}
                    <AvForm
                      className="needs-validation"
                      onSubmit={this.handleSubmit}
                    >
                      <Row>
                        <Col md="4">
                          <FormGroup>
                            <Label htmlFor="validationCustom04">
                              User Type
                            </Label>
                            <select
                              style={{ backgroundColor: id ? "#f1f1f1" : "" }}
                              value={user_type}
                              onChange={(event) => this.userTypeChange(event)}
                              disabled={id}
                              className={`form-control ${
                                user_type ? "" : "is-invalid"
                              }`}
                              name="user_type"
                            >
                              <option disabled value="">
                                --select--
                              </option>
                              <option value="Mid-Level">Manager</option>
                              <option value="Low-Level">
                                Assistant Manager
                              </option>
                            </select>

                            <div className="invalid-feedback">
                              Select user type
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label htmlFor="validationCustom01">
                              User Name
                            </Label>
                            <input
                              className={`form-control ${
                                email ? "" : "is-invalid"
                              }`}
                              value={email}
                              name="email"
                              type="text"
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className="invalid-feedback">Enter Email</div>
                          </FormGroup>
                        </Col>
                        {(user_type == "" ||
                          user_type == "Mid-Level" ||
                          user_type == "Low-Level" ||
                          rep_portal) && (
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="validationCustom03">Name</Label>
                              <input
                                className={`form-control ${
                                  full_name ? "" : "is-invalid"
                                }`}
                                value={full_name}
                                name="full_name"
                                type="text"
                                onChange={(event) => this.changeHandeler(event)}
                              />
                              <div className="invalid-feedback">
                                Enter full name
                              </div>
                            </FormGroup>
                          </Col>
                        )}
                      </Row>
                      {(user_type == "" ||
                        user_type == "Mid-Level" ||
                        user_type == "Low-Level" ||
                        rep_portal) && (
                        <Row>
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="validationCustom02">
                                Password
                              </Label>
                              <input
                                className={`form-control ${
                                  password ? "" : "is-invalid"
                                }`}
                                value={password}
                                name="password"
                                type="text"
                                onChange={(event) => this.changeHandeler(event)}
                              />
                              <div className="invalid-feedback">
                                Enter password
                              </div>
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="validationCustom02">
                                Confirm Password
                              </Label>
                              <input
                                className={`form-control ${
                                  confirmPassword ? "" : "is-invalid"
                                }`}
                                value={confirmPassword}
                                name="confirmPassword"
                                type="text"
                                onChange={(event) =>
                                  this.stateChangeHandeler(event)
                                }
                              />
                              <div className="invalid-feedback">
                                Enter confirm password
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                      )}
                      <Row>
                        <Col md="4">
                          <FormGroup>
                            <Label htmlFor="validationCustom04">
                              Assign Profile
                            </Label>
                            {businessLocations.length > 0 &&
                              businessLocations.map((businessLocation, i) => {
                                return (
                                  <>
                                    {businessLocation.id ==
                                      loggedInLocation && (
                                      <div className="form-check mb-3" key={i}>
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          value={businessLocation.id}
                                          checked={
                                            businessLocation.id == fk_profile_id
                                          }
                                          onChange={(e) => this.profileChange()}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="defaultCheck1"
                                        >
                                          {businessLocation.business_name}
                                        </label>
                                      </div>
                                    )}
                                  </>
                                );
                              })}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button color="primary" type="submit">
                        Submit
                      </Button>
                    </AvForm>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { user, loading } = state.User;
  const { countries } = state.Country;
  const { states } = state.State;
  const { timeZones } = state.TimeZone;
  const { businessLocations } = state.BusinessLocation;
  const { vendors } = state.Vendor;

  return {
    user,
    countries,
    states,
    timeZones,
    loading,
    businessLocations,
    vendors,
  };
};

export default withRouter(
  connect(mapStatetoProps, {
    setUser,
    addUser,
    editUser,
    emptyUser,
    updateUser,
    getBusinessLocations,
    getVendors,
  })(UserAdd)
);
