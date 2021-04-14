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
  getClients,
  editClient,
  deleteClient,
  setClientFilter,
} from "../../store/actions";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Loader from "../../components/Common/Loader";
import CustomPagination from "../../components/Common/Pagination";

class Clients extends React.Component {
  /**
   * Component Did mount
   */
  componentDidMount() {
    this.props.getClients();
  }

  /**
   * pagination Handle click
   */
  PaginationHandleClick = (offSet, page) => {
    console.log(offSet);
    console.log(page);
    console.log(this.props);

    this.props.setClientFilter({
      field: "currentPage",
      value: page,
    });

    this.props.setClientFilter({
      field: "offSet",
      value: offSet,
    });

    this.props.getClients();
  };

  /**
   * Renders component
   */
  render() {
    const {
      clients,
      filter: { offSet, limit, pages, currentPage, query },
      loading,
    } = this.props;
    return (
      <React.Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs title="Clients" breadcrumbItem="List" />
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
                              this.props.setClientFilter({
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
                            onClick={() => this.props.getClients()}
                            color="primary"
                            className="btn btn-primary waves-effect"
                          >
                            Search
                          </Button>
                        </FormGroup>
                      </Col>
                      <Col md="5">
                        <FormGroup className="float-right">
                          <Link to={`/clients/add`}>
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
                          {clients.length > 0 &&
                            !loading &&
                            clients.map((client, i) => {
                              return (
                                <tr key={i}>
                                  <th scope="row">{i + 1}</th>
                                  <td>{client.full_name}</td>
                                  <td>{client.email}</td>
                                  <td>{client.user_type}</td>
                                  <td>{client.account_status}</td>
                                  <td>
                                    <div className="button-items">
                                      <Link to={`/clients/edit/${client.id}`}>
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
                                            this.props.deleteClient(client.id);
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
                    {clients.length > 0 && (
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
  const { clients, filter, loading } = state.Client;
  return { clients, filter, loading };
};

export default withRouter(
  connect(mapStatetoProps, {
    getClients,
    deleteClient,
    editClient,
    setClientFilter,
  })(Clients)
);
