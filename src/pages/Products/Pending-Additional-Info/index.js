import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  CardTitle,
  CardSubtitle,
  Label,
  Input,
  Container,
  CustomInput,
  TabContent,
  TabPane,
  NavItem,
  NavLink,
  Form,
  Progress,
  Table,
} from "reactstrap";
import { AvForm, AvField, AvInput } from "availity-reactstrap-validation";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { successToaster } from "../../../components/Common/Toaster";
import classnames from "classnames";
import { httpGet, httpPost } from "../../../utils/http";
import {
  UNITS_ENDPOINT,
  CATEGORIES_ENDPOINT,
  ITEM_LOCATIONS_ENDPOINT,
  PRODUCTS_ENDPOINT,
} from "../../../config/endPoints";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Loader from "../../../components/Common/Loader";

class PendingAdditionalInfo extends React.Component {
  /**
   * Component State
   */
  state = {
    items: [],
    categoryList: [],
    itemLocationList: [],
    loading: false,
  };

  /**
   * component mounts
   */
  async componentDidMount() {
    this.setState({
      loading: true,
    });

    const categories = await httpGet(`${CATEGORIES_ENDPOINT}/get/list`);
    const itemLocations = await httpGet(`${ITEM_LOCATIONS_ENDPOINT}/get/list`);
    const pendingInfo = await httpGet(
      `${PRODUCTS_ENDPOINT}/get/pendingAdditionalInfo`
    );

    this.setState({
      categoryList: categories.data,
      itemLocationList: itemLocations.data,
      items: pendingInfo.data,
      loading: false,
    });

    console.log(this.items);
  }

  /**
   * Input change handler
   */
  inputChangeHandler = (e, index) => {
    const { items } = this.state;

    let cloned = items.slice();
    cloned[index][e.target.name] = e.target.value;
    this.setState({
      items: cloned,
    });

    console.log(this.state.items);
  };

  /**
   * update units
   */
  updateAdditonal = async () => {
    const { items } = this.state;
    this.setState({
      loading: true
    });

    await httpPost(`${PRODUCTS_ENDPOINT}/update/additonalInfo`, items);
    successToaster("Measuring Units Updated", "Success");

    const pendingInfo = await httpGet(
      `${PRODUCTS_ENDPOINT}/get/pendingAdditionalInfo`
    );

    this.setState({
      items: pendingInfo.data,
      loading: false
    });
  };

  /**
   * render component
   */
  render() {
    const { items, itemLocationList, categoryList, loading } = this.state;

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              title="Items"
              breadcrumbItem="Pending Additional Info"
            />
            {loading && <Loader />}
            <Row>
              <Col xl="12">
                <Card>
                  <CardBody>
                    <h4 className="card-title mb-4">Pending Additional Info</h4>

                    <div className="table-responsive">
                      <Table className="table table-striped mb-0 table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Item Name</th>
                            <th>Item Description</th>
                            <th>Location</th>
                            <th>Category</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.length > 0 &&
                            items.map((item, itemIndex) => {
                              return (
                                <tr key={itemIndex}>
                                  <td>{itemIndex + 1}</td>
                                  <td>
                                    <input
                                      className="form-control"
                                      style={{ backgroundColor: "#f1f1f1" }}
                                      onChange={(e) =>
                                        this.inputChangeHandler(e, itemIndex)
                                      }
                                      value={item.product_name}
                                      readOnly
                                      name="product_name"
                                      type="text"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      className="form-control"
                                      onChange={(e) =>
                                        this.inputChangeHandler(e, itemIndex)
                                      }
                                      value={item.product_description}
                                      name="product_description"
                                      type="text"
                                    />
                                  </td>
                                  <td>
                                    <select
                                      value={item.fk_location_id}
                                      onChange={(e) =>
                                        this.inputChangeHandler(e, itemIndex)
                                      }
                                      className="form-control"
                                      name="fk_location_id"
                                    >
                                      <option disabled value="">
                                        --select--
                                      </option>

                                      {itemLocationList.map(
                                        (itemLocation, itemLocationIndex) => {
                                          return (
                                            <option
                                              key={itemLocationIndex}
                                              value={itemLocation.id}
                                            >
                                              {itemLocation.location_name}
                                            </option>
                                          );
                                        }
                                      )}
                                    </select>
                                  </td>
                                  <td>
                                    <select
                                      value={item.fk_category_id}
                                      onChange={(e) =>
                                        this.inputChangeHandler(e, itemIndex)
                                      }
                                      className="form-control"
                                      name="fk_category_id"
                                    >
                                      <option disabled value="">
                                        --select--
                                      </option>

                                      {categoryList.map(
                                        (category, categoryIndex) => {
                                          return (
                                            <option
                                              key={categoryIndex}
                                              value={category.id}
                                            >
                                              {category.category_name}
                                            </option>
                                          );
                                        }
                                      )}
                                    </select>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table>
                    </div>
                    {
                      items.length > 0 && 
                      <FormGroup
                      className="float-right"
                      style={{ paddingTop: "15px" }}
                    >
                      <Button
                        color="primary"
                        onClick={() => this.updateAdditonal()}
                      >
                        Update
                      </Button>
                    </FormGroup>
                    }
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

export default withRouter(PendingAdditionalInfo);
