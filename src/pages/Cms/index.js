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
import { getCms, editCm, deleteCm, setCmsFilter } from '../../store/actions';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Loader from '../../components/Common/Loader';
import CustomPagination from '../../components/Common/Pagination';

class Cms extends React.Component {
  /**
   * Component Did mount
   */
  componentDidMount() {
    this.props.getCms();
  }

  /**
   * pagination Handle click
   */
  PaginationHandleClick = (offSet, page) => {
    this.props.setCmsFilter({
      field: 'currentPage',
      value: page,
    });

    this.props.setCmsFilter({
      field: 'offSet',
      value: offSet,
    });

    this.props.getCms();
  };

  /**
   * Renders component
   */
  render() {
    const {
      cms,
      filter: { offSet, limit, pages, currentPage, query },
      loading,
    } = this.props;
    return (
      <React.Fragment>
        <div className='page-content'>
          <div className='container-fluid'>
            <Breadcrumbs title='Cms' breadcrumbItem='List' />
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
                              this.props.setCmsFilter({
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
                            onClick={() => this.props.getCms()}
                            color='primary'
                            className='btn btn-primary waves-effect'
                          >
                            Search
                          </Button>
                        </FormGroup>
                      </Col>
                      <Col md='5'>
                        <FormGroup className='float-right'>
                          <Link to={`/cms/add`}>
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
                            <th>Added Date</th>
                            <th>Page Heading</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cms.length > 0 &&
                            !loading &&
                            cms.map((cm, i) => {
                              return (
                                <tr key={i}>
                                  <td>{cm.dated}</td>
                                  <td>{cm.heading}</td>

                                  <td>
                                    <div className='button-items'>
                                      <Link to={`/cms/edit/${cm.id}`}>
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
                                            this.props.deleteCm(cm.id);
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
                    {cms.length > 0 && (
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
  const { cms, filter, loading } = state.Cms;
  return { cms, filter, loading };
};

export default withRouter(
  connect(mapStatetoProps, {
    getCms,
    deleteCm,
    editCm,
    setCmsFilter,
  })(Cms)
);
