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
  Modal,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  getProducts,
  editProduct,
  deleteProduct,
  setProductFilter,
  getVendors,
  getUnitsList,
  getIgnoreCommentsList,
  getItemLocationsList,
  getCategoriesList,
  getVendorsList,
  setProducts,
  addProductSort,
} from "../../store/actions";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Loader from "../../components/Common/Loader";
import CustomPagination from "../../components/Common/Pagination";
import { httpGet, httpPost, httpPut } from "../../utils/http";
import {
  PRODUCTS_ENDPOINT,
  UNITS_ENDPOINT,
  VENDOR_ITEMS_ENDPOINT,
  PRODUCT_ITEM_RELATIONS_ENDPOINT,
  IGNORE_COMMENTS_ENDPOINT,
  ASSETS_PATH,
  ITEM_LOCATIONS_ENDPOINT,
  CATEGORIES_ENDPOINT,
  CONVERSIONS_ENDPOINT
} from "../../config/endPoints";
import { successToaster, errorToaster } from "../../components/Common/Toaster";
import Select from "react-select";
import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import "./style.css";
import ShowMoreText from 'react-show-more-text';

const DragHandle = sortableHandle(() => <i style={{cursor: 'pointer'}} className="fas fa-align-justify wookai_orange"></i>);

const customStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    // const color = chroma(data.color);
    console.log({ data, isDisabled, isFocused, isSelected });
    return {
      ...styles,
      color: data.relationType == 1 ? "red" : null
    };
  }
};


