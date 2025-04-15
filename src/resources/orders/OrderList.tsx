// import {
//   List,
//   Datagrid,
//   TextField,
//   DateField,
//   ReferenceField,
//   BooleanField,
//   FunctionField,
//   EditButton,
//   ShowButton,
//   useRecordContext,
//   NumberField,
//   FilterForm,
//   TextInput,
//   SelectInput,
//   DateInput
// } from 'react-admin';
// import { Box, Chip } from '@mui/material';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import PendingIcon from '@mui/icons-material/Pending';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import EngineeringIcon from '@mui/icons-material/Engineering';
// import CancelIcon from '@mui/icons-material/Cancel';

// // Order Status Chip
// const OrderStatusChip: React.FC = () => {
//   const record = useRecordContext();
//   if (!record) return null;

//   const statusMap = {
//     Placed: { icon: <AssignmentIcon />, color: 'default' },
//     Confirmed: { icon: <CheckCircleIcon />, color: 'primary' },
//     Pickup: { icon: <LocalShippingIcon />, color: 'secondary' },
//     'In service': { icon: <EngineeringIcon />, color: 'warning' },
//     Closed: { icon: <CheckCircleIcon />, color: 'success' },
//     Cancelled: { icon: <CancelIcon />, color: 'error' }
//   };

//   const statusInfo = statusMap[record.order_status as keyof typeof statusMap] || 
//                      { icon: <PendingIcon />, color: 'default' };

//   return (
//     <Chip
//       icon={statusInfo.icon}
//       label={record.order_status}
//       color={statusInfo.color as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
//       size="small"
//     />
//   );
// };

// // Payment Status Chip
// const PaymentStatusChip: React.FC = () => {
//   const record = useRecordContext();
//   if (!record) return null;

//   const colorMap = {
//     Completed: 'success',
//     Failed: 'error',
//     Pending: 'warning'
//   };

//   return (
//     <Chip
//       label={record.payment_status}
//       color={colorMap[record.payment_status as keyof typeof colorMap] as 'success' | 'error' | 'warning'}
//       size="small"
//     />
//   );
// };

// // Order Filter Form
// const OrderFilterForm: React.FC = () => {
//   const orderStatusChoices = [
//     { id: 'Placed', name: 'Placed' },
//     { id: 'Confirmed', name: 'Confirmed' },
//     { id: 'Pickup', name: 'Pickup' },
//     { id: 'In service', name: 'In service' },
//     { id: 'Closed', name: 'Closed' },
//     { id: 'Cancelled', name: 'Cancelled' }
//   ];

//   const paymentStatusChoices = [
//     { id: 'Pending', name: 'Pending' },
//     { id: 'Completed', name: 'Completed' },
//     { id: 'Failed', name: 'Failed' }
//   ];

//   const paymentMethodChoices = [
//     { id: 'Cash', name: 'Cash' },
//     { id: 'Card', name: 'Card' },
//     { id: 'UPI', name: 'UPI' },
//     { id: 'Net Banking', name: 'Net Banking' }
//   ];

//   return (
//     <Box>
//       <FilterForm>
//         <Box display="flex" flexWrap="wrap" gap={1} alignItems="center">
//           <TextInput 
//             source="q" 
//             label="Search" 
//             placeholder="Search orders" 
//             size="small" 
//             sx={{ minWidth: 200 }}
//           />
//           <SelectInput
//             source="order_status"
//             label="Order Status"
//             choices={orderStatusChoices}
//             size="small"
//             sx={{ minWidth: 150 }}
//           />
//           <SelectInput
//             source="payment_status"
//             label="Payment Status"
//             choices={paymentStatusChoices}
//             size="small"
//             sx={{ minWidth: 150 }}
//           />
//           <SelectInput
//             source="payment_method"
//             label="Payment Method"
//             choices={paymentMethodChoices}
//             size="small"
//             sx={{ minWidth: 150 }}
//           />
//           <DateInput 
//             source="appointment_date_gte" 
//             label="Appointment From" 
//             size="small" 
//             sx={{ minWidth: 150 }}
//           />
//           <DateInput 
//             source="appointment_date_lte" 
//             label="Appointment To" 
//             size="small" 
//             sx={{ minWidth: 150 }}
//           />
//         </Box>
//       </FilterForm>
//     </Box>
//   );
// };

