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
  getBusinessProfiles,
  editBusinessProfile,
  deleteBusinessProfile,
  setBusinessProfileFilter,
} from '../../store/actions';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Loader from '../../components/Common/Loader';
import CustomPagination from '../../components/Common/Pagination';

class BusinessProfiles extends React.Component {
  /**
   * Component Did mount
   */
  componentDidMount() {
    this.props.getBusinessProfiles();
  }

  /**
   * pagination Handle click
   */
  PaginationHandleClick = (offSet, page) => {
    console.log(offSet);
    console.log(page);
    console.log(this.props);

    this.props.setBusinessProfileFilter({
      field: 'currentPage',
      value: page,
    });

    this.props.setBusinessProfileFilter({
      field: 'offSet',
      value: offSet,
    });

    this.props.getBusinessProfiles();
  };

  /**
   * Renders component
   */
  render() {
    const {
      businessProfiles,
      filter: { offSet, limit, pages, currentPage, query },
      loading,
    } = this.props;
    return (
      <React.Fragment>
        <div className='page-content'>
          <div className='container-fluid'>
            <Breadcrumbs title='Business Profiles' breadcrumbItem='List' />
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
                              this.props.setBusinessProfileFilter({
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
                            onClick={() => this.props.getBusinessProfiles()}
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
                          {businessProfiles.length > 0 &&
                            !loading &&
                            businessProfiles.map((businessProfile, i) => {
                              return (
                                <tr key={i}>
                                  <td>{businessProfile.business_name}</td>
                                  <td>{businessProfile.fk_user_id}</td>

                                  <td>
                                    <div className='button-items'>
                                      {businessProfile.is_slave === 1 &&
                                         <Link
                                         to={`/businessProfiles/edit/${businessProfile.id}`}
                                       >
                                         <Button disabled
                                           color='info'
                                           className='btn btn-info waves-effect'
                                         >
                                           Subsidiary
                                         </Button>
                                       </Link>
                                      }

                                      {businessProfile.demo_profile === 1 && businessProfile.fk_user_id !== 1 &&
                                         <Link
                                         to={`/businessProfiles/edit/${businessProfile.id}`}
                                       >
                                         <Button disabled
                                           color='warning'
                                           className='btn btn-warning waves-effect'
                                         >
                                           Already Set Default
                                         </Button>
                                       </Link>
                                      }

                                    {businessProfile.demo_profile === 1 && businessProfile.fk_user_id === 1 &&
                                         <Link
                                         to={`/businessProfiles/edit/${businessProfile.id}`}
                                       >
                                         <Button disabled
                                           color='success'
                                           className='btn btn-success waves-effect'
                                         >
                                           Default Profile
                                         </Button>
                                       </Link>
                                      }


                                      {businessProfile.is_slave !== 1 && businessProfile.demo_profile !== 1 &&
                                         <Link
                                         to={`/businessProfiles/edit/${businessProfile.id}`}
                                       >
                                         <Button
                                           color='danger'
                                           className='btn btn-danger waves-effect'
                                         >
                                           Set As Default
                                         </Button>
                                       </Link>
                                      }
                                     

                                      <Button
                                        color='danger'
                                        className='btn btn-danger waves-effect waves-light'
                                        onClick={() => {
                                          if (
                                            window.confirm(
                                              'Are you sure to delete the item?'
                                            )
                                          ) {
                                            this.props.deleteBusinessProfile(
                                              businessProfile.id
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
                    {businessProfiles.length > 0 && (
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
  const { businessProfiles, filter, loading } = state.BusinessProfile;
  return { businessProfiles, filter, loading };
};

export default withRouter(
  connect(mapStatetoProps, {
    getBusinessProfiles,
    deleteBusinessProfile,
    editBusinessProfile,
    setBusinessProfileFilter,
  })(BusinessProfiles)
);