const SortableItem = sortableElement(({productKey, value,
  products,
  unitsList,
  ignoreCommentsList,
  itemLocationsList,
  categoriesList,
  vendorsList,
  filter: { offSet, limit, pages, currentPage, query },
  loading,
  isModal,
  selectedProduct,
  selectedVendor,
  selectedVendorName,
  relationType,
  selectedOtherVendor,
  comments,
  vendorItemsList,
  otherVendorsRelationList,
  standardUnit,
  correctAmount,
  selectedVendorItem,
  lcu,
  comment,
  countingUnit,
  unitId,
  productRelatedVendorItems,
  default_unit_id,
  fk_unit_id,
  pmu,
  iu_unit_id,
  ideal_pmu,
  ideal_pmu1,
  ideal_pmu2,
  selectedOption,
  vendorItemsListForSelect,
  showVendors,
  inputChangeHandeler,
  saveChanges,
  showRelation,
  vendorItemChange,
  getUnitById,
  relationInputOnChange,
  saveOrMultiRelate,
  saveAndNextPendingItem,
  pendingRelation,
  notStocked,
  modalChange,
  standardUnitChange,
  showSavedRelation,
  getConversionValues
}) => 
<React.Fragment>
<tr >
  <td>
    {" "}
    <button
      className="btn btn-success btn-sm"
      onClick={() =>
        showVendors(
          value.id,
        )
      }
    >
      {
        selectedProduct == value.id && '-'
      }
      {
        selectedProduct != value.id && '+'
      }
    </button>{" "}
  </td>
  <td>
    <DragHandle />
  </td>
  <td>
    <img width="70px" src={value.image ? `${ASSETS_PATH}/uploads/items_image/${value.image}` : `${ASSETS_PATH}/images/noimagefound.jpg`} />
  </td>
  <td>
    {value.product_name}
  </td>
  <td>
    <ShowMoreText
      /* Default options */
      lines={2}
      more='Show more'
      less='Show less'
      className='content-css'
      anchorClass='my-anchor-css-class'
      expanded={false}
      width={100}
    >
        {value.product_description}
    </ShowMoreText>

  </td>
  <td>
    {value.location_name}
  </td>
  <td>
    {value.category_name}
  </td>
  <td width="16%">
    <select
        onChange={(event) => getConversionValues(event, productKey)}
        className="form-control"
        name="pmu"
        value={value.pmu ? value.pmu : ''}
      >
        <option disabled value="">
          --select--
        </option>
        {unitsList.map(
          (
            unit,
            unitIndex
          ) => {
          return (
            <option
              key={
                unitIndex
              }
              value={
                unit.id
              }
            >
              {
                unit.unit_name
              }
            </option>
          );
        }
      )}
    </select>
  </td>
  <td width="12%">
    <input
      className="form-control"
      value={value.ideal_pmu}
      name="ideal_pmu"
      type="number"
      onChange={(event) => inputChangeHandeler(event, productKey)}
    />
  </td>
  <td width="16%">
    <select
        onChange={(event) => getConversionValues(event, productKey)}
        className="form-control"
        name="fk_unit_id"
        value={value.fk_unit_id ? value.fk_unit_id : ''}
      >
        <option disabled value="">
          --select--
        </option>
        {unitsList.map(
          (
            unit,
            unitIndex
          ) => {
          return (
            <option
              key={
                unitIndex
              }
              value={
                unit.id
              }
            >
              {
                unit.unit_name
              }
            </option>
          );
        }
      )}
    </select>
  </td>
  <td width="12%">
    <input
        className="form-control"
        value={value.ideal_pmu1}
        name="ideal_pmu1"
        type="number"
        onChange={(event) => inputChangeHandeler(event, productKey)}
      />
  </td>
  <td width="16%">
    <select
        onChange={(event) => getConversionValues(event, productKey)}
        className="form-control"
        name="iu_unit_id"
        value={value.iu_unit_id ? value.iu_unit_id : ''}
      >
        <option disabled value="">
          --select--
        </option>
        {unitsList.map(
          (
            unit,
            unitIndex
          ) => {
          return (
            <option
              key={
                unitIndex
              }
              value={
                unit.id
              }
            >
              {
                unit.unit_name
              }
            </option>
          );
        }
      )}
    </select>
  </td>
  <td width="12%">
    <input
        className="form-control"
        value={value.ideal_pmu2}
        name="ideal_pmu2"
        type="number"
        onChange={(event) => inputChangeHandeler(event, productKey)}
      />
  </td>
  <td width="16%">
    <select
          onChange={(event) => getConversionValues(event, productKey)}
          className="form-control"
          name="default_unit_id"
          value={value.default_unit_id ? value.default_unit_id : ''}
        >
          <option disabled value="">
            --select--
          </option>
          {unitsList.map(
            (
              unit,
              unitIndex
            ) => {
            return (
              <option
                key={
                  unitIndex
                }
                value={
                  unit.id
                }
              >
                {
                  unit.unit_name
                }
              </option>
            );
          }
        )}
      </select>
  </td>
  <td>
    <UncontrolledDropdown>
        <DropdownToggle href="#" className="card-drop" tag="i">
            <i className="mdi mdi-dots-horizontal font-size-18"></i>
        </DropdownToggle>
        <DropdownMenu right>
        <DropdownItem
               onClick={() =>
                {
                  if (
                    window.confirm(
                      "If you have changed any of unit then your relations will be break?"
                    )
                  ) {
                    saveChanges(productKey);
                  }
                }
              }
            ><i className="mdi mdi-content-save font-size-16 wookai_orange mr-2"></i>Save</DropdownItem>
          <Link to={`/items/edit/${value.id}`}>
              <DropdownItem><i className="mdi mdi-pencil font-size-16 text-success mr-2"></i>Edit</DropdownItem>
          </Link>
            <DropdownItem
               onClick={() => {
                if (
                  window.confirm(
                    "Are you sure to delete the item?"
                  )
                ) {
                  deleteProduct(
                    value.id
                  );
                }
              }}
            ><i className="mdi mdi-trash-can font-size-16 text-danger mr-2"></i>Delete</DropdownItem>
        </DropdownMenu>
    </UncontrolledDropdown>
  </td>
</tr>
{selectedProduct == value.id && (
  <tr>
    <td colSpan="15">
      <Table className="table table-striped mb-0 table">
        <thead>
          <tr>
            <th>Supplier Name</th>
            <th>Item No</th>
            <th>Brand</th>
            <th>Description</th>
            <th>Recipe Unit (RU)</th>
            <th>#RU IN 1 CU	</th>
            <th>Cost Unit (CU)</th>
            <th>#CU IN 1 IU</th>
            <th>Inventory Unit (IU)</th>
            <th>#IU IN 1 DU</th>
            <th>Delivery Unit (DU)</th>
          </tr>
        </thead>
        <tbody>
          {vendorsList.map((vendor, vendorKey) => {
            return (
              <React.Fragment>
                <tr key={vendorKey}>
                  <td>
                    {" "}
                    <button    
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        showRelation(
                          vendor.id,
                          vendor.vendor_name
                        )
                      }
                    >
                      {
                        selectedVendor == vendor.id && '-'
                      }
                      {
                        selectedVendor != vendor.id && '+'
                      }
                    </button>{" "}
                    &nbsp; &nbsp;
                    {vendor.vendor_name}
                  </td>
                  <td>
                    <ul className="no-bullet">
                      {
                        productRelatedVendorItems.length > 0 &&
                        productRelatedVendorItems.map((productRelatedVendorItem, productRelatedVendorItemIndex) => {
                          if(productRelatedVendorItem.vendor_id == vendor.id){
                            return(
                              <li key={productRelatedVendorItemIndex}>
                                {productRelatedVendorItem.item && 
                                 
                                 <Link 
                                    onClick={() => showSavedRelation(vendor.id, vendor.vendor_name, productRelatedVendorItem.relation_id)}>
                                    {productRelatedVendorItem.item}
                                 </Link>
                                
                                }
                                {productRelatedVendorItem.relation_type == 0 && 'Pending'}
                                {productRelatedVendorItem.relation_type == -1 && 'Ignored'}
                                {/* {productRelatedVendorItem.relation_type == 2 && 'Client Review'} */}
                                {productRelatedVendorItem.relation_type == -3 && 'Not Stocked'}

                              </li>
                            )
                          }
                        })
                      }
                    </ul>
                  </td>
                  <td>
                    <ul className="no-bullet">
                      {
                        productRelatedVendorItems.length > 0 &&
                        productRelatedVendorItems.map((productRelatedVendorItem, productRelatedVendorItemIndex) => {
                          if(productRelatedVendorItem.vendor_id == vendor.id){
                            return(
                              <li key={productRelatedVendorItemIndex}>
                                {productRelatedVendorItem.brand}
                              </li>
                            )
                          }
                        })
                      }
                    </ul>
                  </td>
                  <td>
                    <ul className="no-bullet">
                      {
                        productRelatedVendorItems.length > 0 &&
                        productRelatedVendorItems.map((productRelatedVendorItem, productRelatedVendorItemIndex) => {
                          if(productRelatedVendorItem.vendor_id == vendor.id){
                            return(
                              <li key={productRelatedVendorItemIndex}>
                                {productRelatedVendorItem.description}
                              </li>
                            )
                          }
                        })
                      }
                    </ul>
                  </td>
                  <td>
                    <ul className="no-bullet">
                      {
                        productRelatedVendorItems.length > 0 &&
                        productRelatedVendorItems.map((productRelatedVendorItem, productRelatedVendorItemIndex) => {
                          if(productRelatedVendorItem.vendor_id == vendor.id){
                            return(
                              <li key={productRelatedVendorItemIndex}>
                                {productRelatedVendorItem.pmu_unit_abbreviation}
                              </li>
                            )
                          }
                        })
                      }
                    </ul>
                  </td>
                  <td>
                    <ul className="no-bullet">
                      {
                        productRelatedVendorItems.length > 0 &&
                        productRelatedVendorItems.map((productRelatedVendorItem, productRelatedVendorItemIndex) => {
                          if(productRelatedVendorItem.vendor_id == vendor.id){
                            return(
                              <li key={productRelatedVendorItemIndex}>
                                {productRelatedVendorItem.pmu_value}
                              </li>
                            )
                          }
                        })
                      }
                    </ul>
                  </td>
                  <td>
                    <ul className="no-bullet">
                      {
                        productRelatedVendorItems.length > 0 &&
                        productRelatedVendorItems.map((productRelatedVendorItem, productRelatedVendorItemIndex) => {
                          if(productRelatedVendorItem.vendor_id == vendor.id){
                            return(
                              <li key={productRelatedVendorItemIndex}>
                                {productRelatedVendorItem.unit_abbreviation}
                              </li>
                            )
                          }
                        })
                      }
                    </ul>
                  </td>
                  <td>
                    <ul className="no-bullet">
                      {
                        productRelatedVendorItems.length > 0 &&
                        productRelatedVendorItems.map((productRelatedVendorItem, productRelatedVendorItemIndex) => {
                          if(productRelatedVendorItem.vendor_id == vendor.id){
                            return(
                              <li key={productRelatedVendorItemIndex}>
                                {productRelatedVendorItem.ideal_pmu1}
                              </li>
                            )
                          }
                        })
                      }
                    </ul>
                  </td>
                  <td>
                    <ul className="no-bullet">
                      {
                        productRelatedVendorItems.length > 0 &&
                        productRelatedVendorItems.map((productRelatedVendorItem, productRelatedVendorItemIndex) => {
                          if(productRelatedVendorItem.vendor_id == vendor.id){
                            return(
                              <li key={productRelatedVendorItemIndex}>
                                {productRelatedVendorItem.iu_unit_abbreviation}
                              </li>
                            )
                          }
                        })
                      }
                    </ul>
                  </td>
                  <td>
                    <ul className="no-bullet">
                      {
                        productRelatedVendorItems.length > 0 &&
                        productRelatedVendorItems.map((productRelatedVendorItem, productRelatedVendorItemIndex) => {
                          if(productRelatedVendorItem.vendor_id == vendor.id){
                            return(
                              <li key={productRelatedVendorItemIndex}>
                                {productRelatedVendorItem.corrected_amount}
                              </li>
                            )
                          }
                        })
                      }
                    </ul>
                  </td>
                  <td>
                    <ul className="no-bullet">
                      {
                        productRelatedVendorItems.length > 0 &&
                        productRelatedVendorItems.map((productRelatedVendorItem, productRelatedVendorItemIndex) => {
                          if(productRelatedVendorItem.vendor_id == vendor.id){
                            return(
                              <li key={productRelatedVendorItemIndex}>
                                  {productRelatedVendorItem.default_unit_abbreviation}
                              </li>
                            )
                          }
                        })
                      }
                    </ul>
                  </td>
                </tr>
                {selectedVendor ==
                  vendor.id && (
                  <tr>
                    <td colSpan="11">
                      <Row>
                        <Col md="12">
                          <h3 className="text-center">
                            Relationship with
                            Vendor/Supplier
                          </h3>
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col md="6">
                          <h5
                            className="text-center"
                            style={{
                              backgroundColor:
                                "#eeeeee",
                            }}
                          >
                            Supplier Price
                            List Item &
                            Information
                          </h5>
                          <div>
                            <Select
                              styles={customStyles}
                              value={selectedVendorItem.selectedOption}
                              onChange={
                                vendorItemChange
                              }
                              options={vendorItemsListForSelect}
                              classNamePrefix="select2-selection"
                              name="vendor_item_id"
                            />
                          </div>
                          <div>
                            Item No:{" "}
                            <b>{
                              selectedVendorItem.item
                            }</b>
                          </div>
                          <div>
                            Description:{" "}
                            <b>
                              {
                                selectedVendorItem.description
                              }
                            </b>
                          </div>
                          <div>
                            Size:{" "}
                            <b>{
                              selectedVendorItem.size
                            }</b>
                          </div>
                          <div>
                            Brand:{" "}
                            <b>{
                              selectedVendorItem.brand
                            }</b>
                          </div>
                          <div>
                            Price: 
                            <b>${
                              selectedVendorItem.price
                            }</b>
                          </div>
                          <div>
                            Split Price: 
                            <b>${
                              selectedVendorItem.splitPrice
                            }</b>
                          </div>
                          <div>
                            Pack:{" "}
                            <b>{
                              selectedVendorItem.pack
                            }</b>
                          </div>
                        </Col>
                        <Col md="6" className="justify-content-center">
                          <h5
                            className="text-center"
                            style={{
                              backgroundColor:
                                "#eeeeee",
                            }}
                          >
                            Item Cost Summary
                          </h5>

                          <Table className="table table-bordered">
                          <tbody>
                            <tr>
                              <td>
                              <b>DELIVERY UNIT (DU)</b> - THE <b>
                                {getUnitById(default_unit_id)}
                                </b> COST OF THIS ITEM IS <b>${ selectedVendorItem.price && standardUnit &&
                              ((ideal_pmu1*ideal_pmu2)*(selectedVendorItem.price) / standardUnit).toFixed(2)
                                }</b> 
                              </td>
                            </tr>
                            <tr>
                                <td>
                                <b>COST UNIT (CU)</b> - THE <b>
                                  {getUnitById(fk_unit_id)}
                                  </b> COST OF THIS ITEM IS <b>
                                    ${((((ideal_pmu1*ideal_pmu2)*(selectedVendorItem.price) / standardUnit))/(ideal_pmu1*ideal_pmu2)).toFixed(2)}</b>
                                </td>
                            </tr>
                            <tr>
                              <td>
                              <b>INVENTORY UNIT (CU)</b> - THE <b>
                                
                              {getUnitById(iu_unit_id)}
                              </b> COST OF THIS ITEM IS <b>${ selectedVendorItem.price && standardUnit &&
                              (((ideal_pmu1*ideal_pmu2)*(selectedVendorItem.price) / standardUnit)/ideal_pmu2).toFixed(2)
                          }</b> 
                              </td>
                            </tr>
                            <tr>
                              <td>
                              <b>RECIPE UNIT (RU)</b> - THE <b>
                                {getUnitById(pmu)}
                                </b> COST OF THIS ITEM IS <b>${
                             selectedVendorItem.price && 
                             ((((ideal_pmu1*ideal_pmu2)*(selectedVendorItem.price) / standardUnit)/(ideal_pmu1*ideal_pmu2))/ideal_pmu).toFixed(2)
                           }</b>
                              </td>
                            </tr>
                            </tbody>
                          </Table>
                          
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col
                          md="3"
                        >
                           <FormGroup>
                            <Label htmlFor="validationCustom01">
                              Delivery Unit (DU)
                            </Label>
                          <select
                            style={{backgroundColor: "#f1f1f1"}}
                            disabled={true}
                            className="form-control"
                            value={default_unit_id ? default_unit_id : ''}
                            name="default_unit_id"
                            onChange={(e) => relationInputOnChange(e)}
                          >
                            <option disabled value="">
                              --select--
                            </option>
                            {unitsList.map(
                              (unit, unitKey) => {
                                return (
                                  <option
                                    key={unitKey}
                                    value={
                                      unit.id
                                    }
                                  >
                                    {
                                      unit.unit_abbreviation
                                    }{" "}
                                    (
                                    {
                                      unit.unit_name
                                    }
                                    )
                                  </option>
                                );
                              }
                            )}
                          </select>
                          </FormGroup>
                        </Col>
                        <Col
                          md="3"
                        >
                          <FormGroup>
                            <Label htmlFor="validationCustom01">
                              #IU IN 1 DU
                            </Label>
                            <input
                              className="form-control"
                              value={ideal_pmu2}
                              onChange={(e) => relationInputOnChange(e)}
                              name="ideal_pmu2"
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                        <Col
                          md="3"
                        >
                          <FormGroup>
                            <Label htmlFor="validationCustom01">
                                Inventory Unit (IU)
                            </Label>
                          <select
                            style={{backgroundColor: "#f1f1f1"}}
                            disabled={true}
                            className="form-control"
                            value={iu_unit_id ? iu_unit_id : ''}
                            name="iu_unit_id"
                            onChange={(e) => relationInputOnChange(e)}
                          >
                            <option disabled value="">
                              --select--
                            </option>
                            {unitsList.map(
                              (unit, unitKey) => {
                                return (
                                  <option
                                    key={unitKey}
                                    value={
                                      unit.id
                                    }
                                  >
                                    {
                                      unit.unit_abbreviation
                                    }{" "}
                                    (
                                    {
                                      unit.unit_name
                                    }
                                    )
                                  </option>
                                );
                              }
                            )}
                          </select>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          md="3"
                        >
                          <FormGroup>
                            <Label htmlFor="validationCustom01">
                              Inventory Unit (IU)
                            </Label>
                          <select
                            style={{backgroundColor: "#f1f1f1"}}
                            disabled={true}
                            className="form-control"
                            value={iu_unit_id ? iu_unit_id : ''}
                            name="iu_unit_id"
                            onChange={(e) => relationInputOnChange(e)}
                          >
                            <option disabled value="">
                              --select--
                            </option>
                            {unitsList.map(
                              (unit, unitKey) => {
                                return (
                                  <option
                                    key={unitKey}
                                    value={
                                      unit.id
                                    }
                                  >
                                    {
                                      unit.unit_abbreviation
                                    }{" "}
                                    (
                                    {
                                      unit.unit_name
                                    }
                                    )
                                  </option>
                                );
                              }
                            )}
                          </select>
                          </FormGroup>
                        </Col>
                        <Col
                          md="3"
                        >
                          <FormGroup>
                          <Label htmlFor="validationCustom01">
                              #IU IN 1 CU
                            </Label>
                            <input
                              className="form-control"
                              value={ideal_pmu1}
                              onChange={(e) => relationInputOnChange(e)}
                              name="ideal_pmu1"
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                        <Col
                          md="3"
                        >
                          <FormGroup>
                          <Label htmlFor="validationCustom01">
                              Cost Unit (CU)
                            </Label>
                          <select
                            style={{backgroundColor: "#f1f1f1"}}
                            disabled={true}
                            className="form-control"
                            value={fk_unit_id ? fk_unit_id : ''}
                            name="fk_unit_id"
                            onChange={(e) => relationInputOnChange(e)}
                          >
                            <option disabled value="">
                              --select--
                            </option>
                            {unitsList.map(
                              (unit, unitKey) => {
                                return (
                                  <option
                                    key={unitKey}
                                    value={
                                      unit.id
                                    }
                                  >
                                    {
                                      unit.unit_abbreviation
                                    }{" "}
                                    (
                                    {
                                      unit.unit_name
                                    }
                                    )
                                  </option>
                                );
                              }
                            )}
                          </select>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          md="3"
                        >
                          <FormGroup>
                          <Label htmlFor="validationCustom01">
                              Cost Unit (CU)
                            </Label>
                          <select
                            style={{backgroundColor: "#f1f1f1"}}
                            disabled={true}
                            className="form-control"
                            value={fk_unit_id ? fk_unit_id : ''}
                            name="fk_unit_id"
                            onChange={(e) => relationInputOnChange(e)}
                          >
                            <option disabled value="">
                              --select--
                            </option>
                            {unitsList.map(
                              (unit, unitKey) => {
                                return (
                                  <option
                                    key={unitKey}
                                    value={
                                      unit.id
                                    }
                                  >
                                    {
                                      unit.unit_abbreviation
                                    }{" "}
                                    (
                                    {
                                      unit.unit_name
                                    }
                                    )
                                  </option>
                                );
                              }
                            )}
                          </select>
                          </FormGroup>
                        </Col>
                        <Col
                          md="3"
                        >
                          <FormGroup>
                          <Label htmlFor="validationCustom01">
                              #RU IN 1 CU
                            </Label>
                            <input
                              className="form-control"
                              value={ideal_pmu}
                              onChange={(e) => relationInputOnChange(e)}
                              name="ideal_pmu"
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                        <Col
                          md="3"
                        >
                          <FormGroup>
                          <Label htmlFor="validationCustom01">
                              Recipe Unit (RU)
                            </Label>
                          <select
                            style={{backgroundColor: "#f1f1f1"}}
                            disabled={true}
                            className="form-control"
                            value={pmu ? pmu : ''}
                            name="pmu"
                            onChange={(e) => relationInputOnChange(e)}
                          >
                            <option disabled value="">
                              --select--
                            </option>
                            {unitsList.map(
                              (unit, unitKey) => {
                                return (
                                  <option
                                    key={unitKey}
                                    value={
                                      unit.id
                                    }
                                  >
                                    {
                                      unit.unit_abbreviation
                                    }{" "}
                                    (
                                    {
                                      unit.unit_name
                                    }
                                    )
                                  </option>
                                );
                              }
                            )}
                          </select>
                          </FormGroup>
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col
                          md="2"
                        >
                          <div>
                            <b>
                              $
                              {
                                selectedVendorItem.price
                              }
                            </b>{" "}
                            represent price of
                          </div>
                        </Col>
                        <Col
                          md="2"
                        >
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              value={
                                standardUnit
                              }
                              onChange={(e) => standardUnitChange(e.target.value)}
                            />

                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                id="validationTooltipUsernamePrepend"
                              >
                                <b>
                                  {
                                    value.unit_abbreviation
                                  }{" "}
                                </b>
                              </span>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <hr />
                      <div>
                        {" "}
                        Price of{" "}
                        <b>
                          1 {value.default_unit_abbr} ({value.default_unit})
                        </b>{" "}
                        will be{" "}
                        <b>
                          $
                          { selectedVendorItem.price && standardUnit &&
                              ((ideal_pmu1*ideal_pmu2)*(selectedVendorItem.price) / standardUnit).toFixed(2)
                          } 
                          {" "} </b>
                          and the <b>{value.default_unit_abbr} ({value.default_unit}) </b>
                          will contain <b>{(ideal_pmu1*ideal_pmu2)} {value.unit_abbreviation} ({value.unit_name})</b>
                       
                      </div>
                      <hr />
                      <Row className="justify-content-center">
                        <Col
                          md="3"
                        >
                          <Button
                            color="success"
                            onClick={() =>
                              saveOrMultiRelate(
                                value.unit_abbreviation,
                                value.ideal_pmu
                              )
                            }
                          >
                            Save or Create Another option for this item with this supplier
                          </Button>
                        </Col>
                        <Col
                          md="3"
                        >
                          <Button color="success"
                           onClick={() =>
                            saveAndNextPendingItem()
                          }
                          >
                           Save Item set up & Go to this suppliers next pending item 
                          </Button>
                        </Col>

                        {relationType == 1 && (
                        <React.Fragment>
                            <Col
                              md="3"
                            >
                              <Button
                                className="btn wookai_orange_button waves-effect"
                                 onClick={() => modalChange()}
                              >
                                Reason to Ignore this Item from this Supplier
                              </Button>
                            </Col>
                            <Col
                              md="3"
                            >
                              <Button
                                color="danger"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      `This item is already related. Marking it pending will lose relationship with all items of ${vendor.vendor_name}. You can relate it later while its pending. Proceed?`
                                    )
                                  ) {
                                    pendingRelation();
                                  }
                                }}
                              >
                                Reset this Buying Relation
                              </Button>
                            </Col>
                        </React.Fragment>
                      )}

                      {relationType == 0 && (
                        <React.Fragment>
                            <Col
                              md="3"
                            >
                              <Button
                                className="btn wookai_orange_button waves-effect"
                                onClick={() => modalChange()}
                              >
                                 Reason to Ignore this Item from this Supplier
                              </Button>
                            </Col>
                            <Col
                              md="3"
                            >
                              <Button 
                                className="btn wookai_orange_button waves-effect"
                                onClick={() => notStocked()}
                              >
                                This Item is not Stocked By this
                                Supplier
                              </Button>
                            </Col>
                        </React.Fragment>
                      )}

                      {relationType == -1 && (
                        <React.Fragment>
                            <Col
                              md="3"
                            >
                              <Button color="danger"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      `This item is already related. Marking it pending will lose relationship with all items of ${vendor.vendor_name}. You can relate it later while its pending. Proceed?`
                                    )
                                  ) {
                                    pendingRelation();
                                  }
                                }}
                              >
                                Reset this Buying Relation
                              </Button>
                            </Col>
                        </React.Fragment>
                      )}

                    {
                      relationType == 2 && (
                        <React.Fragment>
                            <Col
                              md="3"
                            >
                              <Button color="danger"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      `This item is already related. Marking it pending will lose relationship with all items of ${vendor.vendor_name}. You can relate it later while its pending. Proceed?`
                                    )
                                  ) {
                                    pendingRelation();
                                  }
                                }}
                              >
                                Reset this Buying Relation
                              </Button>
                            </Col>
                            <Col
                              md="3"
                            >
                              <Button 
                              className="btn wookai_orange_button waves-effect" 
                              onClick={() => modalChange()}
                              >
                                Reason to Ignore this Item from this Supplier
                              </Button>
                            </Col>
                            <Col
                              md="3"
                            >
                              <Button color="danger" 
                                onClick={() => notStocked()}
                              >
                                This Item is not Stocked By this
                                Supplier
                              </Button>
                            </Col>
                        </React.Fragment>
                      )}
                      </Row>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </Table>
    </td>
  </tr>
)}
</React.Fragment>
);

