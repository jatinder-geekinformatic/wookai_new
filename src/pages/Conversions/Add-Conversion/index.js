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
  setConversion,
  addConversion,
  editConversion,
  emptyConversion,
  updateConversion,
  getUnitsList
} from '../../../store/actions';
import Breadcrumbs from '../../../components/Common/Breadcrumb';

class ConversionAdd extends React.Component {
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
    this.props.getUnitsList();
    const route = this.props.location.pathname;
    let arr = route.split('/');
    let id = arr[3];
    if (id !== undefined) {
      this.props.editConversion(id);
      this.setState({
        id,
      });
    }
  }

  /**
   * component Will Unmount
   */
  componentWillUnmount() {
    this.props.emptyConversion();
  }

  /**
   * handle submit
   */
  handleSubmit = (e) => {
    e.persist();
    const {
      conversion: { fk_unit_id1, fk_unit_id2, value },
    } = this.props;

    const { id } = this.state;

    if (!fk_unit_id1 || !fk_unit_id2
      ||!value
      ) {
      errorToaster('Please fill required fields', 'Error')
      return false;
    }

    if (id) this.props.updateConversion(this.props.history, id);
    else this.props.addConversion(this.props.history);
  };

  //Form Input onChange
  changeHandeler = (event) => {
    this.props.setConversion({
      field: event.target.name,
      value: event.target.value,
    });
  };

  /**
   * render component
   */
  render() {
    const {
      unitsList,
      conversion: { fk_unit_id1, fk_unit_id2, value},
    } = this.props;

    return (
      <React.Fragment>
        <div className='page-content'>
          <Container fluid={true}>
            <Breadcrumbs title='Conversions' breadcrumbItem='Add' />
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
                        <Col md='4' sm='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom01'>
                              Unit
                            </Label>
                            <select
                              className={`form-control ${
                                fk_unit_id1 ? '' : 'is-invalid'
                              }`}
                              value={fk_unit_id1 ? fk_unit_id1 : ''}
                              name="fk_unit_id1"
                              onChange={(e) => this.changeHandeler(e)}
                            >
                              <option disabled value="">
                                --select--
                              </option>
                              {unitsList.map(
                                (unit, unitKey) => {
                                  return (
                                    <option
                                      key={unitKey}
                                      value={
                                        unit.id
                                      }
                                    >
                                      {
                                        unit.unit_name
                                      }{" "}
                                      (
                                      {
                                        unit.unit_abbreviation
                                      }
                                      )
                                    </option>
                                  );
                                }
                              )}
                            </select>
                            <div className='invalid-feedback'>
                              Select Unit
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='4' sm='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom01'>
                              Value
                            </Label>
                            <input
                              className={`form-control ${
                                value ? '' : 'is-invalid'
                              }`}
                              value={value}
                              name='value'
                              type='number'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Value
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='4' sm='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom01'>
                              Unit
                            </Label>
                            <select
                              className={`form-control ${
                                fk_unit_id2 ? '' : 'is-invalid'
                              }`}
                              value={fk_unit_id2 ? fk_unit_id2 : ''}
                              name="fk_unit_id2"
                              onChange={(e) => this.changeHandeler(e)}
                            >
                              <option disabled value="">
                                --select--
                              </option>
                              {unitsList.map(
                                (unit, unitKey) => {
                                  return (
                                    <option
                                      key={unitKey}
                                      value={
                                        unit.id
                                      }
                                    >
                                      {
                                        unit.unit_name
                                      }{" "}
                                      (
                                      {
                                        unit.unit_abbreviation
                                      }
                                      )
                                    </option>
                                  );
                                }
                              )}
                            </select>
                            
                            <div className='invalid-feedback'>
                              Select Unit
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
  const { conversion, loading } = state.Conversion;
  const { unitsList } = state.Unit;
  return { conversion, loading, unitsList };
};

export default withRouter(
  connect(mapStatetoProps, {
    setConversion,
    addConversion,
    editConversion,
    emptyConversion,
    updateConversion,
    getUnitsList
  })(ConversionAdd)
);
