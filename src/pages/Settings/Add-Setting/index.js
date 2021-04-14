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

import { setSetting, editSetting, updateSetting } from '../../../store/actions';
import Breadcrumbs from '../../../components/Common/Breadcrumb';

class SettingAdd extends React.Component {
  /**
   * component state
   */
  state = {
    id: 1,
  };

  /**
   * Component Did Mount
   */
  componentDidMount() {
    const { id } = this.state;
    this.props.editSetting(id);
    this.setState({
      id,
    });
  }

  /**
   * handle submit
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      setting: {
        contact_form_to_email,
        cheddar_getter_email,
        cheddar_getter_password,
        cheddar_getter_product,
        cheddar_getter_host,
        cheddar_getter_secret_key,
        leaddyno_secret_key,
      },
    } = this.props;

    const { id } = this.state;

    if (
      !contact_form_to_email ||
      !cheddar_getter_email ||
      !cheddar_getter_password ||
      !cheddar_getter_product ||
      !cheddar_getter_host ||
      !cheddar_getter_secret_key ||
      !leaddyno_secret_key
    ) {
      errorToaster('Please fill required fields', 'Error')
      return false;
    }

    this.props.updateSetting(id);
  };

  //Form Input onChange
  changeHandeler = (event) => {
    this.props.setSetting({
      field: event.target.name,
      value: event.target.value,
    });
  };

  /**
   * render component
   */
  render() {
    const {
      setting: {
        contact_form_to_email,
        cheddar_getter_email,
        cheddar_getter_password,
        cheddar_getter_product,
        cheddar_getter_host,
        cheddar_getter_secret_key,
        leaddyno_secret_key,
      },
    } = this.props;

    return (
      <React.Fragment>
        <div className='page-content'>
          <Container fluid={true}>
            <Breadcrumbs title='Settings' breadcrumbItem='Add' />
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
                              Send Contact Form to
                            </Label>
                            <input
                              className={`form-control ${
                                contact_form_to_email ? '' : 'is-invalid'
                              }`}
                              value={contact_form_to_email}
                              name='contact_form_to_email'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter contact form email
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom02'>
                              Cheddar Getter Email
                            </Label>
                            <input
                              className={`form-control ${
                                cheddar_getter_email ? '' : 'is-invalid'
                              }`}
                              value={cheddar_getter_email}
                              name='cheddar_getter_email'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Cheddar Getter Email
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom02'>
                              Cheddar Getter Password
                            </Label>
                            <input
                              className={`form-control ${
                                cheddar_getter_password ? '' : 'is-invalid'
                              }`}
                              value={cheddar_getter_password}
                              name='cheddar_getter_password'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Cheddar Getter Password
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md='3'>
                          <FormGroup>
                            <Label htmlFor='validationCustom01'>
                              Cheddar Getter Product
                            </Label>
                            <input
                              className={`form-control ${
                                cheddar_getter_product ? '' : 'is-invalid'
                              }`}
                              value={cheddar_getter_product}
                              name='cheddar_getter_product'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Cheddar Getter Product
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='3'>
                          <FormGroup>
                            <Label htmlFor='validationCustom02'>
                              Cheddar Getter Host
                            </Label>
                            <input
                              className={`form-control ${
                                cheddar_getter_host ? '' : 'is-invalid'
                              }`}
                              value={cheddar_getter_host}
                              name='cheddar_getter_host'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Cheddar Getter Host
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='3'>
                          <FormGroup>
                            <Label htmlFor='validationCustom02'>
                              Cheddar Getter Secret Key
                            </Label>
                            <input
                              className={`form-control ${
                                cheddar_getter_secret_key ? '' : 'is-invalid'
                              }`}
                              value={cheddar_getter_secret_key}
                              name='cheddar_getter_secret_key'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Cheddar Getter Secret Key
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='3'>
                          <FormGroup>
                            <Label htmlFor='validationCustom02'>
                              Leaddyno Secret Key
                            </Label>
                            <input
                              className={`form-control ${
                                leaddyno_secret_key ? '' : 'is-invalid'
                              }`}
                              value={leaddyno_secret_key}
                              name='leaddyno_secret_key'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Leaddyno Secret Key
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
  const { setting, loading } = state.Setting;
  return { setting, loading };
};

export default withRouter(
  connect(mapStatetoProps, {
    setSetting,
    editSetting,
    updateSetting,
  })(SettingAdd)
);