const SortableContainer = sortableContainer(({children}) => {
  return <tbody>{children}</tbody>;
});

class Products extends React.Component {
  /**
   * component state
   */
  state = {
    dragStartIndex: '',
    dragEndIndex: '',
    isModal: false,
    selectedProduct: "",
    selectedVendor: "",
    selectedVendorName: "",
    relationType: "",
    countingUnit: "",
    unitId: "",
    selectedOtherVendor: "",
    correctAmount: "",
    standardUnit: "",
    standardOrCorrectFlag: false,
    comment: '',
    vendorItemsList: [],
    vendorItemsListForSelect: [],
    otherVendorsRelationList: [],
    selectedVendorItem: {
      id: "",
      item: "",
      description: "",
      size: "",
      brand: "",
      price: "",
      splitPrice: "",
      pack: "",
      selectedOption: ""
    },
    productRelatedVendorItems: [],
    default_unit_id: '',
    fk_unit_id: '',
    pmu:'',
    iu_unit_id: '',
    ideal_pmu: '',
    ideal_pmu1: '',
    ideal_pmu2: '',
    sorts: [
      {
        name: '',
        direction: ''
      }
    ],
    componentLoader: false
  };

  /**
   * Component Did mount
   */
  async componentDidMount() {
    this.props.getProducts();
    this.props.getUnitsList();
    this.props.getIgnoreCommentsList();
    this.props.getItemLocationsList();
    this.props.getCategoriesList();
    this.props.getVendorsList();
  }

