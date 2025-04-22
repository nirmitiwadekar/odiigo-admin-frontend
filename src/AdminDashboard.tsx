import { Admin, Resource } from "react-admin";
import dataProvider from "./dataProvider";
import authProvider from "./adminAuthProvider";
import CustomLayout from "./CustomLayout";

import {
  CategoryList,
  CategoryEdit,
  CategoryCreate,
} from "./resources/categories";
import { ServiceList, ServiceEdit, ServiceCreate } from "./resources/services";
import { VehicleList, VehicleEdit, VehicleCreate } from "./resources/vehicles";
import { GarageList, GarageEdit, GarageCreate } from "./resources/garage";
import {
  ServicePricingList,
  ServicePricingEdit,
  ServicePricingCreate,
} from "./resources/servicePrice";
import {
  PincodeList,
  PincodeEdit,
  PincodeCreate,
} from "./resources/pincodes";
import {
  ServiceBuddyList,
  ServiceBuddyEdit,
  ServiceBuddyCreate,
} from "./resources/serviceBuddy";
import {
  UserCreate,
  UserEdit,
  UserList,
} from "./resources/userProfile";
import {
  OrderList,
  OrderEdit,
  OrderShow,
} from "./resources/orders";
import { CarBrandList, CarBrandCreate, CarBrandEdit, CarBrandShow } from './resources/carBrands';
import { CarModelList, CarModelCreate, CarModelEdit} from './resources/carModels';

// Import icons
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CategoryIcon from "@mui/icons-material/Category";
import GarageIcon from "@mui/icons-material/Garage";
import PersonIcon from "@mui/icons-material/Person";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PriceChangeSharpIcon from "@mui/icons-material/PriceChangeSharp";
import LocationOnIcon from "@mui/icons-material/LocationOn"; 
import EmojiTransportation from "@mui/icons-material/EmojiTransportation";
import { Build } from "@mui/icons-material";
import StorageIcon from '@mui/icons-material/Storage';

const AdminDashboard = () => {
  return (
    <Admin
      title="🚗 Odiigo Admin Panel"
      layout={CustomLayout}
      dataProvider={dataProvider}
      authProvider={authProvider}
      requireAuth
      basename="/admin"
      

    >
      <Resource
        name="categories"
        options={{ label: "Service Categories" }}
        list={CategoryList}
        edit={CategoryEdit}
        create={CategoryCreate}
        icon={CategoryIcon}
      />
      <Resource
        name="services"
        options={{ label: "Service Packages" }}
        list={ServiceList}
        edit={ServiceEdit}
        create={ServiceCreate}
        icon={StorageIcon}
      />
      <Resource
        name="vehicles"
        options={{ label: "Vehicles" }}
        list={VehicleList}
        edit={VehicleEdit}
        create={VehicleCreate}
        icon={DirectionsCarIcon}
      />
      <Resource
        name="garages"
        options={{ label: "Onboarding Garages" }}
        list={GarageList}
        edit={GarageEdit}
        create={GarageCreate}
        icon={Build}
      />
      <Resource
        name="userProfile" 
        options={{ label: "Users" }}
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
        icon={PersonIcon}
      />
      <Resource
        name="serviceBuddies"
        options={{ label: "Service Buddies" }}
        list={ServiceBuddyList}
        edit={ServiceBuddyEdit}
        create={ServiceBuddyCreate}
        icon={EngineeringIcon}
      />
      <Resource
        name="order"
        options={{ label: "Orders" }}
        list={OrderList}
        edit={OrderEdit}
        show={OrderShow}
        icon={ShoppingCartIcon}
      />
      <Resource
        name="servicePricing"
        options={{ label: "Service Pricing" }}
        list={ServicePricingList}
        edit={ServicePricingEdit}
        create={ServicePricingCreate}
        icon={PriceChangeSharpIcon}
      />
      <Resource
        name="pincodes"
        options={{ label: "Servisable Pincodes" }}
        list={PincodeList}
        edit={PincodeEdit}
        create={PincodeCreate}
        icon={LocationOnIcon}
      />
      <Resource
        name="car-brands"
        options={{ label: "Car Brands" }}
        list={CarBrandList}
        create={CarBrandCreate}
        edit={CarBrandEdit}
        show={CarBrandShow}
        icon={EmojiTransportation}
      />
      <Resource
        name="car-models"
        options={{ label: "Car Models" }}
        list={CarModelList}
        create={CarModelCreate}
        edit={CarModelEdit}
        icon={GarageIcon}
      />
    </Admin>
  );
};

export default AdminDashboard;