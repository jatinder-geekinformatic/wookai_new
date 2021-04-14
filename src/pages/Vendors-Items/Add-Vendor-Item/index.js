import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  Label,
  Container,
} from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  setVendorItem,
  addVendorItem,
  editVendorItem,
  emptyVendorItem,
  updateVendorItem,
} from "../../../store/actions";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

class AddVendorItem extends React.Component {
  /**
   * component state
   */
  state = {
    id: "",
  };

  /**
   * Component Did Mount
   */
  async componentDidMount() {
    const route = this.props.location.pathname;
    let arr = route.split("/");
    let id = arr[3];
    if (id !== undefined) {
      this.props.editVendorItem(id);
      this.setState({
        id,
      });
    }
  }

  /**
   * component Will Unmount
   */
  componentWillUnmount() {}

  /**
   * submit handle
   */
  handleSubmit = async (e) => {
    e.persist();

    const { id } = this.state;

    if (id) {
      this.props.updateVendorItem(id);
    }
  };

  //Redux state Form Input onChange
  changeHandeler = (event) => {
    this.props.setVendorItem({
      field: event.target.name,
      value: event.target.value,
    });
  };

  /**
   * discount check box handler
   */
  discountCheckHandler = (event) => {
    const {
      vendorItem: { discount_check },
    } = this.props;

    this.props.setVendorItem({
      field: event.target.name,
      value: !discount_check ? 1 : 0,
    });
  };

  /**
   * delivery check box handler
   */
  deliveryCheckHandler = (event) => {
    const {
      vendorItem: { lead_time_item },
    } = this.props;

    this.props.setVendorItem({
      field: event.target.name,
      value: !lead_time_item ? 1 : 0,
    });
  };

