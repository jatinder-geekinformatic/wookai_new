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
import { successToaster } from "../../../../../components/Common/Toaster";
import classnames from "classnames";
import { httpGet, httpPost } from "../../../../../utils/http";
import {
  UNITS_ENDPOINT,
  CATEGORIES_ENDPOINT,
  ITEM_LOCATIONS_ENDPOINT,
  PRODUCTS_ENDPOINT,
  CONVERSIONS_ENDPOINT
} from "../../../../../config/endPoints";

class Details extends React.Component {
  state = {
    activeTab: 1,
    setactiveTab: 1,
    activeTabProgress: 1,
    setactiveTabProgress: 1,
    progressValue: 25,
    setprogressValue: 25,
    items: [],
    unitsList: [],
    categoryList: [],
    itemLocationList: [],
  };

  async componentDidMount() {
    const { items } = this.props;

    const units = await httpGet(`${UNITS_ENDPOINT}/get/list`);
    const categories = await httpGet(`${CATEGORIES_ENDPOINT}/get/list`);
    const itemLocations = await httpGet(`${ITEM_LOCATIONS_ENDPOINT}/get/list`);

    this.setState({
      items,
      unitsList: units.data,
      categoryList: categories.data,
      itemLocationList: itemLocations.data,
    });
    console.log(this.state);
  }

  toggleTabProgress = async (tab) => {
    const { activeTabProgress } = this.state;
    if (activeTabProgress !== tab) {
      if (tab >= 1 && tab <= 3) {
        let value = 0;
        if (tab === 1) {
          value = 25;
        }
        if (tab === 2) {
          value = 50;
        }
        if (tab === 3) {
          value = 100;
        }
        //  if(tab === 4) {  value = 100; }

        //save measuring units
        if(tab == 2){
          await httpPost(`${PRODUCTS_ENDPOINT}/add/measuringUnits`, this.state.items);
        }

         //save additional info
         if(tab == 3){
          await httpPost(`${PRODUCTS_ENDPOINT}/add/additionalInfo`, this.state.items);
        }



        this.setState({
          activeTabProgress: tab,
          progressValue: value,
        });
      }
    }
  };

  /**
   * get conversion values
   */
  getConversionValues  = async (e, index) => {
    const { items } = this.state;

    let cloned = items.slice();
    cloned[index][e.target.name] = e.target.value;
    this.setState({
      items: cloned,
    });

    setTimeout(async () => {
      const { items } =  this.state;

      let cloned1 = items.slice();

      if(items[index].pmu && items[index].fk_unit_id){
        const res1 = await httpGet(`${CONVERSIONS_ENDPOINT}/${items[index].pmu}/${items[index].fk_unit_id}`);
        if(res1.data){
          cloned1[index].ideal_pmu = res1.data.value;
        }
        else if(items[index].pmu == items[index].fk_unit_id){
          cloned1[index].ideal_pmu = 1;
        }
        else {
          cloned1[index].ideal_pmu = '';
        }
      }

      if(items[index].fk_unit_id && items[index].iu_unit_id){
        const res2 = await httpGet(`${CONVERSIONS_ENDPOINT}/${items[index].fk_unit_id}/${items[index].iu_unit_id}`);
        if(res2.data){
          cloned1[index].ideal_pmu1 = res2.data.value;
        }
        else if(items[index].fk_unit_id == items[index].iu_unit_id){
          cloned1[index].ideal_pmu1 = 1;
        }
        else {
          cloned1[index].ideal_pmu1 = '';
        }
      }

      if(items[index].iu_unit_id && items[index].default_unit_id){
        const res3 = await httpGet(`${CONVERSIONS_ENDPOINT}/${items[index].iu_unit_id}/${items[index].default_unit_id}`);
        if(res3.data){
          cloned1[index].ideal_pmu2 = res3.data.value;
        }
        else if(items[index].iu_unit_id == items[index].default_unit_id){
          cloned1[index].ideal_pmu2 = 1;
        }
        else {
          cloned1[index].ideal_pmu2 = '';
        }
      }

      this.setState({
        items: cloned1,
      });

    }, 500);
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
    cloned[itemIndex].weekDays[weekIndex].checkBox = !cloned[itemIndex].weekDays[weekIndex].checkBox;
    cloned[itemIndex].weekDays[weekIndex].amount = "";
    this.setState({
      items: cloned,
    });
  };

