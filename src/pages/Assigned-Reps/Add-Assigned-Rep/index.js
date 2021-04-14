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
import {
  successToaster,
  errorToaster,
} from "../../../components/Common/Toaster";

import {
  setAssignedRep,
  addAssignedRep,
  editAssignedRep,
  emptyAssignedRep,
  updateAssignedRep,
  getBusinessLocations,
  getVendors,
} from "../../../store/actions";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

class AssignedRepAdd extends React.Component {
  /**
   * component state
   */
  state = {
    id: "",
    loggedInLocation: localStorage.getItem("businessLocation"),
  };

  /**
   * Component Did Mount
   */
  componentDidMount() {
    const { loggedInLocation } = this.state;
    this.props.getBusinessLocations();
    this.props.getVendors();
    const route = this.props.location.pathname;
    let arr = route.split("/");
    let id = arr[3];
    if (id !== undefined) {
      this.props.editAssignedRep(id);
      this.setState({
        id,
      });
    }

    //set profile id
    this.props.setAssignedRep({
      field: "fk_profile_id",
      value: loggedInLocation,
    });
  }

  /**
   * component Will Unmount
   */
  componentWillUnmount() {
    this.props.emptyAssignedRep();
  }

  /**
   * submit handle
   */
  handleSubmit = (e) => {
    e.persist();
  
    const {
      assignedRep: {
        email,
        fk_vendor_id,
        cell,
        rep_portal,
      },
    } = this.props;

    const { id } = this.state;

    if(rep_portal && !cell){
      errorToaster("Please fill required fields", "Error");
      return false;
    }

    if (
      !email ||
      !fk_vendor_id
    ) {
      errorToaster("Please fill required fields", "Error");
      return false;
    }

    if(id) this.props.updateAssignedRep(this.props.history, id);
    else this.props.addAssignedRep(this.props.history);
  };

  //Redux state Form Input onChange
  changeHandeler = (event) => {
    this.props.setAssignedRep({
      field: event.target.name,
      value: event.target.value,
    });
  };

  //Local state Form Input onChange
  stateChangeHandeler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  /**
   * rep portal checkbox
   */
  repPortalChange = (value) => {
    this.props.setAssignedRep({
      field: "rep_portal",
      value: !value,
    });
  };

  /**
   * profile checkbox change
   */
  profileChange = () => {
    const {
      assignedRep: { fk_profile_id },
    } = this.props;
    const { loggedInLocation } = this.state;

    if (fk_profile_id == "") {
      this.props.setAssignedRep({
        field: "fk_profile_id",
        value: loggedInLocation,
      });
    } else {
      this.props.setAssignedRep({
        field: "fk_profile_id",
        value: "",
      });
    }
  };

  /**
   * render component
   */
  render() {
    const {
      businessLocations,
      countries,
      states,
      timeZones,
      vendors,
      assignedRep: {
        email,
        fk_profile_id,
        cell,
        fk_vendor_id,
        rep_portal,
      },
    } = this.props;

    const { loggedInLocation, id } = this.state;

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Sales Representatives" breadcrumbItem="Add" />
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
                              User Name
                            </Label>
                            <input
                              className={`form-control ${
                                email ? "" : "is-invalid"
                              }`}
                              style={{backgroundColor: id ? '#f1f1f1' : ''}}
                              value={email}
                              disabled={id}
                              name="email"
                              type="text"
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className="invalid-feedback">Enter Email</div>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <Label htmlFor="validationCustom03">Supplier</Label>

                            <select
                              value={fk_vendor_id}
                              onChange={(event) => this.changeHandeler(event)}
                              className={`form-control ${
                                fk_vendor_id ? "" : "is-invalid"
                              }`}
                              name="fk_vendor_id"
                            >
                              <option disabled value="">
                                --select--
                              </option>
                              {vendors.map((vendor, i) => {
                                return (
                                  <option key={i} value={vendor.id}>
                                    {vendor.vendor_name}
                                  </option>
                                );
                              })}
                            </select>
                            <div className="invalid-feedback">
                              Select Supplier
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        {rep_portal && (
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="validationCustom02">Phone</Label>
                              <input
                                className={`form-control ${
                                  cell ? "" : "is-invalid"
                                }`}
                                style={{backgroundColor: id ? '#f1f1f1' : ''}}
                                disabled={id}
                                value={cell}
                                name="cell"
                                type="number"
                                onChange={(event) => this.changeHandeler(event)}
                              />
                              <div className="invalid-feedback">
                                Enter phone
                              </div>
                            </FormGroup>
                          </Col>
                        )}
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="validationCustom04">
                                Assign Profile
                              </Label>
                              {businessLocations.length > 0 &&
                                businessLocations.map((businessLocation, i) => {
                                  return (
                                    <>
                                      {businessLocation.id ==
                                        loggedInLocation && (
                                        <div
                                          className="form-check mb-3"
                                          key={i}
                                        >
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={businessLocation.id}
                                            checked={
                                              businessLocation.id ==
                                              fk_profile_id
                                            }
                                            onChange={(e) =>
                                              this.profileChange()
                                            }
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="defaultCheck1"
                                          >
                                            {businessLocation.business_name}
                                          </label>
                                        </div>
                                      )}
                                    </>
                                  );
                                })}
                            </FormGroup>
                          </Col>
                       

                        {(!id || (id && rep_portal)) &&
                           <Col md="4">
                           <FormGroup>
                             <Label htmlFor="validationCustom03">
                               Please check this box, if your Supplier Rep does
                               not have a Rep portal set up on Cherry's system.
                             </Label>
                             <input
                               type="checkbox"
                               name="rep_portal"
                               checked={rep_portal}
                               onChange={(e) =>
                                 this.repPortalChange(rep_portal)
                               }
                             />
                           </FormGroup>
                         </Col>
                        }
                         
                       
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
  const { assignedRep, loading } = state.AssignedRep;
  const { countries } = state.Country;
  const { states } = state.State;
  const { timeZones } = state.TimeZone;
  const { businessLocations } = state.BusinessLocation;
  const { vendors } = state.Vendor;

  return {
    assignedRep,
    countries,
    states,
    timeZones,
    loading,
    businessLocations,
    vendors,
  };
};

export default withRouter(
  connect(mapStatetoProps, {
    setAssignedRep,
    addAssignedRep,
    editAssignedRep,
    emptyAssignedRep,
    updateAssignedRep,
    getBusinessLocations,
    getVendors,
  })(AssignedRepAdd)
);
