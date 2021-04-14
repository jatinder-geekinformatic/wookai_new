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
  getBusinessLocations,
  editBusinessLocation,
  deleteBusinessLocation,
  setBusinessLocationFilter,
} from '../../../store/actions';
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import Loader from '../../../components/Common/Loader';
import CustomPagination from '../../../components/Common/Pagination';
import {successToaster} from '../../../components/Common/Toaster';

class SelectBusinessLocation extends React.Component {
  /**
   * component state
   */
  state = {
    id: '',
  };

  /**
   * Component Did mount
   */
  componentDidMount() {
    this.props.getBusinessLocations();
    const seletedBusinessLocation = localStorage.getItem('businessLocation');
    if (seletedBusinessLocation != undefined) {
      this.setState({
        id: seletedBusinessLocation,
      });
    }
  }

  /**
   * pagination Handle click
   */
  PaginationHandleClick = (offSet, page) => {
    console.log(offSet);
    console.log(page);
    console.log(this.props);

    this.props.setBusinessLocationFilter({
      field: 'currentPage',
      value: page,
    });

    this.props.setBusinessLocationFilter({
      field: 'offSet',
      value: offSet,
    });

    this.props.getBusinessLocations();
  };

  /**
   * set business location in local storage
   */
  changeBusinessLocation = (value) => {
    const { id } = this.state;
    
    if (id == '') {
      alert('Select Business Lcoation');
      return false;
    }

    localStorage.setItem('businessLocation', id);
    this.props.history.push('/dashboard');
    successToaster('Location selected successfully', 'Success');
  };

  /**
   * Renders component
   */
  render() {
    const {
      businessLocations,
      filter: { offSet, limit, pages, currentPage, query },
      loading,
    } = this.props;

    const { id } = this.state;

    return (
      <React.Fragment>
        <div className='page-content'>
          <div className='container-fluid'>
            <Breadcrumbs
              title='Business Locations'
              breadcrumbItem='Select Business Location'
            />
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
                              this.props.setBusinessLocationFilter({
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
                            onClick={() => this.props.getBusinessLocations()}
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
                            <th>Select</th>
                            <th>Business Location</th>
                          </tr>
                        </thead>
                        <tbody>
                          {businessLocations.length > 0 &&
                            !loading &&
                            businessLocations.map((businessLocation, i) => {
                              return (
                                <tr key={i}>
                                  <td>
                                    <Col md='2'>
                                      <FormGroup>
                                        <input
                                          className='form-control'
                                          value={businessLocation.id}
                                          name='location'
                                          type='radio'
                                          checked={businessLocation.id == id}
                                          onChange={(event) =>
                                            this.setState({
                                              id: event.target.value,
                                            })
                                          }
                                        />
                                      </FormGroup>
                                    </Col>
                                  </td>
                                  <td>{businessLocation.business_name}</td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table>
                    </div>
                    <Col md='12'>
                      <FormGroup className='float-right'>
                        <Button
                          onClick={() => this.changeBusinessLocation()}
                          color='primary'
                          className='btn btn-primary waves-effect'
                        >
                          Manage
                        </Button>
                      </FormGroup>
                    </Col>

                    {/* {businessLocations.length > 0 && (
                      <FormGroup className='float-right'>
                        <CustomPagination
                          offSet={offSet}
                          limit={limit}
                          pages={pages}
                          currentPage={currentPage}
                          PaginationHandleClick={this.PaginationHandleClick}
                        />
                      </FormGroup>
                    )} */}
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
  const { businessLocations, filter, loading } = state.BusinessLocation;
  return { businessLocations, filter, loading };
};

export default withRouter(
  connect(mapStatetoProps, {
    getBusinessLocations,
    deleteBusinessLocation,
    editBusinessLocation,
    setBusinessLocationFilter,
  })(SelectBusinessLocation)
);