  /**
   * get Unit by id
   */
   getUnitById = (id) => {
    const {unitsList} = this.props;

    const unit = unitsList.find((u) => u.id == id);
    return `${unit.unit_name} (${unit.unit_abbreviation})`;
  }

  /**
   * pagination Handle click
   */
  PaginationHandleClick = (offSet, page) => {
    this.props.setProductFilter({
      field: "currentPage",
      value: page,
    });

    this.props.setProductFilter({
      field: "offSet",
      value: offSet,
    });

    this.props.getProducts();
  };

  /**
   * shows all vendors
   */
  showVendors = async (productId) => {
    const { selectedProduct } = this.state;
    if (selectedProduct == productId) {
      this.setState({
        selectedProduct: "",
        relationType: '',
        selectedVendor: "",
        countingUnit: "",
        vendorItemsList:[],
        default_unit_id: '',
        fk_unit_id: '',
        pmu: '',
        iu_unit_id: '',
        ideal_pmu: '',
        ideal_pmu1: '',
        ideal_pmu2: '',
        correctAmount: '',
        standardUnit: '',
        selectedVendorItem: {
          id: '',
          item: '',
          description: '',
          size: '',
          brand: '',
          price: '',
          splitPrice: '',
          pack: '',
          selectedOption: ''
        }
      });

      return false;
    }

    
    const res = await httpGet(`${PRODUCT_ITEM_RELATIONS_ENDPOINT}/productRelatedVendorsItems/${productId}`);
    this.setState({
      selectedProduct: productId,
      productRelatedVendorItems: res.data,
      selectedVendor: '',
      vendorItemsList:[],
      default_unit_id: '',
      fk_unit_id: '',
      pmu: '',
      iu_unit_id: '',
      ideal_pmu: '',
      ideal_pmu1: '',
      ideal_pmu2: '',
      correctAmount: '',
      standardUnit: '',
      relationType: '',
      selectedVendorItem: {
        id: '',
        item: '',
        description: '',
        size: '',
        brand: '',
        price: '',
        splitPrice: '',
        pack: '',
        selectedOption: ''
      }
    });

    setTimeout(() => {
      console.log(this.state.productRelatedVendorItems);
    }, 2000)
  };

