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
  Modal,
} from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  getWookaiVendors,
  editWookaiVendor,
  deleteWookaiVendor,
  setWookaiVendorFilter,
} from "../../store/actions";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Loader from "../../components/Common/Loader";
import CustomPagination from "../../components/Common/Pagination";
import { httpGet, httpPut } from "../../utils/http";
import { VENDOR_ITEMS_ENDPOINT, WOOKAI_VENDORS_ENDPOINT } from "../../config/endPoints";
import { exportToCSV } from "../../utils/exportCsv";
import { successToaster, errorToaster } from "../../components/Common/Toaster";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";
class WookaiVendors extends React.Component {
  /**
   * component state
   */
  state = {
    selectedDropDown: "",
    componentLoader: false,
    isModal: false,
    videoURL: "",
    videoModal: false,
    videoId: "",
    vendorId: ""
  };

  /**
   * Component Did mount
   */
  componentDidMount() {
    this.props.getWookaiVendors();
  }

  /**
   * pagination Handle click
   */
  PaginationHandleClick = (offSet, page) => {
    console.log(offSet);
    console.log(page);
    console.log(this.props);

    this.props.setWookaiVendorFilter({
      field: "currentPage",
      value: page,
    });

    this.props.setWookaiVendorFilter({
      field: "offSet",
      value: offSet,
    });

    this.props.getWookaiVendors();
  };

  /**
   * Download Relationships
   */
  downloadRelationshipsExcel = async (vendorId, vendorName) => {
    this.setState({
      componentLoader: true,
    });

    const res = await httpGet(
      `${VENDOR_ITEMS_ENDPOINT}/downloadRelationships/vendor/${vendorId}`
    );

    this.setState({
      selectedDropDown: "",
      componentLoader: false,
    });

    exportToCSV({
      csvData: res.data,
      fileName: `${vendorName}_Relationships_${moment().format("YYYY-MM-DD")}`,
    });

    successToaster("Relationships downloaded", "Success");
  };

  /**
   * Download Relationships
   */
  downloadRelationshipsPDF = async (vendorId, vendorName) => {
    this.setState({
      componentLoader: true,
    });

    const res = await httpGet(
      `${VENDOR_ITEMS_ENDPOINT}/downloadRelationships/vendor/${vendorId}`
    );

    this.setState({
      selectedDropDown: "",
      componentLoader: false,
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
      body: res.data,
    });

    doc.save(
      `${vendorName}_Relationships_${moment().format("YYYY-MM-DD")}.pdf`
    );

    successToaster("Relationships downloaded", "Success");
  };

  /**
   * Download Relationships
   */
  printRelationshipsPDF = async (vendorId) => {
    this.setState({
      componentLoader: true,
    });

    const res = await httpGet(
      `${VENDOR_ITEMS_ENDPOINT}/downloadRelationships/vendor/${vendorId}`
    );

    this.setState({
      selectedDropDown: "",
      componentLoader: false,
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
      body: res.data,
    });

    doc.autoPrint();
    window.open(doc.output("bloburl"), "_blank");
  };

  /**
   * close Modal
   */
  closeModal = () => {
    this.setState((prevState) => ({
      isModal: !prevState.isModal,
      vendorId: "",
      videoURL: "",
    }));
  };

  /**
   * open youtube modal
   */
  openVideoModal = (videoUrl) => {
    let split = '';
    if(videoUrl){
      split = videoUrl.split(/=(.+)/)[1]
    }
   
    this.setState({
      videoId: split != undefined ? split : '',
      videoModal: true,
    });
  };

  /**
   * handle video submit
   */
  handleVideoSubmit = async (e) => {
    const { vendorId, videoURL } = this.state;

    if (!videoURL) {
      errorToaster("Please fill required fields", "Error");
      return false;
    }

    await httpPut(`${WOOKAI_VENDORS_ENDPOINT}/updateVideoURL/${vendorId}`, {
      videoURL
    });
  
    this.setState({
      isModal: false,
      vendorId: '',
      videoURL: ''
    });

    this.props.getWookaiVendors();
    successToaster("Youtube URL updated", "Success");
  };

