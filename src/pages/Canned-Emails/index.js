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
  getCannedEmails,
  editCannedEmail,
  deleteCannedEmail,
  setCannedEmailFilter,
} from '../../store/actions';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Loader from '../../components/Common/Loader';
import CustomPagination from '../../components/Common/Pagination';

class MassEmails extends React.Component {
  /**
   * Component Did mount
   */
  componentDidMount() {
    this.props.getCannedEmails();
  }

  /**
   * pagination Handle click
   */
  PaginationHandleClick = (offSet, page) => {
    console.log(offSet);
    console.log(page);
    console.log(this.props);

    this.props.setCannedEmailFilter({
      field: 'currentPage',
      value: page,
    });

    this.props.setCannedEmailFilter({
      field: 'offSet',
      value: offSet,
    });

    this.props.getCannedEmails();
  };

  /**
   * Renders component
   */
  render() {
    const {
      cannedEmails,
      filter: { offSet, limit, pages, currentPage, query },
      loading,
    } = this.props;
    return (
      <React.Fragment>
        <div className='page-content'>
          <div className='container-fluid'>
            <Breadcrumbs title='Canned Emails' breadcrumbItem='List' />
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
                              this.props.setCannedEmailFilter({
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
                            onClick={() => this.props.getCannedEmails()}
                            color='primary'
                            className='btn btn-primary waves-effect'
                          >
                            Search
                          </Button>
                        </FormGroup>
                      </Col>
                      <Col md='5'>
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
                      </Col>
                    </Row>
                    <div className='table-responsive'>
                      <Table className='table table-striped mb-0 table'>
                        <thead>
                          <tr>
                            <th>Email Title</th>
                            <th>Email Subject</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cannedEmails.length > 0 &&
                            !loading &&
                            cannedEmails.map((cannedEmail, i) => {
                              return (
                                <tr key={i}>
                                  <td>{cannedEmail.email_name}</td>
                                  <td>{cannedEmail.subject}</td>

                                  <td>
                                    <div className='button-items'>
                                      <Link
                                        to={`/cannedEmails/edit/${cannedEmail.id}`}
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
                                            this.props.deleteCannedEmail(
                                              cannedEmail.id
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
                    {cannedEmails.length > 0 && (
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
  const { cannedEmails, filter, loading } = state.CannedEmail;
  return { cannedEmails, filter, loading };
};

export default withRouter(
  connect(mapStatetoProps, {
    getCannedEmails,
    deleteCannedEmail,
    editCannedEmail,
    setCannedEmailFilter,
  })(MassEmails)
);
