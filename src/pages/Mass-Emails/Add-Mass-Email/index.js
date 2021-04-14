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
  setMassEmail,
  addMassEmail,
  editMassEmail,
  emptyMassEmail,
  updateMassEmail,
} from '../../../store/actions';
import Breadcrumbs from '../../../components/Common/Breadcrumb';

class MassEmailAdd extends React.Component {
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
      this.props.editMassEmail(id);
      this.setState({
        id,
      });
    }
  }

  /**
   * component Will Unmount
   */
  componentWillUnmount() {
    this.props.emptyMassEmail();
  }

  /**
   * submit handle
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      massEmail: {
        email_name,
        from_name,
        content,
        from_email,
        subject,
        hourly_total,
        user_type,
      },
    } = this.props;

    const { id } = this.state;

    if (
      !email_name ||
      !from_name ||
      !content ||
      !from_email ||
      !subject ||
      !hourly_total ||
      !user_type
    ) {
      errorToaster('Please fill required fields', 'Error')
      return false;
    }

    if (id) this.props.updateMassEmail(id);
    else this.props.addMassEmail();
  };

  //Form Input onChange
  changeHandeler = (event) => {
    this.props.setMassEmail({
      field: event.target.name,
      value: event.target.value,
    });
  };

  /**
   * render component
   */
  render() {
    const {
      massEmail: {
        email_name,
        from_name,
        content,
        from_email,
        subject,
        hourly_total,
        user_type,
      },
    } = this.props;

    return (
      <React.Fragment>
        <div className='page-content'>
          <Container fluid={true}>
            <Breadcrumbs title='Add Mass Email' breadcrumbItem='Add' />
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
                              Email title
                            </Label>
                            <input
                              className={`form-control ${
                                email_name ? '' : 'is-invalid'
                              }`}
                              value={email_name}
                              name='email_name'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter email title
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom02'>
                              From name
                            </Label>
                            <input
                              className={`form-control ${
                                from_name ? '' : 'is-invalid'
                              }`}
                              value={from_name}
                              name='from_name'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter from name
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom02'>
                              From Email
                            </Label>
                            <input
                              className={`form-control ${
                                from_email ? '' : 'is-invalid'
                              }`}
                              value={from_email}
                              name='from_email'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter From email
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom03'>Subject</Label>
                            <input
                              className={`form-control ${
                                subject ? '' : 'is-invalid'
                              }`}
                              value={subject}
                              name='subject'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Subject
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='8'>
                          <FormGroup>
                            <Label htmlFor='validationCustom04'>Content</Label>
                            <input
                              className={`form-control ${
                                content ? '' : 'is-invalid'
                              }`}
                              value={content}
                              name='content'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter content
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md='3'>
                          <FormGroup>
                            <Label htmlFor='validationCustom03'>
                              Hourly Emails
                            </Label>
                            <input
                              className={`form-control ${
                                hourly_total ? '' : 'is-invalid'
                              }`}
                              value={hourly_total}
                              name='hourly_total'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Hourly Emails
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='3'>
                          <FormGroup>
                            <Label htmlFor='validationCustom04'>
                              User Type
                            </Label>
                            <input
                              className={`form-control ${
                                user_type ? '' : 'is-invalid'
                              }`}
                              value={user_type}
                              name='user_type'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter User type
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
  const { massEmail, loading } = state.MassEmail;
  return { massEmail, loading };
};

export default withRouter(
  connect(mapStatetoProps, {
    setMassEmail,
    addMassEmail,
    editMassEmail,
    emptyMassEmail,
    updateMassEmail,
  })(MassEmailAdd)
);
