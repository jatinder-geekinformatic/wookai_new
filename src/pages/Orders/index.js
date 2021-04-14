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
  Modal
} from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  getUnits,
  editUnit,
  deleteUnit,
  setUnitFilter,
} from "../../store/actions";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Loader from "../../components/Common/Loader";
import CustomPagination from "../../components/Common/Pagination";
import { httpGet, httpPost } from "../../utils/http";
import {
  ORDERS_ENDPOINT, PRODUCTS_ENDPOINT
} from "../../config/endPoints";
import ShowMoreText from 'react-show-more-text';
import {
  successToaster,
  errorToaster,
} from "../../components/Common/Toaster";
import _ from "lodash";
class Orders extends React.Component {

  state = {
    products: [],
    loading: false,
    isModal: false,
    parLevels: [],
    parLevelProductId: '',
    parLevelProductIndex: ''
  }
  /**
   * Component Did mount
   */
  async componentDidMount() {
    this.fetchRelatedProducts();
  }

  fetchRelatedProducts = async () => {
    this.setState({
      loading: true
    });

    const orders = await httpGet(`${ORDERS_ENDPOINT}`);

    this.setState({
      products: orders.data,
      loading: false
    })


  }

  deleteVendor = (index) => {
    const {products} = this.state;

    let cloned = [...products];

    for(let i = 0; i < cloned.length; i++){
      cloned[i].vendors.splice(index, 1);
    }

    this.setState({
      products: cloned
    });
  }

  /**
   * pagination Handle click
   */
  PaginationHandleClick = (offSet, page) => {
    console.log(offSet);
    console.log(page);
    console.log(this.props);

    this.props.setUnitFilter({
      field: "currentPage",
      value: page,
    });

    this.props.setUnitFilter({
      field: "offSet",
      value: offSet,
    });

    this.props.getUnits();
  };

  /**
   * to order quantity change
   */
  productQuantityChange = (value, index) => {
    const {products} = this.state;

    let cloned = [...products];
    cloned[index].desired_quantity = value;

    let amounts = [];
    for(let i = 0; i < cloned[index].vendors.length; i++){
      for(let j = 0; j < cloned[index].vendors[i].relations.length; j++){

        let cu = ((((cloned[index].vendors[i].relations[j].ideal_pmu1*cloned[index].vendors[i].relations[j].corrected_amount)*(cloned[index].vendors[i].relations[j].price) / cloned[index].vendors[i].relations[j].standard_unit))/(cloned[index].vendors[i].relations[j].ideal_pmu1*cloned[index].vendors[i].relations[j].corrected_amount)).toFixed(2)

        amounts = [...amounts, {
          vendorIndex: i,
          itemIndex: j,
          amount: cu
        }];

        cloned[index].vendors[i].relations[j].desired_quantity = 0;
      }
      cloned[0].vendors[i].totalOrderAmount = 0;
    }


  let min = _.minBy(amounts, 'amount');
  if(min){
    cloned[index].vendors[min.vendorIndex].relations[min.itemIndex].desired_quantity = Math.ceil(value/cloned[index].vendors[min.vendorIndex].relations[min.itemIndex].corrected_amount);
    cloned[index].total_sum = parseInt(cloned[index].vendors[min.vendorIndex].relations[min.itemIndex].desired_quantity) * parseInt(cloned[index].vendors[min.vendorIndex].relations[min.itemIndex].corrected_amount);

    cloned[0].vendors[min.vendorIndex].totalOrderAmount = parseInt(parseInt(cloned[index].vendors[min.vendorIndex].relations[min.itemIndex].desired_quantity)) * ((cloned[index].vendors[min.vendorIndex].relations[min.itemIndex].ideal_pmu1*cloned[index].vendors[min.vendorIndex].relations[min.itemIndex].corrected_amount)*(cloned[index].vendors[min.vendorIndex].relations[min.itemIndex].price) / cloned[index].vendors[min.vendorIndex].relations[min.itemIndex].standard_unit).toFixed(2);
  }

    console.log('amounts', amounts);

    this.setState({
      products: cloned
    })

  }

  /**
   * On hand quantity change
   */
  onHandQuantityChange = (value, index) => {
    const {products} = this.state;

    let cloned = [...products];
    cloned[index].on_hand = value;

    if(value != '' && value <= cloned[index].par_level){
      cloned[index].desired_quantity = parseInt(cloned[index].par_level) - parseInt(value);

      this.productQuantityChange(cloned[index].desired_quantity, index);
    }else {
      cloned[index].desired_quantity = 0;
      this.productQuantityChange(0, index);
    }

   this.setState({
      products: cloned
    })
  }