  /**
   * shows item relation with vendor
   */
  showRelation = async (vendorId, vendorName) => {
    console.log(vendorId);
    const { selectedVendor, selectedProduct } = this.state;
    const {products} = this.props;

    if (selectedVendor == vendorId) {
      this.setState({
        relationType: '',
        selectedVendor: "",
        selectedVendorName: '',
        vendorItemsList:[],
        default_unit_id: '',
        fk_unit_id: '',
        pmu: '',
        iu_unit_id: '',
        ideal_pmu: '',
        ideal_pmu1: '',
        ideal_pmu2: '',
        correctAmount: '',
        standardUnit: '',
        selectedVendorItem: {
          id: '',
          item: '',
          description: '',
          size: '',
          brand: '',
          price: '',
          splitPrice: '',
          pack: '',
          selectedOption: ''
        }
      });

      return false;
    }

    const product = products.find((u) => u.id == selectedProduct);

    //get existing relation of product with vendor
    const relationWithVendor = await httpGet(
      `${PRODUCTS_ENDPOINT}/relationWithVendorItem/${vendorId}/${selectedProduct}`
    );

    this.setState({
      relationType: relationWithVendor.data[0].relation_type,
    });

    //get all items of vendor
    const vendorItems = await httpGet(
      `${VENDOR_ITEMS_ENDPOINT}/vendorList/${selectedProduct}/${vendorId}`
    );
      console.log('vendorItems', vendorItems);
    let arr = []
    for(let i = 0; i < vendorItems.data.length; i++){
      arr = [...arr, 
        { label: `${vendorItems.data[i].item}, ${vendorItems.data[i].description}`, value: vendorItems.data[i].id, relationType: vendorItems.data[i].relation_type }
      ]
    }
console.log(arr);
    this.setState({
      vendorItemsList: vendorItems.data,
      vendorItemsListForSelect: arr,
      selectedVendor: vendorId,
      selectedVendorName: vendorName,
      default_unit_id: product.default_unit_id,
      fk_unit_id: product.fk_unit_id,
      pmu: product.pmu,
      iu_unit_id: product.iu_unit_id,
      ideal_pmu: product.ideal_pmu,
      ideal_pmu1: product.ideal_pmu1,
      ideal_pmu2: product.ideal_pmu2,
      correctAmount: product.ideal_pmu1 * product.ideal_pmu2,
      standardUnit: '',
      selectedVendorItem: {
        id: '',
        item: '',
        description: '',
        size: '',
        brand: '',
        price: '',
        splitPrice: '',
        pack: '',
        selectedOption: arr[0]
      }
    });

    this.vendorItemChange(arr[0]);
  };

  showSavedRelation = async (vendorId, vendorName, relationId) => {
    console.log(vendorId);
    const { selectedVendor, selectedProduct, productRelatedVendorItems } = this.state;
    const {products} = this.props;

    const product = products.find((u) => u.id == selectedProduct);

    //get existing relation of product with vendor
    const relationWithVendor = await httpGet(
      `${PRODUCTS_ENDPOINT}/relationWithVendorItem/${vendorId}/${selectedProduct}`
    );

    this.setState({
      relationType: relationWithVendor.data[0].relation_type,
    });

    //get all items of vendor
    const vendorItems = await httpGet(
      `${VENDOR_ITEMS_ENDPOINT}/vendorList/${selectedProduct}/${vendorId}`
    );
      console.log('vendorItems', vendorItems);
    let arr = []
    for(let i = 0; i < vendorItems.data.length; i++){
      arr = [...arr, 
        { label: `${vendorItems.data[i].item}, ${vendorItems.data[i].description}`, value: vendorItems.data[i].id, relationType: vendorItems.data[i].relation_type }
      ]
    }

    const productRelatedVendorItem = productRelatedVendorItems.find((u) => u.relation_id == relationId);

    const selectedOption = arr.find((u) => u.value == productRelatedVendorItem.id);
   
    this.setState({
      vendorItemsList: vendorItems.data,
      vendorItemsListForSelect: arr,
      selectedVendor: vendorId,
      selectedVendorName: vendorName,
      default_unit_id: product.default_unit_id,
      fk_unit_id: product.fk_unit_id,
      pmu: product.pmu,
      iu_unit_id: product.iu_unit_id,
      ideal_pmu: productRelatedVendorItem.pmu_value,
      ideal_pmu1: productRelatedVendorItem.ideal_pmu1,
      ideal_pmu2: productRelatedVendorItem.corrected_amount,
      correctAmount: productRelatedVendorItem.ideal_pmu1 * productRelatedVendorItem.corrected_amount,
      standardUnit: productRelatedVendorItem.standard_unit,
      selectedVendorItem: {
        id: '',
        item: '',
        description: '',
        size: '',
        brand: '',
        price: '',
        splitPrice: '',
        pack: '',
        selectedOption: selectedOption
      }
    });

    const vendorItem = vendorItems.data.find((u) => u.id == selectedOption.value);

    setTimeout(() => {
      this.setState((prevState) => ({
        ...prevState,
        selectedVendorItem: {
          id: vendorItem.id,
          item: vendorItem.item,
          description: vendorItem.description,
          size: vendorItem.size,
          brand: vendorItem.brand,
          price: vendorItem.price,
          splitPrice: vendorItem.each_available,
          pack: vendorItem.pack,
          selectedOption
        },
      }));
    }, 500);
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    const{products} = this.props;

    let clone = products.slice();
    clone = arrayMove(clone, oldIndex, newIndex);

    this.props.setProducts(clone);
  };

