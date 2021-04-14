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
  setCm,
  addCm,
  editCm,
  emptyCm,
  updateCm,
} from '../../../store/actions';
import Breadcrumbs from '../../../components/Common/Breadcrumb';

class CmsAdd extends React.Component {
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
      this.props.editCm(id);
      this.setState({
        id,
      });
    }
  }

  /**
   * component Will Unmount
   */
  componentWillUnmount() {
    this.props.emptyCm();
  }

  /**
   * submit handle
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      cm: {
        heading,
        content,
        page_slug,
        meta_title,
        meta_keyword,
        meta_description,
      },
    } = this.props;

    const { id } = this.state;

    if (
      !heading ||
      !content ||
      !page_slug ||
      !meta_title ||
      !meta_keyword ||
      !meta_description
    ) {
      errorToaster('Please fill required fields', 'Error')
      return false;
    }

    if (id) this.props.updateCm(id);
    else this.props.addCm();
  };

  //Form Input onChange
  changeHandeler = (event) => {
    this.props.setCm({
      field: event.target.name,
      value: event.target.value,
    });
  };

  /**
   * render component
   */
  render() {
    const {
      cm: {
        heading,
        content,
        page_slug,
        meta_title,
        meta_keyword,
        meta_description,
      },
    } = this.props;

    return (
      <React.Fragment>
        <div className='page-content'>
          <Container fluid={true}>
            <Breadcrumbs title='Cms' breadcrumbItem='Add' />
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
                            <Label htmlFor='validationCustom01'>Heading</Label>
                            <input
                              className={`form-control ${
                                heading ? '' : 'is-invalid'
                              }`}
                              value={heading}
                              name='heading'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Heading
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom02'>Content</Label>
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
                              Enter Content
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom02'>
                              Page Slug
                            </Label>
                            <input
                              className={`form-control ${
                                page_slug ? '' : 'is-invalid'
                              }`}
                              value={page_slug}
                              name='page_slug'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>Enter Slug</div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom03'>
                              Meta Title
                            </Label>
                            <input
                              className={`form-control ${
                                meta_title ? '' : 'is-invalid'
                              }`}
                              value={meta_title}
                              name='meta_title'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Meta title
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='8'>
                          <FormGroup>
                            <Label htmlFor='validationCustom04'>
                              Meta Keyword
                            </Label>
                            <input
                              className={`form-control ${
                                meta_keyword ? '' : 'is-invalid'
                              }`}
                              value={meta_keyword}
                              name='meta_keyword'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Meta keyword
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md='3'>
                          <FormGroup>
                            <Label htmlFor='validationCustom03'>
                              Meta Description
                            </Label>
                            <input
                              className={`form-control ${
                                meta_description ? '' : 'is-invalid'
                              }`}
                              value={meta_description}
                              name='meta_description'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Meta Description
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
  const { cm, loading } = state.Cms;
  return { cm, loading };
};

export default withRouter(
  connect(mapStatetoProps, {
    setCm,
    addCm,
    editCm,
    emptyCm,
    updateCm,
  })(CmsAdd)
);
