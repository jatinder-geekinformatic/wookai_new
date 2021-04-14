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
import { successToaster, errorToaster } from "../../components/Common/Toaster";

import {
  setRegisterUser,
  registerUser,
  emptyRegisterUser,
  getDefaultProfilesList,
  getCountries,
  getStates,
  getTimeZones
} from "../../store/actions";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { GOOGLE_SITE_KEY } from "../../config/securityKeys";
import ReCAPTCHA from "react-google-recaptcha";
// import images
import wookAiImg from "../../assets/images/WookAI.png";
import logoImg from "../../assets/images/logo.svg";
class Register extends React.Component {
  /**
   * component state
   */
  state = {
    captchaValue: "",
    confirmPassword: "",
  };

  /**
   * Component Did Mount
   */
  componentDidMount() {
    this.props.getDefaultProfilesList();
    this.props.getCountries();
    this.props.getStates();
    this.props.getTimeZones();
  }

  /**
   * component Will Unmount
   */
  componentWillUnmount() {
    this.props.emptyRegisterUser();
  }

  /**
   * submit handle
   */
  handleSubmit = async (e) => {
    e.persist();
    const {
      register: {
        email,
        password,
        full_name,
        address,
        city,
        fk_state_id,
        state,
        zip_code,
        fk_country_id,
        fk_timezone_id,
        user_type,
        fk_profile_id,
        cell,
      },
    } = this.props;

    const { captchaValue, confirmPassword } = this.state;

    if (
      !email ||
      !password ||
      !full_name ||
      !address ||
      !city ||
      !zip_code ||
      !fk_country_id ||
      !fk_timezone_id ||
      !user_type
    ) {
      errorToaster("Please fill required fields", "Error");
      return false;
    }

    if (fk_country_id == 244 && !fk_state_id) {
      errorToaster("Please fill required fields", "Error");
      return false;
    }

    if (fk_country_id != 244 && !state) {
      errorToaster("Please fill required fields", "Error");
      return false;
    }

    if (user_type == 0 && !fk_profile_id) {
      errorToaster("Please fill required fields", "Error");
      return false;
    }

    if (password != confirmPassword) {
      errorToaster("Password does not match", "Error");
      return false;
    }

    if (user_type == 1 && !cell) {
      errorToaster("Please fill required fields", "Error");
      return false;
    }

    if (!captchaValue) {
      errorToaster("Please confirm captcha.");
      return false;
    }

    this.props.registerUser(this.props.history);
  };

  //Form Input onChange
  changeHandeler = (event) => {
    this.props.setRegisterUser({
      field: event.target.name,
      value: event.target.value,
    });
  };

  /**
   * render component
   */
  render() {
    const {
      defaultProfilesList,
      countries,
      states,
      timeZones,
      register: {
        email,
        password,
        full_name,
        address,
        city,
        fk_state_id,
        state,
        zip_code,
        fk_country_id,
        fk_timezone_id,
        user_type,
        fk_profile_id,
        cell,
      },
    } = this.props;

    const { confirmPassword } = this.state;

    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="fas fa-home h2"></i>
          </Link>
        </div>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col xl="12">
                <Card className="overflow-hidden">
                  <div className="bg-soft-primary">
                    <Row>
                      <Col className="col-7">
                        <div className="text-primary p-4">
                          <h5 className="text-primary">Free Register</h5>
                          <p>Get your free WookAI account now.</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={wookAiImg} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logoImg}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                      <AvForm
                        className="needs-validation"
                        onSubmit={this.handleSubmit}
                      >
                        <Row>
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
                              <div className="invalid-feedback">
                                Enter Email
                              </div>
                            </FormGroup>
                          </Col>
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
                                name="password"
                                type="text"
                                onChange={(event) =>
                                  this.setState({
                                    confirmPassword: event.target.value,
                                  })
                                }
                              />
                              <div className="invalid-feedback">
                                Enter confirm password
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
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
                          <Col md="8">
                            <FormGroup>
                              <Label htmlFor="validationCustom04">
                                Address
                              </Label>
                              <input
                                className={`form-control ${
                                  address ? "" : "is-invalid"
                                }`}
                                value={address}
                                name="address"
                                type="text"
                                onChange={(event) => this.changeHandeler(event)}
                              />
                              <div className="invalid-feedback">
                                Enter address
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="validationCustom03">
                                Country
                              </Label>

                              <select
                                value={fk_country_id}
                                onChange={(event) => this.changeHandeler(event)}
                                className={`form-control ${
                                  fk_country_id ? "" : "is-invalid"
                                }`}
                                name="fk_country_id"
                              >
                                <option disabled value="">
                                  --select--
                                </option>
                                {countries.map((country, i) => {
                                  return (
                                    <option key={i} value={country.id}>
                                      {country.country_name}
                                    </option>
                                  );
                                })}
                              </select>
                              <div className="invalid-feedback">
                                Select Country
                              </div>
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="validationCustom04">State</Label>
                              {fk_country_id == 244 && (
                                <select
                                  value={fk_state_id}
                                  onChange={(event) =>
                                    this.changeHandeler(event)
                                  }
                                  className={`form-control ${
                                    fk_state_id ? "" : "is-invalid"
                                  }`}
                                  name="fk_state_id"
                                >
                                  <option disabled value="">
                                    --select--
                                  </option>
                                  {states.map((val, i) => {
                                    return (
                                      <option key={i} value={val.id}>
                                        {val.state_name}
                                      </option>
                                    );
                                  })}
                                </select>
                              )}
                              {fk_country_id != 244 && (
                                <input
                                  className={`form-control ${
                                    state ? "" : "is-invalid"
                                  }`}
                                  value={state}
                                  name="state"
                                  type="text"
                                  onChange={(event) =>
                                    this.changeHandeler(event)
                                  }
                                />
                              )}