  /**
   * Vendor item on change
   */
  vendorItemChange = selectedOption  => {
    console.log('selectedOption', selectedOption);
    const { vendorItemsList, vendorItemsListForSelect, ideal_pmu2, productRelatedVendorItems } = this.state;
    console.log(selectedOption);
    let vendorItemId = selectedOption.value;
    
    const vendorItem = vendorItemsList.find((u) => u.id == vendorItemId);
    console.log(vendorItem);

    const productRelatedVendorItem = productRelatedVendorItems.find((u) => u.id == vendorItemId);

    if(productRelatedVendorItem){
      setTimeout(() => {
        this.setState((prevState) => ({
          ...prevState,
          standardUnit: productRelatedVendorItem.standard_unit,
          ideal_pmu2: productRelatedVendorItem.corrected_amount,
          ideal_pmu1: productRelatedVendorItem.ideal_pmu1,
          selectedVendorItem: {
            id: vendorItem.id,
            item: vendorItem.item,
            description: vendorItem.description,
            size: vendorItem.size,
            brand: vendorItem.brand,
            price: vendorItem.price,
            splitPrice: vendorItem.each_available,
            pack: vendorItem.pack,
            selectedOption
          },
        }));
      }, 500);
    }
    else{
      let sizeArray = vendorItem.size.split(" ");
      let packArray = vendorItem.pack.split("/");
      console.log('sizeArray', sizeArray);
      console.log('packArray', packArray);

      let size = isNaN(sizeArray[0]) ? 1 : sizeArray[0];
      let pack = isNaN(packArray[0]) ? 1 : packArray[0];


      let amount = sizeArray[0] * packArray[0];
      if (Number.isNaN(amount)) amount = sizeArray[0];
      else amount = amount.toFixed(2);

      setTimeout(() => {
        this.setState((prevState) => ({
          ...prevState,
          standardUnit: size * pack,
          ideal_pmu2: pack,
          ideal_pmu1: size,
          selectedVendorItem: {
            id: vendorItem.id,
            item: vendorItem.item,
            description: vendorItem.description,
            size: vendorItem.size,
            brand: vendorItem.brand,
            price: vendorItem.price,
            splitPrice: vendorItem.each_available,
            pack: vendorItem.pack,
            selectedOption
          },
        }));
      }, 500);
    }
  };

  modalChange = () => {
    this.setState((prevState) => ({
        isModal: !prevState.isModal,
    }))
  }

  standardUnitChange = (value) => {
    console.log(value);
    this.setState({
        standardUnit:value
      });
  }

  /**
   * save relation
   */
  saveOrMultiRelate = async (representedUnit, pmuValue) => {
    const {
      selectedProduct,
      selectedVendor,
      unitId,
      standardUnit,
      correctAmount,
      ideal_pmu2,
      fk_unit_id,
      default_unit_id,
      ideal_pmu,
      ideal_pmu1,
      iu_unit_id,
      pmu,
      selectedVendorItem: { id, splitPrice },
      vendorItemsList
    } = this.state;

    let data = {
      product_id: selectedProduct,
      item_id: id,
      vendor_id: selectedVendor,
      vendor_unit_id: default_unit_id,
      standard_unit: standardUnit,
      corrected_amount: ideal_pmu2,
      represented_unit: fk_unit_id,
      pending_vendor_id: "",
      split_price: splitPrice ? 1 : 0,
      pmu_value: ideal_pmu ? ideal_pmu : 0,
      iu_unit_id: iu_unit_id,
      ideal_pmu1:ideal_pmu1,
      pmu: pmu
    };
  
    const res = await httpPost(PRODUCT_ITEM_RELATIONS_ENDPOINT, data);
    successToaster("Relation created", "Success");

    const res1 = await httpGet(`${PRODUCT_ITEM_RELATIONS_ENDPOINT}/productRelatedVendorsItems/${selectedProduct}`);
    this.setState({
      productRelatedVendorItems: res1.data
    });


    const relationWithVendor = await httpGet(
      `${PRODUCTS_ENDPOINT}/relationWithVendorItem/${selectedVendor}/${selectedProduct}`
    );
  
    this.setState({
      relationType: relationWithVendor.data[0].relation_type,
    });
  };


  /**
   * save relation
   */
  saveAndNextPendingItem = async (representedUnit, pmuValue) => {
    const {
      selectedProduct,
      selectedVendor,
      unitId,
      standardUnit,
      correctAmount,
      ideal_pmu2,
      fk_unit_id,
      default_unit_id,
      ideal_pmu,
      ideal_pmu1,
      iu_unit_id,
      pmu,
      selectedVendorItem: { id, splitPrice },
      vendorItemsList
    } = this.state;

    const {products} = this.props;

    let data = {
      product_id: selectedProduct,
      item_id: id,
      vendor_id: selectedVendor,
      vendor_unit_id: default_unit_id,
      standard_unit: standardUnit,
      corrected_amount: ideal_pmu2,
      represented_unit: fk_unit_id,
      pending_vendor_id: "",
      split_price: splitPrice ? 1 : 0,
      pmu_value: ideal_pmu ? ideal_pmu : 0,
      iu_unit_id: iu_unit_id,
      ideal_pmu1:ideal_pmu1,
      pmu: pmu
    };

    const res = await httpPost(PRODUCT_ITEM_RELATIONS_ENDPOINT, data);
    successToaster("Realtion created", "Success");

    const currentproductIndex  = products.findIndex(x => x.id == selectedProduct);
    const nextProductIndex = currentproductIndex+1;

    this.showVendors(products[nextProductIndex].id);

  }

  

  /**
   * Pending relation
   */
  pendingRelation = async () => {
    const {selectedProduct, selectedVendor} = this.state;
    const res = await httpGet(
      `${PRODUCT_ITEM_RELATIONS_ENDPOINT}/pendingRelation/${selectedVendor}/${selectedProduct}`
    );
    successToaster("All items relation removed with this Vendor.", "Success");

    await this.afterRelationButtons()
  };

  afterRelationButtons = async () => {
    const {selectedProduct, selectedVendor} = this.state;
    console.log('selectedProduct', selectedProduct);
    if(selectedProduct){
      setTimeout(async () => {  
        const res1 = await httpGet(`${PRODUCT_ITEM_RELATIONS_ENDPOINT}/productRelatedVendorsItems/${selectedProduct}`);
        this.setState({
          productRelatedVendorItems: res1.data
        });
      }, 1000);
     
    }

  


   
    setTimeout(async () => {

      if(selectedVendor){
        const relationWithVendor = await httpGet(
          `${PRODUCTS_ENDPOINT}/relationWithVendorItem/${selectedVendor}/${selectedProduct}`
        );
      
    
        this.setState({
          relationType: relationWithVendor.data[0].relation_type,
        });
      }
    
    }, 1000)
  }

  /**
   * Ignore relation
   */
  ignoreRelation = async () => {
    const {comment, selectedProduct, selectedVendor} = this.state;
    const res = await httpPost(
      `${PRODUCT_ITEM_RELATIONS_ENDPOINT}/ignoreRelation/${selectedVendor}/${selectedProduct}`, {comment}
    );
    successToaster("Relation Ignored.", "Success");

    this.closeModal();

    await this.afterRelationButtons()
  };

    /**
   * Pending relation
   */
  notStocked = async () => {
    const {selectedProduct, selectedVendor} = this.state;
    const res = await httpGet(
      `${PRODUCT_ITEM_RELATIONS_ENDPOINT}/notStocked/${selectedVendor}/${selectedProduct}`
    );
    successToaster("Not Stocked done.", "Success");

    await this.afterRelationButtons()
  };

  /**
   * update counting unit of product
   */
  updateCountingUnit = async (value) => {
    const { selectedProduct } = this.state;

    await httpGet(
      `${PRODUCTS_ENDPOINT}/updateCountingUnit/${selectedProduct}/${value}`
    );
    this.setState({
      countingUnit: value,
    });

    successToaster("Counting Unit updated.", "Success");
    console.log(this.state);
  };


