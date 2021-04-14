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
  getVendorItems,
  editVendorItem,
  deleteVendorItem,
  setVendorItemFilter,
} from "../../../store/actions";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Loader from "../../../components/Common/Loader";
import CustomPagination from "../../../components/Common/Pagination";
import { httpGet, httpPost } from "../../../utils/http";
import { VENDOR_ITEMS_ENDPOINT } from "../../../config/endPoints";
import moment from "moment";
import { successToaster } from "../../../components/Common/Toaster";


class VendorItems extends React.Component {
  /**
   * component state
   */
  state = {
    vendorId: "",
    loading: false,
    vendorItems: [],
  };

  /**
   * Component Did mount
   */
  async componentDidMount() {
    const route = this.props.location.pathname;
    let arr = route.split("/");
    let vendorId = arr[3];
    this.setState({ vendorId, loading: true });

    let res = await httpGet(`${VENDOR_ITEMS_ENDPOINT}/all/vendor/${vendorId}`);
    this.setState({ loading: false, vendorItems: res.data });

    setTimeout(() => {
      console.log(this.state);
    }, 3000);
  }

  /**
   * Input change handler
   */
  inputChangeHandler = (e, index) => {
    const { vendorItems } = this.state;

    let cloned = vendorItems.slice();
    cloned[index][e.target.name] = e.target.value;
    this.setState({
      vendorItems: cloned,
    });
  };

  /**
   * Input change handler
   */
  radioButtonChange = (e, index, type) => {
    const { vendorItems } = this.state;

    let cloned = vendorItems.slice();
    cloned[index][type] = e.target.value;
    this.setState({
      vendorItems: cloned,
    });
  };

  /**
   * bulk update
   */
  bulkUpdate = async () => {
    const {vendorItems, vendorId} = this.state;
    this.setState({ loading: true });

    await httpPost(`${VENDOR_ITEMS_ENDPOINT}/bulkUpdate/vendor/${vendorId}`, vendorItems);
    this.setState({ loading: false });
    successToaster('Items Updated', 'Success');
  }
  
  /**
   * Arrow Button click
   */
  cloneToBottom = (index, buttonType) => {
    const {vendorItems} = this.state;

    let cloned = vendorItems.slice();

    if(buttonType == 'lineItem'){
      for(let j = index + 1; j < cloned.length; j++){
        cloned[j].supp_reb_exp_date = cloned[index].supp_reb_exp_date;
        cloned[j].supp_reb_type = cloned[index].supp_reb_type;
        cloned[j].supprebate = cloned[index].supprebate;
      }
    }
    else if(buttonType == 'manufacturer') {
      for(let j = index + 1; j < cloned.length; j++){
        cloned[j].manufacturing_rebate_exp_date = cloned[index].manufacturing_rebate_exp_date;
        cloned[j].manufacturing_rebate_type = cloned[index].manufacturing_rebate_type;
        cloned[j].manufacturing_rebate = cloned[index].manufacturing_rebate;
      }
    }
  

    this.setState({
      vendorItems: cloned
    });

    // console.log(date);
    // console.log(type);
    // console.log(value);
  }


