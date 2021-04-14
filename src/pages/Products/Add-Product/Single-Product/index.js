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
  successToaster,
  errorToaster,
} from "../../../../components/Common/Toaster";

import {
  setUser,
  addUser,
  editUser,
  emptyUser,
  updateUser,
} from "../../../../store/actions";
import { httpGet, httpPost, httpPut } from "../../../../utils/http";
import {
  UNITS_ENDPOINT,
  CATEGORIES_ENDPOINT,
  ITEM_LOCATIONS_ENDPOINT,
  PRODUCTS_ENDPOINT,
  CONVERSIONS_ENDPOINT
} from "../../../../config/endPoints";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";

class SingleProduct extends React.Component {
  /**
   * component state
   */
  state = {
    id: "",
    product_name: "",
    product_description: "",
    fk_unit_id: "",
    default_unit_id: "",
    fk_category_id: "",
    fk_location_id: "",
    radio_button: "",
    plu_sys: "",
    pmu: "",
    ideal_pmu: "",
    ideal_pmu1: "",
    ideal_pmu2: "",
    iu_unit_id: "",
    unitsList: [],
    categoryList: [],
    itemLocationList: [],
    weekDays: [
      {
        day: "Sunday",
        amount: "",
        checkBox: true,
      },
      {
        day: "Monday",
        amount: "",
        checkBox: true,
      },
      {
        day: "Tuesday",
        amount: "",
        checkBox: true,
      },
      {
        day: "Wednesday",
        amount: "",
        checkBox: true,
      },
      {
        day: "Thursday",
        amount: "",
        checkBox: true,
      },
      {
        day: "Friday",
        amount: "",
        checkBox: true,
      },
      {
        day: "Saturday",
        amount: "",
        checkBox: true,
      },
    ],
  };

  /**
   * Component Did Mount
   */
  async componentDidMount() {
    const units = await httpGet(`${UNITS_ENDPOINT}/get/list`);
    const categories = await httpGet(`${CATEGORIES_ENDPOINT}/get/list`);
    const itemLocations = await httpGet(`${ITEM_LOCATIONS_ENDPOINT}/get/list`);

    this.setState({
      unitsList: units.data,
      categoryList: categories.data,
      itemLocationList: itemLocations.data,
    });

    const route = this.props.location.pathname;
    let arr = route.split("/");
    let id = arr[3];
    if (id !== undefined) {
      let res = await httpGet(`${PRODUCTS_ENDPOINT}/${id}`);
      this.setState({
        id,
        product_name: res.data.product_name,
        product_description: res.data.product_description,
        fk_unit_id: res.data.fk_unit_id,
        default_unit_id: res.data.default_unit_id,
        fk_category_id: res.data.fk_category_id,
        fk_location_id: res.data.fk_location_id,
        radio_button: res.data.radio_button,
        plu_sys: res.data.plu_sys,
        pmu: res.data.pmu,
        ideal_pmu: res.data.ideal_pmu,
        ideal_pmu1: res.data.ideal_pmu1,
        ideal_pmu2: res.data.ideal_pmu2,
        iu_unit_id: res.data.	iu_unit_id,
        weekDays: res.data.weekDays,
      });
    }
    console.log(this.state);
  }

  /**
   * component Will Unmount
   */
  componentWillUnmount() {}

  /**
   * checkBox Handle
   */
  checkBoxHandle = (index) => {
    const { weekDays } = this.state;

    let cloned = weekDays.slice();
    cloned[index].checkBox = !cloned[index].checkBox;
    cloned[index].amount = "";
    this.setState({
      weekDays: cloned,
    });
  };

  checkBoxAmount = (index, e) => {
    const { weekDays } = this.state;

    let cloned = weekDays.slice();
    cloned[index].amount = e.target.value;
    this.setState({
      weekDays: cloned,
    });
  };