  /**
   * render component
   */
  render() {
    const {
      vendorItem: {
        item,
        each_available,
        pack,
        size,
        brand,
        description,
        price,
        supprebate,
        supp_reb_type,
        contract_price,
        manufacturing_rebate,
        manufacturing_rebate_type,
        rebate_exp_date,
        lead_time_item,
        discount_check,
        item_price_type,
        contract_price_type,
      },
    } = this.props;

    const { id } = this.state;

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Vendor Items" breadcrumbItem="Edit" />
            <Row>
              <Col xl="12">
                <Card>
                  <CardBody>
                    {/* <h4 className='card-title'>React Validation - Normal</h4>
                    <p className='card-title-desc'>
                      Provide valuable, actionable feedback to your users with
                      HTML5 form validation–available in all our supported
                      browsers.
                    </p> */}
                    <AvForm
                      className="needs-validation"
                      onSubmit={this.handleSubmit}
                    >
                      <Row>
                        <Col md="6" sm="6">
                          <FormGroup>
                            <Label htmlFor="validationCustom01">Item No</Label>
                            <input
                              className={`form-control`}
                              style={{ backgroundColor: "#f1f1f1" }}
                              value={item}
                              name="item"
                              disabled={true}
                              type="text"
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className="invalid-feedback">
                              Enter Item No
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md="6" sm="6">
                          <FormGroup>
                            <Label htmlFor="validationCustom01">
                              Item Size
                            </Label>
                            <input
                              className={`form-control`}
                              style={{ backgroundColor: "#f1f1f1" }}
                              value={size}
                              disabled={true}
                              name="size"
                              type="text"
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className="invalid-feedback">
                              Enter Item size
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6" sm="6">
                          <FormGroup>
                            <Label htmlFor="validationCustom04">
                              Description
                            </Label>
                            <textarea
                              className={`form-control `}
                              name="description"
                              type="text"
                              onChange={(event) => this.changeHandeler(event)}
                              defaultValue={description}
                            ></textarea>
                            <div className="invalid-feedback">
                              Enter Description
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md="6" sm="6">
                          <FormGroup>
                            <Label htmlFor="validationCustom01">
                              Item Brand
                            </Label>
                            <input
                              className={`form-control`}
                              value={brand}
                              name="brand"
                              type="text"
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className="invalid-feedback">
                              Enter Item brand
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6" sm="6">
                          <FormGroup>
                            <Label htmlFor="validationCustom01">
                              Item Each Availability
                            </Label>
                            <input
                              className={`form-control`}
                              value={each_available}
                              name="each_available"
                              type="text"
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className="invalid-feedback">
                              Item Each Availability
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md="6" sm="6">
                          <FormGroup>
                            <Label htmlFor="validationCustom01">
                              Item Price
                            </Label>
                            <input
                              className={`form-control`}
                              value={price}
                              name="price"
                              type="text"
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className="invalid-feedback">
                              Enter Item price
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6" sm="6">
                          <FormGroup>
                            <Label htmlFor="validationCustom01">
                              Item Pack
                            </Label>
                            <input
                              className={`form-control`}
                              value={pack}
                              name="pack"
                              type="text"
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className="invalid-feedback">
                              Enter Item pack
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md="6" sm="6">
                          <FormGroup>
                            <Label
                              htmlFor="validationCustom01"
                              className="float-left"
                            >
                              Line Item Rebate
                            </Label>
                            <Row>
                              <Col md="1">
                                <div className="form-check form-check-left">
                                  <input
                                    className={`form-check-input`}
                                    value="%"
                                    checked={supp_reb_type == "%"}
                                    name="supp_reb_type"
                                    type="radio"
                                    onChange={(event) =>
                                      this.changeHandeler(event)
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="exampleRadios1"
                                  >
                                    %
                                  </label>
                                </div>
                              </Col>

                              <Col md="1">
                                <div className="form-check form-check-left">
                                  <input
                                    className={`form-check-input`}
                                    value="$"
                                    name="supp_reb_type"
                                    checked={supp_reb_type == "$"}
                                    type="radio"
                                    onChange={(event) =>
                                      this.changeHandeler(event)
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="exampleRadios1"
                                  >
                                    $
                                  </label>
                                </div>
                              </Col>
                            </Row>
                            <input
                              className={`form-control`}
                              value={supprebate}
                              name="supprebate"
                              type="text"
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className="invalid-feedback">
                              Enter Item rebate
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6" sm="6">
                          <FormGroup>
                            <Label
                              htmlFor="validationCustom01"
                              className="float-left"
                            >
                              Contract Price
                            </Label>
                            <Row>
                              <Col md="3">
                                <div className="form-check form-check-left">
                                  <input
                                    className={`form-check-input`}
                                    value="$"
                                    checked={contract_price_type == "$"}
                                    name="contract_price_type"
                                    type="radio"
                                    onChange={(event) =>
                                      this.changeHandeler(event)
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="exampleRadios1"
                                  >
                                    Fixed Price
                                  </label>
                                </div>
                              </Col>

                              <Col md="3">
                                <div className="form-check form-check-left">
                                  <input
                                    className={`form-check-input`}
                                    value="%"
                                    name="contract_price_type"
                                    checked={contract_price_type == "%"}
                                    type="radio"
                                    onChange={(event) =>
                                      this.changeHandeler(event)
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="exampleRadios1"
                                  >
                                    Margin %
                                  </label>
                                </div>
                              </Col>
                            </Row>
                            <input
                              className={`form-control`}
                              value={contract_price}
                              name="contract_price"
                              type="text"
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className="invalid-feedback">
                              Enter Contract price
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md="6" sm="6">
                          <FormGroup>
                            <Label
                              htmlFor="validationCustom01"
                              className="float-left"
                            >
                              Manufacturers Rebate
                            </Label>
                            <Row>
                              <Col md="2">
                                <div className="form-check form-check-left">
                                  <input
                                    className={`form-check-input`}
                                    value="%"
                                    checked={manufacturing_rebate_type == "%"}
                                    name="manufacturing_rebate_type"
                                    type="radio"
                                    onChange={(event) =>
                                      this.changeHandeler(event)
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="exampleRadios1"
                                  >
                                    %
                                  </label>
                                </div>
                              </Col>

                              <Col md="2">
                                <div className="form-check form-check-left">
                                  <input
                                    className={`form-check-input`}
                                    value="$"
                                    name="manufacturing_rebate_type"
                                    checked={manufacturing_rebate_type == "$"}
                                    type="radio"
                                    onChange={(event) =>
                                      this.changeHandeler(event)
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="exampleRadios1"
                                  >
                                    $
                                  </label>
                                </div>
                              </Col>
                            </Row>
                            <input
                              className={`form-control`}
                              value={manufacturing_rebate}
                              name="manufacturing_rebate"
                              type="text"
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className="invalid-feedback">
                              Enter Manufacturers Rebate
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6" sm="6">
                          <FormGroup>
                            <Label htmlFor="validationCustom01">
                              Contract Price Expiration Date
                            </Label>
                            <input
                              className={`form-control`}
                              value={rebate_exp_date}
                              name="rebate_exp_date"
                              type="date"
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className="invalid-feedback">
                              Enter Contract Price Expiration Date
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md="6" sm="6">
                          <FormGroup>
                            <Label htmlFor="validationCustom01">
                              Rebate Price type
                            </Label>
                            <Row>
                              <Col md="3">
                                <div className="form-check form-check-left">
                                  <input
                                    className={`form-check-input`}
                                    value="whole_price"
                                    checked={item_price_type == "whole_price"}
                                    name="item_price_type"
                                    type="radio"
                                    onChange={(event) =>
                                      this.changeHandeler(event)
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="exampleRadios1"
                                  >
                                    Whole Price
                                  </label>
                                </div>
                              </Col>

                              <Col md="3">
                                <div className="form-check form-check-left">
                                  <input
                                    className={`form-check-input`}
                                    value="split_price"
                                    name="item_price_type"
                                    checked={item_price_type == "split_price"}
                                    type="radio"
                                    onChange={(event) =>
                                      this.changeHandeler(event)
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="exampleRadios1"
                                  >
                                    Split Price
                                  </label>
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6" sm="6">
                          <FormGroup>
                            <div className="form-check mb-3">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value="1"
                                name="discount_check"
                                checked={discount_check}
                                onChange={(e) => this.discountCheckHandler(e)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="defaultCheck1"
                              >
                                Exempt this line item from any overall supplier
                                rebate program
                              </label>
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md="6" sm="6">
                          <FormGroup>
                            <div className="form-check mb-3">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value="1"
                                name="lead_time_item"
                                checked={lead_time_item}
                                onChange={(e) => this.deliveryCheckHandler(e)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="defaultCheck1"
                              >
                                This item required lead time for delivery!
                              </label>
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button color="primary" type="submit">
                        Submit
                      </Button>
                    </AvForm>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { vendorItem } = state.VendorItem;

  return { vendorItem };
};

export default withRouter(
  connect(mapStatetoProps, {
    setVendorItem,
    addVendorItem,
    editVendorItem,
    emptyVendorItem,
    updateVendorItem,
  })(AddVendorItem)
);