  finish = async () => {
    await httpPost(`${PRODUCTS_ENDPOINT}/add/PARLevels`, this.state.items);

    setTimeout(() => {
      successToaster('Items Added', 'Success');
    },1000);
    
    this.props.history.push('/items/list');
  };

  /**
   * Arrow Button click
   */
  cloneToBottom = (index, buttonType) => {
    const {items} = this.state;

    let cloned = items.slice();

    for(let i = index + 1; i < cloned.length; i++){

      if(cloned[i][buttonType] != 1){
        cloned[i][buttonType] = cloned[index][buttonType];
      }
    }

    this.setState({
      items: cloned
    });

  }

  /**
   * render component
   */
  render() {
    const {
      activeTab,
      setactiveTab,
      activeTabProgress,
      setactiveTabProgress,
      progressValue,
      setprogressValue,
      items,
      unitsList,
      itemLocationList,
      categoryList,
    } = this.state;

    return (
      <React.Fragment>
        <h4 className="card-title mb-4">Details</h4>

        <div id="progrss-wizard" className="twitter-bs-wizard">
          <ul className="twitter-bs-wizard-nav nav-justified nav nav-pills">
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTabProgress === 1,
                })}
                onClick={() => this.toggleTabProgress(1)}
              >
                <span className="step-number mr-2">01</span>
                Measuring Units
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTabProgress === 2,
                })}
                onClick={() => this.toggleTabProgress(2)}
              >
                <span className="step-number mr-2">02</span>
                <span>Additional Info</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTabProgress === 3,
                })}
                onClick={() => this.toggleTabProgress(3)}
              >
                <span className="step-number mr-2">03</span>
                Ordering Schedule
              </NavLink>
            </NavItem>
          </ul>

          <div id="bar" className="mt-4">
            <Progress color="success" striped animated value={progressValue} />
            <div className="progress-bar bg-success progress-bar-striped progress-bar-animated"></div>
          </div>
          <TabContent
            activeTab={activeTabProgress}
            className="twitter-bs-wizard-tab-content"
          >
            <TabPane tabId={1}>
              <div className="table-responsive">
                <Table className="table table-striped mb-0 table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item Name</th>
                      <th>Recipe Unit (RU)</th>
                      <th></th>
                      <th>#RU IN 1 CU</th>
                      <th></th>
                      <th>Cost Unit (CU)</th>
                      <th></th>
                      <th>#CU IN 1 IU</th>
                      <th></th>
                      <th>Inventory Unit (IU)</th>
                      <th></th>
                      <th>#IU IN 1 DU</th>
                      <th></th>
                      <th>Delivery Unit (DU)</th>
                      <th></th>
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
                                onChange={(e) =>
                                  this.inputChangeHandler(e, itemIndex)
                                }
                                value={item.product_name}
                                name="product_name"
                                type="text"
                              />
                            </td>
                            <td>
                              <select
                                value={item.pmu}
                                onChange={(e) =>
                                  this.getConversionValues(e, itemIndex)
                                }
                                className="form-control"
                                name="pmu"
                              >
                                <option disabled value="">
                                  --select--
                                </option>

                                {unitsList.map((unit, i) => {
                                  return (
                                    <option key={i} value={unit.id}>
                                      {unit.unit_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </td>
                            <td>
                              <div className="col-md-2">
                                  <i class="fas fa-angle-double-down" style={{color: '#3452E1'}} onClick={() => this.cloneToBottom(itemIndex, 'pmu')}></i>
                              </div>
                            </td>
                            <td>
                              <input
                                className="form-control"
                                onChange={(e) =>
                                  this.inputChangeHandler(e, itemIndex)
                                }
                                value={item.ideal_pmu}
                                name="ideal_pmu"
                                type="text"
                              />
                            </td>
                            <td>
                              <div className="col-md-2">
                                  <i class="fas fa-angle-double-down" style={{color: '#3452E1'}} onClick={() => this.cloneToBottom(itemIndex, 'ideal_pmu')}></i>
                              </div>
                            </td>
                            <td>
                              <select
                                value={item.fk_unit_id}
                                onChange={(e) =>
                                  this.getConversionValues(e, itemIndex)
                                }
                                className="form-control"
                                name="fk_unit_id"
                              >
                                <option disabled value="">
                                  --select--
                                </option>

                                {unitsList.map((unit, i) => {
                                  return (
                                    <option key={i} value={unit.id}>
                                      {unit.unit_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </td>
                            <td>
                              <div className="col-md-2">
                                  <i class="fas fa-angle-double-down" style={{color: '#3452E1'}} onClick={() => this.cloneToBottom(itemIndex, 'fk_unit_id')}></i>
                              </div>
                            </td>
                            <td>
                              <input
                                className="form-control"
                                onChange={(e) =>
                                  this.inputChangeHandler(e, itemIndex)
                                }
                                value={item.ideal_pmu1}
                                name="ideal_pmu1"
                                type="text"
                              />
                            </td>
                            <td>
                              <div className="col-md-2">
                                  <i class="fas fa-angle-double-down" style={{color: '#3452E1'}} onClick={() => this.cloneToBottom(itemIndex, 'ideal_pmu1')}></i>
                              </div>
                            </td>
                            <td>
                              <select
                                value={item.iu_unit_id}
                                onChange={(e) =>
                                  this.getConversionValues(e, itemIndex)
                                }
                                className="form-control"
                                name="iu_unit_id"
                              >
                                <option disabled value="">
                                  --select--
                                </option>

                                {unitsList.map((unit, i) => {
                                  return (
                                    <option key={i} value={unit.id}>
                                      {unit.unit_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </td>
                            <td>
                              <div className="col-md-2">
                                  <i class="fas fa-angle-double-down" style={{color: '#3452E1'}} onClick={() => this.cloneToBottom(itemIndex, 'iu_unit_id')}></i>
                              </div>
                            </td>
                            <td>
                              <input
                                className="form-control"
                                onChange={(e) =>
                                  this.inputChangeHandler(e, itemIndex)
                                }
                                value={item.ideal_pmu2}
                                name="ideal_pmu2"
                                type="text"
                              />
                            </td>
                            <td>
                              <div className="col-md-2">
                                  <i class="fas fa-angle-double-down" style={{color: '#3452E1'}} onClick={() => this.cloneToBottom(itemIndex, 'ideal_pmu2')}></i>
                              </div>
                            </td>
                            <td>
                              <select
                                value={item.default_unit_id}
                                onChange={(e) =>
                                  this.getConversionValues(e, itemIndex)
                                }
                                className="form-control"
                                name="default_unit_id"
                              >
                                <option disabled value="">
                                  --select--
                                </option>

                                {unitsList.map((unit, i) => {
                                  return (
                                    <option key={i} value={unit.id}>
                                      {unit.unit_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </td>
                             <td>
                              <div className="col-md-2">
                                  <i class="fas fa-angle-double-down" style={{color: '#3452E1'}} onClick={() => this.cloneToBottom(itemIndex, 'default_unit_id')}></i>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </TabPane>
            <TabPane tabId={2}>
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

                                {categoryList.map((category, categoryIndex) => {
                                  return (
                                    <option
                                      key={categoryIndex}
                                      value={category.id}
                                    >
                                      {category.category_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </TabPane>
            <TabPane tabId={3}>
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

                                {categoryList.map((category, categoryIndex) => {
                                  return (
                                    <option
                                      key={categoryIndex}
                                      value={category.id}
                                    >
                                      {category.category_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </td>
                            {item.weekDays.length > 0 &&
                              item.weekDays.map((weekDay, weekDayIndex) => {
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
                              })}
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </TabPane>
          </TabContent>
          <ul className="pager wizard twitter-bs-wizard-pager-link">
            <li
              className={
                activeTabProgress === 1 ? "previous disabled" : "previous"
              }
            >
              <Link
                to="#"
                onClick={() => this.toggleTabProgress(activeTabProgress - 1)}
              >
                Previous
              </Link>
            </li>
            {activeTabProgress != 3 && (
              <li
                className={activeTabProgress === 3 ? "next disabled" : "next"}
              >
                <Link
                  to="#"
                  onClick={() => this.toggleTabProgress(activeTabProgress + 1)}
                >
                  Next
                </Link>
              </li>
            )}
            {activeTabProgress == 3 && (
              <li className="next">
                <Link to="#" onClick={() => this.finish()}>
                  Finish
                </Link>
              </li>
            )}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Details);
