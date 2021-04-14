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

import {
  setVendor,
  addVendor,
  editVendor,
  emptyVendor,
  updateVendor,
} from "../../../store/actions";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import {
  successToaster,
  errorToaster,
} from "../../../components/Common/Toaster";
import { httpGet, httpPost, httpPut } from "../../../utils/http";
import {
  UNITS_ENDPOINT,
  CATEGORIES_ENDPOINT,
  ITEM_LOCATIONS_ENDPOINT,
  PRODUCTS_ENDPOINT,
  VENDORS_ENDPOINT,
  VENDOR_ITEMS_ENDPOINT
} from "../../../config/endPoints";
import Loader from "../../../components/Common/Loader";
import XLSX from "xlsx";
import "./style.css";

class PriceUpdate extends React.Component {
  /**
   * component state
   */
  state = {
    id: "",
    vendor_name: "",
    col_brand: "",
    col_description: "",
    col_each_available: "",
    col_item: "",
    col_pack: "",
    col_price: "",
    col_relation_status: "",
    col_size: "",
    isSubmit: false,
    loading: false,
    importSubmit: false,
    mapping: false,
    rightClick: "",
    rows: [],
    cols: [],
    originalNames: [
      {
        name: "Item Number",
        mappingName: "itemNumber",
        mapped: false,
        databaseCol: "col_item",
        databaseValue: ""
      },
      {
        name: "Item Price",
        mappingName: "itemPrice",
        mapped: false,
        databaseCol: "col_price",
        databaseValue: ""
      },
      {
        name: "Pack Size",
        mappingName: "packSize",
        mapped: false,
        databaseCol: "col_size",
        databaseValue: ""
      },
      {
        name: "Item Description",
        mappingName: "itemDescription",
        mapped: false,
        databaseCol: "col_description",
        databaseValue: ""
      },
      {
        name: "Item Brand",
        mappingName: "itemBrand",
        mapped: false,
        databaseCol: "col_brand",
        databaseValue: ""
      },
      {
        name: "Available Split Price",
        mappingName: "splitPrice",
        mapped: false,
        databaseCol: "col_each_available",
        databaseValue: ""
      },
      {
        name: "No. of Packs",
        mappingName: "packs",
        mapped: false,
        databaseCol: "col_pack",
        databaseValue: ""
      },
    ],
    excelNames: [],
    mappingData: [],
    fieldNames: {
      itemNumber: "",
      itemPrice: "",
      packSize: "",
      itemDescription: "",
      itemBrand: "",
      splitPrice: "",
      packs: "",
    },
    leftSide: {
      index: "",
      name: "",
    },
    rightSide: {
      index: "",
      name: "",
    },
  };

  /**
   * Component Did Mount
   */
  async componentDidMount() {
    const route = this.props.location.pathname;
    let arr = route.split("/");
    let id = arr[3];
    if (id !== undefined) {
      await this.fetchVendor(id);
      this.setState({
        id,
      });
    }
  }

  /**
   * fetch vendor
   */
  fetchVendor = async (id) => {
    let res = await httpGet(`${VENDORS_ENDPOINT}/${id}`);
    const { originalNames } = this.state;

    let cloned = originalNames.slice();

    for(let i = 0; i < cloned.length; i++){
      if(res.data[cloned[i].databaseCol] != undefined){
        cloned[i].databaseValue = res.data[cloned[i].databaseCol]
      }
    }

    this.setState({
      vendor_name: res.data.vendor_name,
      col_brand: res.data.col_brand,
      col_description: res.data.col_description,
      col_each_available: res.data.col_each_available,
      col_item: res.data.col_item,
      col_pack: res.data.col_pack,
      col_price: res.data.col_price,
      col_relation_status: res.data.col_relation_status,
      col_size: res.data.col_size,
      originalNames: cloned
    });
  };

