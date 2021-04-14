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
  setVideo,
  addVideo,
  editVideo,
  emptyVideo,
  updateVideo,
} from '../../../store/actions';
import Breadcrumbs from '../../../components/Common/Breadcrumb';

class UserAdd extends React.Component {
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
      this.props.editVideo(id);
      this.setState({
        id,
      });
    }
  }

  /**
   * component Will Unmount
   */
  componentWillUnmount() {
    this.props.emptyVideo();
  }

  /**
   * submit handle
   */

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      video: { desc, video_url },
    } = this.props;

    const { id } = this.state;

    if (!desc || !video_url) {
      errorToaster('Please fill required fields', 'Error')
      return false;
    }

    if (id) this.props.updateVideo(id);
    else this.props.addVideo();
  };

  //Form Input onChange
  changeHandeler = (event) => {
    this.props.setVideo({
      field: event.target.name,
      value: event.target.value,
    });
  };

  /**
   * render component
   */
  render() {
    const {
      video: { desc, video_url },
    } = this.props;

    return (
      <React.Fragment>
        <div className='page-content'>
          <Container fluid={true}>
            <Breadcrumbs title='Videos' breadcrumbItem='Add' />
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
                              Video Desc
                            </Label>
                            <input
                              className={`form-control ${
                                desc ? '' : 'is-invalid'
                              }`}
                              value={desc}
                              name='desc'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Video desc
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='6'>
                          <FormGroup>
                            <Label htmlFor='validationCustom02'>
                              Video URL
                            </Label>
                            <input
                              className={`form-control ${
                                video_url ? '' : 'is-invalid'
                              }`}
                              value={video_url}
                              name='video_url'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Video URL
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
  const { video, loading } = state.Video;
  return { video, loading };
};

export default withRouter(
  connect(mapStatetoProps, {
    setVideo,
    addVideo,
    editVideo,
    emptyVideo,
    updateVideo,
  })(UserAdd)
);
