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
  setAdmin,
  addAdmin,
  editAdmin,
  emptyAdmin,
  updateAdmin,
} from '../../../store/actions';
import Breadcrumbs from '../../../components/Common/Breadcrumb';

class AdminAdd extends React.Component {
  /**
   * component state
   */
  state = {
    id: '',
  };

  /**
   * Component Did Mount
   */
  componentDidMount() {
    const route = this.props.location.pathname;
    let arr = route.split('/');
    let id = arr[3];
    if (id !== undefined) {
      this.props.editAdmin(id);
      this.setState({
        id,
      });
    }
  }

  /**
   * component Will Unmount
   */
  componentWillUnmount() {
    this.props.emptyAdmin();
  }

  /**
   * submit handle
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      admin: {
        email,
        password,
        full_name,
        business_main_number,
        address,
        city,
        fk_state_id,
        state,
        zip_code,
        fk_country_id,
        fk_timezone_id,
        website,
        user_type,
        default_profile_id,
      },
    } = this.props;

    const { id } = this.state;

    if (
      !email ||
      !password ||
      !full_name ||
      !address ||
      !city ||
      !fk_state_id ||
      !zip_code ||
      !fk_country_id ||
      !business_main_number
    ) {
      errorToaster('Please fill required fields', 'Error')
      return false;
    }

    if (id) this.props.updateAdmin(this.props.history, id);
    else this.props.addAdmin(this.props.history);
  };

  //Form Input onChange
  changeHandeler = (event) => {
    this.props.setAdmin({
      field: event.target.name,
      value: event.target.value,
    });
  };

  /**
   * render component
   */
  render() {
    const {
      admin: {
        email,
        password,
        full_name,
        business_main_number,
        address,
        city,
        fk_state_id,
        state,
        zip_code,
        fk_country_id,
      },
    } = this.props;

    return (
      <React.Fragment>
        <div className='page-content'>
          <Container fluid={true}>
            <Breadcrumbs title='Users' breadcrumbItem='Add' />
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
                            <input
                              className={`form-control ${
                                fk_country_id ? '' : 'is-invalid'
                              }`}
                              value={fk_country_id}
                              name='fk_country_id'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Country
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='3'>
                          <FormGroup>
                            <Label htmlFor='validationCustom04'>State</Label>
                            <input
                              className={`form-control ${
                                fk_state_id ? '' : 'is-invalid'
                              }`}
                              value={fk_state_id}
                              name='fk_state_id'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
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
                            <Label htmlFor='validationCustom03'>Phone</Label>
                            <input
                              className={`form-control ${
                                business_main_number ? '' : 'is-invalid'
                              }`}
                              value={business_main_number}
                              name='business_main_number'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>Enter Phone</div>
                          </FormGroup>
                        </Col>
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
  const { admin, loading } = state.Admin;
  return { admin, loading };
};

export default withRouter(
  connect(mapStatetoProps, {
    setAdmin,
    addAdmin,
    editAdmin,
    emptyAdmin,
    updateAdmin,
  })(AdminAdd)
);
