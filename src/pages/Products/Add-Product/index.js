import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Container,
  CardImg,
  CardText,
} from "reactstrap";
import { withRouter, Link } from "react-router-dom";

// import images
import redBanner from "../../../assets/cherry/images/red_bg_new.png";
import greenBanner from "../../../assets/cherry/images/bg_green_new.png";
import blueBanner from "../../../assets/cherry/images/bg_blue_new.png";

import Breadcrumbs from "../../../components/Common/Breadcrumb";

class UserAdd extends React.Component {
  /**
   * render component
   */
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Items" breadcrumbItem="Add" />
            <Row>
              <Col md={6}>
                <Card>
                  <CardImg
                    top
                    className="img-fluid"
                    src={redBanner}
                    alt="Skote"
                  />
                  <CardBody className="text-center">
                    <CardTitle className="mt-0">
                      Use Cherry's Set Up Excel Workbook
                    </CardTitle>
                    <CardText>
                      or an Excel/CSV file from an outside resource to add a new
                      inventory list for your business to Cherry's Manage Item
                      Page.Subsequent uploads may be used to ensure that the
                      data changes made from this outside resource, do not
                      conflict with your cherry software set up. <br />
                      <Link
                        to="/items/import"
                        className="btn btn-primary waves-effect waves-light"
                      >
                        click here
                      </Link>
                      <br />
                      (Best choice for New Account mass import of your inventory
                      list)
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col md={6}>
                <Card>
                  <CardImg
                    top
                    className="img-fluid"
                    src={greenBanner}
                    alt="Skote"
                  />

                  <CardBody className="text-center">
                    <CardTitle className="mt-0">Add +3 new Items</CardTitle>
                    <CardText>
                      to your Manage Item page by first typing in the item names
                      and then use Cherry's set up dashboard to input additional
                      information about these items. <br />
                      <Link
                        to="/items/add-multiple"
                        className="btn btn-primary waves-effect waves-light"
                      >
                        click here
                      </Link>
                      <br />
                      (Best choice to add 3 or 10 new items)
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col md={3}></Col>
              <Col md={6}>
                <Card>
                  <CardImg
                    top
                    className="img-fluid"
                    src={blueBanner}
                    alt="Skote"
                  />

                  <CardBody className="text-center">
                    <CardTitle className="mt-0">Add Single Item</CardTitle>
                    <CardText>
                      to your Manage Item Page by typing the item name and all
                      set up data. <br />
                      <Link
                        to="/items/add-single"
                        className="btn btn-primary waves-effect waves-light"
                      >
                        click here
                      </Link>
                      <br />
                      (Best choice to add 1 or 2 new items)
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col md={3}></Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(UserAdd);
