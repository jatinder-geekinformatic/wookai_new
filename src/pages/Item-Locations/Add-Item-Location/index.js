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
  setItemLocation,
  addItemLocation,
  editItemLocation,
  emptyItemLocation,
  updateItemLocation,
} from '../../../store/actions';
import Breadcrumbs from '../../../components/Common/Breadcrumb';

class ItemLocationAdd extends React.Component {
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
      this.props.editItemLocation(id);
      this.setState({
        id,
      });
    }
  }

  /**
   * component Will Unmount
   */
  componentWillUnmount() {
    this.props.emptyItemLocation();
  }

  /**
   * handle submit
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      itemLocation: { location_name },
    } = this.props;

    const { id } = this.state;

    if (!location_name) {
      errorToaster('Please fill required fields', 'Error')
      return false;
    }

    if (id) this.props.updateItemLocation(id);
    else this.props.addItemLocation();
  };

  //Form Input onChange
  changeHandeler = (event) => {
    this.props.setItemLocation({
      field: event.target.name,
      value: event.target.value,
    });
  };

  /**
   * render component
   */
  render() {
    const {
      itemLocation: { location_name },
    } = this.props;

    return (
      <React.Fragment>
        <div className='page-content'>
          <Container fluid={true}>
            <Breadcrumbs title='Item Locations' breadcrumbItem='Add' />
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
                              Location Name
                            </Label>
                            <input
                              className={`form-control ${
                                location_name ? '' : 'is-invalid'
                              }`}
                              value={location_name}
                              name='location_name'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Location name
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
  const { itemLocation, loading } = state.ItemLocation;
  return { itemLocation, loading };
};

export default withRouter(
  connect(mapStatetoProps, {
    setItemLocation,
    addItemLocation,
    editItemLocation,
    emptyItemLocation,
    updateItemLocation,
  })(ItemLocationAdd)
);
