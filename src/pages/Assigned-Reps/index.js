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
  Label,
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
  getAssignedReps,
  editAssignedRep,
  deleteAssignedRep,
  setAssignedRepFilter,
} from '../../store/actions';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Loader from '../../components/Common/Loader';
import CustomPagination from '../../components/Common/Pagination';

class AssignedReps extends React.Component {
  /**
   * Component Did mount
   */
  componentDidMount() {
    this.props.getAssignedReps();
  }

  /**
   * pagination Handle click
   */
  PaginationHandleClick = (offSet, page) => {
    console.log(offSet);
    console.log(page);
    console.log(this.props);

    this.props.setAssignedRepFilter({
      field: 'currentPage',
      value: page,
    });

    this.props.setAssignedRepFilter({
      field: 'offSet',
      value: offSet,
    });

    this.props.getAssignedReps();
  };

  /**
   * Renders component
   */
  render() {
    const {
      assignedReps,
      filter: { offSet, limit, pages, currentPage, query },
      loading,
    } = this.props;
    return (
      <React.Fragment>
        <div className='page-content'>
          <div className='container-fluid subcat-btn'>
            <Breadcrumbs title='Sales Representatives' breadcrumbItem='List' />
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
                      <Col md='8' sm="6">
                        <FormGroup>
                          <input
                            className='form-control'
                            value={query}
                            name='query'
                            type='text'
                            onChange={(event) =>
                              this.props.setAssignedRepFilter({
                                field: event.target.name,
                                value: event.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md='2' sm="3" xs="6">
                        <FormGroup>
                          <Button
                            onClick={() => this.props.getAssignedReps()}
                            color='primary'
                            className='btn btn-primary waves-effect'
                          >
                            Search
                          </Button>
                        </FormGroup>
                      </Col>
                      <Col md='2' sm="3" xs="6">
                        <FormGroup>
                          <Link to={`/assignedReps/add`}>
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
                            <th>#</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>User Type</th>
                            <th>Account Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {assignedReps.length > 0 &&
                            !loading &&
                            assignedReps.map((user, i) => {
                              return (
                                <tr key={i}>
                                  <th scope='row'>{i + 1}</th>
                                  <td>{user.full_name}</td>
                                  <td>{user.email}</td>
                                  <td>
                                    {user.user_type == 'Rep-Level' && 
                                      'Sales Representative'
                                    }
                                  </td>
                                  <td>{user.account_status}</td>
                                  <td>
                                    <div className='button-items'>
                                    
                                      <Link to={`/assignedReps/edit/${user.id}`}>
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
                                            this.props.deleteAssignedRep(user.id);
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
                    {assignedReps.length > 0 && (
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
  const { assignedReps, filter, loading } = state.AssignedRep;
  return { assignedReps, filter, loading };
};

export default withRouter(
  connect(mapStatetoProps, { getAssignedReps, deleteAssignedRep, editAssignedRep, setAssignedRepFilter })(
    AssignedReps
  )
);