  relationQuantityChange = (value, productIndex, vendorIndex ,relationIndex) => {
    // const {products} = this.state;

    // let cloned = [...products];

    // let totalRelationQuantity = 0;
    // //check if its exceding the total desired quanity
    // for(let i = 0; i < cloned[productIndex].vendors.length; i++){
    //   for(let j = 0; j < cloned[productIndex].vendors[i].relations.length; j++){
    //    if(cloned[productIndex].vendors[i].relations[j].desired_quantity && !isNaN(cloned[productIndex].vendors[i].relations[j].desired_quantity)){
    //       //not include the current value
    //       if(i == vendorIndex && j == relationIndex){
    //        console.log('meets condition');
    //       }
    //       else{
    //         console.log(cloned[productIndex].vendors[i].relations[j].desired_quantity);
    //         totalRelationQuantity += parseInt(cloned[productIndex].vendors[i].relations[j].desired_quantity);
    //         console.log('totalRelationQuantity', totalRelationQuantity);
    //       }
    //    }
    //   }
    // }


    // let valueClone = value;
    // if(!value) valueClone = 0;
    // let totalAfterAddingCurrent = parseInt(totalRelationQuantity) + parseInt(valueClone);

    // if(totalAfterAddingCurrent > parseInt(cloned[productIndex].desired_quantity)){
    //   errorToaster("Cannot exceed the Desired Quantity.", "Error");
    //   return false;
    // }

    // cloned[productIndex].vendors[vendorIndex].relations[relationIndex].desired_quantity = value;

    // this.setState({
    //   products: cloned
    // })

    if(value % 1 != 0) {
      errorToaster('Decimals not allowed.');
      return false;
    }
    const {products} = this.state;

    let cloned = [...products];

    let totalRelationQuantity = 0;
    let totalInvSum = 0;

    //check if its exceding the total desired quanity
    for(let i = 0; i < cloned[productIndex].vendors.length; i++){
      let vendorTotalAmount = 0;

      for(let j = 0; j < cloned[productIndex].vendors[i].relations.length; j++){
       if(cloned[productIndex].vendors[i].relations[j].desired_quantity && !isNaN(cloned[productIndex].vendors[i].relations[j].desired_quantity)){

          //not include the current value
          if(i == vendorIndex && j == relationIndex){
           console.log('meets condition');
          }
          else{
            console.log(cloned[productIndex].vendors[i].relations[j].desired_quantity);
            totalRelationQuantity += parseInt(cloned[productIndex].vendors[i].relations[j].desired_quantity);
            console.log('totalRelationQuantity', totalRelationQuantity);


            totalInvSum += parseInt(cloned[productIndex].vendors[i].relations[j].desired_quantity) * parseInt(cloned[productIndex].vendors[i].relations[j].corrected_amount);

            vendorTotalAmount += parseInt(cloned[productIndex].vendors[i].relations[j].desired_quantity) * ((cloned[productIndex].vendors[i].relations[j].ideal_pmu1*cloned[productIndex].vendors[i].relations[j].corrected_amount)*(cloned[productIndex].vendors[i].relations[j].price) / cloned[productIndex].vendors[i].relations[j].standard_unit).toFixed(2);
          }

          

       }
      }

      console.log('vendorTotalAmount', vendorTotalAmount);
      cloned[0].vendors[i].totalOrderAmount = vendorTotalAmount;

    }


    let valueClone = value;
    if(!value) valueClone = 0;
    // let totalAfterAddingCurrent = parseInt(totalRelationQuantity) + parseInt(valueClone);

    // if(totalAfterAddingCurrent > parseInt(cloned[productIndex].desired_quantity)){
    //   errorToaster("Cannot exceed the Desired Quantity.", "Error");
    //   return false;
    // }
    totalInvSum += parseInt(valueClone) * parseInt(cloned[productIndex].vendors[vendorIndex].relations[relationIndex].corrected_amount);
    cloned[productIndex].vendors[vendorIndex].relations[relationIndex].desired_quantity = value;
    cloned[productIndex].total_sum = totalInvSum;

    this.setState({
      products: cloned
    })
  }

  openParLevelModal = async (index, productId) => {

    const parLevels = await httpGet(`${PRODUCTS_ENDPOINT}/get/parLevels/${productId}`);


    this.setState((prevState) => ({
      isModal: !prevState.isModal,
      parLevelProductId: productId,
      parLevels: parLevels.data,
      parLevelProductIndex: index
    }))
  }

