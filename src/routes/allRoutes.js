import React from 'react';
import { Redirect } from 'react-router-dom';

/**
 * Manage Account
 */
import AccountManage from '../pages/Account/Manage-Account';

/**
 * User Routes
 */
import Users from '../pages/Users';
import UserAdd from '../pages/Users/Add-User';

/**
 * Assigned Reps
 */
import AssignedReps from '../pages/Assigned-Reps';
import AddAssignedRep from '../pages/Assigned-Reps/Add-Assigned-Rep';

/**
 * Client Routes
 */
import Clients from '../pages/Clients';
import ClientAdd from '../pages/Clients/Add-Client';

/**
 * Client Routes
 */
import SupplierReps from '../pages/Supplier-Reps';
import SupplierRepAdd from '../pages/Supplier-Reps/Add-Supplier-Rep';

/**
 * Unit Routes
 */
import Units from '../pages/Units';
import UnitAdd from '../pages/Units/Add-Unit';

/**
 * Unit List Routes
 */
import Conversions from '../pages/Conversions';
import ConversionAdd from '../pages/Conversions/Add-Conversion';


/**
 * Video Routes
 */
import Videos from '../pages/Videos';
import VideoAdd from '../pages/Videos/Add-Video';

/**
 * Setting Routes
 */
import SettingAdd from '../pages/Settings/Add-Setting';

/**
 * Mass Emails
 */
import MassEmails from '../pages/Mass-Emails';
import MassEmailAdd from '../pages/Mass-Emails/Add-Mass-Email';

/**
 * Canned Emails
 */
import CannedEmails from '../pages/Canned-Emails';
import CannedEmailAdd from '../pages/Canned-Emails/Add-Canned-Email';

/**
 * Cms
 */
import Cms from '../pages/Cms';
import CmsAdd from '../pages/Cms/Add-Cms';

/**
 * Ads
 */
import AdAdd from '../pages/Ads/Add-Ad';

/**
 * Mass Emails
 */
import EmailContents from '../pages/Email-Contents';
import EmailContentAdd from '../pages/Email-Contents/Add-Email-Content';

/**
 * Admins
 */
import Admins from '../pages/Admins';
import AdminAdd from '../pages/Admins/Add-Admin';

/**
 * BusinessProfiles
 */
import BusinessProfiles from '../pages/Business-Profiles';

/**
 * DefaultProfiles
 */
import DefaultProfiles from '../pages/Default-Profiles';

/**
 * Vendors
 */
import Vendors from '../pages/Vendors';
import VendorAdd from '../pages/Vendors/Add-Vendor';
import VendorAddNew from '../pages/Vendors/Add-Vendor/New-Vendor';
import VendorAddWookai from '../pages/Vendors/Add-Vendor/Wookai-Vendor';


/**
 * Vendors
 */
import WookaiVendors from '../pages/Wookai-Vendors';
import WookaiVendorAdd from '../pages/Wookai-Vendors/Add-Wookai-Vendor';
import UpdatWookaiVendorPrice from '../pages/Wookai-Vendors/Update-Wookai-Price';


/**
 * Business Locations
 */
import BusinessLocations from '../pages/Business-Locations';
import BusinessLocationAdd from '../pages/Business-Locations/Add-Business-Location';
import SelectBusinessLocation from '../pages/Business-Locations/Select-Business-Location';

/**
 * Item Locations
 */
import ItemLocations from '../pages/Item-Locations';
import ItemLocationAdd from '../pages/Item-Locations/Add-Item-Location';

/**
 * Categories
 */
import Categories from '../pages/Categories';
import CategoryAdd from '../pages/Categories/Add-Category';

/**
 * SubCategories
 */
import SubCategories from '../pages/Sub-Categories';
import SubCategoryAdd from '../pages/Sub-Categories/Add-Sub-Category';

/**
 * Products
 */
import Products from '../pages/Products';
import ProductAdd from '../pages/Products/Add-Product';
import SingleProductAdd from '../pages/Products/Add-Product/Single-Product';
import MultipleProductAdd from '../pages/Products/Add-Product/Multiple-Product';
import PendingUnits from '../pages/Products/Pending-Units';
import PendingAdditionalInfo from '../pages/Products/Pending-Additional-Info';
import PendingParLevels from '../pages/Products/Pending-Par-Levels';
import ImportProduct from '../pages/Products/Add-Product/Import-Product';

/**
 * Vendor Items
 */
