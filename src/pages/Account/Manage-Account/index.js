import React, { useState } from 'react';
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
} from 'reactstrap';
import { AvForm, AvField, AvInput } from 'availity-reactstrap-validation';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { successToaster, errorToaster } from "../../../components/Common/Toaster";

import {
  setAccount,
  editAccount,
  emptyAccount,
  updateAccount,
} from '../../../store/actions';
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import {GOOGLE_SITE_KEY} from '../../../config/securityKeys';
import ReCAPTCHA from "react-google-recaptcha";

class ClientAdd extends React.Component {
  /**
   * component state
   */
  state = {
    id: '',
    captchaValue: '',
    confirmPassword: "",
  };

  /**
   * Component Did Mount
   */
  componentDidMount() {
    this.props.editAccount();
  }

  /**
   * component Will Unmount
   */
  componentWillUnmount() {
    this.props.emptyAccount();
  }

  /**
   * submit handle
   */
  handleSubmit = async (e) => {
    e.persist();
    const {
      account: {
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
        cell
      },
    } = this.props;

    const { id, confirmPassword } = this.state;

    if (
      !email ||
      !password ||
      !full_name ||
      !address ||
      !city ||
      !zip_code ||
      !fk_country_id ||
      !fk_timezone_id
    ) {
      errorToaster('Please fill required fields', 'Error')
      return false;
    }

    if(fk_country_id == 244 && !fk_state_id){
      errorToaster('Please fill required fields', 'Error')
      return false;
    }

    if(fk_country_id != 244 && !state){
      errorToaster('Please fill required fields', 'Error')
      return false;
    }

    if (password != confirmPassword) {
      errorToaster("Password does not match", "Error");
      return false;
    }

    this.props.updateAccount(this.props.history);
  };

  //Form Input onChange
  changeHandeler = (event) => {
    this.props.setAccount({
      field: event.target.name,
      value: event.target.value,
    });
  };

  /**
   * render component
   */
  render() {
    const {
      defaultProfiles,
      countries,
      states,
      timeZones,
      account: {
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
        cell
      },
    } = this.props;

    const {id, confirmPassword} = this.state;

    return (
      <React.Fragment>
        <div className='page-content'>
          <Container fluid={true}>
            <Breadcrumbs title='Manage' breadcrumbItem='Account' />
            <Row>
              <Col xl='12'>
                <Card>
                  <CardBody>
                    {/* <h4 className='card-title'>React Validation - Normal</h4>
                    <p className='card-title-desc'>
                      Provide valuable, actionable feedback to your users with
                      HTML5 form validation–available in all our supported
                      browsers.
                    </p> */}
                    <AvForm
                      className='needs-validation'
                      onSubmit={this.handleSubmit}
                    >
                      <Row>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom01'>
                              User Name
                            </Label>
                            <input
                              className={`form-control ${
                                email ? '' : 'is-invalid'
                              }`}
                              disabled={true}
                              style={{backgroundColor: '#f1f1f1' }}
                              value={email}
                              name='email'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>Enter Email</div>
                          </FormGroup>
                        </Col>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom02'>Password</Label>
                            <input
                              className={`form-control ${
                                password ? '' : 'is-invalid'
                              }`}
                              value={password}
                              name='password'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter password
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom02'>
                              Confirm Password
                            </Label>
                            <input
                              className={`form-control ${
                                confirmPassword ? '' : 'is-invalid'
                              }`}
                              value={confirmPassword}
                              name='password'
                              type='text'
                              onChange={(event) => this.setState({
                                confirmPassword: event.target.value
                              })}
                            />
                            <div className='invalid-feedback'>
                              Enter confirm password
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom03'>Name</Label>
                            <input
                              className={`form-control ${
                                full_name ? '' : 'is-invalid'
                              }`}
                              value={full_name}
                              name='full_name'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter full name
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='8'>
                          <FormGroup>
                            <Label htmlFor='validationCustom04'>Address</Label>
                            <input
                              className={`form-control ${
                                address ? '' : 'is-invalid'
                              }`}
                              value={address}
                              name='address'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter address
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md='3'>
                          <FormGroup>
                            <Label htmlFor='validationCustom03'>Country</Label>

                            <select
                              value={fk_country_id}
                              onChange={(event) => this.changeHandeler(event)}
                              className={`form-control ${
                                fk_country_id ? '' : 'is-invalid'
                              }`}
                              name='fk_country_id'
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
                            <div className='invalid-feedback'>
                              Select Country
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='3'>
                          <FormGroup>
                            <Label htmlFor='validationCustom04'>State</Label>
                            {fk_country_id == 244 && (
                              <select
                                value={fk_state_id}
                                onChange={(event) => this.changeHandeler(event)}
                                className={`form-control ${
                                  fk_state_id ? '' : 'is-invalid'
                                }`}
                                name='fk_state_id'
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
                                  state ? '' : 'is-invalid'
                                }`}
                                value={state}
                                name='state'
                                type='text'
                                onChange={(event) => this.changeHandeler(event)}
                              />
                            )}

                            <div className='invalid-feedback'>Enter State</div>
                          </FormGroup>
                        </Col>
                        <Col md='3'>
                          <FormGroup>
                            <Label htmlFor='validationCustom03'>City</Label>
                            <input
                              className={`form-control ${
                                city ? '' : 'is-invalid'
                              }`}
                              value={city}
                              name='city'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>Enter city</div>
                          </FormGroup>
                        </Col>
                        <Col md='3'>
                          <FormGroup>
                            <Label htmlFor='validationCustom05'>Zip</Label>
                            <input
                              className={`form-control ${
                                zip_code ? '' : 'is-invalid'
                              }`}
                              value={zip_code}
                              name='zip_code'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>Enter zip</div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom03'>TimeZone</Label>

                            <select
                              value={fk_timezone_id}
                              onChange={(event) => this.changeHandeler(event)}
                              className={`form-control ${
                                fk_timezone_id ? '' : 'is-invalid'
                              }`}
                              name='fk_timezone_id'
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
                            <div className='invalid-feedback'>
                              Enter TimeZone
                            </div>
                          </FormGroup>
                        </Col>
                        {user_type == 1 && 
                          <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom03'>Mobile Phone Number</Label>

                            <input
                              className={`form-control ${
                                cell ? '' : 'is-invalid'
                              }`}
                              value={cell}
                              name='cell'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Phone
                            </div>
                          </FormGroup>
                        </Col>
                        }
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
                        {/* <Col lg="3">
                          <FormGroup>
                          <ReCAPTCHA
                            sitekey={GOOGLE_SITE_KEY}
                            onChange={(value) => this.setState({captchaValue: value})}
                          />
                          </FormGroup>
                        </Col> */}
                      </Row>
                      <Button color='primary' type='submit'>
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
  const { account, loading } = state.ManageAccount;
  const { countries } = state.Country;
  const { states } = state.State;
  const { timeZones } = state.TimeZone;
  const {defaultProfiles} = state.DefaultProfile;

  return { account, countries, states, timeZones, loading, defaultProfiles };
};

export default withRouter(
  connect(mapStatetoProps, {
    setAccount,
    editAccount,
    emptyAccount,
    updateAccount
  })(ClientAdd)
);
