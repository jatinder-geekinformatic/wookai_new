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
  FormGroup,
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
  getDefaultProfiles,
  editDefaultProfile,
  deleteDefaultProfile,
  setDefaultProfileFilter,
} from '../../store/actions';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Loader from '../../components/Common/Loader';
import CustomPagination from '../../components/Common/Pagination';

class DefaultProfiles extends React.Component {
  /**
   * Component Did mount
   */
  componentDidMount() {
    this.props.getDefaultProfiles();
  }

  /**
   * pagination Handle click
   */
  PaginationHandleClick = (offSet, page) => {
    console.log(offSet);
    console.log(page);
    console.log(this.props);

    this.props.setDefaultProfileFilter({
      field: 'currentPage',
      value: page,
    });

    this.props.setDefaultProfileFilter({
      field: 'offSet',
      value: offSet,
    });

    this.props.getDefaultProfiles();
  };

  /**
   * Renders component
   */
  render() {
    const {
      defaultProfiles,
      filter: { offSet, limit, pages, currentPage, query },
      loading,
    } = this.props;
    return (
      <React.Fragment>
        <div className='page-content'>
          <div className='container-fluid'>
            <Breadcrumbs title='Default Profiles' breadcrumbItem='List' />
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
                              this.props.setDefaultProfileFilter({
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
                            onClick={() => this.props.getDefaultProfiles()}
                            color='primary'
                            className='btn btn-primary waves-effect'
                          >
                            Search
                          </Button>
                        </FormGroup>
                      </Col>
                      {/* <Col md='5'>
                        <FormGroup className='float-right'>
                          <Link to={`/cannedEmails/add`}>
                            <Button
                              color='primary'
                              className='btn btn-primary waves-effect'
                            >
                              Add New
                            </Button>
                          </Link>
                        </FormGroup>
                      </Col> */}
                    </Row>
                    <div className='table-responsive'>
                      <Table className='table table-striped mb-0 table'>
                        <thead>
                          <tr>
                            <th>Profile Name</th>
                            <th>User Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {defaultProfiles.length > 0 &&
                            !loading &&
                            defaultProfiles.map((defaultProfile, i) => {
                              return (
                                <tr key={i}>
                                  <td>{defaultProfile.business_name}</td>
                                  <td>{defaultProfile.fk_user_id}</td>

                                  <td>
                                    <div className='button-items'>
                                      {/* <Link
                                        to={`/defaultProfiles/edit/${defaultProfile.id}`}
                                      >
                                        <Button
                                          color='secondary'
                                          className='btn btn-secondary waves-effect'
                                        >
                                          Edit
                                        </Button>
                                      </Link> */}

                                      <Button
                                        color='danger'
                                        className='btn btn-danger waves-effect waves-light'
                                        onClick={() => {
                                          if (
                                            window.confirm(
                                              'Are you sure to delete the item?'
                                            )
                                          ) {
                                            this.props.deleteDefaultProfile(
                                              defaultProfile.id
                                            );
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
                    {defaultProfiles.length > 0 && (
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
  const { defaultProfiles, filter, loading } = state.DefaultProfile;
  return { defaultProfiles, filter, loading };
};

export default withRouter(
  connect(mapStatetoProps, {
    getDefaultProfiles,
    deleteDefaultProfile,
    editDefaultProfile,
    setDefaultProfileFilter,
  })(DefaultProfiles)
);
