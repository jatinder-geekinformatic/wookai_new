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
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  ButtonDropdown,
  UncontrolledDropdown
} from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  getVendors,
  editVendor,
  deleteVendor,
  setVendorFilter,
} from "../../store/actions";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Loader from "../../components/Common/Loader";
import CustomPagination from "../../components/Common/Pagination";
import {httpGet} from "../../utils/http";
import {
  VENDOR_ITEMS_ENDPOINT
} from "../../config/endPoints";
import {exportToCSV} from "../../utils/exportCsv";
import {
  successToaster,
  errorToaster,
} from "../../components/Common/Toaster";
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import moment from 'moment';
class Vendors extends React.Component {
  /**
   * component state
   */
  state = {
    selectedDropDown: "",
    componentLoader: false
  };

  /**
   * Component Did mount
   */
  componentDidMount() {
    this.props.getVendors();
  }

  /**
   * pagination Handle click
   */
  PaginationHandleClick = (offSet, page) => {
    console.log(offSet);
    console.log(page);
    console.log(this.props);

    this.props.setVendorFilter({
      field: "currentPage",
      value: page,
    });

    this.props.setVendorFilter({
      field: "offSet",
      value: offSet,
    });

    this.props.getVendors();
  };

  /**
   * Download Relationships
   */
  downloadRelationshipsExcel = async (vendorId, vendorName) => {
    this.setState({
      componentLoader: true
    });
    
    const res = await httpGet(`${VENDOR_ITEMS_ENDPOINT}/downloadRelationships/vendor/${vendorId}`); 

    this.setState({
      selectedDropDown: '',
      componentLoader: false
    });

    exportToCSV({
      csvData: res.data,
      fileName: `${vendorName}_Relationships_${moment().format('YYYY-MM-DD')}`
    });

    successToaster("Relationships downloaded", "Success");
  }

  /**
   * Download Relationships
   */
  downloadRelationshipsPDF = async (vendorId, vendorName) => {
    this.setState({
      componentLoader: true
    });

   const res = await httpGet(`${VENDOR_ITEMS_ENDPOINT}/downloadRelationships/vendor/${vendorId}`); 

    this.setState({
      selectedDropDown: '',
      componentLoader: false
    });

    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
  // doc.autoTable({ html: '#my-table' })

    let headers = res.data[0];
    res.data.splice(0, 1);
    const title = `Relationship Report`;

    doc.text(title, marginLeft, 40);
    doc.autoTable({
      startY: 50,
      head: [headers],
      body: res.data
    });
    
    doc.save(`${vendorName}_Relationships_${moment().format('YYYY-MM-DD')}.pdf`)

    successToaster("Relationships downloaded", "Success");
  }


    /**
   * Download Relationships
   */
  printRelationshipsPDF = async (vendorId) => {
    this.setState({
      componentLoader: true
    });

   const res = await httpGet(`${VENDOR_ITEMS_ENDPOINT}/downloadRelationships/vendor/${vendorId}`); 

    this.setState({
      selectedDropDown: '',
      componentLoader: false
    });

    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
  // doc.autoTable({ html: '#my-table' })

    let headers = res.data[0];
    res.data.splice(0, 1);
    const title = `Relationship Report`;

    doc.text(title, marginLeft, 40);
    doc.autoTable({
      startY: 50,
      head: [headers],
      body: res.data
    });

    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');
  }