// // Order List Component
// const OrderList: React.FC = () => (
//   <List
//     filters={<OrderFilterForm />}
//     sort={{ field: 'createdAt', order: 'DESC' }}
//     perPage={10}
//   >
//     <Datagrid rowClick="show">
//       {/* User Details */}
//       <ReferenceField 
//         source="user_id" 
//         reference="userProfile" 
//         label="User Name"
//         link="show"
//       >
//         <TextField source="name" />
//       </ReferenceField>
//       <ReferenceField 
//         source="user_id" 
//         reference="userProfile"
//         label="User Phone"
//       >
//         <TextField source="phone" />
//       </ReferenceField>

//       {/* Vehicle Details */}
//       <ReferenceField 
//         source="vehicle_id" 
//         reference="vehicles" 
//         label="Vehicle Name" 
//         link="show"
//       >
//         <TextField source="vehicle_name" />
//       </ReferenceField>
//       <ReferenceField 
//         source="vehicle_id" 
//         reference="vehicles"
//         label="Vehicle Reg No"
//       >
//         <TextField source="registration_number" />
//       </ReferenceField>

//       {/* Order Info */}
//       <FunctionField
//         label="Order Status"
//         render={() => <OrderStatusChip />}
//       />
//       <DateField source="appointment_date" />
//       <TextField source="appointment_time" />
//       <NumberField 
//         source="total_price" 
//         options={{ style: 'currency', currency: 'INR' }} 
//       />
//       <FunctionField
//         label="Payment Status"
//         render={() => <PaymentStatusChip />}
//       />
//       <TextField source="payment_method" />
//       <BooleanField source="pickup_required" />
//       <DateField source="createdAt" showTime />
//       <EditButton />
//       <ShowButton />
//     </Datagrid>
//   </List>
// );

// export default OrderList;

// import {
//   List,
//   Datagrid,
//   TextField,
//   DateField,
//   ReferenceField,
//   BooleanField,
//   FunctionField,
//   EditButton,
//   ShowButton,
//   useRecordContext,
//   NumberField,
//   TextInput,
//   SelectInput,
//   DateInput
// } from 'react-admin';
// import { Chip } from '@mui/material';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import PendingIcon from '@mui/icons-material/Pending';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import EngineeringIcon from '@mui/icons-material/Engineering';
// import CancelIcon from '@mui/icons-material/Cancel';

// // Order Status Chip
// const OrderStatusChip: React.FC = () => {
//   const record = useRecordContext();
//   if (!record) return null;

//   const statusMap = {
//     Placed: { icon: <AssignmentIcon />, color: 'default' },
//     Confirmed: { icon: <CheckCircleIcon />, color: 'primary' },
//     Pickup: { icon: <LocalShippingIcon />, color: 'secondary' },
//     'In service': { icon: <EngineeringIcon />, color: 'warning' },
//     Closed: { icon: <CheckCircleIcon />, color: 'success' },
//     Cancelled: { icon: <CancelIcon />, color: 'error' }
//   };

//   const statusInfo = statusMap[record.order_status as keyof typeof statusMap] || 
//                      { icon: <PendingIcon />, color: 'default' };

//   return (
//     <Chip
//       icon={statusInfo.icon}
//       label={record.order_status}
//       color={statusInfo.color as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
//       size="small"
//     />
//   );
// };

// // Payment Status Chip
// const PaymentStatusChip: React.FC = () => {
//   const record = useRecordContext();
//   if (!record) return null;

//   const colorMap = {
//     Completed: 'success',
//     Failed: 'error',
//     Pending: 'warning'
//   };

