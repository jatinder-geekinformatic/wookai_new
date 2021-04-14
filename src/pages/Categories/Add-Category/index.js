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
  setCategory,
  addCategory,
  editCategory,
  emptyCategory,
  updateCategory,
} from '../../../store/actions';
import Breadcrumbs from '../../../components/Common/Breadcrumb';

class CategoryAdd extends React.Component {
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
      this.props.editCategory(id);
      this.setState({
        id,
      });
    }
  }

  /**
   * component Will Unmount
   */
  componentWillUnmount() {
    this.props.emptyCategory();
  }

  /**
   * handle submit
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      category: { category_name },
    } = this.props;

    const { id } = this.state;

    if (!category_name) {
      errorToaster('Please fill required fields', 'Error')
      return false;
    }

    if (id) this.props.updateCategory(id);
    else this.props.addCategory();
  };

  //Form Input onChange
  changeHandeler = (event) => {
    this.props.setCategory({
      field: event.target.name,
      value: event.target.value,
    });
  };

  /**
   * render component
   */
  render() {
    const {
      category: { category_name },
    } = this.props;

    return (
      <React.Fragment>
        <div className='page-content'>
          <Container fluid={true}>
            <Breadcrumbs title='Categories' breadcrumbItem='Add' />
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
                              Category Name
                            </Label>
                            <input
                              className={`form-control ${
                                category_name ? '' : 'is-invalid'
                              }`}
                              value={category_name}
                              name='category_name'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Category name
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
  const { category, loading } = state.Category;
  return { category, loading };
};

export default withRouter(
  connect(mapStatetoProps, {
    setCategory,
    addCategory,
    editCategory,
    emptyCategory,
    updateCategory,
  })(CategoryAdd)
);
