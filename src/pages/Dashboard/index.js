import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter, Media, Table } from "reactstrap";
import { Link } from "react-router-dom";

//import Charts
import StackedColumnChart from "./StackedColumnChart";

import modalimage1 from "../../assets/images/product/img-7.png";
import modalimage2 from "../../assets/images/product/img-4.png";

// Pages Components
import WelcomeComp from "./WelcomeComp";
import MonthlyEarning from "./MonthlyEarning";
import SocialSource from "./SocialSource";
import ActivityComp from "./ActivityComp";
import TopCities from "./TopCities";
import LatestTranaction from "./LatestTranaction";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//Import Images
import LogoImg from "../../assets/images/logo-circle.png";
import BannerBgImg from "../../assets/images/bannerbg.jpg";
import HandIcon from "../../assets/images/account-manage.png";
import UserIcon from "../../assets/images/manage-user.png";
import CountIcon from "../../assets/images/count.png";
import LocationIcon from "../../assets/images/location.png";
import ItemsIcon from "../../assets/images/manage-items.png";
import OrderIcon from "../../assets/images/manage-order.png";

//i18n
import { withNamespaces } from 'react-i18next';

 const Dashboard = (props) => {

     const [modal, setmodal] = useState(false);

          const reports = [
                { title: "Orders", iconClass: "bx-copy-alt", description: "1,235" },
                { title: "Revenue", iconClass: "bx-archive-in", description: "$35, 723" },
                { title: "Average Price", iconClass: "bx-purchase-tag-alt", description: "$16.2" }
            ];
         const email = [
                { title: "Week", linkto: "#", isActive: false },
                { title: "Month", linkto: "#", isActive: false },
                { title: "Year", linkto: "#", isActive: true }
            ];

          return (
              <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        {/* Render Breadcrumb */}
                        <Breadcrumbs title={props.t('Dashboard')} breadcrumbItem={props.t('Dashboard')} />
						<Row>
                            <Col lg="12">
                                <div className="banner-wrap">
									<div className="banner-inner">
									<Row>
										<Col lg="2" sm="2" xs="2">
											<ul className="icons firstthree">
												<li className="manageaccount"> <a href="#"><img src={HandIcon} alt="" /></a>
												<p>Manage Account</p></li>
												<li className="manageuser"> <a href="#"><img src={UserIcon} alt="" /></a>
												<p>Manage User</p></li>
												<li className="countorder"> <a href="#"><img src={CountIcon} alt="" /></a>
												<p>Count & Order Supplies</p></li>
											</ul>
										</Col>
										<Col lg="8" sm="8" xs="8">
										<div className="circle-logo-wrap">
											<ul className="left-text">
												<li className="first-text">Manage Account</li>
												<li className="second-text">Manage User</li>
												<li className="third-text">Count & Order Supplies</li>
											</ul>
											<div className="circle-logoinner">
												<img src={LogoImg} alt="" />
											</div>
											<ul className="right-text">
												<li className="fourth-text">Manage Storage Locations</li>
												<li className="fifth-text">Manage Items</li>
												<li className="sixth-text">Manage Order & Receiving</li>
											</ul>											
										 </div>
										</Col>
										<Col lg="2" sm="2" xs="2">
											<ul className="icons">
												<li className="manageaccount managelocations"> <a href="#"><img src={LocationIcon} alt="" /></a>
												<p>Manage Storage Locations</p></li>
												<li className="manageuser manageitems"> <a href="#"><img src={ItemsIcon} alt="" /></a>
												<p>Manage Items</p></li>
												<li className="countorder mangeorder"> <a href="#"><img src={OrderIcon} alt="" /></a>
												<p>Manage Order & Receiving</p></li>
											</ul>										
										</Col>								
									</Row>
									</div>
								</div>
                            </Col>
                        </Row>	

                        <Row>
                            <Col xl="4">
                                <WelcomeComp />
                                <MonthlyEarning />
                            </Col>
                            <Col xl="8">
                                <Row>
                                    {/* Reports Render */}
                                    {
                                        reports.map((report, key) =>
                                            <Col md="4" key={"_col_" + key}>
                                                <Card className="mini-stats-wid">
                                                    <CardBody>
                                                        <Media>
                                                            <Media body>
                                                                <p className="text-muted font-weight-medium">{report.title}</p>
                                                                <h4 className="mb-0">{report.description}</h4>
                                                            </Media>
                                                            <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                                                                <span className="avatar-title">
                                                                    <i className={"bx " + report.iconClass + " font-size-24"}></i>
                                                                </span>
                                                            </div>
                                                        </Media>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        )
                                    }
                                </Row>

                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4 float-sm-left">
                                            Email Sent
                                        </CardTitle>
                                        <div className="float-sm-right">
                                            <ul className="nav nav-pills">
                                                {
                                                    email.map((mail, key) =>
                                                        <li className="nav-item" key={"_li_" + key}>
                                                            <Link className={mail.isActive ? "nav-link active" : "nav-link"} to={mail.linkto}>{mail.title}</Link>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                        <div className="clearfix"></div>
                                        <StackedColumnChart />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col xl="4">
                                <SocialSource />
                            </Col>
                            <Col xl="4">
                                <ActivityComp />
                            </Col>

                            <Col xl="4">
                                <TopCities />
                            </Col>
                        </Row>

                        <Row>
                            <Col lg="12">
                                <LatestTranaction />
                            </Col>
                        </Row>
                        					
                    </Container>
                </div>
                <Modal isOpen={modal} role="dialog" autoFocus={true} centered={true} className="exampleModal" tabindex="-1" toggle={() => { setmodal(!modal); }}>
                    <div className="modal-content">
                        <ModalHeader toggle={() => { setmodal(!modal); }}>
                            Order Details
                        </ModalHeader >
                        <ModalBody>
                            <p className="mb-2">Product id: <span className="text-primary">#SK2540</span></p>
                            <p className="mb-4">Billing Name: <span className="text-primary">Neal Matthews</span></p>

                            <div className="table-responsive">
                                <Table className="table table-centered table-nowrap">
                                    <thead>
                                        <tr>
                                            <th scope="col">Product</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">
                                                <div>
                                                    <img src={modalimage1} alt="" className="avatar-sm" />
                                                </div>
                                            </th>
                                            <td>
                                                <div>
                                                    <h5 className="text-truncate font-size-14">Wireless Headphone (Black)</h5>
                                                    <p className="text-muted mb-0">$ 225 x 1</p>
                                                </div>
                                            </td>
                                            <td>$ 255</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                <div>
                                                    <img src={modalimage2} alt="" className="avatar-sm" />
                                                </div>
                                            </th>
                                            <td>
                                                <div>
                                                    <h5 className="text-truncate font-size-14">Hoodie (Blue)</h5>
                                                    <p className="text-muted mb-0">$ 145 x 1</p>
                                                </div>
                                            </td>
                                            <td>$ 145</td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <h6 className="m-0 text-right">Sub Total:</h6>
                                            </td>
                                            <td>$ 400</td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <h6 className="m-0 text-right">Shipping:</h6>
                                            </td>
                                            <td>Free</td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <h6 className="m-0 text-right">Total:</h6>
                                            </td>
                                            <td>$ 400</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" color="secondary" onClick={() => { setmodal(!modal); }}>Close</Button>
                        </ModalFooter>
                    </div>
                </Modal>
            </React.Fragment>
          );
        }

export default withNamespaces()(Dashboard);