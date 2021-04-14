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
} from "reactstrap";
import { AvForm, AvField, AvInput } from "availity-reactstrap-validation";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { successToaster } from "../../../../components/Common/Toaster";

import {
  setUser,
  addUser,
  editUser,
  emptyUser,
  updateUser,
} from "../../../../store/actions";
import { httpGet, httpPost } from "../../../../utils/http";
import {
  UNITS_ENDPOINT,
  CATEGORIES_ENDPOINT,
  ITEM_LOCATIONS_ENDPOINT,
  PRODUCTS_ENDPOINT,
} from "../../../../config/endPoints";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import Details from "./Details";

class MultipleProduct extends React.Component {
  /**
   * component state
   */
  state = {
    itemsSubmit: false,
    rows: [
      {
        product_name: '',
        pmu: '',
        ideal_pmu: '',
        fk_unit_id: '',
        default_unit_id: '',
        fk_location_id: '',
        fk_category_id: '',
        product_description: '',
        ideal_pmu1: '',
        ideal_pmu2: '',
        iu_unit_id: '',
        weekDays: [
          {
            day: "Sunday",
            short: "Sun",
            amount: "",
            checkBox: true,
          },
          {
            day: "Monday",
            short: "Mon",
            amount: "",
            checkBox: true,
          },
          {
            day: "Tuesday",
            short: "Tue",
            amount: "",
            checkBox: true,
          },
          {
            day: "Wednesday",
            short: "Wed",
            amount: "",
            checkBox: true,
          },
          {
            day: "Thursday",
            short: "Thu",
            amount: "",
            checkBox: true,
          },
          {
            day: "Friday",
            short: "Fri",
            amount: "",
            checkBox: true,
          },
          {
            day: "Saturday",
            short: "Sat",
            amount: "",
            checkBox: true,
          },
        ]
      }
    ],
  };

  /**
   * Component Did Mount
   */
  async componentDidMount() {}

  /**
   * component Will Unmount
   */
  componentWillUnmount() {}

  /**
   * submit handle
   */
  handleSubmit = async (e) => {
    e.persist();
  };

  /**
   * Remove Input Row
   */
  handleRemoveRowNested = (index) => {
    const {rows} = this.state;

    let array = [...rows];
    array.splice(index, 1);

    this.setState({
      rows: array
    })
  };

  /**
   * Add New input row
   */
  handleAddRowNested = () => {
    const { rows } = this.state;

    this.setState({
      rows: [...rows, {  
          product_name: '',
          pmu: '',
          ideal_pmu: '',
          fk_unit_id: '',
          default_unit_id: '',
          fk_location_id: '',
          fk_category_id: '',
          product_description: '',
          ideal_pmu1: '',
          ideal_pmu2: '',
          iu_unit_id: '',
          weekDays: [
            {
              day: "Sunday",
              short: "Sun",
              amount: "",
              checkBox: true,
            },
            {
              day: "Monday",
              short: "Mon",
              amount: "",
              checkBox: true,
            },
            {
              day: "Tuesday",
              short: "Tue",
              amount: "",
              checkBox: true,
            },
            {
              day: "Wednesday",
              short: "Wed",
              amount: "",
              checkBox: true,
            },
            {
              day: "Thursday",
              short: "Thu",
              amount: "",
              checkBox: true,
            },
            {
              day: "Friday",
              short: "Fri",
              amount: "",
              checkBox: true,
            },
            {
              day: "Saturday",
              short: "Sat",
              amount: "",
              checkBox: true,
            },
          ]
        }
      ],
    });
  };

  /**
   * Input handler change
   */
  inputHandler = (index, e) => {
    const { rows } = this.state;

    let cloned = rows.slice();
    cloned[index].product_name = e.target.value;
    this.setState({
      rows: cloned,
    });
  };

  /**
   * render component
   */
  render() {
    const { rows, itemsSubmit } = this.state;

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Items" breadcrumbItem="Add Multiple" />
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
                    {itemsSubmit && 
                      <Details items={rows} />
                    }
                    {!itemsSubmit && 
                      <AvForm
                      className="needs-validation"
                      onSubmit={this.handleSubmit}
                    >
                      <Row>
                        <Col md="6">
                          <div className="inner-repeater mb-4">
                            <Label>Item Name</Label>
                            <table style={{ width: "100%" }}>
                              <tbody>
                                {rows.map((item, index) => (
                                  <tr id={"nested" + index} key={index}>
                                    <td>
                                      <Row className="mb-2">
                                        <Col md="10">
                                          <Input
                                            type="text"
                                            className="inner form-control"
                                            value={item.product_name}
                                            onChange={(e) =>
                                              this.inputHandler(index, e)
                                            }
                                            placeholder={
                                              "Enter Item Name... " +
                                              (index+1)
                                            }
                                          />
                                        </Col>
                                        {index != 0 && (
                                          <Col md="2">
                                            <Button
                                              onClick={(e) =>
                                                this.handleRemoveRowNested(
                                                  index
                                                )
                                              }
                                              color="danger"
                                              className="btn-block inner"
                                              style={{ width: "100%" }}
                                            >
                                              {" "}
                                              Delete{" "}
                                            </Button>
                                          </Col>
                                        )}
                                      </Row>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <Button
                              onClick={() => this.handleAddRowNested()}
                              color="success"
                              className="mt-1"
                            >
                              Add New
                            </Button>
                          </div>
                        </Col>
                      </Row>
                      
                        <Button color="primary" type="submit" onClick={() => this.setState({itemsSubmit: true})}>
                          Submit
                        </Button>                     
                    </AvForm>
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
  })(MultipleProduct)
);
