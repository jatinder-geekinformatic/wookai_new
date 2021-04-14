import React, { useState } from 'react';
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
  Table
} from 'reactstrap';
import { AvForm, AvField, AvInput } from 'availity-reactstrap-validation';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import {
  setVendor,
  addVendor,
  editVendor,
  emptyVendor,
  updateVendor,
} from '../../../../store/actions';
import Breadcrumbs from '../../../../components/Common/Breadcrumb';
import { successToaster, errorToaster } from "../../../../components/Common/Toaster";
import { httpGet, httpPost, httpPut } from "../../../../utils/http";
import {
  UNITS_ENDPOINT,
  CATEGORIES_ENDPOINT,
  ITEM_LOCATIONS_ENDPOINT,
  PRODUCTS_ENDPOINT,
  VENDORS_ENDPOINT,
} from "../../../../config/endPoints";
import Loader from '../../../../components/Common/Loader';
import XLSX from "xlsx";
import "./style.css";

class VendorAdd extends React.Component {
  /**
   * component state
   */
  state = {
    id: '',
    food_format: '',
    vendor_email: '',
    vendor_name: '',
    customer_department: '',
    vendor_phone: '',
    supplier_username: '',
    supplier_password: '',
    distributor: '',
    ordering_url: '',
    transportation_cost: '',
    minimum_order_amount: '',
    vendor_rebate_type: '',
    rebate_price: '',
    miscellaneous_cost: '',
    enable_deliver_date: 0,
    isSubmit: false,
    loading: false,
    importSubmit: false,
    mapping: false,
    rightClick: "",
    rows: [],
    cols: [],
    originalNames: [
      {
        name: 'Item Number',
        mappingName: 'itemNumber',
        mapped: false
      },
      {
        name: 'Item Price',
        mappingName: 'itemPrice',
        mapped: false
      },
      {
        name: 'Pack Size',
        mappingName: 'packSize',
        mapped: false
      },
      {
        name: 'Item Description',
        mappingName: 'itemDescription',
        mapped: false
      },
      {
        name: 'Item Brand',
        mappingName: 'itemBrand',
        mapped: false
      },
      {
        name: 'Available Split Price',
        mappingName: 'splitPrice',
        mapped: false
      },
      {
        name: 'No. of Packs',
        mappingName: 'packs',
        mapped: false
      }
    ],
    excelNames: [],
    mappingData: [],
    fieldNames: {
      itemNumber: '',
      itemPrice: '',
      packSize: '',
      itemDescription: '',
      itemBrand: '',
      splitPrice: '',
      packs: ''
    },
    leftSide: {
      index: '',
      name: ''
    },
    rightSide: {
      index: '',
      name: ''
    }
  };

  /**
   * Component Did Mount
   */
  async componentDidMount() {
    const route = this.props.location.pathname;
    let arr = route.split('/');
    let id = arr[3];
    if (id !== undefined) {
      await this.fetchVendor(id);
      this.setState({
        id
      });
    }
  }

  /**
   * fetch vendor
   */
  fetchVendor = async (id) => {
    let res = await httpGet(`${VENDORS_ENDPOINT}/${id}`);
    this.setState({
      food_format: res.data.food_format,
      vendor_name: res.data.vendor_name,
      customer_department: res.data.customer_department,
      distributor: res.data.distributor,
      transportation_cost: res.data.transportation_cost,
      minimum_order_amount: res.data.minimum_order_amount,
      vendor_rebate_type: res.data.vendor_rebate_type,
      rebate_price: res.data.rebate_price,
      enable_deliver_date: res.data.enable_deliver_date
    });


  }


  /**
   * component Will Unmount
   */
  componentWillUnmount() {
    this.props.emptyVendor();
  }

  /**
   * submit handle
   */
  handleSubmit = async (e) => {
    e.persist();
    const {
        id,
        rows,
        food_format,
        vendor_name,
        customer_department,
        distributor,
        transportation_cost,
        minimum_order_amount,
        vendor_rebate_type,
        rebate_price,
        enable_deliver_date,
      
    } = this.state;

    console.log(this.state);
    if (
      !vendor_name ||
      !transportation_cost ||
      !minimum_order_amount ||
      !vendor_rebate_type
    ) {
      errorToaster('Please fill required fields', 'Error')
      return false;
    }


    if(rows.length > 0){
      this.setState({
        isSubmit: true
      })
    }
    else{

      if(!id) await this.createNew();
      else await this.update();
    }
  };

  /**
   * update vendor
   */