import VendorItems from '../pages/Vendors-Items';
import VendorItemsAdd from '../pages/Vendors-Items/Add-Vendor-Item';
import UpdatVendorPrice from '../pages/Vendors/Update-Price';
import ImportVendorRelationships from '../pages/Vendors/Import-Relationships';
import VendorItemsBulkUpdate from '../pages/Vendors-Items/Bulk-Update';
/**
 * Ignore Comments
 */
import IgnoreComments from '../pages/Ignore-Comments';

/**
 * Orders
 */
 import Orders from '../pages/Orders';

// // Pages Component
import Chat from '../pages/Chat/Chat';

// Profile
import UserProfile from '../pages/Authentication/user-profile';

// Pages Calendar
import Calendar from '../pages/Calendar/index';

// //Tasks
import TasksList from '../pages/Tasks/tasks-list';
import TasksKanban from '../pages/Tasks/tasks-kanban';
import TasksCreate from '../pages/Tasks/tasks-create';

// //Projects
import ProjectsGrid from '../pages/Projects/projects-grid';
import ProjectsList from '../pages/Projects/projects-list';
import ProjectsOverview from '../pages/Projects/projects-overview';
import ProjectsCreate from '../pages/Projects/projects-create';

// //Ecommerce Pages
import EcommerceProducts from '../pages/Ecommerce/EcommerceProducts';
import EcommerceProductDetail from '../pages/Ecommerce/EcommerceProductDetail';
import EcommerceOrders from '../pages/Ecommerce/EcommerceOrders';
import EcommerceCustomers from '../pages/Ecommerce/EcommerceCustomers';
import EcommerceCart from '../pages/Ecommerce/EcommerceCart';
import EcommerceCheckout from '../pages/Ecommerce/EcommerceCheckout';
import EcommerceShops from '../pages/Ecommerce/EcommerceShops';
import EcommerceAddProduct from '../pages/Ecommerce/EcommerceAddProduct';

//Email
import EmailInbox from '../pages/Email/email-inbox';
import EmailRead from '../pages/Email/email-read';

//Invoices
import InvoicesList from '../pages/Invoices/invoices-list';
import InvoiceDetail from '../pages/Invoices/invoices-detail';

// Authentication related pages
import Login from '../pages/Authentication/Login';
import Logout from '../pages/Authentication/Logout';
import Register from '../pages/Authentication/Register';
import ForgetPwd from '../pages/Authentication/ForgetPassword';

//  // Inner Authentication
import Login1 from '../pages/AuthenticationInner/Login';
import Register1 from '../pages/AuthenticationInner/Register';
import ForgetPwd1 from '../pages/AuthenticationInner/ForgetPassword';
import LockScreen from '../pages/AuthenticationInner/auth-lock-screen';

// Dashboard
import Dashboard from '../pages/Dashboard/index';
import DashboardSaas from '../pages/Dashboard-saas/index';
import DashboardCrypto from '../pages/Dashboard-crypto/index';

//Crypto
import CryptoWallet from '../pages/Crypto/crypto-wallet';
import CryptoBuySell from '../pages/Crypto/crypto-buy-sell';
import CryptoExchange from '../pages/Crypto/crypto-exchange';
import CryptoLending from '../pages/Crypto/crypto-lending';
import CryptoOrders from '../pages/Crypto/crypto-orders';
import CryptoKYCApplication from '../pages/Crypto/crypto-kyc-application';
import CryptoIcoLanding from '../pages/Crypto/CryptoIcoLanding/index';

// Charts
import ChartApex from '../pages/Charts/Apexcharts';
import ChartistChart from '../pages/Charts/ChartistChart';
import ChartjsChart from '../pages/Charts/ChartjsChart';
import EChart from '../pages/Charts/EChart';
import SparklineChart from '../pages/Charts/SparklineChart';
import ToastUIChart from '../pages/Charts/ToastUIChart';
import ChartsKnob from '../pages/Charts/charts-knob';

// Maps
import MapsGoogle from '../pages/Maps/MapsGoogle';
import MapsVector from '../pages/Maps/MapsVector';
import MapsLeaflet from '../pages/Maps/MapsLeaflet';

//Icons
import IconBoxicons from '../pages/Icons/IconBoxicons';
import IconDripicons from '../pages/Icons/IconDripicons';
import IconMaterialdesign from '../pages/Icons/IconMaterialdesign';
import IconFontawesome from '../pages/Icons/IconFontawesome';

//Tables
import BasicTables from '../pages/Tables/BasicTables';
import DatatableTables from '../pages/Tables/DatatableTables';
import ResponsiveTables from '../pages/Tables/ResponsiveTables';
import EditableTables from '../pages/Tables/EditableTables';