  /**
   * Par Level checkBox Handle
   */
     checkBoxHandle = (index) => {
      const { parLevels } = this.state;
  
      let cloned = parLevels.slice();
      cloned[index].checkBox = !cloned[index].checkBox;
      cloned[index].amount = "";
      this.setState({
        parLevels: cloned,
      });
    };

    /**
     * Par level checkbox change
     */
    checkBoxAmount = (index, e) => {
      const { parLevels } = this.state;
  
      let cloned = parLevels.slice();
      cloned[index].amount = e.target.value;
      this.setState({
        parLevels: cloned,
      });
    };

  /**
   * close Modal
   */
     closeModal = () => {
      this.setState((prevState) => ({
        isModal: !prevState.isModal,
        parLevels: [],
        parLevelProductId: '',
        parLevelProductIndex: ''
      }))
    }

    /**
     * Par level submit handler
     */
     parLevelSubmit = async () => {
       const {parLevels, parLevelProductId, parLevelProductIndex, products} = this.state;
       const res = await httpPost(`${PRODUCTS_ENDPOINT}/update/parLevels/${parLevelProductId}`, parLevels);

       successToaster('Par Levels updated', 'success');


       let updatedparLevelIndex = parLevels.findIndex(x => x.day === products[parLevelProductIndex].currentDay);


       let cloned = products.slice();
       cloned[parLevelProductIndex].par_level = parLevels[updatedparLevelIndex].amount;
      console.log('updatedparLevelIndex', updatedparLevelIndex);
       console.log(cloned);

       this.setState({
         products: cloned
       })

       this.closeModal();
     }




