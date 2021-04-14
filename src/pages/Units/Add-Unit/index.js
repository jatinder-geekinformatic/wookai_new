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
  setUnit,
  addUnit,
  editUnit,
  emptyUnit,
  updateUnit,
} from '../../../store/actions';
import Breadcrumbs from '../../../components/Common/Breadcrumb';

class UnitAdd extends React.Component {
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
      this.props.editUnit(id);
      this.setState({
        id,
      });
    }
  }

  /**
   * component Will Unmount
   */
  componentWillUnmount() {
    this.props.emptyUnit();
  }

  /**
   * handle submit
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      unit: { unit_name, unit_abbreviation },
    } = this.props;

    const { id } = this.state;

    if (!unit_name || !unit_abbreviation) {
      errorToaster('Please fill required fields', 'Error')
      return false;
    }

    if (id) this.props.updateUnit(this.props.history, id);
    else this.props.addUnit(this.props.history);
  };

  //Form Input onChange
  changeHandeler = (event) => {
    this.props.setUnit({
      field: event.target.name,
      value: event.target.value,
    });
  };

  /**
   * render component
   */
  render() {
    const {
      unit: { unit_name, unit_abbreviation },
    } = this.props;

    return (
      <React.Fragment>
        <div className='page-content'>
          <Container fluid={true}>
            <Breadcrumbs title='Units' breadcrumbItem='Add' />
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
                        <Col md='6'>
                          <FormGroup>
                            <Label htmlFor='validationCustom01'>
                              Unit Name
                            </Label>
                            <input
                              className={`form-control ${
                                unit_name ? '' : 'is-invalid'
                              }`}
                              value={unit_name}
                              name='unit_name'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Unit name
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='6'>
                          <FormGroup>
                            <Label htmlFor='validationCustom02'>
                              Unit Abbreviation
                            </Label>
                            <input
                              className={`form-control ${
                                unit_abbreviation ? '' : 'is-invalid'
                              }`}
                              value={unit_abbreviation}
                              name='unit_abbreviation'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Unit abbreviation
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
  const { unit, loading } = state.Unit;
  return { unit, loading };
};

export default withRouter(
  connect(mapStatetoProps, {
    setUnit,
    addUnit,
    editUnit,
    emptyUnit,
    updateUnit,
  })(UnitAdd)
);
