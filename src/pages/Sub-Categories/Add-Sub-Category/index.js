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
  setSubCategory,
  addSubCategory,
  editSubCategory,
  emptySubCategory,
  updateSubCategory,
  getCategories
} from '../../../store/actions';
import Breadcrumbs from '../../../components/Common/Breadcrumb';

class SubCategoryAdd extends React.Component {
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
    this.props.getCategories();

    const route = this.props.location.pathname;
    let arr = route.split('/');
    let id = arr[3];
    if (id !== undefined) {
      this.props.editSubCategory(id);
      this.setState({
        id,
      });
    }
  }

  /**
   * component Will Unmount
   */
  componentWillUnmount() {
    this.props.emptySubCategory();
  }

  /**
   * handle submit
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      subCategory: { category_name, parent_id },
    } = this.props;

    const { id } = this.state;

    if (!category_name || !parent_id) {
      errorToaster('Please fill required fields', 'Error')
      return false;
    }

    if (id) this.props.updateSubCategory(id);
    else this.props.addSubCategory();
  };

  //Form Input onChange
  changeHandeler = (event) => {
    this.props.setSubCategory({
      field: event.target.name,
      value: event.target.value,
    });
  };

  /**
   * render component
   */
  render() {
    const {
      categories,
      subCategory: { category_name, parent_id },
    } = this.props;

    return (
      <React.Fragment>
        <div className='page-content'>
          <Container fluid={true}>
            <Breadcrumbs title='Sub Categories' breadcrumbItem='Add' />
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
                            <Label htmlFor='validationCustom03'>Country</Label>

                            <select
                              value={parent_id}
                              onChange={(event) => this.changeHandeler(event)}
                              className={`form-control ${
                                parent_id ? '' : 'is-invalid'
                              }`}
                              name='parent_id'
                            >
                               <option disabled value="">
                                --select--
                              </option>
                              {categories.length > 0 && categories.map((category, i) => {
                                return(
                                <option key={i} value={category.id}>{category.category_name}</option>
                                );
                              })};
                            </select>
                            <div className='invalid-feedback'>
                              Select Parent Category
                            </div>
                          </FormGroup>
                        </Col>

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
  const { subCategory,loading } = state.SubCategory;
  const { categories } = state.Category;

  return { subCategory, loading, categories };
};

export default withRouter(
  connect(mapStatetoProps, {
    setSubCategory,
    addSubCategory,
    editSubCategory,
    emptySubCategory,
    updateSubCategory,
    getCategories
  })(SubCategoryAdd)
);