  /**
   * Renders component
   */
  render() {
    const {products, loading, isModal, parLevels} = this.state;

    return (
      <React.Fragment>
        <Modal isOpen={isModal} toggle={() => this.closeModal}>
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myModalLabel">
              Please Update Par Level of this Item
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
            {parLevels.length > 0 &&
              parLevels.map((parLevel, parLevelIndex) => {
                return (
                  <FormGroup>
                    {parLevelIndex == 0 && (
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
                            value={parLevel.day}
                            checked={parLevel.checkBox}
                            onChange={(e) => this.checkBoxHandle(parLevelIndex)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck1"
                          >
                            {parLevel.day}
                          </label>
                        </div>
                      </Col>
                      <Col md="9">
                        <input
                          style={{
                            backgroundColor: !parLevel.checkBox
                              ? "#f1f1f1"
                              : "",
                          }}
                          className={`form-control`}
                          name="amount"
                          type="number"
                          value={parLevel.amount}
                          disabled={!parLevel.checkBox}
                          onChange={(e) =>
                            this.checkBoxAmount(parLevelIndex, e)
                          }
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                );
              })}
          </div>
          <div className="modal-footer">
            <Button
              className="btn btn-primary"
              onClick={() => this.parLevelSubmit()}
            >
              Update
            </Button>
          </div>
        </Modal>

        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs title="Orders" breadcrumbItem="Create" />
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
                    <Row>
                      <Col md="3">
                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            // value={weekDay.day}
                            // checked={!weekDay.checkBox}
                            // onChange={(e) =>
                            //   this.checkBoxHandle(weekDayIndex)
                            // }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck1"
                          >
                            Record quantity on hand
                          </label>
                        </div>
                      </Col>
                      {/* <Col md="4">
                        <FormGroup>
                          <Button
                            onClick={() => this.props.getUnits()}
                            color="primary"
                            className="btn btn-primary waves-effect"
                          >
                            Search
                          </Button>
                        </FormGroup>
                      </Col>
                      <Col md="5">
                        <FormGroup className="float-right">
                          <Link to={`/units/add`}>
                            <Button
                              color="primary"
                              className="btn btn-primary waves-effect"
                            >
                              Add New
                            </Button>
                          </Link>
                        </FormGroup>
                      </Col> */}
                    </Row>

                    {products.length > 0 && (
                      <div className="table-responsive">
                        <Table className="table table-striped mb-0 table">
                          <thead
                            style={{ backgroundColor: "#eeeeee !important" }}
                          >
                            <tr className="main_head">
                              {/* <th bgcolor="#eeeeee" width="5%" style={{height:'52px'}}>Your Item</th>
               <th bgcolor="#eeeeee" style={{borderRight:'1px solid'}} width="5%">Desired Quantity</th> */}

                              <th bgcolor="#eeeeee" width="5%">
                                Your Item
                              </th>
                              <th
                                bgcolor="#eeeeee"
                                style={{ borderRight: "1px solid" }}
                                width="5%"
                              >
                                Quantity
                              </th>
                              {products[0].vendors.map((vendor, i) => {
                                return (
                                  <>
                                    <th bgcolor="#eeeeee" width="5%">
                                      Status
                                    </th>
                                    <th bgcolor="#eeeeee" width="4.25%">
                                      Minimum Order
                                      <br />
                                      <span id="vendor_min_order_1067">
                                        ${vendor.minimumOrderAmount}{" "}
                                      </span>
                                    </th>
                                    <th
                                      colSpan="1"
                                      width="8.5%"
                                      bgcolor="#eeeeee"
                                      style={{ textAlign: "center" }}
                                    >
                                      {vendor.vendor}
                                    </th>
                                    <th
                                      bgcolor="#eeeeee"
                                      style={{ borderRight: "1px solid" }}
                                      width="4.25%"
                                    >
                                      Total
                                      <br />
                                      <span
                                        style={{ color: "rgb(92, 184, 92)" }}
                                        className="vendor_order_total_1067"
                                      >
                                        ${vendor.totalOrderAmount.toFixed(2)}
                                      </span>
                                      <br />
                                      <Link
                                        onClick={() => this.deleteVendor(i)}
                                      >
                                        Remove
                                      </Link>
                                      <input
                                        type="hidden"
                                        name="vendor_ids[]"
                                        id="vendor_ids"
                                        value="1067"
                                      />
                                    </th>
                                  </>
                                );
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {products.map((product, j) => {
                              return (
                                <tr className="main_row">
                                  <td width="5%">
                                    <strong>{product.product_name}</strong>

                                    <Label
                                      htmlFor="validationCustom03"
                                      style={{ marginTop: "38px" }}
                                    >
                                      Ending Inventory
                                    </Label>
                                    <div>
                                      <strong>{product.ending_inv}</strong>
                                    </div>
                                  </td>

                                  <td
                                    width="5%"
                                    style={{ borderRight: "1px solid" }}
                                  >
                                    <Label htmlFor="validationCustom03">
                                      On Hand
                                    </Label>
                                    <div
                                      className="input-group"
                                      style={{ marginRight: "75px" }}
                                    >
                                      <input
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        value={product.on_hand}
                                        onChange={(e) => this.onHandQuantityChange(e.target.value,j)}
                                      />

                                      <div className="input-group-prepend">
                                        <span
                                          style={{
                                            padding: "6px 5px",
                                            fontSize: "10px",
                                          }}
                                          className="input-group-text"
                                          id="validationTooltipUsernamePrepend"
                                        >
                                          <b>
                                            {
                                              product.inventory_unit_abbreviation
                                            }{" "}
                                          </b>
                                        </span>
                                      </div>
                                    </div>

                                    <Label
                                      htmlFor="validationCustom03"
                                      style={{ marginTop: "8px" }}
                                    >
                                      To Order
                                    </Label>
                                    <div
                                      className="input-group"
                                      style={{ marginRight: "75px" }}
                                    >
                                      <input
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        value={product.desired_quantity}
                                        onChange={(e) =>
                                          this.productQuantityChange(
                                            e.target.value,
                                            j
                                          )
                                        }
                                      />

                                      <div className="input-group-prepend">
                                        <span
                                          style={{
                                            padding: "6px 5px",
                                            fontSize: "10px",
                                          }}
                                          className="input-group-text"
                                          id="validationTooltipUsernamePrepend"
                                        >
                                          <b>
                                            {
                                              product.inventory_unit_abbreviation
                                            }{" "}
                                          </b>
                                        </span>
                                      </div>
                                    </div>

                                    <Label
                                      htmlFor="validationCustom03"
                                      style={{ marginTop: "8px" }}
                                    >
                                      Par Level
                                    </Label>
                                    <div>
                                      <strong>{product.par_level}</strong>{" "}
                                      <i
                                        onClick={() =>
                                          this.openParLevelModal(j, product.id)
                                        }
                                        style={{
                                          color: "#556ee6",
                                          cursor: "pointer",
                                        }}
                                        className="fas fa-hand-paper"
                                      ></i>
                                    </div>
                                    {/* <div className="general-fc">
                                  <div className="col-md-12">
                                    {" "}
                                    <a
                                      href="javascript:void(0)"
                                      onclick="return update_par_levels()"
                                      className="blue-link pull-left"
                                    >
                                      Update
                                    </a>
                                    <button
                                      style={{ visibility: "hidden" }}
                                      type="submit"
                                      id="update_submit"
                                      name="update_submit"
                                    ></button>
                                  </div>
                                </div> */}
                                  </td>

                                  {product.vendors.map((productVendor, k) => {
                                    return (
                                      <>
                                        {/* <td width="5%">
                                  <span style={{ color: "#009900" }}>OK</span>
                                </td> */}
                                        <td
                                          colSpan="4"
                                          style={{ borderRight: "1px solid" }}
                                          width="17%"
                                        >
                                          <table
                                            width="100%"
                                            border="0"
                                            cellSpacing="0"
                                            cellPadding="0"
                                            className="table table-bordered table-striped"
                                          >
                                            <tbody>
                                              <tr>
                                                <th
                                                  bgcolor="#eeeeee"
                                                  width="20%"
                                                >
                                                  Quantity
                                                </th>
                                                <th
                                                  bgcolor="#eeeeee"
                                                  width="20%"
                                                >
                                                  Item
                                                </th>
                                                <th
                                                  bgcolor="#eeeeee"
                                                  width="20%"
                                                >
                                                  Amount
                                                </th>
                                                <th
                                                  bgcolor="#eeeeee"
                                                  width="20%"
                                                  className="mobile-hide"
                                                >
                                                  DU Price
                                                </th>
                                                <th
                                                  bgcolor="#eeeeee"
                                                  width="20%"
                                                  className="mobile-hide"
                                                >
                                                  CU Price
                                                </th>
                                                <th
                                                  bgcolor="#eeeeee"
                                                  width="20%"
                                                  className="mobile-hide"
                                                >
                                                  IU Price
                                                </th>
                                                <th
                                                  bgcolor="#eeeeee"
                                                  width="20%"
                                                  className="mobile-hide"
                                                >
                                                  RU Price
                                                </th>
                                                <th
                                                  bgcolor="#eeeeee"
                                                  width="20%"
                                                >
                                                  Total
                                                </th>
                                              </tr>
                                              {productVendor.relations.map(
                                                (relation, m) => {
                                                  return (
                                                    <>
                                                      <tr className="vendor_tr_1067">
                                                        <td width="100%">
                                                          <input
                                                            type="number"
                                                            className="form-control"
                                                            value={
                                                              relation.desired_quantity
                                                            }
                                                            min="0"
                                                            onChange={(e) =>
                                                              this.relationQuantityChange(
                                                                e.target.value,
                                                                j,
                                                                k,
                                                                m
                                                              )
                                                            }
                                                          />
                                                        </td>
                                                        <td>
                                                          <ShowMoreText
                                                            /* Default options */
                                                            lines={2}
                                                            more="Show more"
                                                            less="Show less"
                                                            className="content-css"
                                                            anchorClassName="my-anchor-css-class"
                                                            expanded={false}
                                                            width={50}
                                                          >
                                                            {
                                                              relation.description
                                                            }
                                                          </ShowMoreText>
                                                        </td>
                                                        <td>
                                                          <div
                                                            className="col-md-12"
                                                            style={{
                                                              paddingRight:
                                                                "0px",
                                                              paddingLeft:
                                                                "0px",
                                                            }}
                                                          >
                                                            <div className="more_22730_198768">
                                                              {relation.desired_quantity ==
                                                                0 ||
                                                              relation.desired_quantity ==
                                                                ""
                                                                ? 1
                                                                : relation.desired_quantity}
                                                              {
                                                                relation.vendor_unit_abbr
                                                              }
                                                              (
                                                              {relation.desired_quantity ==
                                                                0 ||
                                                              relation.desired_quantity ==
                                                                ""
                                                                ? relation.corrected_amount
                                                                : relation.desired_quantity *
                                                                  relation.corrected_amount}
                                                              {
                                                                product.inventory_unit_abbreviation
                                                              }
                                                              ){" "}
                                                            </div>
                                                            {/* <div className="more_22730_198768">
                                             1{relation.vendor_unit_abbr} 
                                              (
                                                {relation.corrected_amount}
                                                 
                                              {product.inventory_unit_abbreviation}){" "}
                                            </div> */}
                                                            <div
                                                              className="less_22730_198768"
                                                              style={{
                                                                display: "none",
                                                              }}
                                                            >
                                                              0.00 CS (0.00 CT){" "}
                                                            </div>
                                                          </div>
                                                        </td>

                                                        <td>
                                                          <div className="col-md-12">
                                                            <div className="more_price_1067 more_22730_198768">
                                                              $
                                                              {(
                                                                (relation.ideal_pmu1 *
                                                                  relation.corrected_amount *
                                                                  relation.price) /
                                                                relation.standard_unit
                                                              ).toFixed(2)}
                                                              /
                                                              {
                                                                relation.vendor_unit_abbr
                                                              }
                                                            </div>
                                                            <div
                                                              className="less_price_1067 less_22730_198768"
                                                              style={{
                                                                display: "none",
                                                              }}
                                                            >
                                                              $0.00
                                                            </div>
                                                          </div>
                                                        </td>

                                                        <td>
                                                          <div className="col-md-12">
                                                            <div className="more_price_1067 more_22730_198768">
                                                              $
                                                              {(
                                                                (relation.ideal_pmu1 *
                                                                  relation.corrected_amount *
                                                                  relation.price) /
                                                                relation.standard_unit /
                                                                (relation.ideal_pmu1 *
                                                                  relation.corrected_amount)
                                                              ).toFixed(2)}
                                                              /
                                                              {
                                                                product.unit_abbreviation
                                                              }
                                                            </div>
                                                          </div>
                                                        </td>

                                                        <td>
                                                          <div className="col-md-12">
                                                            <div className="more_price_1067 more_22730_198768">
                                                              $
                                                              {(
                                                                (relation.ideal_pmu1 *
                                                                  relation.corrected_amount *
                                                                  relation.price) /
                                                                relation.standard_unit /
                                                                relation.corrected_amount
                                                              ).toFixed(2)}
                                                              /
                                                              {
                                                                product.inventory_unit_abbreviation
                                                              }
                                                            </div>
                                                          </div>
                                                        </td>

                                                        <td>
                                                          <div className="col-md-12">
                                                            <div className="more_price_1067 more_22730_198768">
                                                              $
                                                              {(
                                                                (relation.ideal_pmu1 *
                                                                  relation.corrected_amount *
                                                                  relation.price) /
                                                                relation.standard_unit /
                                                                (relation.ideal_pmu1 *
                                                                  relation.corrected_amount) /
                                                                relation.pmu_value
                                                              ).toFixed(2)}
                                                              /
                                                              {
                                                                product.pmu_unit_abbreviation
                                                              }
                                                            </div>
                                                          </div>
                                                        </td>

                                                        <td>
                                                          <div className="col-md-12">
                                                            <div className="more_price_1067 more_22730_198768">
                                                              $
                                                              {(
                                                                ((relation.ideal_pmu1 *
                                                                  relation.corrected_amount *
                                                                  relation.price) /
                                                                  relation.standard_unit) *
                                                                relation.desired_quantity
                                                              ).toFixed(2)}
                                                            </div>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                      {relation.desired_quantity !=
                                                        "" &&
                                                        relation.desired_quantity !=
                                                          0 && (
                                                          <tr class="itemclass_22771 alert_22771_187647">
                                                            <td colspan="8">
                                                              <div class="more_22771_187647">
                                                                <div class="col-md-10">
                                                                  <span
                                                                    style={{
                                                                      color:
                                                                        product.desired_quantity >
                                                                        product.total_sum
                                                                          ? "#eea236"
                                                                          : "rgb(92, 184, 92)",
                                                                    }}
                                                                  >
                                                                    {`Your Desired quantity is ${product.desired_quantity} and you are buying ${product.total_sum}`}
                                                                  </span>
                                                                </div>
                                                                <div class="col-md-2">
                                                                  {" "}
                                                                  <a
                                                                    class="arrow-decrease"
                                                                    href="javascript:void(0);"
                                                                    title="Reduce 0.15 LB"
                                                                  ></a>
                                                                </div>
                                                                <br />
                                                              </div>
                                                            </td>
                                                          </tr>
                                                        )}
                                                    </>
                                                  );
                                                }
                                              )}
                                            </tbody>
                                          </table>
                                        </td>
                                      </>
                                    );
                                  })}
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </div>
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
  const { units, loading, filter } = state.Unit;
  return { units, loading, filter };
};

export default withRouter(
  connect(mapStatetoProps, { getUnits, deleteUnit, editUnit, setUnitFilter })(
    Orders
  )
);
