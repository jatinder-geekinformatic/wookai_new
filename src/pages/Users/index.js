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
  getUsers,
  editUser,
  deleteUser,
  setUserFilter,
} from '../../store/actions';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Loader from '../../components/Common/Loader';
import CustomPagination from '../../components/Common/Pagination';

class Users extends React.Component {
  /**
   * Component Did mount
   */
  componentDidMount() {
    this.props.getUsers();
  }

  /**
   * pagination Handle click
   */
  PaginationHandleClick = (offSet, page) => {
    console.log(offSet);
    console.log(page);
    console.log(this.props);

    this.props.setUserFilter({
      field: 'currentPage',
      value: page,
    });

    this.props.setUserFilter({
      field: 'offSet',
      value: offSet,
    });

    this.props.getUsers();
  };

  /**
   * Renders component
   */
  render() {
    const {
      users,
      filter: { offSet, limit, pages, currentPage, query },
      loading,
    } = this.props;
    return (
      <React.Fragment>
        <div className='page-content'>
          <div className='container-fluid subcat-btn'>
            <Breadcrumbs title='Users' breadcrumbItem='List' />
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
                      <Col md='8' sm='6' xs='12'>
                        <FormGroup>
                          <input
                            className='form-control'
                            value={query}
                            name='query'
                            type='text'
                            onChange={(event) =>
                              this.props.setUserFilter({
                                field: event.target.name,
                                value: event.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md='2' sm='3' xs='6'>
                        <FormGroup>
                          <Button
                            onClick={() => this.props.getUsers()}
                            color='primary'
                            className='btn btn-primary waves-effect'
                          >
                            Search
                          </Button>
                        </FormGroup>
                      </Col>
                      <Col md='2' sm='3' xs='6'>
                        <FormGroup>
                          <Link to={`/users/add`}>
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
                          {users.length > 0 &&
                            !loading &&
                            users.map((user, i) => {
                              return (
                                <tr key={i}>
                                  <th scope='row'>{i + 1}</th>
                                  <td>{user.full_name}</td>
                                  <td>{user.email}</td>
                                  <td>
                                    {user.user_type == 'Mid-Level' && 
                                      'Manager'
                                    }
                                     {user.user_type == 'Low-Level' && 
                                      'Assistant Manager'
                                    }
                                  </td>
                                  <td>{user.account_status}</td>
                                  <td>
                                    <div className='button-items'>
                                    {user.user_type != 'Client' && 
                                      <Link to={`/users/edit/${user.id}`}>
                                      <Button
                                        color='secondary'
                                        className='btn btn-secondary waves-effect'
                                      >
                                        Edit
                                      </Button>
                                    </Link>
                                    }

                                    {user.user_type == 'Client' && 
                                      <Link to={`/users/edit/client/${user.id}`}>
                                        <Button
                                          color='secondary'
                                          className='btn btn-secondary waves-effect'
                                        >
                                          Edit
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
                                            this.props.deleteUser(user.id);
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
                    {users.length > 0 && (
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
  const { users, filter, loading } = state.User;
  return { users, filter, loading };
};

export default withRouter(
  connect(mapStatetoProps, { getUsers, deleteUser, editUser, setUserFilter })(
    Users
  )
);