  /**
   * auto mapping of csv columns with matched database cols of vendor
   */
  makeAutomaticMapping = () => {
    const {originalNames, excelNames} = this.state;

    let originalNamesCloned = originalNames.slice();
    let excelNamesCloned = excelNames.slice();
    let mappingData = [];
    for(let i = 0; i < originalNamesCloned.length; i++){

      let excelIndex = excelNamesCloned.findIndex(
        (x) => x.name === originalNamesCloned[i].databaseValue
      );

      if(excelIndex != -1){
        originalNamesCloned[i].mapped = true;
        excelNamesCloned[excelIndex].mapped = true;
        excelNamesCloned[excelIndex].leftSideMappedNumber = i + 1;

        mappingData = [...mappingData, {
          originalIndex: i,
          originalName: originalNamesCloned[i].name,
          excelIndex: excelIndex,
          excelName: excelNamesCloned[excelIndex].name,
          mappingName: originalNamesCloned[i].mappingName,
        }]
      }
    }

    this.setState({
      originalNames: originalNamesCloned,
      excelNames: excelNamesCloned,
      mappingData
    })

    setTimeout(() =>{
    console.log(this.state.mappingData);
    console.log(this.state.originalNames);
    console.log(this.state.excelNames);

   }, 2000);
  }

  /**
   * component Will Unmount
   */
  componentWillUnmount() {
    this.props.emptyVendor();
  }

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
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
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
    console.log(refstr);
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

    for (let i = 0; i < cloned[0].length; i++) {
      arr.push("");
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
   * Add new row in excel
   */
  addColumn = (index) => {
    const { rows } = this.state;
    let cloned = rows.slice();
    console.log(cloned);

    for (let i = 0; i < cloned.length; i++) {
      cloned[i].splice(index + 1, 0, "");
    }

    let newCols = [];
    for (let j = 0; j < cloned[0].length; j++) {
      newCols.push({ name: XLSX.utils.encode_col(j), key: j });
    }

    this.setState({
      cols: newCols,
      rows: cloned,
      rightClick: "",
    });
  };

  /**
   * Delete row from excel
   */
  deleteColumn = (index) => {
    const { rows } = this.state;
    let cloned = rows.slice();

    for (let i = 0; i < cloned.length; i++) {
      cloned[i].splice(index, 1);
    }

    let newCols = [];
    for (let j = 0; j < cloned[0].length; j++) {
      newCols.push({ name: XLSX.utils.encode_col(j), key: j });
    }

    this.setState({
      cols: newCols,
      rows: cloned,
      rightClick: "",
    });
  };

  /**
   * left side click of mapping
   */
  mappingLeftClick = (i, value, mapped) => {
    const { leftSide } = this.state;

    if (mapped) return false;

    this.setState({
      leftSide: value,
    });

    let updatedLeftSide = { ...leftSide };
    updatedLeftSide.index = i;
    updatedLeftSide.name = value;
    this.setState({ leftSide: updatedLeftSide });
    console.log(this.state);
  };

  /**
   * excel submit handler
   */
  excelSubmit = () => {
    const { rows } = this.state;

    let arr = [];
    for (let i = 0; i < rows[0].length; i++) {
      arr.push({
        name: rows[0][i],
        mapped: false,
        leftSideMappedNumber: ''
      });
    }

    this.setState({
      isSubmit: false,
      mapping: true,
      excelNames: arr,
    });

     setTimeout(() =>{
       // console.log(this.state);
        this.makeAutomaticMapping();
    }, 1000);
  };

  /**
   * Right side click of mapping
   */
  mappingRightClick = (i, value, mapped) => {
    const { leftSide, rightSide } = this.state;

    if (mapped) return false;

    if (leftSide.name == "") {
      alert("Please select from left side first.");
      return false;
    }

    let updatedRightSide = { ...rightSide };
    updatedRightSide.index = i;
    updatedRightSide.name = value;
    this.setState({ rightSide: updatedRightSide });
    console.log(this.state);
  };

  /**
   * save mapping relation
   */
  saveRelation = (e) => {
    e.preventDefault();
    const {
      mappingData,
      originalNames,
      excelNames,
      leftSide,
      rightSide,
    } = this.state;

    let originalIndex = originalNames.findIndex(
      (x) => x.name === leftSide.name
    );

    this.setState({
      mappingData: [
        ...mappingData,
        {
          originalIndex: leftSide.index,
          originalName: leftSide.name,
          excelIndex: rightSide.index,
          excelName: rightSide.name,
          mappingName: originalNames[originalIndex].mappingName,
        },
      ],
    });

    let updatedRightSide = { ...rightSide };
    updatedRightSide.index = "";
    updatedRightSide.name = "";

    let updatedLeftSide = { ...leftSide };
    updatedLeftSide.index = "";
    updatedLeftSide.name = "";

    let cloned = originalNames.slice();
    cloned[leftSide.index].mapped = true;

    let cloned1 = excelNames.slice();
    cloned1[rightSide.index].mapped = true;
    cloned1[rightSide.index].leftSideMappedNumber = leftSide.index + 1;

    this.setState({
      leftSide: updatedLeftSide,
      rightSide: updatedRightSide,
      originalNames: cloned,
      excelNames: cloned1,
    });

    setTimeout(() => {
      console.log(this.state);
    }, 1000);
  };

  /**
   * Excel input change handler
   */
  excelInputChange = (e, index, nestedIndex) => {
    const { rows } = this.state;

    let cloned = rows.slice();
    cloned[index][nestedIndex] = e.target.vale;

    this.setState({
      rows: cloned,
    });
  };

  /**
   * remove mapping relation
   */
  removeRelation = (e, excelIndex) => {
    e.preventDefault();
    const {
      mappingData,
      originalNames,
      excelNames,
      leftSide,
      rightSide,
    } = this.state;

    let cloned = mappingData.slice();
    let mappingIndex = cloned.findIndex((x) => x.excelIndex === excelIndex);

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
      mappingData: cloned,
    });

