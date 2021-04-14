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

class PendingUnits extends React.Component {
  /**
   * Component State
   */
  state = {
    items: [],
    unitsList: [],
    categoryList: [],
    loading: false,
  };

  /**
   * component mounts
   */
  async componentDidMount() {
    this.setState({
      loading: true,
    });

    const units = await httpGet(`${UNITS_ENDPOINT}/get/list`);
    const pendingParLevels = await httpGet(
      `${PRODUCTS_ENDPOINT}/get/pendingParLevels`
    );
    const categories = await httpGet(`${CATEGORIES_ENDPOINT}/get/list`);

    this.setState({
      unitsList: units.data,
      items: pendingParLevels.data,
      categoryList: categories.data,
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
  updateParLevels = async () => {
    const { items } = this.state;

    this.setState({
      loading: true
    })

    await httpPost(`${PRODUCTS_ENDPOINT}/update/parLevels`, items);
    successToaster("Measuring Units Updated", "Success");

    const pendingParLevels = await httpGet(
      `${PRODUCTS_ENDPOINT}/get/pendingParLevels`
    );

    this.setState({
      items: pendingParLevels.data,
      loading: false
    });
  };

  /**
   * Radio button handler
   */
  radioChangeHandler = (e, index) => {
    const { items } = this.state;

    let cloned = items.slice();
    cloned[index].radio_button = e.target.value;
    this.setState({
      items: cloned,
    });

    console.log(this.state.items);
  };

  getUnitName = (unitId) => {
    const { unitsList } = this.state;
    const value = unitsList.filter(function (el) {
      return el.id == unitId;
    });
    if (value.length > 0) return value[0].unit_abbreviation;

    return unitId;
  };

  weekDayChangeHandler = (e, itemIndex, weekIndex) => {
    const { items } = this.state;

    let cloned = items.slice();
    cloned[itemIndex].weekDays[weekIndex].amount = e.target.value;

    if (
      e.target.value == "" ||
      cloned[itemIndex].weekDays[weekIndex].checkBox
    ) {
      cloned[itemIndex].weekDays[weekIndex].checkBox = !cloned[itemIndex]
        .weekDays[weekIndex].checkBox;
    }

    this.setState({
      items: cloned,
    });
  };

  /**
   * checkBox Handle
   */
  checkBoxHandle = (itemIndex, weekIndex) => {
    const { items } = this.state;

    let cloned = items.slice();
    cloned[itemIndex].weekDays[weekIndex].checkBox = !cloned[itemIndex]
      .weekDays[weekIndex].checkBox;
    cloned[itemIndex].weekDays[weekIndex].amount = "";
    this.setState({
      items: cloned,
    });
  };

  /**
   * render component
   */
  render() {
    const { items, categoryList, loading } = this.state;

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Items" breadcrumbItem="Pending Par Levels" />
            {loading && <Loader />}
            <Row>
              <Col xl="12">
                <Card>
                  <CardBody>
                    <h4 className="card-title mb-4">Pending Par Levels</h4>

                    <div className="table-responsive">
                      <Table className="table table-striped mb-0 table">
                        <thead>
                          <tr>
                            <th>Item Name</th>
                            <th>Item Category</th>
                            <th colSpan="7">Ordering Days</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.length > 0 &&
                            items.map((item, itemIndex) => {
                              return (
                                <tr key={itemIndex}>
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
                                    <select
                                      style={{ backgroundColor: "#f1f1f1" }}
                                      readOnly
                                      disabled
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
                                  {item.weekDays.length > 0 &&
                                    item.weekDays.map(
                                      (weekDay, weekDayIndex) => {
                                        return (
                                          <td key={weekDayIndex}>
                                            <div>
                                              <div className="form-check mb-3">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  value={weekDay.day}
                                                  checked={!weekDay.checkBox}
                                                  onChange={(e) =>
                                                    this.checkBoxHandle(
                                                      itemIndex,
                                                      weekDayIndex
                                                    )
                                                  }
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="defaultCheck1"
                                                >
                                                  {weekDay.short}
                                                </label>
                                              </div>
                                              <input
                                                className="form-control"
                                                onChange={(e) =>
                                                  this.weekDayChangeHandler(
                                                    e,
                                                    itemIndex,
                                                    weekDayIndex
                                                  )
                                                }
                                                value={weekDay.amount}
                                                name="amount"
                                                type="number"
                                                min="1"
                                              />
                                            </div>
                                          </td>
                                        );
                                      }
                                    )}
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
                        onClick={() => this.updateParLevels()}
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

export default withRouter(PendingUnits);