// Forms
import FormElements from '../pages/Forms/FormElements';
import FormAdvanced from '../pages/Forms/FormAdvanced';
import FormEditors from '../pages/Forms/FormEditors';
import FormValidations from '../pages/Forms/FormValidations';
import FormMask from '../pages/Forms/FormMask';
import FormRepeater from '../pages/Forms/FormRepeater';
import FormUpload from '../pages/Forms/FormUpload';
import FormWizard from '../pages/Forms/FormWizard';
import FormXeditable from '../pages/Forms/FormXeditable';

//Ui
import UiAlert from '../pages/Ui/UiAlert';
import UiButtons from '../pages/Ui/UiButtons';
import UiCards from '../pages/Ui/UiCards';
import UiCarousel from '../pages/Ui/UiCarousel';
import UiColors from '../pages/Ui/UiColors';
import UiDropdown from '../pages/Ui/UiDropdown';
import UiGeneral from '../pages/Ui/UiGeneral';
import UiGrid from '../pages/Ui/UiGrid';
import UiImages from '../pages/Ui/UiImages';
import UiLightbox from '../pages/Ui/UiLightbox';
import UiModal from '../pages/Ui/UiModal';
import UiProgressbar from '../pages/Ui/UiProgressbar';
import UiSweetAlert from '../pages/Ui/UiSweetAlert';
import UiTabsAccordions from '../pages/Ui/UiTabsAccordions';
import UiTypography from '../pages/Ui/UiTypography';
import UiVideo from '../pages/Ui/UiVideo';
import UiSessionTimeout from '../pages/Ui/UiSessionTimeout';
import UiRating from '../pages/Ui/UiRating';
import UiRangeSlider from '../pages/Ui/UiRangeSlider';
import UiNotifications from '../pages/Ui/ui-notifications';
import UiImageCropper from '../pages/Ui/ui-image-cropper';

//Pages
import PagesStarter from '../pages/Utility/pages-starter';
import PagesMaintenance from '../pages/Utility/pages-maintenance';
import PagesComingsoon from '../pages/Utility/pages-comingsoon';
import PagesTimeline from '../pages/Utility/pages-timeline';
import PagesFaqs from '../pages/Utility/pages-faqs';
import PagesPricing from '../pages/Utility/pages-pricing';
import Pages404 from '../pages/Utility/pages-404';
import Pages500 from '../pages/Utility/pages-500';

//Contacts
import ContactsGrid from '../pages/Contacts/contacts-grid';
import ContactsList from '../pages/Contacts/contacts-list';
import ContactsProfile from '../pages/Contacts/contacts-profile';