  update = async () => {
    
    const {
      id,
      food_format,
      vendor_name,
      customer_department,
      distributor,
      transportation_cost,
      minimum_order_amount,
      vendor_rebate_type,
      rebate_price,
      enable_deliver_date,
    } = this.state;

    this.setState({
      loading: true
    })

    const data = {
      food_format,
      vendor_name,
      customer_department,
      distributor,
      transportation_cost,
      minimum_order_amount,
      vendor_rebate_type,
      rebate_price,
      enable_deliver_date,
    }
   
    const res = await httpPut(`${VENDORS_ENDPOINT}/${id}`, data);
    this.setState({
      loading: false
    });

   // this.props.history.push('/vendors/list');
    successToaster('Vendor updated', 'Success');
  }

  /**
   * create new vendor
   */
  createNew = async () => {

    const {
      rows,
      food_format,
      vendor_name,
      customer_department,
      distributor,
      transportation_cost,
      minimum_order_amount,
      vendor_rebate_type,
      rebate_price,
      enable_deliver_date,
      fieldNames,
      mappingData
    } = this.state;

    this.setState({
      loading: true
    })

    let columns = {...fieldNames};

    for(let i = 0; i < mappingData.length; i++){
      columns[mappingData[i].mappingName] = mappingData[i].excelName;
    }

    const data = {
      columns,
      rows,
      food_format,
      vendor_name,
      customer_department,
      distributor,
      transportation_cost,
      minimum_order_amount,
      vendor_rebate_type,
      rebate_price,
      enable_deliver_date,
    }
   
    const res = await httpPost(`${VENDORS_ENDPOINT}`, data);
    this.setState({
      loading: false
    });

    this.props.history.push('/vendors/list');
    successToaster('Record added', 'Success');
  }

