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
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
  getCategories,
  editCategory,
  deleteCategory,
  setCategoryFilter,
} from '../../store/actions';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Loader from '../../components/Common/Loader';
import CustomPagination from '../../components/Common/Pagination';

class Categories extends React.Component {
  /**
   * Component Did mount
   */
  componentDidMount() {
    this.props.getCategories();
  }

  /**
   * pagination Handle click
   */
  PaginationHandleClick = (offSet, page) => {
    console.log(offSet);
    console.log(page);
    console.log(this.props);

    this.props.setCategoryFilter({
      field: 'currentPage',
      value: page,
    });

    this.props.setCategoryFilter({
      field: 'offSet',
      value: offSet,
    });

    this.props.getCategories();
  };

  /**
   * Renders component
   */
  render() {
    const {
      categories,
      loading,
      filter: { offSet, limit, pages, currentPage, query },
    } = this.props;

    return (
      <React.Fragment>
        <div className='page-content'>
          <div className='container-fluid subcat-btn'>
            <Breadcrumbs title='Categories' breadcrumbItem='List' />
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
                              this.props.setCategoryFilter({
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
                            onClick={() => this.props.getCategories()}
                            color='primary'
                            className='btn btn-primary waves-effect'
                          >
                            Search
                          </Button>
                        </FormGroup>
                      </Col>
                      <Col md='2' sm="6" xs="6">
                        <FormGroup>
                          <Link to={`/categories/add`}>
                            <Button
                              color='primary'
                              className='btn btn-primary waves-effect'
                            >
                              Add New
                            </Button>
                          </Link>
                        </FormGroup>
                      </Col>
                    </Row>

                    <div className='table-responsive'>
                      <Table className='table table-striped mb-0 table'>
                        <thead>
                          <tr>
                            <th>Category Name</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.length > 0 &&
                            !loading &&
                            categories.map((category, i) => {
                              return (
                                <tr key={i}>
                                  <td>{category.category_name}</td>
                                  <td>
                                    <div className='button-items'>
                                      <Link
                                        to={`/categories/edit/${category.id}`}
                                      >
                                        <Button
                                          color='secondary'
                                          className='btn btn-secondary waves-effect'
                                        >
                                          Edit
                                        </Button>
                                      </Link>

                                      <Button
                                        color='danger'
                                        className='btn btn-danger waves-effect waves-light'
                                        onClick={() => {
                                          if (
                                            window.confirm(
                                              'Are you sure to delete the item?'
                                            )
                                          ) {
                                            this.props.deleteCategory(
                                              category.id
                                            );
                                          }
                                        }}
                                      >
                                        Delete
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table>
                    </div>
                    {categories.length > 0 && (
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
  const { categories, loading, filter } = state.Category;
  return { categories, loading, filter };
};

export default withRouter(
  connect(mapStatetoProps, {
    getCategories,
    deleteCategory,
    editCategory,
    setCategoryFilter,
  })(Categories)
);