  /**
   * comment change
   */
  commentChange = (value, type) => {
    const {comment} = this.state;

    let newComment = '';

    if(type == 'checkBox'){
      newComment = !comment ? value : `${comment}. ${value} `;
    }
    else {
      newComment = value
    }
    console.log(value);
    this.setState({
      comment: newComment
    })
  }

  /**
   * close Modal
   */
  closeModal = () => {
    this.setState((prevState) => ({
      isModal: !prevState.isModal,
      comment: ''
    }))
  }

  //Form Input onChange
  inputChangeHandeler = (event, index) => {
    const {products} = this.props;

    let cloned = products.slice();
    cloned[index][event.target.name] = event.target.value;

    this.props.setProducts(cloned);
  };

    /**
   * get conversion values
   */
    getConversionValues  = async (e, index) => {
      const { products } = this.props;
  
      let cloned = products.slice();
      cloned[index][e.target.name] = e.target.value;
      this.setState({
        products: cloned,
      });
  
      setTimeout(async () => {
        const { products } =  this.props;
  
        let cloned1 = products.slice();
  
        if(products[index].pmu && products[index].fk_unit_id){
          const res1 = await httpGet(`${CONVERSIONS_ENDPOINT}/${products[index].pmu}/${products[index].fk_unit_id}`);
          if(res1.data){
            cloned1[index].ideal_pmu = res1.data.value;
          }
          else if(products[index].pmu == products[index].fk_unit_id){
            cloned1[index].ideal_pmu = 1;
          }
          else {
            cloned1[index].ideal_pmu = '';
          }
        }
  
        if(products[index].fk_unit_id && products[index].iu_unit_id){
          const res2 = await httpGet(`${CONVERSIONS_ENDPOINT}/${products[index].fk_unit_id}/${products[index].iu_unit_id}`);
          if(res2.data){
            cloned1[index].ideal_pmu1 = res2.data.value;
          }
          else if(products[index].fk_unit_id == products[index].iu_unit_id) {
            cloned1[index].ideal_pmu1 = 1;
          }
          else {
            cloned1[index].ideal_pmu1 = '';
          }
        }
  
        if(products[index].iu_unit_id && products[index].default_unit_id){
          const res3 = await httpGet(`${CONVERSIONS_ENDPOINT}/${products[index].iu_unit_id}/${products[index].default_unit_id}`);
          if(res3.data){
            cloned1[index].ideal_pmu2 = res3.data.value;
          }
          else if(products[index].iu_unit_id == products[index].default_unit_id){
            cloned1[index].ideal_pmu2 = 1;
          }
          else {
            cloned1[index].ideal_pmu2 = '';
          }
        }
  
        this.setState({
          products: cloned1,
        });
  
      }, 500);
    }

  /**
   * save changes of select record
   */
  saveChanges = async (index) => {
    const {products} = this.props;
    const {selectedProduct, selectedVendor} = this.state;

    const data = {
      product_name: products[index].product_name,
      product_description: products[index].product_description,
      fk_location_id: products[index].fk_location_id,
      fk_category_id: products[index].fk_category_id,
      pmu: products[index].pmu,
      ideal_pmu: products[index].ideal_pmu,
      fk_unit_id: products[index].fk_unit_id,
      ideal_pmu1: products[index].ideal_pmu1,
      iu_unit_id: products[index].iu_unit_id,
      ideal_pmu2: products[index].ideal_pmu2,
      default_unit_id: products[index].default_unit_id,
    }

  //  this.props.getProducts();

    let res = await httpPut(`${PRODUCTS_ENDPOINT}/update/${products[index].id}`, data);

    successToaster("Record updated.", "Success");

    this.afterRelationButtons();
  }

