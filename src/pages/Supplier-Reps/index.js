import React from "react";
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
} from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  getSupplierReps,
  editSupplierRep,
  deleteSupplierRep,
  setSupplierRepFilter,
} from "../../store/actions";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Loader from "../../components/Common/Loader";
import CustomPagination from "../../components/Common/Pagination";

class SupplierReps extends React.Component {
  /**
   * Component Did mount
   */
  componentDidMount() {
    this.props.getSupplierReps();
  }

  /**
   * pagination Handle click
   */
  PaginationHandleClick = (offSet, page) => {
    console.log(offSet);
    console.log(page);
    console.log(this.props);

    this.props.setSupplierRepFilter({
      field: "currentPage",
      value: page,
    });

    this.props.setSupplierRepFilter({
      field: "offSet",
      value: offSet,
    });

    this.props.getSupplierReps();
  };

  /**
   * Renders component
   */
  render() {
    const {
      supplierReps,
      filter: { offSet, limit, pages, currentPage, query },
      loading,
    } = this.props;
    return (
      <React.Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs title="Sales Representatives" breadcrumbItem="List" />
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
                      <Col md="3">
                        <FormGroup>
                          <input
                            className="form-control"
                            value={query}
                            name="query"
                            type="text"
                            onChange={(event) =>
                              this.props.setSupplierRepFilter({
                                field: event.target.name,
                                value: event.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Button
                            onClick={() => this.props.getSupplierReps()}
                            color="primary"
                            className="btn btn-primary waves-effect"
                          >
                            Search
                          </Button>
                        </FormGroup>
                      </Col>
                      <Col md="5">
                        <FormGroup className="float-right">
                          <Link to={`/supplierReps/add`}>
                            <Button
                              color="primary"
                              className="btn btn-primary waves-effect"
                            >
                              Add New
                            </Button>
                          </Link>
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="table-responsive">
                      <Table className="table table-striped mb-0 table">
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
                          {supplierReps.length > 0 &&
                            !loading &&
                            supplierReps.map((supplierRep, i) => {
                              return (
                                <tr key={i}>
                                  <th scope="row">{i + 1}</th>
                                  <td>{supplierRep.full_name}</td>
                                  <td>{supplierRep.email}</td>
                                  <td>{supplierRep.user_type == 'Rep-Level' &&
                                    'Sales Representative'
                                  }</td>
                                  <td>{supplierRep.account_status}</td>
                                  <td>
                                    <div className="button-items">
                                      <Link to={`/supplierReps/edit/${supplierRep.id}`}>
                                        <Button
                                          color="secondary"
                                          className="btn btn-secondary waves-effect"
                                        >
                                          Edit
                                        </Button>
                                      </Link>
                                      <Button
                                        color="danger"
                                        className="btn btn-danger waves-effect waves-light"
                                        onClick={() => {
                                          if (
                                            window.confirm(
                                              "Are you sure to delete the item?"
                                            )
                                          ) {
                                            this.props.deleteSupplierRep(supplierRep.id);
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
                    {supplierReps.length > 0 && (
                      <FormGroup className="float-right">
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
  const { supplierReps, filter, loading } = state.SupplierRep;
  return { supplierReps, filter, loading };
};

export default withRouter(
  connect(mapStatetoProps, {
    getSupplierReps,
    deleteSupplierRep,
    editSupplierRep,
    setSupplierRepFilter,
  })(SupplierReps)
);
