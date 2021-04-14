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
  Table,
} from "reactstrap";
import { AvForm, AvField, AvInput } from "availity-reactstrap-validation";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { successToaster } from "../../../../components/Common/Toaster";
import Loader from '../../../../components/Common/Loader';

import { httpGet, httpPost } from "../../../../utils/http";
import {
  UNITS_ENDPOINT,
  CATEGORIES_ENDPOINT,
  ITEM_LOCATIONS_ENDPOINT,
  PRODUCTS_ENDPOINT,
} from "../../../../config/endPoints";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import XLSX from "xlsx";
import "./style.css";

class ImportProduct extends React.Component {
  /**
   * component state
   */
  state = {
    loading: false,
    importSubmit: false,
    mapping: false,
    rightClick: "",
    rows: [],
    cols: [],
    originalNames: [
      {
        name: 'CSG/PLU',
        mappingName: 'plu',
        mapped: false
      },
      {
        name: 'Barcode UPC',
        mappingName: 'barCode',
        mapped: false
      },
      {
        name: 'Item Name',
        mappingName: 'itemName',
        mapped: false
      },
      {
        name: 'Description',
        mappingName: 'description',
        mapped: false
      },
      {
        name: 'Storage Location',
        mappingName: 'location',
        mapped: false
      },
      {
        name: 'Item Category',
        mappingName: 'category',
        mapped: false
      },
      {
        name: 'Process Measuring Unit',
        mappingName: 'pmu',
        mapped: false
      },
      {
        name: 'Ideal PMU',
        mappingName: 'idealPmu',
        mapped: false
      },
      {
        name: 'Lowest Common Unit',
        mappingName: 'lcu',
        mapped: false
      },
      {
        name: 'Suppliers Delivery Unit',
        mappingName: 'sdu',
        mapped: false
      },
      {
        name: 'Item Counting Unit (For Par Levels)',
        mappingName: 'radioButton',
        mapped: false
      }
    ],
    excelNames: [],
    mappingData: [],
    fieldNames: {
      itemName: '',
      description: '',
      location: '',
      category: '',
      plu: '',
      lcu: '',
      sdu: '',
      pmu: '',
      idealPmu: '',
      barCode: '',
      radioButton: ''
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
   * change handeler
   */
  changeHandeler = (evt) => {
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
      importSubmit: false,
      mapping: true,
      excelNames: arr
    })
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
    const {mappingData, rows, fieldNames} = this.state;

    this.setState({
      loading: true
    })

    let columns = {...fieldNames};

    for(let i = 0; i < mappingData.length; i++){
      columns[mappingData[i].mappingName] = mappingData[i].excelName;
    }
    
    const data = {
      rows,
      columns
    }
    const res = await httpPost(`${PRODUCTS_ENDPOINT}/bulk/import`, data);

    this.setState({
      loading: false
    });

    this.props.history.push('/items/list');
    successToaster('Items imported', 'Success')
  }

  /**
   * render component
   */
  render() {
    const { rows, cols, originalNames, excelNames, mapping, importSubmit, leftSide, rightSide, mappingData, loading } = this.state;

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Items" breadcrumbItem="Import" />
            {loading && <Loader />}
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
                    {importSubmit && !mapping && (
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

                    {!importSubmit && mapping && (
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
                                            <td onClick={() => this.mappingLeftClick(i, original.name, original.mapped, original)} style={{'border': leftSide.name == original.name ? "2px solid #3498db" : original.mapped ? "2px solid #2abc68" : ""}}>{original.name}</td>
                                          </tr>
                                      );
                                    })}
                                  </tbody>
                                </Table>
                              </td>
                              <td colSpan="2">
                                <Table className="table table-striped mb-0 table">
                                  <tbody>
                                    {excelNames.length > 0 && excelNames.map((excel, excelIndex) => {
                                      return (
                                          <tr key={excelIndex}>
                                            <td onClick={() => this.mappingRightClick(excelIndex, excel.name, excel.mapped)} style={{'border': rightSide.name == excel.name ? "2px solid #3498db" : excel.mapped ? "2px solid #2abc68" : ""}}>{excel.name}</td>
                                            <td>
                                              {
                                              rightSide.name == excel.name && 
                                              <a
                                                  href=""
                                                  onClick={(e) => this.saveRelation(e)}
                                                >
                                                  <i className="bx bx-check"></i>
                                                  save
                                                </a>
                                                 }

                                                  {
                                              excel.mapped && 
                                              <a
                                                  style={{color: '#f46a6a'}}
                                                  href=""
                                                  onClick={(e) => this.removeRelation(e, excelIndex)}
                                                >
                                                  <i className="bx bx-x"></i>
                                                  Remove
                                                </a>
                                                 }
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
                        {mappingData.length > 0 && 
                          <Button
                            color="primary"
                            type="submit"
                            onClick={() =>
                            this.mappingSubmit()
                            }
                          >
                            Submit
                          </Button>
                        }
                      </div>
                    )}

                    {!importSubmit && !mapping && (
                      <AvForm
                        className="needs-validation"
                        onSubmit={this.handleSubmit}
                      >
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <Label htmlFor="validationCustom01">
                                Upload Cherry Account Setup Workbook:
                              </Label>
                              <input
                                className={`form-control`}
                                // value={product_name}
                                accept=".xlsx, .csv"
                                name="file"
                                type="file"
                                onChange={(event) => this.changeHandeler(event)}
                              />
                              <div className="invalid-feedback">
                                Enter Item Name
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>

                        <Button
                          color="primary"
                          onClick={() => this.setState({ importSubmit: true })}
                        >
                          Submit
                        </Button>
                      </AvForm>
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

export default withRouter(ImportProduct);
