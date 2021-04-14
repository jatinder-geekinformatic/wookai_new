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
  Modal,
} from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  getIgnoreComments,
  editIgnoreComment,
  deleteIgnoreComment,
  setIgnoreCommentFilter,
  emptyIgnoreComment,
  setIgnoreComment,
  addIgnoreComment,
  updateIgnoreComment,
} from "../../store/actions";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Loader from "../../components/Common/Loader";
import CustomPagination from "../../components/Common/Pagination";
import { successToaster, errorToaster } from "../../components/Common/Toaster";

class IgnoreComments extends React.Component {
  /**
   * component state
   */
  state = {
    id: "",
    isModal: false,
  };

  /**
   * Component Did mount
   */
  componentDidMount() {
    this.props.getIgnoreComments();
  }

  /**
   * pagination Handle click
   */
  PaginationHandleClick = (offSet, page) => {
    console.log(offSet);
    console.log(page);
    console.log(this.props);

    this.props.setIgnoreCommentFilter({
      field: "currentPage",
      value: page,
    });

    this.props.setIgnoreCommentFilter({
      field: "offSet",
      value: offSet,
    });

    this.props.getIgnoreComments();
  };

  /**
   * close Modal
   */
  closeModal = () => {
    this.setState((prevState) => ({
      isModal: !prevState.isModal,
      id: "",
    }));

    this.props.emptyIgnoreComment();
  };

  //Form Input onChange
  changeHandeler = (event) => {
    this.props.setIgnoreComment({
      field: event.target.name,
      value: event.target.value,
    });
  };

  /**
   * handle submit
   */
  handleSubmit = (e) => {
    const {
      ignoreComment: { comment },
    } = this.props;

    const { id } = this.state;

    if (!comment) {
      errorToaster("Please fill required fields", "Error");
      return false;
    }

    if (id) this.props.updateIgnoreComment(id);
    else this.props.addIgnoreComment();

    setTimeout(() => {
      this.setState({
        isModal: false,
        id: "",
      });

      this.props.getIgnoreComments();
    }, 1500);
  };

  /**
   *  get comment
   */
  editComment = (id) => {
    this.setState({
      id,
      isModal: true,
    });

    this.props.editIgnoreComment(id);
  };

  /**
   * Renders component
   */
  render() {
    const {
      ignoreComments,
      ignoreComment: { comment },
      loading,
      filter: { offSet, limit, pages, currentPage, query },
    } = this.props;

    const { isModal, id } = this.state;

    return (
      <React.Fragment>
        <Modal isOpen={isModal} toggle={() => this.closeModal}>
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myModalLabel">
              Comment
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
            <Row>
              <Col md="12">
                <FormGroup>
                  <textarea
                    className={`form-control ${comment ? "" : "is-invalid"}`}
                    onChange={(event) => this.changeHandeler(event)}
                    value={comment}
                    name="comment"
                    type="text"
                  ></textarea>
                  <div className="invalid-feedback">Enter Comment</div>
                </FormGroup>
              </Col>
            </Row>
          </div>
          <div className="modal-footer">
            <Button
              color="primary"
              type="button"
              onClick={() => this.handleSubmit()}
            >
              Submit
            </Button>
          </div>
        </Modal>
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs title="Ignore Comments" breadcrumbItem="List" />
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
                        <FormGroup>
                          <input
                            className="form-control"
                            value={query}
                            name="query"
                            type="text"
                            onChange={(event) =>
                              this.props.setIgnoreCommentFilter({
                                field: event.target.name,
                                value: event.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Button
                            onClick={() => this.props.getIgnoreComments()}
                            color="primary"
                            className="btn btn-primary waves-effect"
                          >
                            Search
                          </Button>
                        </FormGroup>
                      </Col>
                      <Col md="5">
                        <FormGroup className="float-right">
                          <Button
                            color="primary"
                            className="btn btn-primary waves-effect"
                            onClick={() => this.setState({ isModal: true })}
                          >
                            Add New
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>

                    <div className="table-responsive">
                      <Table className="table table-striped mb-0 table">
                        <thead>
                          <tr>
                            <th>Comment</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ignoreComments.length > 0 &&
                            !loading &&
                            ignoreComments.map((ignoreComment, i) => {
                              return (
                                <tr key={i}>
                                  <td>{ignoreComment.comment}</td>
                                  <td>
                                    <div className="button-items">
                                      <Button
                                        color="secondary"
                                        className="btn btn-secondary waves-effect"
                                        onClick={() =>
                                          this.editComment(ignoreComment.id)
                                        }
                                      >
                                        Edit
                                      </Button>

                                      <Button
                                        color="danger"
                                        className="btn btn-danger waves-effect waves-light"
                                        onClick={() => {
                                          if (
                                            window.confirm(
                                              "Are you sure to delete the item?"
                                            )
                                          ) {
                                            this.props.deleteIgnoreComment(
                                              ignoreComment.id
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
                    {ignoreComments.length > 0 && (
                      <FormGroup className="float-right">
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
  const {
    ignoreComments,
    loading,
    filter,
    ignoreComment,
  } = state.IgnoreComment;
  return { ignoreComments, loading, filter, ignoreComment };
};

export default withRouter(
  connect(mapStatetoProps, {
    getIgnoreComments,
    deleteIgnoreComment,
    editIgnoreComment,
    setIgnoreCommentFilter,
    emptyIgnoreComment,
    setIgnoreComment,
    addIgnoreComment,
    updateIgnoreComment,
  })(IgnoreComments)
);