    setTimeout(() => {
      console.log(this.state);
    }, 1000);
  };

  /**
   * Mapping submit handler
   */
  mappingSubmit = async () => {
    const {
      id,
      rows,
      fieldNames,
      mappingData,
    } = this.state;

    this.setState({
      loading: true,
    });

    let columns = { ...fieldNames };

    for (let i = 0; i < mappingData.length; i++) {
      columns[mappingData[i].mappingName] = mappingData[i].excelName;
    }

    const data = {
      columns,
      rows,
    };

    const res = await httpPost(`${VENDOR_ITEMS_ENDPOINT}/updatePriceList/vendor/${id}`, data);
    this.setState({
      loading: false,
    });

   this.props.history.push("/vendors/list");
    successToaster("Price list updated", "Success");
  };


  /**
   * render component
   */
  render() {
    const {
      id,
      vendor_name,
      isSubmit,
      rows,
      cols,
      mapping,
      originalNames,
      excelNames,
      leftSide,
      rightSide,
      mappingData,
      loading,
    } = this.state;

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Suppliers" breadcrumbItem="Update Price List" />
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
                    {!isSubmit && !mapping && (
                      <AvForm
                        className="needs-validation"
                      >
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <Label htmlFor="validationCustom01">
                                Update Price List of {vendor_name}
                              </Label>
                              <input
                                className={`form-control`}
                                //  accept="(.xlsx, .csv, .xls)"
                                name="file"
                                type="file"
                                onChange={(event) => this.uploadHandler(event)}
                              />
                              <div className="invalid-feedback">
                                Enter Item Name
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>

                        <Button color="primary" onClick={() => this.setState({ isSubmit: true })}>
                          Submit
                        </Button>
                      </AvForm>
                    )}

                    {isSubmit && !mapping && (
                      <div className="table-responsive">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th style={{ backgroundColor: "#BAD0EF" }}></th>
                              {cols.map((c) => (
                                <th
                                  style={{ backgroundColor: "#BAD0EF" }}
                                  key={c.key}
                                >
                                  {c.name}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((r, i) => (
                              <tr key={i}>
                                <td style={{ backgroundColor: "#BAD0EF" }}>
                                  {i + 1}
                                </td>
                                {this.state.cols.map((c, k) => (
                                  <td
                                    style={{
                                      backgroundColor: "1px solid #BAD0EF",
                                    }}
                                    key={c.key}
                                  >
                                    <input
                                      className="form-control"
                                      type="text"
                                      value={r[c.key]}
                                      onContextMenu={(e) =>
                                        this.excelRightClick(e, i + "-" + k)
                                      }
                                      onChange={(e) => {
                                        this.excelInputChange(e, i, k);
                                      }}
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
                                        <div
                                          className="excelRow"
                                          onClick={() => this.addColumn(k)}
                                        >
                                          Add Column
                                        </div>
                                        <div
                                          className="excelRow"
                                          onClick={() => this.deleteColumn(k)}
                                        >
                                          Delete Column
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
                          onClick={() => this.excelSubmit()}
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
                                          <span>{i+1}</span> &nbsp;  {original.name}
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
                                              {excel.leftSideMappedNumber &&
                                               <span>{excel.leftSideMappedNumber}</span>
                                              } &nbsp; {excel.name}
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
  })(PriceUpdate)
);
