import { combineReducers } from 'redux';

// Front
import Layout from './layout/reducer';

// Authentication
import Login from './auth/login/reducer';
import Account from './auth/register/reducer';
import ForgetPassword from './auth/forgetpwd/reducer';
import Profile from './auth/profile/reducer';

import User from './user/reducer';
import Unit from './unit/reducer';
import Video from './video/reducer';
import Setting from './setting/reducer';
import MassEmail from './mass-email/reducer';
import CannedEmail from './canned-email/reducer';
import Cms from './cms/reducer';
import Ad from './ad/reducer';
import EmailContent from './email-content/reducer';
import Admin from './admin/reducer';
import BusinessProfile from './business-profile/reducer';
import DefaultProfile from './default-profile/reducer';
import Vendor from './vendor/reducer';
import Country from './country/reducer';
import State from './state/reducer';
import TimeZone from './time-zone/reducer';
import BusinessLocation from './business-location/reducer';
import ItemLocation from './item-location/reducer';
import Category from './category/reducer';
import SubCategory from './sub-category/reducer';
import Product from './product/reducer';
import VendorItem from './vendor-item/reducer';
import IgnoreComment from './ignore-comment/reducer';
import Client from './client/reducer';
import SupplierRep from './supplier-rep/reducer';
import ManageAccount from './account/reducer';
import AssignedRep from './assigned-rep/reducer';
import WookaiVendor from './wookai-vendor/reducer';
import Conversion from './conversion/reducer';

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  User,
  Unit,
  Video,
  Setting,
  MassEmail,
  CannedEmail,
  Cms,
  Ad,
  EmailContent,
  Admin,
  BusinessProfile,
  DefaultProfile,
  Vendor,
  Country,
  State,
  TimeZone,
  BusinessLocation,
  ItemLocation,
  Category,
  SubCategory,
  Product,
  VendorItem,
  IgnoreComment,
  Client,
  SupplierRep,
  ManageAccount,
  AssignedRep,
  WookaiVendor,
  Conversion
});

export default rootReducer;