//   return (
//     <Chip
//       label={record.payment_status}
//       color={colorMap[record.payment_status as keyof typeof colorMap] as 'success' | 'error' | 'warning'}
//       size="small"
//     />
//   );
// };

// const orderStatusChoices = [
//   { id: 'Placed', name: 'Placed' },
//   { id: 'Confirmed', name: 'Confirmed' },
//   { id: 'Pickup', name: 'Pickup' },
//   { id: 'In service', name: 'In service' },
//   { id: 'Closed', name: 'Closed' },
//   { id: 'Cancelled', name: 'Cancelled' }
// ];

// const paymentStatusChoices = [
//   { id: 'Pending', name: 'Pending' },
//   { id: 'Completed', name: 'Completed' },
//   { id: 'Failed', name: 'Failed' }
// ];

// const paymentMethodChoices = [
//   { id: 'Cash', name: 'Cash' },
//   { id: 'Card', name: 'Card' },
//   { id: 'UPI', name: 'UPI' },
//   { id: 'Net Banking', name: 'Net Banking' }
// ];

// const filters = [
//   <TextInput source="q" label="Search" placeholder="Search orders" alwaysOn />,
//   <SelectInput source="order_status" label="Order Status" choices={orderStatusChoices} />,
//   <SelectInput source="payment_status" label="Payment Status" choices={paymentStatusChoices} />,
//   <SelectInput source="payment_method" label="Payment Method" choices={paymentMethodChoices} />,
//   <DateInput source="appointment_date_gte" label="Appointment From" />,
//   <DateInput source="appointment_date_lte" label="Appointment To" />,
// ];

// const OrderList: React.FC = () => (
//   <List filters={filters} sort={{ field: 'createdAt', order: 'DESC' }} perPage={10}>
//     <Datagrid rowClick="show">
//       {/* User Details */}
//       <ReferenceField source="user_id._id" reference="userProfile" label="User Name" link="show">
//         <TextField source="name" />
//       </ReferenceField>
//       <ReferenceField source="user_id._id" reference="userProfile" label="User Phone">
//         <TextField source="phone" />
//       </ReferenceField>

//       {/* Vehicle Details */}
//       <TextField source="vehicle_id.brand_name" label="Vehicle Brand" />
//       <TextField source="vehicle_id.brand_model" label="Vehicle Model" />
//       <TextField source="vehicle_id.license_plate" label="Vehicle License Plate" />
//       <TextField source="vehicle_id.fuel_type" label="Vehicle Fuel Type" />

//       {/* Order Info */}
//       <FunctionField label="Order Status" render={() => <OrderStatusChip />} />
//       <DateField source="appointment_date" />
//       <TextField source="appointment_time" />
//       <NumberField source="total_price" options={{ style: 'currency', currency: 'INR' }} />
//       <FunctionField label="Payment Status" render={() => <PaymentStatusChip />} />
//       <TextField source="payment_method" />
//       <BooleanField source="pickup_required" />
//       <DateField source="createdAt" showTime />
//       <EditButton />
//       <ShowButton />
//     </Datagrid>
//   </List>
// );

