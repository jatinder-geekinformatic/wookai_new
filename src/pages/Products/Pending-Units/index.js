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
  CONVERSIONS_ENDPOINT
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
    loading: false
  };

  /**
   * component mounts
   */
  async componentDidMount() {
    this.setState({
      loading: true
    });

    const units = await httpGet(`${UNITS_ENDPOINT}/get/list`);
    const pendingUnits = await httpGet(`${PRODUCTS_ENDPOINT}/get/pendingUnits`);

    this.setState({
      unitsList: units.data,
      items: pendingUnits.data,
      loading: false
    });
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
  updateUnits = async () => {
    this.setState({
      loading: true
    })
    const {items} = this.state;
    await httpPost(`${PRODUCTS_ENDPOINT}/update/measuringUnits`, items);
    successToaster('Measuring Units Updated', 'Success');

    const pendingUnits = await httpGet(`${PRODUCTS_ENDPOINT}/get/pendingUnits`);

    this.setState({
      items: pendingUnits.data,
      loading: false
    });
  }

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
        else if(items[index].fk_unit_id == items[index].iu_unit_id) {
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
      items,
      unitsList,
      loading
    } = this.state;

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Items" breadcrumbItem="Pending Units" />
            {loading && <Loader />}
            <Row>
              <Col xl="12">
                <Card>
                  <CardBody>
                    <h4 className="card-title mb-4">Pending Units</h4>

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
                                      value={item.pmu ? item.pmu : ''}
                                      onChange={(e) =>
                                        this.getConversionValues(e, itemIndex)
                                      }
                                      className="form-control"
                                      name="pmu"
                                    >
                                      <option disabled value="">
                                        --select--
                                      </option>

                                      {unitsList.map((unit, index1) => {
                                        return (
                                          <option key={index1} value={unit.id}>
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
                                      value={item.fk_unit_id ? item.fk_unit_id : ''}
                                      onChange={(e) =>
                                        this.getConversionValues(e, itemIndex)
                                      }
                                      className="form-control"
                                      name="fk_unit_id"
                                    >
                                      <option disabled value="">
                                        --select--
                                      </option>

                                      {unitsList.map((unit, index2) => {
                                        return (
                                          <option key={index2} value={unit.id}>
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
                                      value={item.iu_unit_id ? item.iu_unit_id : ''}
                                      onChange={(e) =>
                                        this.getConversionValues(e, itemIndex)
                                      }
                                      className="form-control"
                                      name="iu_unit_id"
                                    >
                                      <option disabled value="">
                                        --select--
                                      </option>

                                      {unitsList.map((unit, index3) => {
                                        return (
                                          <option key={index3} value={unit.id}>
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
                                      value={item.default_unit_id ? item.default_unit_id : ''}
                                      onChange={(e) =>
                                        this.getConversionValues(e, itemIndex)
                                      }
                                      className="form-control"
                                      name="default_unit_id"
                                    >
                                      <option disabled value="">
                                        --select--
                                      </option>

                                      {unitsList.map((unit, index4) => {
                                        return (
                                          <option key={index4} value={unit.id}>
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
                    {
                      items.length > 0 && 
                      <FormGroup
                      className="float-right"
                      style={{ paddingTop: "15px" }}
                    >
                      <Button color="primary" onClick={() => this.updateUnits()}>
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
