import React from 'react';
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
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
  getVendorItems,
  editVendorItem,
  deleteVendorItem,
  setVendorItemFilter,
} from '../../store/actions';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Loader from '../../components/Common/Loader';
import CustomPagination from '../../components/Common/Pagination';

class VendorItems extends React.Component {

  /**
   * component state
   */
  state = {
    vendorId: ''
  }

  /**
   * Component Did mount
   */
  async componentDidMount() {
    const route = this.props.location.pathname;
    let arr = route.split('/');
    let vendorId = arr[3];
    this.setState({vendorId})
    this.props.getVendorItems(vendorId);
  }

  /**
   * pagination Handle click
   */
  PaginationHandleClick = (offSet, page) => {
    const {vendorId} = this.state;

    this.props.setVendorItemFilter({
      field: 'currentPage',
      value: page,
    });

    this.props.setVendorItemFilter({
      field: 'offSet',
      value: offSet,
    });

    this.props.getVendorItems(vendorId);
  };

  /**
   * Renders component
   */
  render() {
    const {
      vendorItems,
      filter: { offSet, limit, pages, currentPage, query },
      loading,
    } = this.props;

    const {vendorId} = this.state;

    return (
      <React.Fragment>
        <div className='page-content'>
          <div className='container-fluid subcat-btn'>
            <Breadcrumbs title='Vendor Items' breadcrumbItem='List' />
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
                      <Col md='8' sm="12">
                        <FormGroup>
                          <input
                            className='form-control'
                            value={query}
                            name='query'
                            type='text'
                            onChange={(event) =>
                              this.props.setVendorItemFilter({
                                field: event.target.name,
                                value: event.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md='2' sm="6" xs="6">
                        <FormGroup>
                          <Button
                            onClick={() => this.props.getVendorItems(vendorId)}
                            color='primary'
                            className='btn btn-primary waves-effect'
                          >
                            Search
                          </Button>
                        </FormGroup>
                      </Col>
                      <Col md='2' sm="6" xs="6">
                        <FormGroup>
                          <Link to={`/vendorItems/update/${vendorId}`}>
                            <Button
                              color='primary'
                              className='btn btn-primary waves-effect'
                            >
                              Update
                            </Button>
                          </Link>
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className='table-responsive'>
                      <Table className='table table-striped mb-0 table'>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Item No</th>
                            <th>Item Brand</th>
                            <th>Item Description</th>
                            <th>Item Pack</th>
                            <th>Item Size</th>
                            <th>Item Price</th>
                            <th>Last week Price</th>
                            <th>Price Change</th>
                            <th>Split Price</th>
                            <th>Last Week Split Price</th>
                            <th>Price Change Split</th>
                            <th>Supplier Rebate</th>
                            <th>Line Item Rebate</th>
                            <th>Manufacturer Rebate</th>
                            <th>Price with rebate</th>
                            <th>Split Price with rebate</th>
                            <th>Contract Price</th>
                            <th>Contract Price Difference</th>
                            <th>Margin %</th>
                            <th>Supplier's Cost $</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vendorItems.length > 0 &&
                            !loading &&
                            vendorItems.map((vendorItem, i) => {
                              return (
                                <tr key={i}>
                                  <td>{vendorItem.added_date}</td>
                                  <td>{vendorItem.item}</td>
                                  <td>{vendorItem.brand}</td>
                                  <td>{vendorItem.description}</td>
                                  <td>{vendorItem.pack}</td>
                                  <td>{vendorItem.size}</td>
                                  <td>${vendorItem.price}</td>
                                  <td>${vendorItem.old_price}</td>
                                  <td>{vendorItem.price - vendorItem.old_price}</td>
                                  <td>{vendorItem.each_available}</td>
                                  <td>{vendorItem.lastweek_each_available}</td>
                                  <td>{vendorItem.each_available - vendorItem.lastweek_each_available}</td>
                                  <td>{vendorItem.rebate}</td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td>
                                    <div className='button-items'>
                                      <Link to={`/vendorItems/edit/${vendorItem.id}`}>
                                        <Button
                                          color='secondary'
                                          className='btn btn-secondary waves-effect'
                                        >
                                          Edit
                                        </Button>
                                      </Link>

                                      {/* <Button
                                        color='danger'
                                        className='btn btn-danger waves-effect waves-light'
                                        onClick={() => {
                                          if (
                                            window.confirm(
                                              'Are you sure to delete the item?'
                                            )
                                          ) {
                                            this.props.deleteVendorItem(vendorItem.id);
                                          }
                                        }}
                                      >
                                        Delete
                                      </Button> */}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table>
                    </div>
                    {vendorItems.length > 0 && (
                      <FormGroup className='float-right'>
                        <CustomPagination
                          offSet={offSet}
                          limit={limit}
                          pages={pages}
                          currentPage={currentPage}
                          PaginationHandleClick={this.PaginationHandleClick}
                        />
                      </FormGroup>
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
  const { vendorItems, filter, loading } = state.VendorItem;
  return { vendorItems, filter, loading };
};

export default withRouter(
  connect(mapStatetoProps, { getVendorItems, deleteVendorItem, editVendorItem, setVendorItemFilter })(
    VendorItems
  )
);