// export default OrderList;
import {
  List,
  useListContext,
  TextInput,
  SelectInput,
  DateInput,
  ShowButton,
  EditButton,
} from 'react-admin';
import {
  Card,
  Typography,
  Grid,
  Box,
  Chip,
  Stack,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  LocalShipping as LocalShippingIcon,
  Engineering as EngineeringIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

// Order Status Chip
const OrderStatusChip = ({ record }: { record: any }) => {
  if (!record) return null;

  const statusMap: Record<string, { icon: JSX.Element; color: any }> = {
    Placed: { icon: <AssignmentIcon />, color: 'default' },
    Confirmed: { icon: <CheckCircleIcon />, color: 'primary' },
    Pickup: { icon: <LocalShippingIcon />, color: 'secondary' },
    'In service': { icon: <EngineeringIcon />, color: 'warning' },
    Closed: { icon: <CheckCircleIcon />, color: 'success' },
    Cancelled: { icon: <CancelIcon />, color: 'error' },
  };

  const statusInfo = statusMap[record.order_status] || {
    icon: <PendingIcon />,
    color: 'default',
  };

  return (
    <Chip
      icon={statusInfo.icon}
      label={record.order_status}
      color={statusInfo.color}
      size="small"
    />
  );
};

// Payment Status Chip
const PaymentStatusChip = ({ record }: { record: any }) => {
  if (!record) return null;

  const colorMap: Record<string, any> = {
    Completed: 'success',
    Failed: 'error',
    Pending: 'warning',
  };

  return (
    <Chip
      label={record.payment_status}
      color={colorMap[record.payment_status]}
      size="small"
    />
  );
};

const orderStatusChoices = [
  { id: 'Placed', name: 'Placed' },
  { id: 'Confirmed', name: 'Confirmed' },
  { id: 'Pickup', name: 'Pickup' },
  { id: 'In service', name: 'In service' },
  { id: 'Closed', name: 'Closed' },
  { id: 'Cancelled', name: 'Cancelled' },
];

const paymentStatusChoices = [
  { id: 'Pending', name: 'Pending' },
  { id: 'Completed', name: 'Completed' },
  { id: 'Failed', name: 'Failed' },
];

const paymentMethodChoices = [
  { id: 'Cash', name: 'Cash' },
  { id: 'Card', name: 'Card' },
  { id: 'UPI', name: 'UPI' },
  { id: 'Net Banking', name: 'Net Banking' },
];

const filters = [
  <TextInput source="q" label="Search" placeholder="Search orders" alwaysOn />,
  <SelectInput source="order_status" label="Order Status" choices={orderStatusChoices} />,
  <SelectInput source="payment_status" label="Payment Status" choices={paymentStatusChoices} />,
  <SelectInput source="payment_method" label="Payment Method" choices={paymentMethodChoices} />,
  <DateInput source="appointment_date_gte" label="Appointment From" />,
  <DateInput source="appointment_date_lte" label="Appointment To" />,
];

const OrderGridCards = () => {
  const { data, isLoading } = useListContext();
  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <Stack spacing={2} padding={2}>
      {data.map((record: any) => (
        <Card key={record.id} variant="outlined" sx={{ display: 'flex', padding: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle2">Customer Name</Typography>
                <Typography variant="body2">{record?.user_id?.name}</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle2">Phone</Typography>
                <Typography variant="body2">{record?.user_id?.phone}</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle2">Vehicle</Typography>
                <Typography variant="body2">{record?.vehicle_id?.brand_name} - {record?.vehicle_id?.brand_model}</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle2">License Plate</Typography>
                <Typography variant="body2">{record?.vehicle_id?.license_plate}</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle2">Fuel Type</Typography>
                <Typography variant="body2">{record?.vehicle_id?.fuel_type}</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle2">Order Status</Typography>
                <OrderStatusChip record={record} />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle2">Appointment</Typography>
                <Typography variant="body2">{record?.appointment_date} at {record?.appointment_time}</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle2">Total Price</Typography>
                <Typography variant="body2">₹{record?.total_price}</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle2">Payment Status</Typography>
                <PaymentStatusChip record={record} />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle2">Payment Method</Typography>
                <Typography variant="body2">{record?.payment_method}</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle2">Pickup Required</Typography>
                <Typography variant="body2">{record?.pickup_required ? 'Yes' : 'No'}</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle2">Created At</Typography>
                <Typography variant="body2">{new Date(record?.createdAt).toLocaleString()}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" gap={1} pt={1}>
                  <ShowButton record={record} />
                  <EditButton record={record} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Card>
      ))}
    </Stack>
  );
};

const OrderList = () => (
  <List filters={filters} sort={{ field: 'createdAt', order: 'DESC' }} perPage={10}>
    <OrderGridCards />
  </List>
);

export default OrderList;
