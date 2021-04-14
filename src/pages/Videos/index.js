import React from 'react';
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Spinner,
  FormGroup,
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
  getVideos,
  editVideo,
  deleteVideo,
  setVideoFilter,
} from '../../store/actions';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Loader from '../../components/Common/Loader';
import CustomPagination from '../../components/Common/Pagination';

class Videos extends React.Component {
  /**
   * Component Did mount
   */
  componentDidMount() {
    this.props.getVideos();
  }

  /**
   * pagination Handle click
   */
  PaginationHandleClick = (offSet, page) => {
    console.log(offSet);
    console.log(page);
    console.log(this.props);

    this.props.setVideoFilter({
      field: 'currentPage',
      value: page,
    });

    this.props.setVideoFilter({
      field: 'offSet',
      value: offSet,
    });

    this.props.getVideos();
  };

  /**
   * Renders component
   */
  render() {
    const {
      videos,
      loading,
      filter: { offSet, limit, pages, currentPage, query },
    } = this.props;

    return (
      <React.Fragment>
        <div className='page-content'>
          <div className='container-fluid'>
            <Breadcrumbs title='Videos' breadcrumbItem='List' />
            {loading && <Loader />}

            <Row>
              <Col md={12}>
                <Card>
                  <CardBody>
                    {/* <CardTitle>Basic example</CardTitle>
                    <CardSubtitle className='mb-3'>
                      For basic styling—light padding and only horizontal
                      dividers—add the base className <code>.table</code> to any
                      <code>&lt;table&gt;</code>.
                    </CardSubtitle> */}

                    <Row>
                      <Col md='3'>
                        <FormGroup>
                          <input
                            className='form-control'
                            value={query}
                            name='query'
                            type='text'
                            onChange={(event) =>
                              this.props.setVideoFilter({
                                field: event.target.name,
                                value: event.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md='4'>
                        <FormGroup>
                          <Button
                            onClick={() => this.props.getVideos()}
                            color='primary'
                            className='btn btn-primary waves-effect'
                          >
                            Search
                          </Button>
                        </FormGroup>
                      </Col>
                      <Col md='5'>
                        <FormGroup className='float-right'>
                          <Link to={`/videos/add`}>
                            <Button
                              color='primary'
                              className='btn btn-primary waves-effect'
                            >
                              Add New
                            </Button>
                          </Link>
                        </FormGroup>
                      </Col>
                    </Row>

                    <div className='table-responsive'>
                      <Table className='table table-striped mb-0 table'>
                        <thead>
                          <tr>
                            <th>Desc</th>
                            <th>Video Url</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {videos.length > 0 &&
                            !loading &&
                            videos.map((video, i) => {
                              return (
                                <tr key={i}>
                                  <td>{video.desc}</td>
                                  <td>{video.video_url}</td>
                                  <td>
                                    <div className='button-items'>
                                      <Link to={`/videos/edit/${video.id}`}>
                                        <Button
                                          color='secondary'
                                          className='btn btn-secondary waves-effect'
                                        >
                                          Edit
                                        </Button>
                                      </Link>

                                      <Button
                                        color='danger'
                                        className='btn btn-danger waves-effect waves-light'
                                        onClick={() => {
                                          if (
                                            window.confirm(
                                              'Are you sure to delete the item?'
                                            )
                                          ) {
                                            this.props.deleteVideo(video.id);
                                          }
                                        }}
                                      >
                                        Delete
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table>
                    </div>
                    {videos.length > 0 && (
                      <FormGroup className='float-right'>
                        <CustomPagination
                          offSet={offSet}
                          limit={limit}
                          pages={pages}
                          currentPage={currentPage}
                          PaginationHandleClick={this.PaginationHandleClick}
                        />
                      </FormGroup>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { videos, loading, filter } = state.Video;
  return { videos, loading, filter };
};

export default withRouter(
  connect(mapStatetoProps, {
    getVideos,
    deleteVideo,
    editVideo,
    setVideoFilter,
  })(Videos)
);
