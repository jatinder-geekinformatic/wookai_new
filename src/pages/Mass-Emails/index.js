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
  getMassEmails,
  editMassEmail,
  deleteMassEmail,
  setMassEmailFilter,
} from '../../store/actions';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Loader from '../../components/Common/Loader';
import CustomPagination from '../../components/Common/Pagination';

class MassEmails extends React.Component {
  /**
   * Component Did mount
   */
  componentDidMount() {
    this.props.getMassEmails();
  }

  /**
   * pagination Handle click
   */
  PaginationHandleClick = (offSet, page) => {
    console.log(offSet);
    console.log(page);
    console.log(this.props);

    this.props.setMassEmailFilter({
      field: 'currentPage',
      value: page,
    });

    this.props.setMassEmailFilter({
      field: 'offSet',
      value: offSet,
    });

    this.props.getMassEmails();
  };

  /**
   * Renders component
   */
  render() {
    const {
      massEmails,
      filter: { offSet, limit, pages, currentPage, query },
      loading,
    } = this.props;
    return (
      <React.Fragment>
        <div className='page-content'>
          <div className='container-fluid'>
            <Breadcrumbs title='Mass Emails' breadcrumbItem='List' />
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
                              this.props.setMassEmailFilter({
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
                            onClick={() => this.props.getMassEmails()}
                            color='primary'
                            className='btn btn-primary waves-effect'
                          >
                            Search
                          </Button>
                        </FormGroup>
                      </Col>
                      <Col md='5'>
                        <FormGroup className='float-right'>
                          <Link to={`/massEmails/add`}>
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
                            <th>Email Title</th>
                            <th>Email Subject</th>
                            <th>Send To</th>
                            <th>Send Hourly</th>
                          </tr>
                        </thead>
                        <tbody>
                          {massEmails.length > 0 &&
                            !loading &&
                            massEmails.map((massEmail, i) => {
                              return (
                                <tr key={i}>
                                  <td>{massEmail.email_name}</td>
                                  <td>{massEmail.subject}</td>
                                  <td>{massEmail.user_type}</td>
                                  <td>{massEmail.hourly_total}</td>

                                  <td>
                                    <div className='button-items'>
                                      <Link
                                        to={`/massEmails/edit/${massEmail.id}`}
                                      >
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
                                            this.props.deleteMassEmail(
                                              massEmail.id
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
                    {massEmails.length > 0 && (
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
  const { massEmails, filter, loading } = state.MassEmail;
  return { massEmails, filter, loading };
};

export default withRouter(
  connect(mapStatetoProps, {
    getMassEmails,
    deleteMassEmail,
    editMassEmail,
    setMassEmailFilter,
  })(MassEmails)
);
