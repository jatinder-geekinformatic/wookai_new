import { all } from 'redux-saga/effects';

//public
import AccountSaga from './auth/register/saga';
import AuthSaga from './auth/login/saga';
import ForgetSaga from './auth/forgetpwd/saga';
import ProfileSaga from './auth/profile/saga';
import LayoutSaga from './layout/saga';

import UserSaga from './user/saga';
import UnitSaga from './unit/saga';
import VideoSaga from './video/saga';
import SettingSaga from './setting/saga';
import MassEmailSaga from './mass-email/saga';
import CannedEmailSaga from './canned-email/saga';
import CmsSaga from './cms/saga';
import AdSaga from './ad/saga';
import EmailContentSaga from './email-content/saga';
import AdminSaga from './admin/saga';
import BusinessProfileSaga from './business-profile/saga';
import DefaultProfileSaga from './default-profile/saga';
import VendorSaga from './vendor/saga';
import CountrySaga from './country/saga';
import StateSaga from './state/saga';
import TimeZoneSaga from './time-zone/saga';
import BusinessLocationSaga from './business-location/saga';
import ItemLocationSaga from './item-location/saga';
import CategorySaga from './category/saga';
import SubCategorySaga from './sub-category/saga';
import ProductSaga from './product/saga';
import VendorItemSaga from './vendor-item/saga';
import IgnoreCommentSaga from './ignore-comment/saga';
import ClientSaga from './client/saga';
import SupplierRepSaga from './supplier-rep/saga';
import ManageAccountSaga from './account/saga';
import AssignedRepSaga from './assigned-rep/saga';
import WookaiVendorSaga from './wookai-vendor/saga';
import Conversion from './conversion/saga';

export default function* rootSaga() {
  yield all([
    //public
    AccountSaga(),
    AuthSaga(),
    ProfileSaga(),
    ForgetSaga(),
    LayoutSaga(),
    UserSaga(),
    UnitSaga(),
    VideoSaga(),
    SettingSaga(),
    MassEmailSaga(),
    CannedEmailSaga(),
    CmsSaga(),
    AdSaga(),
    EmailContentSaga(),
    AdminSaga(),
    BusinessProfileSaga(),
    DefaultProfileSaga(),
    VendorSaga(),
    CountrySaga(),
    StateSaga(),
    TimeZoneSaga(),
    BusinessLocationSaga(),
    ItemLocationSaga(),
    CategorySaga(),
    SubCategorySaga(),
    ProductSaga(),
    VendorItemSaga(),
    IgnoreCommentSaga(),
    ClientSaga(),
    SupplierRepSaga(),
    ManageAccountSaga(),
    AssignedRepSaga(),
    WookaiVendorSaga(),
    Conversion()
  ]);
}
