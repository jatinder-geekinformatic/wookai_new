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
            <Breadcrumbs title="Suppliers" breadcrumbItem="Add" />
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
                      Choose one of WookAI Suppliers
                    </CardTitle>
                    <CardText>
                      Select any of WookAI Supplier. <br />
                      <Link
                        to="/vendors/wookai"
                        className="btn btn-primary waves-effect waves-light"
                      >
                        click here
                      </Link>
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
                    <CardTitle className="mt-0">Add your own Supplier</CardTitle>
                    <CardText>
                      You can create your own supplier if its not present in WookAI Suppliers. <br />
                      <Link
                        to="/vendors/new"
                        className="btn btn-primary waves-effect waves-light"
                      >
                        click here
                      </Link>
                    </CardText>
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

export default withRouter(UserAdd);