  /**
   * Renders component
   */
  render() {
    const {
      vendors,
      filter: { offSet, limit, pages, currentPage, query },
      loading,
    } = this.props;

    const { selectedDropDown, componentLoader } = this.state;
    return (
      <React.Fragment>
        <div className="page-content">
          <div className="container-fluid subcat-btn">
            <Breadcrumbs title="Suppliers" breadcrumbItem="List" />
            {loading && <Loader />}
            {componentLoader && <Loader />}
            <Row>
			<Col md={12} sm={12} xs={12}>
                <Card>
                  <CardBody>
                    {/* <CardTitle>Basic example</CardTitle>
                    <CardSubtitle className='mb-3'>
                      For basic styling—light padding and only horizontal
                      dividers—add the base className <code>.table</code> to any
                      <code>&lt;table&gt;</code>.
                    </CardSubtitle> */}
                    <Row>
                      <Col md="5" sm="12">
                        <FormGroup>
                          <input
                            className="form-control"
                            value={query}
                            name="query"
                            type="text"
                            onChange={(event) =>
                              this.props.setVendorFilter({
                                field: event.target.name,
                                value: event.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="2" sm="4">
                        <FormGroup>
                          <Button
                            onClick={() => this.props.getVendors()}
                            color="primary"
                            className="btn btn-primary waves-effect"
                          >
                            Search
                          </Button>
                        </FormGroup>
                      </Col>
                      <Col md="3" sm="4">
                        <FormGroup>
                          <Link to={`/ignoreComments`}>
                            <Button
                              color="primary"
                              className="btn btn-primary waves-effect"
                            >
                              Ignore comments
                            </Button>
                          </Link>
                        </FormGroup>
                      </Col>
                      <Col md="2" sm="4">
                        <FormGroup>
                          <Link to={`/vendors/add`}>
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
                            <th>Vendor Name</th>
                            <th>Vendor Email</th>
                            <th>Vendor Phone</th>
                            <th>Pending Relations</th>
                            <th>View Items</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vendors.length > 0 &&
                            !loading &&
                            vendors.map((vendor, i) => {
                              return (
                                <tr key={i}>
                                  <th scope="row">{i + 1}</th>
                                  <td>{vendor.vendor_name}</td>
                                  <td>{vendor.vendor_email}</td>
                                  <td>{vendor.vendor_phone}</td>
                                  <td>{vendor.unRelatedItems}</td>
                                  <td>
                                    <div className="button-items">
                                      <Link
                                        to={`/vendorItems/vendor/${vendor.id}`}
                                      >
                                        <Button
                                          color="success"
                                          className="btn btn-success waves-effect"
                                        >
                                          View
                                        </Button>
                                      </Link>
                                    </div>
                                  </td>
                                  <td>
                                    {/* <ButtonDropdown
                                      isOpen={selectedDropDown == vendor.id}
                                      direction="right"
                                      toggle={() =>
                                        this.setState({
                                          selectedDropDown: vendor.id,
                                        })
                                      }
                                    >
                                      <DropdownToggle
                                        caret
                                        color="secondary"
                                        className="btn btn-secondary"
                                      >
                                        Action
                                        <i className="mdi mdi-chevron-down"></i>
                                      </DropdownToggle>
                                      <DropdownMenu className="dropdown-menu-right-custom">
                                        <Link to={`/vendors/edit/${vendor.id}`}>
                                          <DropdownItem>Edit</DropdownItem>{" "}
                                        </Link>

                                        <Link
                                          to={`/vendors/updatePriceList/${vendor.id}`}
                                        >
                                          <DropdownItem>
                                            Update Price List
                                          </DropdownItem>
                                        </Link>
                                        <Link
                                          to={`/vendors/importRelationships/${vendor.id}`}
                                        >
                                          <DropdownItem>
                                            Import Relationships
                                          </DropdownItem>
                                        </Link>
                                        <DropdownItem divider />
                                        <DropdownItem
                                          onClick={() => this.downloadRelationshipsExcel(vendor.id, vendor.vendor_name)}
                                        >
                                          Download Relationships Excel
                                        </DropdownItem>
                                        <DropdownItem 
                                          onClick={() => this.downloadRelationshipsPDF(vendor.id, vendor.vendor_name)}
                                        >
                                          Download Relationships PDF
                                        </DropdownItem>
                                        <DropdownItem
                                          onClick={() => this.printRelationshipsPDF(vendor.id)}
                                        >
                                          Print Relationships
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                          Email
                                        </DropdownItem>
                                        <DropdownItem
                                          color="danger"
                                          className="btn btn-danger waves-effect waves-light"
                                          onClick={() => {
                                            if (
                                              window.confirm(
                                                "Are you sure to delete the item?"
                                              )
                                            ) {
                                              this.props.deleteVendor(
                                                vendor.id
                                              );
                                            }
                                          }}
                                        >
                                          Delete
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </ButtonDropdown> */}
                                     <UncontrolledDropdown direction="right">
                                          <DropdownToggle href="#" className="card-drop" tag="i">
                                              <i className="mdi mdi-dots-horizontal font-size-18"></i>
                                          </DropdownToggle>
                                          <DropdownMenu  flip={true}>
                                          <Link to={`/vendors/edit/${vendor.id}`}>
                                          <DropdownItem>Edit</DropdownItem>{" "}
                                        </Link>

                                        <Link
                                          to={`/vendors/updatePriceList/${vendor.id}`}
                                        >
                                          <DropdownItem>
                                            Update Price List
                                          </DropdownItem>
                                        </Link>
                                        <Link
                                          to={`/vendors/importRelationships/${vendor.id}`}
                                        >
                                          <DropdownItem>
                                            Import Relationships
                                          </DropdownItem>
                                        </Link>
                                        <DropdownItem divider />
                                        <DropdownItem
                                          onClick={() => this.downloadRelationshipsExcel(vendor.id, vendor.vendor_name)}
                                        >
                                          Download Relationships Excel
                                        </DropdownItem>
                                        <DropdownItem 
                                          onClick={() => this.downloadRelationshipsPDF(vendor.id, vendor.vendor_name)}
                                        >
                                          Download Relationships PDF
                                        </DropdownItem>
                                        <DropdownItem
                                          onClick={() => this.printRelationshipsPDF(vendor.id)}
                                        >
                                          Print Relationships
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                          Email
                                        </DropdownItem>
                                        <DropdownItem
                                          color="danger"
                                          className="btn btn-danger waves-effect waves-light"
                                          onClick={() => {
                                            if (
                                              window.confirm(
                                                "Are you sure to delete the item?"
                                              )
                                            ) {
                                              this.props.deleteVendor(
                                                vendor.id
                                              );
                                            }
                                          }}
                                        >
                                          Delete
                                        </DropdownItem>
                                          </DropdownMenu>
                                      </UncontrolledDropdown>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table>
                    </div>
                    {vendors.length > 0 && (
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
  const { vendors, filter, loading } = state.Vendor;
  return { vendors, filter, loading };
};

export default withRouter(
  connect(mapStatetoProps, {
    getVendors,
    deleteVendor,
    editVendor,
    setVendorFilter,
  })(Vendors)
);
