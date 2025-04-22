// // src/App.tsx
// import { Admin, Resource } from "react-admin";
// import dataProvider from "./dataProvider";
// import { Layout } from "./Layout"; // Import Custom Layout
// import LandingPage from "./resources/LandingPage";
// import AdminLogin from "./resources/adminLogin";
// import RequireAuth from "./resources/RequireAuth"; // You’ll create this file

// import {
//   CategoryList,
//   CategoryEdit,
//   CategoryCreate,
// } from "./resources/categories";
// import { ServiceList, ServiceEdit, ServiceCreate } from "./resources/services";
// import { VehicleList, VehicleEdit, VehicleCreate } from "./resources/vehicles";
// import { GarageList, GarageEdit, GarageCreate } from "./resources/garage";
// import {
//   ServicePricingList,
//   ServicePricingEdit,
//   ServicePricingCreate,
// } from "./resources/servicePrice";
// import {
//   PincodeList,
//   PincodeEdit,
//   PincodeCreate,
// } from "./resources/pincodes"; // Import Location Module
// import {
//   ServiceBuddyList,
//   ServiceBuddyEdit,
//   ServiceBuddyCreate,
// } from "./resources/serviceBuddy"; // ✅ Import ServiceBuddy Components
// import {
//   UserCreate,
//   UserEdit,
//   UserList,
// } from "./resources/userProfile";
// import {
//   OrderList,
//   OrderEdit,
//   OrderShow,
// } from "./resources/orders"; // Import Order Components
// import { CarBrandList, CarBrandCreate, CarBrandEdit, CarBrandShow } from './resources/carBrands';
// import { CarModelList, CarModelCreate, CarModelEdit} from './resources/carModels';

// import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
// import CategoryIcon from "@mui/icons-material/Category";
// import GarageIcon from "@mui/icons-material/Garage";
// import PersonIcon from "@mui/icons-material/Person";
// import EngineeringIcon from "@mui/icons-material/Engineering";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import PriceChangeSharpIcon from "@mui/icons-material/PriceChangeSharp";
// import LocationOnIcon from "@mui/icons-material/LocationOn"; 
// import EmojiTransportation from "@mui/icons-material/EmojiTransportation";
// import { Build } from "@mui/icons-material";
// import StorageIcon from '@mui/icons-material/Storage';



// function App() {
//   return (
//     <Admin
//       title="🚗 Odiigo Admin Panel"
//       layout={Layout}
//       dataProvider={dataProvider}
//     >
//       <Resource
//         name="categories"
//         options={{ label: "Service Categories" }}
//         list={CategoryList}
//         edit={CategoryEdit}
//         create={CategoryCreate}
//         icon={CategoryIcon}
//       />
//       <Resource
//         name="services"
//         options={{ label: "Service Packages" }}
//         list={ServiceList}
//         edit={ServiceEdit}
//         create={ServiceCreate}
//         icon={StorageIcon}
//       />
//       <Resource
//         name="vehicles"
//         options={{ label: "Vehicles" }}
//         list={VehicleList}
//         edit={VehicleEdit}
//         create={VehicleCreate}
//         icon={DirectionsCarIcon}
//       />
//       <Resource
//         name="garages"
//         options={{ label: "Onboarding Garages" }}
//         list={GarageList}
//         edit={GarageEdit}
//         create={GarageCreate}
//         icon={Build}
//       />
//       <Resource
//         name="userProfile" 
//         options={{ label: "Users" }}
//         list={UserList}
//         edit={UserEdit}
//         create={UserCreate}
//         icon={PersonIcon}
//       />
//       <Resource
//         name="serviceBuddies"
//         options={{ label: "Service Buddies" }}
//         list={ServiceBuddyList}
//         edit={ServiceBuddyEdit}
//         create={ServiceBuddyCreate}
//         icon={EngineeringIcon}
//       />
//       <Resource
//         name="order"
//         options={{ label: "Orders" }}
//         list={OrderList}
//         edit={OrderEdit}
//         show={OrderShow}
//         icon={ShoppingCartIcon}
//       />
//       <Resource
//         name="servicePricing"
//         options={{ label: "Service Pricing" }}
//         list={ServicePricingList}
//         edit={ServicePricingEdit}
//         create={ServicePricingCreate}
//         icon={PriceChangeSharpIcon}
//       />
//       <Resource
//         name="pincodes"
//         options={{ label: "Servisable Pincodes" }} // Label for Admin Panel
//         list={PincodeList}
//         edit={PincodeEdit}
//         create={PincodeCreate}
//         icon={LocationOnIcon} // Location Icon
//       />
//       <Resource
//         name="car-brands" // UPDATED: Changed from "brands" to "car-brands" to match API endpoint
//         options={{ label: "Car Brands" }} 
//         list={CarBrandList}
//         create={CarBrandCreate}
//         edit={CarBrandEdit}
//         show={CarBrandShow}
//         icon={EmojiTransportation}
//       />
//       <Resource
//         name="car-models"
//         options={{ label: "Car Models" }} 
//         list={CarModelList}
//         // show={CarModelShow}
//         create={CarModelCreate}
//         edit={CarModelEdit}
//         icon={GarageIcon}
//       />
//     </Admin>
//   );
// }




// export default App;










// // src/App.tsx neww working till basic login
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import AdminDashboard from './AdminDashboard';
// import LandingPage from './resources/LandingPage';
// import AdminLogin from './resources/adminLogin';

// function App() {
//   const [authenticated, setAuthenticated] = useState(false);
  
//   // Check if user is authenticated on mount
//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem('adminToken');
//       setAuthenticated(!!token);
//     };

//     // Initial check
//     checkAuth();
    
//     // Listen for storage events (when token is removed by authProvider)
//     window.addEventListener('storage', checkAuth);
    
//     return () => {
//       window.removeEventListener('storage', checkAuth);
//     };
//   }, []);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route 
//           path="/admin-login" 
//           element={
//             authenticated ? 
//               <Navigate to="/admin" /> : 
//               <AdminLogin onLoginSuccess={() => setAuthenticated(true)} />
//           } 
//         />
//         <Route 
//           path="/admin/*" 
//           element={
//             authenticated ? 
//               <AdminDashboard /> : 
//               <Navigate to="/admin-login" />
//           } 
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './resources/adminLogin';
import ForgotPassword from './resources/ForgotPassword';
import ResetPassword from './resources/ResetPassword';
import LandingPage from './resources/LandingPage'; 
import RequireAuth from './resources/RequireAuth'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth Routes */}
        <Route path="/admin-login" element={<AdminLogin onLoginSuccess={() => {}} />} />
        <Route path="/admin-forgot-password" element={<ForgotPassword />} />
        {/* <Route path="/admin-reset-password/:token" element={<ResetPassword />} /> */}


        {/* Reset password routes - support both URL formats */}
        <Route path="/admin-reset-password/:token" element={<ResetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} /> {/* Support for emails with old format */}

        {/*  Admin App - Protected with RequireAuth */}
        <Route path="/admin/*" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
        
        {/*  redirect to landing page instead of admin */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;