                              <div className="invalid-feedback">
                                Enter State
                              </div>
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="validationCustom03">City</Label>
                              <input
                                className={`form-control ${
                                  city ? "" : "is-invalid"
                                }`}
                                value={city}
                                name="city"
                                type="text"
                                onChange={(event) => this.changeHandeler(event)}
                              />
                              <div className="invalid-feedback">Enter city</div>
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="validationCustom05">Zip</Label>
                              <input
                                className={`form-control ${
                                  zip_code ? "" : "is-invalid"
                                }`}
                                value={zip_code}
                                name="zip_code"
                                type="text"
                                onChange={(event) => this.changeHandeler(event)}
                              />
                              <div className="invalid-feedback">Enter zip</div>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="validationCustom03">
                                TimeZone
                              </Label>

                              <select
                                value={fk_timezone_id}
                                onChange={(event) => this.changeHandeler(event)}
                                className={`form-control ${
                                  fk_timezone_id ? "" : "is-invalid"
                                }`}
                                name="fk_timezone_id"
                              >
                                <option disabled value="">
                                  --select--
                                </option>
                                {timeZones.map((timeZone, i) => {
                                  return (
                                    <option key={i} value={timeZone.id}>
                                      {timeZone.timezone_key}
                                    </option>
                                  );
                                })}
                              </select>
                              <div className="invalid-feedback">
                                Enter TimeZone
                              </div>
                            </FormGroup>
                          </Col>
                       
                            <Col md="4">
                              <FormGroup>
                                <Label htmlFor="validationCustom04">
                                  Account Type
                                </Label>
                                <select
                                  value={user_type}
                                  onChange={(event) =>
                                    this.changeHandeler(event)
                                  }
                                  className={`form-control ${
                                    user_type ? "" : "is-invalid"
                                  }`}
                                  name="user_type"
                                >
                                  <option disabled value="">
                                    --select--
                                  </option>
                                  <option value="-1">New Client Account</option>
                                  <option value="0">Cherry Demo Account</option>
                                  <option value="1">
                                    Supplier Sales Rep Account
                                  </option>
                                  <option value="2">
                                    Cherry Supplier Price List Checker (limited)
                                  </option>
                                </select>

                                <div className="invalid-feedback">
                                  Select user type
                                </div>
                              </FormGroup>
                            </Col>
                   
                          {user_type == 1 && (
                            <Col md="4">
                              <FormGroup>
                                <Label htmlFor="validationCustom03">
                                  Mobile Phone Number
                                </Label>

                                <input
                                  className={`form-control ${
                                    cell ? "" : "is-invalid"
                                  }`}
                                  value={cell}
                                  name="cell"
                                  type="text"
                                  onChange={(event) =>
                                    this.changeHandeler(event)
                                  }
                                />
                                <div className="invalid-feedback">
                                  Enter Phone
                                </div>
                              </FormGroup>
                            </Col>
                          )}

                          {user_type == 0 && user_type != "" && (
                            <Col md="4">
                              <FormGroup>
                                <Label htmlFor="validationCustom04">
                                  Choose Demo Business
                                </Label>
                                <select
                                  value={fk_profile_id}
                                  onChange={(event) =>
                                    this.changeHandeler(event)
                                  }
                                  className={`form-control ${
                                    fk_profile_id ? "" : "is-invalid"
                                  }`}
                                  name="fk_profile_id"
                                >
                                  <option disabled value="">
                                    --select--
                                  </option>
                                  {defaultProfilesList.map(
                                    (defaultProfile, i) => {
                                      return (
                                        <option
                                          key={i}
                                          value={defaultProfile.id}
                                        >
                                          {defaultProfile.business_name}
                                        </option>
                                      );
                                    }
                                  )}
                                </select>

                                <div className="invalid-feedback">
                                  Select Demo business
                                </div>
                              </FormGroup>
                            </Col>
                          )}
                        </Row>
                        <Row>
                          {/* <Col lg='3'>
                          <FormGroup>
                            <AvInput
                              tag={CustomInput}
                              type='checkbox'
                              label='Agree to terms and conditions'
                              id='invalidCheck'
                              name='condition'
                              errorMessage='You must agree before submitting.'
                              validate={{ required: { value: true } }}
                            />
                          </FormGroup>
                        </Col> */}
                          <Col lg="3">
                            <FormGroup>
                              <ReCAPTCHA
                                sitekey={GOOGLE_SITE_KEY}
                                onChange={(value) =>
                                  this.setState({ captchaValue: value })
                                }
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button color="primary" type="submit">
                          Submit
                        </Button>
                      </AvForm>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    Already have an account ?{" "}
                    <Link
                      to="/login"
                      className="font-weight-medium text-primary"
                    >
                      {" "}
                      Login
                    </Link>{" "}
                  </p>
                  <p>
                    © {new Date().getFullYear()} WookAI.
                    {/* Crafted with{" "}
                    <i className="mdi mdi-heart text-danger"></i> by Themesbrand */}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { register, loading } = state.Account;
  const { countries } = state.Country;
  const { states } = state.State;
  const { timeZones } = state.TimeZone;
  const { defaultProfilesList } = state.DefaultProfile;

  return { register, countries, states, timeZones, loading, defaultProfilesList };
};

export default withRouter(
  connect(mapStatetoProps, {
    setRegisterUser,
    registerUser,
    emptyRegisterUser,
    getDefaultProfilesList,
    getCountries,
    getStates,
    getTimeZones
  })(Register)
);