  /**
   * Renders component
   */
  render() {
    const {
      wookaiVendors,
      filter: { offSet, limit, pages, currentPage, query },
      loading,
    } = this.props;

    const {
      selectedDropDown,
      componentLoader,
      isModal,
      videoURL,
      videoModal,
      videoId,
    } = this.state;
    return (
      <React.Fragment>
        {/* Open Youtube video */}
        <ModalVideo
          videoId={videoId}
          channel="youtube"
          isOpen={videoModal}
          onClose={() => this.setState({ videoModal: false, videoId: "" })}
        />

        {/* Edit Youtube video */}
        <Modal isOpen={isModal} toggle={() => this.closeModal}>
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myModalLabel">
              Youtube URL
            </h5>
            <button
              type="button"
              onClick={() => this.closeModal()}
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <Row>
              <Col md="12">
                <FormGroup>
                  <textarea
                    className={`form-control ${videoURL ? "" : "is-invalid"}`}
                    onChange={(event) =>
                      this.setState({
                        videoURL: event.target.value,
                      })
                    }
                    value={videoURL}
                    name="videoURL"
                    type="text"
                  ></textarea>
                  <div className="invalid-feedback">Enter Video URL</div>
                </FormGroup>
              </Col>
            </Row>
          </div>
          <div className="modal-footer">
            <Button
              color="primary"
              type="button"
              onClick={() => this.handleVideoSubmit()}
            >
              Submit
            </Button>
          </div>
        </Modal>

        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs title="WookAI Suppliers" breadcrumbItem="List" />
            {loading && <Loader />}
            {componentLoader && <Loader />}
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
                              this.props.setWookaiVendorFilter({
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
                            onClick={() => this.props.getWookaiVendors()}
                            color="primary"
                            className="btn btn-primary waves-effect"
                          >
                            Search
                          </Button>
                        </FormGroup>
                      </Col>
                      <Col md="5">
                        <FormGroup className="float-right">
                          <Link to={`/wookaiVendors/add`}>
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
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {wookaiVendors.length > 0 &&
                            !loading &&
                            wookaiVendors.map((vendor, i) => {
                              return (
                                <tr key={i}>
                                  <th scope="row">{i + 1}</th>
                                  <td>
                                    <i
                                      onClick={() =>
                                        this.openVideoModal(vendor.video_url)
                                      }
                                      style={{ color: "#FF0000" }}
                                      className="fab fa-youtube"
                                    ></i>
                                    &nbsp;
                                    {vendor.vendor_name}
                                  </td>
                                  <td>{vendor.vendor_email}</td>
                                  <td>{vendor.vendor_phone}</td>
                                  <td>
                                    <ButtonDropdown
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
                                        <Link
                                          to={`/wookaiVendors/edit/${vendor.id}`}
                                        >
                                          <DropdownItem>Edit</DropdownItem>{" "}
                                        </Link>

                                        <Link
                                          to={`/wookaiVendors/updatePriceList/${vendor.id}`}
                                        >
                                          <DropdownItem>
                                            Update Price List
                                          </DropdownItem>
                                        </Link>
                                        <DropdownItem
                                          onClick={() =>
                                            this.setState({
                                              isModal: true,
                                              videoURL: vendor.video_url,
                                              vendorId: vendor.id
                                            })
                                          }
                                        >
                                          Update Youtube URL
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem
                                          color="danger"
                                          className="btn btn-danger waves-effect waves-light"
                                          onClick={() => {
                                            if (
                                              window.confirm(
                                                "Are you sure to delete the item?"
                                              )
                                            ) {
                                              this.props.deleteWookaiVendor(
                                                vendor.id
                                              );
                                            }
                                          }}
                                        >
                                          Delete
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </ButtonDropdown>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table>
                    </div>
                    {wookaiVendors.length > 0 && (
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
  const { wookaiVendors, filter, loading } = state.WookaiVendor;
  return { wookaiVendors, filter, loading };
};

export default withRouter(
  connect(mapStatetoProps, {
    getWookaiVendors,
    deleteWookaiVendor,
    editWookaiVendor,
    setWookaiVendorFilter,
  })(WookaiVendors)
);
