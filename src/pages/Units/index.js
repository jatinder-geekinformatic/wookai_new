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
  getUnits,
  editUnit,
  deleteUnit,
  setUnitFilter,
} from '../../store/actions';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Loader from '../../components/Common/Loader';
import CustomPagination from '../../components/Common/Pagination';

class Units extends React.Component {
  /**
   * Component Did mount
   */
  componentDidMount() {
    this.props.getUnits();
  }

  /**
   * pagination Handle click
   */
  PaginationHandleClick = (offSet, page) => {
    console.log(offSet);
    console.log(page);
    console.log(this.props);

    this.props.setUnitFilter({
      field: 'currentPage',
      value: page,
    });

    this.props.setUnitFilter({
      field: 'offSet',
      value: offSet,
    });

    this.props.getUnits();
  };

  /**
   * Renders component
   */
  render() {
    const {
      units,
      loading,
      filter: { offSet, limit, pages, currentPage, query },
    } = this.props;

    return (
      <React.Fragment>
        <div className='page-content'>
          <div className='container-fluid subcat-btn'>
            <Breadcrumbs title='Units' breadcrumbItem='List' />
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
                              this.props.setUnitFilter({
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
                            onClick={() => this.props.getUnits()}
                            color='primary'
                            className='btn btn-primary waves-effect'
                          >
                            Search
                          </Button>
                        </FormGroup>
                      </Col>
                      <Col md='2' sm='3' xs='6'>
                        <FormGroup>
                          <Link to={`/units/add`}>
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
                            <th>Unit Name</th>
                            <th>Unit Abbreviation</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {units.length > 0 &&
                            !loading &&
                            units.map((unit, i) => {
                              return (
                                <tr key={i}>
                                  <td>{unit.unit_name}</td>
                                  <td>{unit.unit_abbreviation}</td>
                                  <td>
                                    <div className='button-items'>
                                      <Link to={`/units/edit/${unit.id}`}>
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
                                            this.props.deleteUnit(unit.id);
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
                    {units.length > 0 && (
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
  const { units, loading, filter } = state.Unit;
  return { units, loading, filter };
};

export default withRouter(
  connect(mapStatetoProps, { getUnits, deleteUnit, editUnit, setUnitFilter })(
    Units
  )
);