const userRoutes = [
  { path: '/manageAccount', component: AccountManage },

  { path: '/users/list', component: Users },
  { path: '/users/add', component: UserAdd },
  { path: '/users/edit/:id', component: UserAdd },

  { path: '/assignedReps/list', component: AssignedReps },
  { path: '/assignedReps/add', component: AddAssignedRep },
  { path: '/assignedReps/edit/:id', component: AddAssignedRep },

  { path: '/clients/list', component: Clients },
  { path: '/clients/add', component: ClientAdd },
  { path: '/clients/edit/:id', component: ClientAdd },

  { path: '/supplierReps/list', component: SupplierReps },
  { path: '/supplierReps/add', component: SupplierRepAdd },
  { path: '/supplierReps/edit/:id', component: SupplierRepAdd },

  { path: '/units/list', component: Units },
  { path: '/units/add', component: UnitAdd },
  { path: '/units/edit/:id', component: UnitAdd },

  { path: '/conversions/list', component: Conversions },
  { path: '/conversions/add', component: ConversionAdd },
  { path: '/conversions/edit/:id', component: ConversionAdd },

  { path: '/videos/list', component: Videos },
  { path: '/videos/add', component: VideoAdd },
  { path: '/videos/edit/:id', component: VideoAdd },

  { path: '/settings', component: SettingAdd },

  { path: '/massEmails/list', component: MassEmails },
  { path: '/massEmails/add', component: MassEmailAdd },
  { path: '/massEmails/edit/:id', component: MassEmailAdd },

  { path: '/cannedEmails/list', component: CannedEmails },
  { path: '/cannedEmails/add', component: CannedEmailAdd },
  { path: '/cannedEmails/edit/:id', component: CannedEmailAdd },

  { path: '/cms/list', component: Cms },
  { path: '/cms/add', component: CmsAdd },
  { path: '/cms/edit/:id', component: CmsAdd },

  { path: '/ads', component: AdAdd }, 

  { path: '/emailContents/list', component: EmailContents },
  { path: '/emailContents/edit/:id', component: EmailContentAdd },

  { path: '/admins/list', component: Admins },
  { path: '/admins/add', component: AdminAdd },
  { path: '/admins/edit/:id', component: AdminAdd },

  { path: '/businessProfiles/list', component: BusinessProfiles },

  { path: '/defaultProfiles/list', component: DefaultProfiles },

  { path: '/vendors/list', component: Vendors },
  { path: '/vendors/add', component: VendorAdd },
  { path: '/vendors/new', component: VendorAddNew },
  { path: '/vendors/wookai', component: VendorAddWookai },
  { path: '/vendors/edit/:id', component: VendorAddNew },

  { path: '/wookaiVendors/list', component: WookaiVendors },
  { path: '/wookaiVendors/add', component: WookaiVendorAdd },
  { path: '/wookaiVendors/edit/:id', component: WookaiVendorAdd },
  { path: '/wookaiVendors/updatePriceList/:id', component: UpdatWookaiVendorPrice},


  { path: '/businessLocations/list', component: BusinessLocations },
  { path: '/businessLocations/add', component: BusinessLocationAdd },
  { path: '/businessLocations/edit/:id', component: BusinessLocationAdd },
  { path: '/selectBusinessLocation', component: SelectBusinessLocation },

  { path: '/itemLocations/list', component: ItemLocations },
  { path: '/itemLocations/add', component: ItemLocationAdd },
  { path: '/itemLocations/edit/:id', component: ItemLocationAdd },

  { path: '/categories/list', component: Categories },
  { path: '/categories/add', component: CategoryAdd },
  { path: '/categories/edit/:id', component: CategoryAdd },

  { path: '/subCategories/list', component: SubCategories },
  { path: '/subCategories/add', component: SubCategoryAdd },
  { path: '/subCategories/edit/:id', component: SubCategoryAdd },

  { path: '/items/list', component: Products },
  { path: '/items/add', component: ProductAdd },
  { path: '/items/add-single', component: SingleProductAdd},
  { path: '/items/edit/:id', component: SingleProductAdd},
  { path: '/items/add-multiple', component: MultipleProductAdd},
  { path: '/items/pendingUnits', component: PendingUnits},
  { path: '/items/pendingAdditionalInfo', component: PendingAdditionalInfo},
  { path: '/items/pendingParLevels', component: PendingParLevels },
  { path: '/items/import', component: ImportProduct},
  { path: '/items/edit/:id', component: ProductAdd },

  { path: '/vendorItems/vendor/:vendorId', component: VendorItems},
  { path: '/vendorItems/edit/:itemId', component: VendorItemsAdd},
  { path: '/vendors/updatePriceList/:id', component: UpdatVendorPrice},
  { path: '/vendors/importRelationships/:id', component: ImportVendorRelationships},
  { path: '/vendorItems/update/:vendorId', component: VendorItemsBulkUpdate},

  { path: '/ignoreComments', component: IgnoreComments},

  { path: '/orders/create', component: Orders},


  { path: '/dashboard', component: Dashboard },
  { path: '/dashboard-saas', component: DashboardSaas },
  { path: '/dashboard-crypto', component: DashboardCrypto },

  //Crypto
  { path: '/crypto-wallet', component: CryptoWallet },
  { path: '/crypto-buy-sell', component: CryptoBuySell },
  { path: '/crypto-exchange', component: CryptoExchange },
  { path: '/crypto-lending', component: CryptoLending },
  { path: '/crypto-orders', component: CryptoOrders },
  { path: '/crypto-kyc-application', component: CryptoKYCApplication },

  //chat
  { path: '/chat', component: Chat },

  // //calendar
  { path: '/calendar', component: Calendar },

  // //profile
  { path: '/profile', component: UserProfile },

  //Ecommerce
  { path: '/ecommerce-products', component: EcommerceProducts },
  { path: '/ecommerce-product-detail', component: EcommerceProductDetail },
  { path: '/ecommerce-orders', component: EcommerceOrders },
  { path: '/ecommerce-customers', component: EcommerceCustomers },
  { path: '/ecommerce-cart', component: EcommerceCart },
  { path: '/ecommerce-checkout', component: EcommerceCheckout },
  { path: '/ecommerce-shops', component: EcommerceShops },
  { path: '/ecommerce-add-product', component: EcommerceAddProduct },

  //Email
  { path: '/email-inbox', component: EmailInbox },
  { path: '/email-read', component: EmailRead },

  //Invoices
  { path: '/invoices-list', component: InvoicesList },
  { path: '/invoices-detail', component: InvoiceDetail },

  // Tasks
  { path: '/tasks-list', component: TasksList },
  { path: '/tasks-kanban', component: TasksKanban },
  { path: '/tasks-create', component: TasksCreate },

  //Projects
  { path: '/projects-grid', component: ProjectsGrid },
  { path: '/projects-list', component: ProjectsList },
  { path: '/projects-overview', component: ProjectsOverview },
  { path: '/projects-create', component: ProjectsCreate },

  // Contacts
  { path: '/contacts-grid', component: ContactsGrid },
  { path: '/contacts-list', component: ContactsList },
  { path: '/contacts-profile', component: ContactsProfile },

  //Charts
  { path: '/apex-charts', component: ChartApex },
  { path: '/chartist-charts', component: ChartistChart },
  { path: '/chartjs-charts', component: ChartjsChart },
  { path: '/e-charts', component: EChart },
  { path: '/sparkline-charts', component: SparklineChart },
  { path: '/tui-charts', component: ToastUIChart },
  { path: '/charts-knob', component: ChartsKnob },

  // Icons
  { path: '/icons-boxicons', component: IconBoxicons },
  { path: '/icons-dripicons', component: IconDripicons },
  { path: '/icons-materialdesign', component: IconMaterialdesign },
  { path: '/icons-fontawesome', component: IconFontawesome },

  // Tables
  { path: '/tables-basic', component: BasicTables },
  { path: '/tables-datatable', component: DatatableTables },
  { path: '/tables-responsive', component: ResponsiveTables },
  { path: '/tables-editable', component: EditableTables },

  // Maps
  { path: '/maps-google', component: MapsGoogle },
  { path: '/maps-vector', component: MapsVector },
  { path: '/maps-leaflet', component: MapsLeaflet },

  // Forms
  { path: '/form-elements', component: FormElements },
  { path: '/form-advanced', component: FormAdvanced },
  { path: '/form-editors', component: FormEditors },
  { path: '/form-mask', component: FormMask },
  { path: '/form-repeater', component: FormRepeater },
  { path: '/form-uploads', component: FormUpload },
  { path: '/form-wizard', component: FormWizard },
  { path: '/form-validation', component: FormValidations },
  { path: '/form-xeditable', component: FormXeditable },

  // Ui
  { path: '/ui-alerts', component: UiAlert },
  { path: '/ui-buttons', component: UiButtons },
  { path: '/ui-cards', component: UiCards },
  { path: '/ui-carousel', component: UiCarousel },
  { path: '/ui-colors', component: UiColors },
  { path: '/ui-dropdowns', component: UiDropdown },
  { path: '/ui-general', component: UiGeneral },
  { path: '/ui-grid', component: UiGrid },
  { path: '/ui-images', component: UiImages },
  { path: '/ui-lightbox', component: UiLightbox },
  { path: '/ui-modals', component: UiModal },
  { path: '/ui-progressbars', component: UiProgressbar },
  { path: '/ui-sweet-alert', component: UiSweetAlert },
  { path: '/ui-tabs-accordions', component: UiTabsAccordions },
  { path: '/ui-typography', component: UiTypography },
  { path: '/ui-video', component: UiVideo },
  { path: '/ui-session-timeout', component: UiSessionTimeout },
  { path: '/ui-rating', component: UiRating },
  { path: '/ui-rangeslider', component: UiRangeSlider },
  { path: '/ui-notifications', component: UiNotifications },
  { path: '/ui-image-cropper', component: UiImageCropper },

  //Utility
  { path: '/pages-starter', component: PagesStarter },
  { path: '/pages-timeline', component: PagesTimeline },
  { path: '/pages-faqs', component: PagesFaqs },
  { path: '/pages-pricing', component: PagesPricing },

  // this route should be at the end of all other routes
  { path: '/', exact: true, component: () => <Redirect to='/dashboard' /> },
];

const authRoutes = [
  { path: '/logout', component: Logout },
  { path: '/login', component: Login },
  { path: '/forgot-password', component: ForgetPwd },
  { path: '/register', component: Register },

  { path: '/pages-maintenance', component: PagesMaintenance },
  { path: '/pages-comingsoon', component: PagesComingsoon },
  { path: '/pages-404', component: Pages404 },
  { path: '/pages-500', component: Pages500 },
  { path: '/crypto-ico-landing', component: CryptoIcoLanding },

  // Authentication Inner
  { path: '/pages-login', component: Login1 },
  { path: '/pages-register', component: Register1 },
  { path: '/pages-forget-pwd', component: ForgetPwd1 },
  { path: '/auth-lock-screen', component: LockScreen },
];

export { userRoutes, authRoutes };