  /**
   * get conversion values
   */
  getConversionValues  = async (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });

    setTimeout(async () => {
      const {iu_unit_id, pmu, fk_unit_id, default_unit_id } =  this.state;

      if(pmu && fk_unit_id){
        const res1 = await httpGet(`${CONVERSIONS_ENDPOINT}/${pmu}/${fk_unit_id}`);
        if(res1.data){
          this.setState({
            ideal_pmu: res1.data.value
          })
        }
        else {
          this.setState({
            ideal_pmu: ''
          })
        }
      }

      if(fk_unit_id && iu_unit_id){
        const res2 = await httpGet(`${CONVERSIONS_ENDPOINT}/${fk_unit_id}/${iu_unit_id}`);
        if(res2.data){
          this.setState({
            ideal_pmu1: res2.data.value
          })
        }
        else {
          this.setState({
            ideal_pmu1: ''
          })
        }
      }

      if(iu_unit_id && default_unit_id){
        const res3 = await httpGet(`${CONVERSIONS_ENDPOINT}/${iu_unit_id}/${default_unit_id}`);
        if(res3.data){
          this.setState({
            ideal_pmu2: res3.data.value
          })
        }
        else {
          this.setState({
            ideal_pmu2: ''
          })
        }
      }

    }, 500);
  }

  /**
   * submit handle
   */
  handleSubmit = async (e) => {
    e.persist();

    const {
      id,
      product_name,
      product_description,
      fk_unit_id,
      default_unit_id,
      fk_category_id,
      fk_location_id,
      radio_button,
      plu_sys,
      pmu,
      ideal_pmu,
      ideal_pmu1,
      ideal_pmu2,
      iu_unit_id,
      weekDays,
    } = this.state;

    if (
      !product_name ||
      !product_description ||
      !fk_unit_id ||
      !default_unit_id ||
      !fk_category_id ||
      !fk_location_id ||
      !pmu ||
      !ideal_pmu ||
      !ideal_pmu1 ||
      !ideal_pmu2 ||
      !iu_unit_id
    ) {
      errorToaster("Please fill required fields", "Error");
      return false;
    }

    for (let i = 0; i < weekDays.length; i++) {
      if (!weekDays[i].checkBox && weekDays[i].amount == "") {
        alert("Please add value for selected days.");
        return false;
      }
    }

    const data = {
      product_name,
      product_description,
      fk_unit_id,
      default_unit_id,
      fk_category_id,
      fk_location_id,
      radio_button,
      plu_sys,
      pmu,
      ideal_pmu,
      ideal_pmu1,
      ideal_pmu2,
      iu_unit_id,
      weekDays,
    };

    if (id) {
      await httpPut(`${PRODUCTS_ENDPOINT}/${id}`, data);
      successToaster("Item updated", "Success");
    } else {
      await httpPost(PRODUCTS_ENDPOINT, data);
      successToaster("Item added", "Success");
    }

    this.props.history.push('/items/list');
  };

  //Form Input onChange
  changeHandeler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  /**
   * render component
   */
  render() {
    const {
      product_name,
      product_description,
      fk_unit_id,
      default_unit_id,
      fk_category_id,
      fk_location_id,
      radio_button,
      plu_sys,
      fk_user_id,
      fk_profile_id,
      pmu,
      ideal_pmu,
      ideal_pmu1,
      ideal_pmu2,
      iu_unit_id,
      unitsList,
      categoryList,
      itemLocationList,
      weekDays,
    } = this.state;

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Items" breadcrumbItem="Add Single" />
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
                        <Col md="6">
                          <FormGroup>
                            <Label htmlFor="validationCustom01">
                              Item Name
                            </Label>
                            <input
                              className={`form-control ${
                                product_name ? "" : "is-invalid"
                              }`}
                              value={product_name}
                              name="product_name"
                              type="text"
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className="invalid-feedback">
                              Enter Item Name
                            </div>
                          </FormGroup>
                          <FormGroup>
                            <Label htmlFor="validationCustom04">
                              Description
                            </Label>
                            <textarea
                              className={`form-control ${
                                product_description ? "" : "is-invalid"
                              }`}
                              name="product_description"
                              type="text"
                              onChange={(event) => this.changeHandeler(event)}
                              defaultValue={product_description}
                            ></textarea>
                            <div className="invalid-feedback">
                              Enter Description
                            </div>
                          </FormGroup>
                          <FormGroup>
                            <Label htmlFor="validationCustom03">
                              Recipe Unit (RU)
                            </Label>

                            <select
                              value={pmu}
                              onChange={(event) => this.getConversionValues(event)}
                              className={`form-control ${
                                pmu ? "" : "is-invalid"
                              }`}
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
                            <div className="invalid-feedback">Select RU</div>
                          </FormGroup>
                          <FormGroup>
                            <Label htmlFor="validationCustom03">
                              #RU IN 1 CU
                            </Label>
                            <input
                              className={`form-control ${
                                ideal_pmu ? "" : "is-invalid"
                              }`}
                              value={ideal_pmu}
                              name="ideal_pmu"
                              type="text"
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className="invalid-feedback">Enter</div>
                          </FormGroup>
                          <FormGroup>
                            <Label htmlFor="validationCustom03">
                              Cost Unit (CU)
                            </Label>

                            <select
                              value={fk_unit_id}
                              onChange={(event) => this.getConversionValues(event)}
                              className={`form-control ${
                                fk_unit_id ? "" : "is-invalid"
                              }`}
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
                            <div className="invalid-feedback">Select CU</div>
                          </FormGroup>
                          <FormGroup>
                            <Label htmlFor="validationCustom03">
                              #CU IN 1 IU
                            </Label>
                            <input
                              className={`form-control ${
                                ideal_pmu1 ? "" : "is-invalid"
                              }`}
                              value={ideal_pmu1}
                              name="ideal_pmu1"
                              type="text"
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className="invalid-feedback">Enter</div>
                          </FormGroup>
                          <FormGroup>
                            <Label htmlFor="validationCustom03">
                              Inventory Unit (IU)
                            </Label>

                            <select
                              value={iu_unit_id}
                              onChange={(event) => this.getConversionValues(event)}
                              className={`form-control ${
                                iu_unit_id ? "" : "is-invalid"
                              }`}
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
                            <div className="invalid-feedback">Select IU</div>
                          </FormGroup>
                          <FormGroup>
                            <Label htmlFor="validationCustom03">
                              #IU IN 1 DU
                            </Label>
                            <input
                              className={`form-control ${
                                ideal_pmu2 ? "" : "is-invalid"
                              }`}
                              value={ideal_pmu2}
                              name="ideal_pmu2"
                              type="text"
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className="invalid-feedback">Enter</div>
                          </FormGroup>
                          <FormGroup>
                            <Label htmlFor="validationCustom03">
                              Delivery Unit (DU)
                            </Label>

                            <select
                              value={default_unit_id}
                              onChange={(event) => this.getConversionValues(event)}
                              className={`form-control ${
                                default_unit_id ? "" : "is-invalid"
                              }`}
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
                            <div className="invalid-feedback">Select DU</div>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <Label htmlFor="validationCustom02">
                              Select Category
                            </Label>

                            <select
                              value={fk_category_id}
                              onChange={(event) => this.changeHandeler(event)}
                              className={`form-control ${
                                fk_category_id ? "" : "is-invalid"
                              }`}
                              name="fk_category_id"
                            >
                              <option disabled value="">
                                --select--
                              </option>
                              {categoryList.map((category, i) => {
                                return (
                                  <option key={i} value={category.id}>
                                    {category.category_name}
                                  </option>
                                );
                              })}
                            </select>
                            <div className="invalid-feedback">
                              Select Category
                            </div>
                          </FormGroup>
                          <FormGroup>
                            <Label htmlFor="validationCustom03">
                              Select Location
                            </Label>

                            <select
                              value={fk_location_id}
                              onChange={(event) => this.changeHandeler(event)}
                              className={`form-control ${
                                fk_location_id ? "" : "is-invalid"
                              }`}
                              name="fk_location_id"
                            >
                              <option disabled value="">
                                --select--
                              </option>

                              {itemLocationList.map((location, i) => {
                                return (
                                  <option key={i} value={location.id}>
                                    {location.location_name}
                                  </option>
                                );
                              })}
                            </select>
                            <div className="invalid-feedback">
                              Select Location
                            </div>
                          </FormGroup>
                          {weekDays.length > 0 &&
                            weekDays.map((weekDay, weekDayIndex) => {
                              return (
                                <FormGroup key={weekDayIndex}>
                                  {weekDayIndex == 0 && (
                                    <Label htmlFor="validationCustom03">
                                      Select Ordering Days and PAR Level:
                                    </Label>
                                  )}

                                  <Row>
                                    <Col md="3">
                                      <div className="form-check mb-3">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          value={weekDay.day}
                                          checked={!weekDay.checkBox}
                                          onChange={(e) =>
                                            this.checkBoxHandle(weekDayIndex)
                                          }
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="defaultCheck1"
                                        >
                                          {weekDay.day}
                                        </label>
                                      </div>
                                    </Col>
                                    <Col md="9">
                                      <input
                                        style={{
                                          backgroundColor: weekDay.checkBox
                                            ? "#f1f1f1"
                                            : "",
                                        }}
                                        className={`form-control`}
                                        name="amount"
                                        type="number"
                                        value={weekDay.amount}
                                        disabled={weekDay.checkBox}
                                        onChange={(e) =>
                                          this.checkBoxAmount(weekDayIndex, e)
                                        }
                                      />
                                    </Col>
                                  </Row>
                                </FormGroup>
                              );
                            })}
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
  const { user, loading } = state.User;
  const { countries } = state.Country;
  const { states } = state.State;
  const { timeZones } = state.TimeZone;

  return { user, countries, states, timeZones, loading };
};

export default withRouter(
  connect(mapStatetoProps, {
    setUser,
    addUser,
    editUser,
    emptyUser,
    updateUser,
  })(SingleProduct)
);