  /**
   * Renders component
   */
  render() {
    const { vendorId, vendorItems, loading } = this.state;

    return (
      <React.Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs title="Vendor Items" breadcrumbItem="Update" />
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
                    <div className="table-responsive">
                      <Table className="table table-striped mb-0 table">
                        <thead>
                          <tr>
                            <th>Item No</th>
                            <th>Item Brand</th>
                            <th>item Description</th>
                            <th>Line Item Rebate Date</th>
                            <th>Line Item Rebate Type</th>
                            <th>Line Item Rebate</th>
                            <th></th>
                            <th>Manufacturer Rebate Date</th>
                            <th>Manufacturer Rebate Type</th>
                            <th>Manufacturer Rebate</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {vendorItems.length > 0 &&
                            !loading &&
                            vendorItems.map((vendorItem, i) => {
                              return (
                                <tr key={i}>
                                  <td>{vendorItem.item}</td>
                                  <td>{vendorItem.brand}</td>
                                  <td>{vendorItem.description}</td>
                                  <td>
                                    <input
                                      className="form-control"
                                      onChange={(e) =>
                                        this.inputChangeHandler(e, i)
                                      }
                                      value={moment(vendorItem.supp_reb_exp_date).format('YYYY-MM-DD')}
                                      name="supp_reb_exp_date"
                                      type="date"
                                    />
                                  </td>
                                  <td>
                                    <div className="form-group">
                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="form-check form-check-left">
                                            <input
                                              className="form-check-input"
                                              name={"supp_reb_type_" + i}
                                              type="radio"
                                              value="%"
                                              checked={
                                                vendorItem.supp_reb_type == "%"
                                                  ? true
                                                  : false
                                              }
                                              onChange={(e) =>
                                                this.radioButtonChange(
                                                  e,
                                                  i,
                                                  "supp_reb_type"
                                                )
                                              }
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="exampleRadios1"
                                            >
                                              %
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="form-check form-check-left">
                                            <input
                                              className="form-check-input"
                                              name={"supp_reb_type_" + i}
                                              type="radio"
                                              value="$"
                                              checked={
                                                vendorItem.supp_reb_type == "$"
                                                  ? true
                                                  : false
                                              }
                                              onChange={(e) =>
                                                this.radioButtonChange(
                                                  e,
                                                  i,
                                                  "supp_reb_type"
                                                )
                                              }
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="exampleRadios1"
                                            >
                                              $
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <input
                                      className="form-control"
                                      onChange={(e) =>
                                        this.inputChangeHandler(e, i)
                                      }
                                      value={vendorItem.supprebate != null ? vendorItem.supprebate : ''}
                                      name="supprebate"
                                      type="number"
                                    />
                                  </td>
                                  <td>
                                    <div className="col-md-2">
                                        <i class="fas fa-angle-double-down" style={{color: '#3452E1'}} onClick={() => this.cloneToBottom(i, 'lineItem')}></i>
                                    </div>
                                  </td>
                                  <td>
                                    <input
                                      className="form-control"
                                      onChange={(e) =>
                                        this.inputChangeHandler(e, i)
                                      }
                                      value= {moment(vendorItem.manufacturing_rebate_exp_date).format('YYYY-MM-DD')}
                                      name="manufacturing_rebate_exp_date"
                                      type="date"
                                    />
                                  </td>
                                  <td>
                                    <div className="form-group">
                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="form-check form-check-left">
                                            <input
                                              className="form-check-input"
                                              name={
                                                "manufacturing_rebate_type_" + i
                                              }
                                              type="radio"
                                              value="%"
                                              checked={
                                                vendorItem.manufacturing_rebate_type ==
                                                "%"
                                                  ? true
                                                  : false
                                              }
                                              onChange={(e) =>
                                                this.radioButtonChange(
                                                  e,
                                                  i,
                                                  "manufacturing_rebate_type"
                                                )
                                              }
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="exampleRadios1"
                                            >
                                              %
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="form-check form-check-left">
                                            <input
                                              className="form-check-input"
                                              name={
                                                "manufacturing_rebate_type_" + i
                                              }
                                              type="radio"
                                              value="$"
                                              checked={
                                                vendorItem.manufacturing_rebate_type ==
                                                "$"
                                                  ? true
                                                  : false
                                              }
                                              onChange={(e) =>
                                                this.radioButtonChange(
                                                  e,
                                                  i,
                                                  "manufacturing_rebate_type"
                                                )
                                              }
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="exampleRadios1"
                                            >
                                              $
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <input
                                      className="form-control"
                                      onChange={(e) =>
                                        this.inputChangeHandler(e, i)
                                      }
                                      value={vendorItem.manufacturing_rebate != null ? vendorItem.manufacturing_rebate : ''}
                                      name="manufacturing_rebate"
                                      type="number"
                                    />
                                  </td>
                                  <td>
                                    <div className="col-md-2">
                                        <i class="fas fa-angle-double-down" style={{color: '#3452E1'}} onClick={() => this.cloneToBottom(i, 'manufacturer')}></i>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table>
                    </div>
                    <FormGroup
                      className="float-right"
                      style={{ paddingTop: "15px" }}
                    >
                      <Button color="primary" onClick={() => this.bulkUpdate()}>
                        Update
                      </Button>
                    </FormGroup>
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
  const { vendorItems, filter, loading } = state.VendorItem;
  return { vendorItems, filter, loading };
};

export default withRouter(
  connect(mapStatetoProps, {
    getVendorItems,
    deleteVendorItem,
    editVendorItem,
    setVendorItemFilter,
  })(VendorItems)
);
