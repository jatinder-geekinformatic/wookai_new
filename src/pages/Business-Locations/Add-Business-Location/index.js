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
  setBusinessLocation,
  addBusinessLocation,
  editBusinessLocation,
  emptyBusinessLocation,
  updateBusinessLocation,
  getUsers
} from '../../../store/actions';
import Breadcrumbs from '../../../components/Common/Breadcrumb';

class BusinessLocationAdd extends React.Component {
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
    this.props.getUsers();

    const route = this.props.location.pathname;
    let arr = route.split('/');
    let id = arr[3];
    if (id !== undefined) {
      this.props.editBusinessLocation(id);
      this.setState({
        id,
      });
    }
  }

  /**
   * component Will Unmount
   */
  componentWillUnmount() {
    this.props.emptyBusinessLocation();
  }

  /**
   * submit handle
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      businessLocation: {
        business_name,
        business_address,
        business_country_id,
        business_state_id,
        business_state,
        business_city,
        business_zip_code,
        par_levels_enabled,
        assigned_to,
        is_slave,
      },
    } = this.props;

    const { id } = this.state;

    if (
      !business_name ||
      !business_address ||
      !business_country_id ||
      !business_city ||
      !business_zip_code ||
      !par_levels_enabled 
    ) {
      errorToaster('Please fill required fields', 'Error')
      return false;
    }

    
    if (!id &&
      !assigned_to
    ) {
      errorToaster('Please fill required fields', 'Error')
      return false;
    }

    if (business_country_id == 244 &&
      !business_state_id
    ) {
      errorToaster('Please fill required fields', 'Error')
      return false;
    }

    if (business_country_id != 244 &&
      !business_state
    ) {
      errorToaster('Please fill required fields', 'Error')
      return false;
    }

    if (id) this.props.updateBusinessLocation(id);
    else this.props.addBusinessLocation(this.props.history);
  };

  //Form Input onChange
  changeHandeler = (event) => {
    this.props.setBusinessLocation({
      field: event.target.name,
      value: event.target.value,
    });
  };

  // slave checkbox change
  slaveCheck = (event) => {
    const {businessLocation: {is_slave}} = this.props;

    this.props.setBusinessLocation({
      field: event.target.name,
      value: is_slave == 1 ? 0 : 1,
    });
  }

  /**
   * render component
   */
  render() {
    const {
      countries,
      states,
      users,
      businessLocation: {
        business_name,
        business_address,
        business_country_id,
        business_state_id,
        business_state,
        business_city,
        business_zip_code,
        par_levels_enabled,
        assigned_to,
        is_slave,
      },
    } = this.props;


    const {id} = this.state;

    return (
      <React.Fragment>
        <div className='page-content'>
          <Container fluid={true}>
            <Breadcrumbs title='Business Locations' breadcrumbItem='Add' />
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
                              Name of Business
                            </Label>
                            <input
                              className={`form-control ${
                                business_name ? '' : 'is-invalid'
                              }`}
                              value={business_name}
                              name='business_name'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter business name
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='8'>
                          <FormGroup>
                            <Label htmlFor='validationCustom02'>Address</Label>
                            <input
                              className={`form-control ${
                                business_address ? '' : 'is-invalid'
                              }`}
                              value={business_address}
                              name='business_address'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Address
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom03'>Country</Label>
                            <select
                              value={business_country_id}
                              onChange={(event) => this.changeHandeler(event)}
                              className={`form-control ${
                                business_country_id ? '' : 'is-invalid'
                              }`}
                              name='business_country_id'
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
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom04'>State</Label>
                            {business_country_id == 244 && (
                              <select
                                value={business_state_id}
                                onChange={(event) => this.changeHandeler(event)}
                                className={`form-control ${
                                  business_state_id ? '' : 'is-invalid'
                                }`}
                                name='business_state_id'
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
                            {business_country_id != 244 && (
                              <input
                                className={`form-control ${
                                  business_state ? '' : 'is-invalid'
                                }`}
                                value={business_state}
                                name='business_state'
                                type='text'
                                onChange={(event) => this.changeHandeler(event)}
                              />
                            )}
                            <div className='invalid-feedback'>Select State</div>
                          </FormGroup>
                        </Col>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom04'>City</Label>
                            <input
                              className={`form-control ${
                                business_city ? '' : 'is-invalid'
                              }`}
                              value={business_city}
                              name='business_city'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>Enter City</div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom03'>Zip</Label>
                            <input
                              className={`form-control ${
                                business_zip_code ? '' : 'is-invalid'
                              }`}
                              value={business_zip_code}
                              name='business_zip_code'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>Enter Zip</div>
                          </FormGroup>
                        </Col>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom04'>
                              PAR Levels
                            </Label>
                            <select
                              value={par_levels_enabled}
                              onChange={(event) => this.changeHandeler(event)}
                              className={`form-control ${
                                par_levels_enabled ? '' : 'is-invalid'
                              }`}
                              name='par_levels_enabled'
                            >
                              <option disabled value="">
                                --select--
                              </option>
                              <option value='1'>Enable</option>
                              <option value='0'>Disable</option>
                            </select>
                            <div className='invalid-feedback'>
                              Select Par levels
                            </div>
                          </FormGroup>
                        </Col>
                        { !id &&
                           <Col md='4'>
                           <FormGroup>
                             <Label htmlFor='validationCustom04'>
                               Assigned To
                             </Label>
                             <select
                               value={assigned_to}
                               onChange={(event) => this.changeHandeler(event)}
                               className={`form-control ${
                                 assigned_to ? '' : 'is-invalid'
                               }`}
                               name='assigned_to'
                             >
                               <option disabled value="">
                                 --select--
                               </option>
                               {users.map((user, userIndex) => {
                                 return (
                                   <option key={userIndex} value={user.id}>
                                     {user.full_name} {user.user_type}
                                   </option>
                                 );
                               })}
                             </select>
                             <div className='invalid-feedback'>Select User</div>
                           </FormGroup>
                         </Col>
                        }
                      </Row>
                      <Row>
                        <Col md='4'>
                          <FormGroup>
                            <div className='custom-control custom-checkbox mb-3'>
                              <input
                                className='custom-control-input form-control'
                                value={is_slave}
                                checked={is_slave}
                                name='is_slave'
                                type='checkbox'
                                id='customCheck2'
                                onChange={(event) => this.slaveCheck(event)}
                              />
                              <label
                                className='custom-control-label'
                                htmlFor='customCheck2'
                              >
                                This is subsidiary business location.
                              </label>
                            </div>
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
  const { businessLocation, loading } = state.BusinessLocation;
  const { countries } = state.Country;
  const { states } = state.State;
  const {users} = state.User
  return { businessLocation, countries, states, loading, users };
};

export default withRouter(
  connect(mapStatetoProps, {
    setBusinessLocation,
    addBusinessLocation,
    editBusinessLocation,
    emptyBusinessLocation,
    updateBusinessLocation,
    getUsers
  })(BusinessLocationAdd)
);