  //Form Input onChange
  changeHandeler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };


  /**
   * change handeler
   */
  uploadHandler = (evt) => {
    console.log(evt.target.files[0]);
    const file = evt.target.files[0];
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval:""});
      console.log(data);
      /* Update state */
      this.setState({ rows: data, cols: this.make_cols(ws["!ref"]) });
      console.log(this.state);
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  make_cols = (refstr /*:string*/) => {
    var o = [];
    var range = XLSX.utils.decode_range(refstr);
    console.log(range);
    for (var i = 0; i <= range.e.c; ++i) {
      o.push({ name: XLSX.utils.encode_col(i), key: i });
    }
    return o;
  };

  /**
   * Right click handler on excel inputs
   */
  excelRightClick = (e, index) => {
    e.preventDefault();
    this.setState({
      rightClick: index,
    });
    console.log("huree");
    return false;
  };

  /**
   * Add new row in excel
   */
  addRow = (i) => {
    const { rows } = this.state;

    let cloned = rows.slice();
    let arr = [];

    for(let i = 0; i < cloned[0].length; i++){
      arr.push('');
    }
   
    cloned.splice(i + 1, 0, arr);

    console.log(cloned);
    // console.log(i);
    this.setState({
      rows: cloned,
      rightClick: "",
    });
  };

  /**
   * Delete row from excel
   */
  deleteRow = (index) => {
    const { rows } = this.state;

    let array = [...rows];
    array.splice(index, 1);

    this.setState({
      rows: array,
      rightClick: "",
    });
  };

  /**
   * left side click of mapping
   */
  mappingLeftClick = (i, value, mapped) => {
    const {leftSide} =  this.state;
    
   if(mapped) return false;

   this.setState({
     leftSide: value
   })

   let updatedLeftSide = {...leftSide};
   updatedLeftSide.index = i;
   updatedLeftSide.name = value;
   this.setState({leftSide: updatedLeftSide})
   console.log(this.state);

  } 

  /**
   * excel submit handler
   */
  excelSubmit = () => {
   const {rows} = this.state;

   let arr = [];
   for(let i = 0; i < rows[0].length; i++){
     arr.push({
       name: rows[0][i],
       mapped: false
     })
   }
    
   this.setState({
     isSubmit: false,
     mapping: true,
     excelNames: arr
   })
  }

  
 /**
  * Right side click of mapping
  */
 mappingRightClick = (i, value, mapped) => {
   const {leftSide, rightSide} = this.state;

   if(mapped) return false;

   if(leftSide.name == '') {
     alert("Please select from left side first.");
     return false;
   }
   
   let updatedRightSide = {...rightSide};
   updatedRightSide.index = i;
   updatedRightSide.name = value;
   this.setState({rightSide: updatedRightSide})
   console.log(this.state);
  } 

  /**
   * save mapping relation
   */
 saveRelation = (e) => {
   e.preventDefault();
   const {mappingData, originalNames, excelNames, leftSide, rightSide} = this.state;
   
   let originalIndex = originalNames.findIndex(x => x.name === leftSide.name);

   this.setState({
     mappingData: [...mappingData, {  
       originalIndex: leftSide.index,
       originalName: leftSide.name,
       excelIndex: rightSide.index,
       excelName: rightSide.name,
       mappingName: originalNames[originalIndex].mappingName
       }
     ],
   });

   let updatedRightSide = {...rightSide};
   updatedRightSide.index = '';
   updatedRightSide.name = '';

   let updatedLeftSide = {...leftSide};
   updatedLeftSide.index = '';
   updatedLeftSide.name = '';

   let cloned = originalNames.slice();
   cloned[leftSide.index].mapped = true;

   let cloned1 = excelNames.slice();
   cloned1[rightSide.index].mapped = true;
   cloned1[rightSide.index].leftSideMappedNumber = leftSide.index + 1;



   this.setState({
     leftSide: updatedLeftSide,
     rightSide: updatedRightSide,
     originalNames: cloned,
     excelNames: cloned1
   });

   setTimeout(() => {
     console.log(this.state);

   }, 1000)
  }

    /**
   * Excel input change handler
   */
  excelInputChange = (e, index, nestedIndex) => {
    const { rows } = this.state;

    let cloned = rows.slice();
    cloned[index][nestedIndex] = e.target.vale;

    this.setState({
      rows: cloned
    });

  };

  /**
   * remove mapping relation
   */
  removeRelation = (e, excelIndex) => {
   e.preventDefault();
   const {mappingData, originalNames, excelNames, leftSide, rightSide} = this.state;

   let cloned = mappingData.slice();
   let mappingIndex = cloned.findIndex(x => x.excelIndex === excelIndex);

   let mappedObject = mappingData[mappingIndex];

   let cloned1 = originalNames.slice();
   cloned1[mappedObject.originalIndex].mapped = false;

   let cloned2 = excelNames.slice();
   cloned2[mappedObject.excelIndex].mapped = false;
   cloned2[mappedObject.excelIndex].leftSideMappedNumber = '';

   cloned.splice(mappingIndex, 1);

   this.setState({
     originalNames: cloned1,
     excelNames: cloned2,
     mappingData: cloned
   });

   setTimeout(() => {
     console.log(this.state);
   }, 1000)

  }

  /**
   * Mapping submit handler
   */
 mappingSubmit = async () => {
  await this.createNew();
 }


  /**
   * render component
   */
  render() {
    const {
      id,
        food_format,
        vendor_email,
        vendor_name,
        customer_department,
        vendor_phone,
        supplier_username,
        supplier_password,
        distributor,
        ordering_url,
        transportation_cost,
        minimum_order_amount,
        vendor_rebate_type,
        rebate_price,
        miscellaneous_cost,
        enable_deliver_date,
        isSubmit,
        rows,
        cols,
        mapping,
        originalNames, excelNames, leftSide, rightSide, mappingData, loading

    } = this.state;

    return (
      <React.Fragment>
        <div className='page-content'>
          <Container fluid={true}>
            <Breadcrumbs title='Suppliers' breadcrumbItem='New' />
            {loading && <Loader />}
            <Row>
              <Col xl='12'>
                <Card>
                  <CardBody>
                    {/* <h4 className='card-title'>React Validation - Normal</h4>
                    <p className='card-title-desc'>
                      Provide valuable, actionable feedback to your users with
                      HTML5 form validation–available in all our supported
                      browsers.
                    </p> */}
                    {!isSubmit && !mapping && 
                      <AvForm
                      className='needs-validation'
                      onSubmit={this.handleSubmit}
                    >
                      <Row>
                      <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom02'>
                              Vendor Name
                            </Label>
                            <input
                              className={`form-control ${
                                vendor_name ? '' : 'is-invalid'
                              }`}
                              value={vendor_name}
                              name='vendor_name'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Vendor name
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom04'>
                              Supplier's Minimum Order Amount
                            </Label>
                            <input
                              className={`form-control ${
                                minimum_order_amount ? '' : 'is-invalid'
                              }`}
                              value={minimum_order_amount}
                              name='minimum_order_amount'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Minimum Order Amount
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom04'>
                              Supplier's Minimum Number of cases
                            </Label>
                            <input
                              className={`form-control ${
                                minimum_order_amount ? '' : 'is-invalid'
                              }`}
                              value={minimum_order_amount}
                              name='minimum_order_amount'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter case
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom03'>
                              Supplier's Transportation Cost
                            </Label>
                            <input
                              className={`form-control ${
                                transportation_cost ? '' : 'is-invalid'
                              }`}
                              value={transportation_cost}
                              name='transportation_cost'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>Enter Cost</div>
                          </FormGroup>
                        </Col>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom01'>
                              Supplier's Rebate Type
                            </Label>
                            <select
                              className={`form-control ${
                                vendor_rebate_type ? '' : 'is-invalid'
                              }`}
                              name='vendor_rebate_type'
                              value={vendor_rebate_type}
                              onChange={(event) => this.changeHandeler(event)}
                            >
                              <option disabled value="">
                                --select--
                              </option>
                              <option value='%'>%</option>
                              <option value='No Rebate'>No Rebate</option>
                              <option value='Item based rebate'>
                                Item based rebate
                              </option>
                            </select>

                            <div className='invalid-feedback'>
                              Select Rebate Type
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom04'>
                              Supplier's Rebate
                            </Label>
                            <input
                              className={`form-control`}
                              style={{backgroundColor: vendor_rebate_type != '%' ? '#f1f1f1' : ''}}
                              disabled={vendor_rebate_type != '%'}
                              value={rebate_price}
                              name='rebate_price'
                              type='text'
                              onChange={(event) => this.changeHandeler(event)}
                            />
                            <div className='invalid-feedback'>
                              Enter Supplier's Rebate
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        {!id && 
                            <Col md='4'>
                            <FormGroup>
                              <Label htmlFor='validationCustom04'>
                              Upload Supplier Price list/order guide
                              </Label>
                              <input
                                className={`form-control`}
                                accept=".xlsx, .csv, .xls)"
                                name="file"
                                type="file"
                                onChange={(event) => this.uploadHandler(event)}
                              />
                              <div className='invalid-feedback'>
                                Upload Supplier Price list/order guide
                              </div>
                            </FormGroup>
                          </Col>
                        }
                        <Col md='4'>
                          <FormGroup>
                            <Label htmlFor='validationCustom01'>
                              Activate Supplier Order export feature
                            </Label>
                            <select
                              className={`form-control`}
                              name='enable_deliver_date'
                              value={enable_deliver_date}
                              onChange={(event) => this.changeHandeler(event)}
                            >
                              <option disabled value="">
                                --select--
                              </option>
                              <option value='0'>Inactive</option>
                              <option value='1'>
                                Active
                              </option>
                            </select>
                            <div className='invalid-feedback'>
                              Select Activate Supplier Order feature
                            </div>
                          </FormGroup>
                        </Col>
                        {enable_deliver_date == 1 && 
                             <Col md='4'>
                             <FormGroup>
                               <Label htmlFor='validationCustom01'>
                                 Supplier Order export Format
                               </Label>
                               <select
                                 value={food_format}
                                 onChange={(event) => this.changeHandeler(event)}
                                 className={`form-control ${
                                   food_format ? '' : 'is-invalid'
                                 }`}
                                 name='food_format'
                               >
                                 <option disabled value="">
                                   --select--
                                 </option>
                                 <option value='US Food Format'>
                                   US Food Format
                                 </option>
                                 <option value='Sysco Foods'>Sysco Foods</option>
                               </select>
   
                               <div className='invalid-feedback'>Enter Email</div>
                             </FormGroup>
                           </Col>   
                        }
                      </Row>
                      {enable_deliver_date == 1 && 
                        <Row>
                        <Col md='4'>
                            <FormGroup>
                              <Label htmlFor='validationCustom03'>
                                Customer Department
                              </Label>
                              <input
                                className={`form-control`}
                                value={customer_department}
                                name='customer_department'
                                type='text'
                                onChange={(event) => this.changeHandeler(event)}
                              />
                              <div className='invalid-feedback'>
                                Enter Customer department
                              </div>
                            </FormGroup>
                          </Col>
                          <Col md='4'>
                            <FormGroup>
                              <Label htmlFor='validationCustom03'>
                                Distributor
                              </Label>
                              <input
                                className={`form-control`}
                                value={distributor}
                                name='distributor'
                                type='text'
                                onChange={(event) => this.changeHandeler(event)}
                              />
                              <div className='invalid-feedback'>
                                Enter Distributor
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                      }
                      
                      <Button color='primary' type='submit'>
                        Submit
                      </Button>
                    </AvForm>
                    }
                    
                    {isSubmit && !mapping && (
                      <div className="table-responsive">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th style={{backgroundColor: '#BAD0EF'}}></th>
                              {cols.map((c) => (
                                <th style={{backgroundColor: '#BAD0EF'}} key={c.key}>{c.name}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((r, i) => (
                              <tr key={i}>
                                <td style={{backgroundColor: '#BAD0EF'}}>{i + 1}</td>
                                {this.state.cols.map((c, k) => (
                                  <td
                                    style={{ backgroundColor: "1px solid #BAD0EF" }}
                                    key={c.key}
                                  >
                                    <input
                                      className="form-control"
                                      type="text"
                                      value={r[c.key]}
                                      onContextMenu={(e) =>
                                        this.excelRightClick(e, i + "-" + k)
                                      }
                                      onChange={(e) => {this.excelInputChange(e, i, k)}}
                                    ></input>
                                    {this.state.rightClick == i + "-" + k && (
                                      <div
                                        style={{
                                          position: "relative",
                                          bottom: "20px",
                                          border: "1px solid black",
                                          width: "56%",
                                          left: "30px",
                                        }}
                                      >
                                        <div
                                          className="excelRow"
                                          onClick={() => this.addRow(i)}
                                        >
                                          Add row
                                        </div>
                                        <div
                                          className="excelRow"
                                          onClick={() => this.deleteRow(i)}
                                        >
                                          Delete row
                                        </div>
                                      </div>
                                    )}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <Button
                          color="primary"
                          type="submit"
                          onClick={() =>
                           this.excelSubmit()
                          }
                        >
                          Submit
                        </Button>
                      </div>
                    )}


                    {!isSubmit && mapping && (
                      <div className="table-responsive">
                        <Table className="table table-striped mb-0 table">
                          <tbody>
                            <tr>
                              <th>System Columns</th>
                              <th>Columns</th>
                              <th></th>
                            </tr>
                            <tr>
                              <td>
                                <Table className="table table-striped mb-0 table">
                                  <tbody>
                                    {originalNames.map((original, i) => {
                                      return (
                                        <tr key={i}>
                                          <td
                                            onClick={() =>
                                              this.mappingLeftClick(
                                                i,
                                                original.name,
                                                original.mapped,
                                                original
                                              )
                                            }
                                            style={{
                                              border:
                                                leftSide.name == original.name
                                                  ? "2px solid #3498db"
                                                  : original.mapped
                                                  ? "2px solid #2abc68"
                                                  : "",
                                            }}
                                          >
                                            <span>{i + 1}</span> &nbsp;{" "}
                                            {original.name}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </Table>
                              </td>
                              <td colSpan="2">
                                <Table className="table table-striped mb-0 table">
                                  <tbody>
                                    {excelNames.length > 0 &&
                                      excelNames.map((excel, excelIndex) => {
                                        return (
                                          <tr key={excelIndex}>
                                            <td
                                              onClick={() =>
                                                this.mappingRightClick(
                                                  excelIndex,
                                                  excel.name,
                                                  excel.mapped
                                                )
                                              }
                                              style={{
                                                border:
                                                  rightSide.name == excel.name
                                                    ? "2px solid #3498db"
                                                    : excel.mapped
                                                    ? "2px solid #2abc68"
                                                    : "",
                                              }}
                                            >
                                              {excel.leftSideMappedNumber && (
                                                <span>
                                                  {excel.leftSideMappedNumber}
                                                </span>
                                              )}{" "}
                                              &nbsp; {excel.name}
                                            </td>
                                            <td>
                                              {rightSide.name == excel.name && (
                                                <a
                                                  href=""
                                                  onClick={(e) =>
                                                    this.saveRelation(e)
                                                  }
                                                >
                                                  <i className="bx bx-check"></i>
                                                  save
                                                </a>
                                              )}

                                              {excel.mapped && (
                                                <a
                                                  style={{ color: "#f46a6a" }}
                                                  href=""
                                                  onClick={(e) =>
                                                    this.removeRelation(
                                                      e,
                                                      excelIndex
                                                    )
                                                  }
                                                >
                                                  <i className="bx bx-x"></i>
                                                  Remove
                                                </a>
                                              )}
                                            </td>
                                          </tr>
                                        );
                                      })}
                                  </tbody>
                                </Table>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                        {mappingData.length > 0 && (
                          <Button
                            color="primary"
                            type="submit"
                            onClick={() => this.mappingSubmit()}
                          >
                            Submit
                          </Button>
                        )}
                      </div>
                    )}
                    
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
  const { vendor, loading } = state.Vendor;
  return { vendor, loading };
};

export default withRouter(
  connect(mapStatetoProps, {
    setVendor,
    addVendor,
    editVendor,
    emptyVendor,
    updateVendor,
  })(VendorAdd)
);