  /**
   * Relation windows changes
   */
  relationInputOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  } 

  cloneSort = () => {
    const {sorts} = this.props;
    console.log(sorts);
    //check if any of sort is empty then return
    for(let i = 0; i < sorts.length; i++){
      if(!sorts[i].name || !sorts[i].direction){
        errorToaster("Please fill exiting fields.", "Error");
        return false;
      }
    }

    let cloned = [...sorts, {
      name: '',
      direction: ''
    }];

    this.props.addProductSort(cloned)
  }

  resetSort = () => {
    this.props.addProductSort([{
      name: '',
      direction: ''
    }]);

    this.props.getProducts();
  }

  deleteSort = (index) => {
    const {sorts} = this.props;
    let cloned = [...sorts];

    cloned.splice(index, 1);

    this.props.addProductSort(cloned)
  }

  sortOrder = () => {
    const { sorts } = this.state;

    console.log(sorts);
    this.props.getProducts();
  }

  sortChangeHandler = (e, index) => {
    const {sorts} = this.props;
    
     //check if any of sort is already selected
     for(let i = 0; i < sorts.length; i++){
      if(sorts[i].name ==  e.target.value){
        errorToaster("Already selected", "Error");
        return false;
      }
    }


    let cloned = [...sorts];
    cloned[index][e.target.name] = e.target.value

    this.props.addProductSort(cloned)


    console.log(this.props.sorts);
  }


  saveSortChanges = async () => {
    const {products} = this.props;
    this.setState({
      componentLoader: true
    })

    await httpPost(`${PRODUCTS_ENDPOINT}/update/orderBy`, {sort: products});
    this.setState({
      componentLoader: false
    });


    successToaster("Sort saved", "Success");
    this.props.getProducts();
  }

  /**
   * Renders component
   */
  render() {
    const {
      products,
      unitsList,
      ignoreCommentsList,
      itemLocationsList,
      categoriesList,
      vendorsList,
      filter: { offSet, limit, pages, currentPage, query },
      loading,
      sorts
    } = this.props;

    const {
      isModal,
      selectedProduct,
      selectedVendor,
      selectedVendorName,
      relationType,
      selectedOtherVendor,
      comments,
      vendorItemsList,
      otherVendorsRelationList,
      standardUnit,
      correctAmount,
      selectedVendorItem,
      lcu,
      comment,
      countingUnit,
      unitId,
      productRelatedVendorItems,
      default_unit_id,
      fk_unit_id,
      pmu,
      iu_unit_id,
      ideal_pmu,
      ideal_pmu1,
      ideal_pmu2,
      selectedOption,
      vendorItemsListForSelect,
      componentLoader

    } = this.state;

    return (
      <React.Fragment>
        <Modal
          isOpen={isModal}
          toggle={() =>
            this.closeModal
          }
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myModalLabel">
              Comment
            </h5>
            <button
              type="button"
              onClick={() =>
                this.closeModal()
              }
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <Row>
              <Col md="12">
                <FormGroup>
                  <textarea
                    className="form-control"
                    onChange={(event) => this.commentChange(event.target.value, 'textBox')}
                    value={comment}
                    name="comment"
                    type="text"
                    rows="4"
                  ></textarea>
                </FormGroup>
              </Col>
            </Row>
            {ignoreCommentsList.length > 0 &&
              ignoreCommentsList.map((ignoreComment, commentKey) => {
                return (
                  <Row key={commentKey}>
                    <Col md="2">
                      <FormGroup>
                        <input
                          className="form-control"
                          value={ignoreComment.comment}
                          onChange={(event) => this.commentChange(event.target.value, 'checkBox')}
                          name="commentCheckBox"
                          type="checkbox"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="10">{ignoreComment.comment}</Col>
                  </Row>
                );
              })}
          </div>
          <div className="modal-footer">
            {relationType == 1 && 
              <React.Fragment>
                <Button 
                  onClick={() => {
                    if (
                      window.confirm(
                        `Ignoring this item will not include ${selectedVendorName} while ordering this particular item. You can always change this later. Proceed?`
                      )
                    ) {
                      this.ignoreRelation()
                    }
                  }}
                  className="btn wookai_orange_button waves-effect"
                >
                  Mark Ignored
                </Button>
                {/* <Button
                  color="warning"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Ignoring this item will not include ${selectedVendorName} while ordering this particular item. You can always change this later. Proceed?`
                      )
                    ) {
                      this.ignoreRelation()
                    }
                  }}
                >
                  Mark Ignored & Relate this item with another supplier
                </Button> */}
              </React.Fragment>
            }
             {relationType == 0 && 
              <React.Fragment>
                <Button 
                  onClick={() => this.ignoreRelation()}
                  className="btn wookai_orange_button waves-effect"
                >
                  Mark Ignored
                </Button>
                {/* <Button
                  color="warning"
                  onClick={() => this.ignoreRelation()}
                >
                  Mark Ignored & Relate this item with another supplier
                </Button> */}
              </React.Fragment>
            }
            {relationType == 2 && 
              <React.Fragment>
                <Button
                  className="btn wookai_orange_button waves-effect"
                  onClick={() => this.ignoreRelation()}
                >
                  Mark Ignored
                </Button>
                {/* <Button
                  color="warning"
                  onClick={() => this.ignoreRelation()}
                >
                  Mark Ignored & Relate this item with another supplier
                </Button> */}
              </React.Fragment>
            }
           
          </div>
        </Modal>
        <div className="page-content">
          <div className="container-fluid list-items">
            <Breadcrumbs title="Items" breadcrumbItem="List" />
            {loading && <Loader />}
            {componentLoader && <Loader />}
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

                    {sorts.map((sort, key) => {
                      return(
                      <Row key={key}>
                        <Col md="0">
                          <FormGroup >
                            {sorts.length == key+1 && sorts.length != 4 &&
                               <Button onClick={() => this.cloneSort()}
                               className="btn btn-success btn-sm"
                             >
                               +
                             </Button>
                            }

                            {sorts.length != key+1 && 
                               <Button onClick={() => this.deleteSort(key)}
                               className="btn btn-danger btn-sm"
                             >
                               -
                             </Button>
                            }
                             
                          </FormGroup>
                        </Col>
                        <Col md="2" sm="5">
                          <FormGroup>
                            <select
                                onChange={(event) => this.sortChangeHandler(event, key)}
                                className="form-control"
                                name="name"
                                value={sort.name}
                              >
                                <option disabled value="">
                                  --select--
                                </option>
                                <option value="product_name">
                                  Item Name
                                </option>
                                <option value="product_description">
                                  Product Description
                                </option>
                                <option value="fk_category_id">
                                  Category
                                </option>
                                <option value="fk_location_id">
                                  Location
                                </option>
                            </select>
                          </FormGroup>
                        </Col>
                        <Col md="2" sm="5">
                          <FormGroup>
                            <select
                                onChange={(event) => this.sortChangeHandler(event, key)}
                                className="form-control"
                                name="direction"
                                value={sort.direction}
                              >
                                <option disabled value="">
                                  --select--
                                </option>
                                <option value="asc">
                                  ASC
                                </option>
                                <option value="desc">
                                  DESC
                                </option>
                            </select>
                          </FormGroup>
                        </Col>
                        <Col sm="4" md="2">
                          <FormGroup >
                            {sorts.length == key+1 &&
                               <Button onClick={() => this.sortOrder()}
                               className="btn wookai_blue_button waves-effect"
                             >
                               Sort
                             </Button>
                            }
                             
                          </FormGroup>
                        </Col>
                        <Col sm="4" md="2">
                          <FormGroup >
                            {sorts.length == key+1 && 
                               <Button onClick={() => this.resetSort()}
                               className="btn wookai_blue_button waves-effect"
                             >
                               Reset
                             </Button>
                            }
                             
                          </FormGroup>
                        </Col>

                        <Col sm="4" md="3">
                        <FormGroup className="float-left">
                        {sorts.length == key+1 &&
                            <Button onClick={() => this.saveSortChanges()}
                              className="btn wookai_blue_button waves-effect"
                            >
                              Save Sort Changes
                            </Button>
                      }
                        </FormGroup>
                      </Col>
                        
                      </Row>)
                    })}


                    <Row>
                      <Col md="8" sm="12">
                        <FormGroup>
                          <input
                            className="form-control"
                            value={query}
                            name="query"
                            type="text"
                            onChange={(event) =>
                              this.props.setProductFilter({
                                field: event.target.name,
                                value: event.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="2" sm="6">
                        <FormGroup>
                          <Button
                            onClick={() => this.props.getProducts()}
                            className="btn wookai_blue_button waves-effect"
                          >
                            Search
                          </Button>
                        </FormGroup>
                      </Col>
                      <Col md="2" sm="6">
                        <FormGroup className="float-left">
                          <Link to={`/items/add`}>
                            <Button
                              className="btn wookai_blue_button waves-effect"
                            >
                              Add New
                            </Button>
                          </Link>
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="table-responsive">
                      <Table className="table table-striped mb-0 table">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Sort</th>
                            <th>Image</th>
                            <th>Item Name</th>
                            <th>Item Description</th>
                            <th>Item Location</th>
                            <th>Item Category</th>
                            <th>Recipe Unit (RU)</th>
                            <th>#RU IN 1 CU	</th>
                            <th>Cost Unit (CU)</th>
                            <th>#IU IN 1 CU	</th>
                            <th>Inventory Unit (IU)	</th>
                            <th>#IU IN 1 DU</th>
                            <th>Delivery Unit (DU)</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                          <SortableContainer onSortEnd={this.onSortEnd} useWindowAsScrollContainer={true} useDragHandle={true} >
                            {products.length > 0 && !loading && products.map((product, productKey) => (
                              <SortableItem  
                              key={`item-${productKey}`} 
                              index={productKey}
                              value={product}
                              productKey={productKey}
                              showVendors={this.showVendors}
                              inputChangeHandeler={this.inputChangeHandeler}
                              saveChanges={this.saveChanges}
                              deleteProduct={this.props.deleteProduct}
                              showRelation={this.showRelation} 
                              vendorItemChange={this.vendorItemChange}
                              getUnitById={this.getUnitById}
                              relationInputOnChange={this.relationInputOnChange}
                              saveOrMultiRelate={this.saveOrMultiRelate}
                              saveAndNextPendingItem={this.saveAndNextPendingItem}
                              pendingRelation={this.pendingRelation}
                              notStocked={this.notStocked}
                              modalChange={this.modalChange}
                              standardUnitChange={this.standardUnitChange}
                              showSavedRelation={this.showSavedRelation}
                              getConversionValues={this.getConversionValues}
                              {...this.state} 
                              {...this.props} />
                            ))}
                          </SortableContainer>

                      </Table>
                    </div>
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
  const { products, filter, loading, sorts } = state.Product;
  const { unitsList } = state.Unit;
  const { vendorsList } = state.Vendor;
  const { ignoreCommentsList } = state.IgnoreComment;
  const { itemLocationsList } = state.ItemLocation;
  const { categoriesList } = state.Category;

  return { products, filter, loading, vendorsList, unitsList, ignoreCommentsList, itemLocationsList, categoriesList, sorts };
};

export default withRouter(
  connect(mapStatetoProps, {
    getProducts,
    deleteProduct,
    editProduct,
    setProductFilter,
    getUnitsList,
    getIgnoreCommentsList,
    getItemLocationsList,
    getCategoriesList,
    getVendorsList,
    setProducts,
    addProductSort,
  })(Products)
);
