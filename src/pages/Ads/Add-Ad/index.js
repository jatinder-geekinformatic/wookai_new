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

import { setAd, editAd, updateAd } from '../../../store/actions';
import Breadcrumbs from '../../../components/Common/Breadcrumb';

class AdAdd extends React.Component {
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
    this.props.editAd(id);
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
      ad: { bottom, right_side_1, right_side_2, google_analytics },
    } = this.props;

    const { id } = this.state;

    if (!bottom || !right_side_1 || !right_side_2 || !google_analytics) {
      errorToaster('Please fill required fields', 'Error')
      return false;
    }

    this.props.updateAd(id);
  };

  //Form Input onChange
  changeHandeler = (event) => {
    this.props.setAd({
      field: event.target.name,
      value: event.target.value,
    });
  };

  /**
   * render component
   */
  render() {
    const {
      ad: { bottom, right_side_1, right_side_2, google_analytics },
    } = this.props;

    return (
      <React.Fragment>
        <div className='page-content'>
          <Container fluid={true}>
            <Breadcrumbs title='Ads' breadcrumbItem='Add' />
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
                              Bottom Ad
                            </Label>
                            <input
                              className={`form-control ${
                                bottom ? '' : 'is-invalid'
                              }`}
                              value={bottom}
                              name='bottom'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Bottom Ad
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom02'>
                              Rightside Ad 1
                            </Label>
                            <input
                              className={`form-control ${
                                right_side_1 ? '' : 'is-invalid'
                              }`}
                              value={right_side_1}
                              name='right_side_1'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Rightside Ad 1
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom02'>
                              Rightside Ad 2
                            </Label>
                            <input
                              className={`form-control ${
                                right_side_2 ? '' : 'is-invalid'
                              }`}
                              value={right_side_2}
                              name='right_side_2'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Rightside Ad 2
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md='3'>
                          <FormGroup>
                            <Label htmlFor='validationCustom01'>
                              Google Analytics
                            </Label>
                            <input
                              className={`form-control ${
                                google_analytics ? '' : 'is-invalid'
                              }`}
                              value={google_analytics}
                              name='google_analytics'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Google Analytics
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
  const { ad, loading } = state.Ad;
  return { ad, loading };
};

export default withRouter(
  connect(mapStatetoProps, {
    setAd,
    editAd,
    updateAd,
  })(AdAdd)
);
