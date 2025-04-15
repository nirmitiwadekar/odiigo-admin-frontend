// src/resources/orders/OrderShow.tsx
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  ReferenceField,
  BooleanField,
  NumberField,
  ArrayField,
  Datagrid,
  EmailField,
  TabbedShowLayout,
  Tab,
  ImageField,
  useRecordContext,
  EditButton,
  TopToolbar,
  Button,
} from 'react-admin';
import { Box, Typography, Chip, Grid, Paper, Divider } from '@mui/material';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import DownloadIcon from '@mui/icons-material/Download';

const OrderTitle = () => {
  const record = useRecordContext();
  return record ? <span>Order #{record.id}</span> : null;
};

const OrderStatusChip = () => {
  const record = useRecordContext();
  if (!record) return null;
  
  let color;
  switch(record.order_status) {
    case 'Placed':
      color = 'default';
      break;
    case 'Confirmed':
      color = 'primary';
      break;
    case 'Pickup':
      color = 'secondary';
      break;
    case 'In service':
      color = 'warning';
      break;
    case 'Closed':
      color = 'success';
      break;
    case 'Cancelled':
      color = 'error';
      break;
    default:
      color = 'default';
  }
  
  return (
    <Chip 
      label={record.order_status} 
      color={color as any}
      sx={{ fontWeight: 'bold' }}
    />
  );
};

const OrderShowActions = () => (
  <TopToolbar>
    <EditButton />
    <Button
      label="Print Invoice"
      onClick={() => console.log('Print invoice')}
      startIcon={<LocalPrintshopIcon />}
    />
    <Button
      label="Download Invoice"
      onClick={() => console.log('Download invoice')}
      startIcon={<DownloadIcon />}
    />
  </TopToolbar>
);

const TotalPriceField = () => {
  const record = useRecordContext();
  if (!record) return null;
  
  return (
    <Typography variant="h6" color="primary">
      ₹{record.total_price.toFixed(2)}
    </Typography>
  );
};

const OrderShow = () => (
  <Show 
    title={<OrderTitle />} 
    actions={<OrderShowActions />}
  >
    <TabbedShowLayout>
      <Tab label="Order Summary">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Order Summary</Typography>
                <OrderStatusChip />
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body1">Order ID:</Typography>
                <TextField source="id" />
              </Box>
              
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body1">Order Date:</Typography>
                <DateField source="createdAt" showTime />
              </Box>
              
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body1">Appointment:</Typography>
                <Box>
                  <DateField source="appointment_date" /> at <TextField source="appointment_time" />
                </Box>
              </Box>
              
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body1">Payment Status:</Typography>
                <TextField source="payment_status" />
              </Box>
              
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body1">Payment Method:</Typography>
                <TextField source="payment_method" />
              </Box>
              
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body1">Payment Option:</Typography>
                <TextField source="payment_option" />
              </Box>
              
              {/* Show transaction ID only if it exists */}
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body1">Transaction ID:</Typography>
                <TextField source="transaction_id" emptyText="Not available" />
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">Total Amount:</Typography>
                <TotalPriceField />
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>Customer Details</Typography>
              <Divider sx={{ mb: 2 }} />
              
              <ReferenceField
                source="user_id._id"
                reference="userProfile"
                link="show"
              >
                <SimpleShowLayout>
                  <TextField source="name" label="Customer Name" />
                  <EmailField source="email" label="Email" />
                  <TextField source="phone" label="Phone" />
                </SimpleShowLayout>
              </ReferenceField>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
              <Typography variant="h5" gutterBottom>
                Vehicle Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <SimpleShowLayout>
                <TextField source="vehicle_id.brand_name" label="Vehicle Brand" />
                <TextField source="vehicle_id.brand_model" label="Vehicle Model" />
                <TextField source="vehicle_id.license_plate" label="Vehicle License Plate" />
                <TextField source="vehicle_id.fuel_type" label="Vehicle Fuel Type" />
                <TextField
                  source="vehicle_id.transmission_type"
                  label="Transmission Type"
                />
              </SimpleShowLayout>
 
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Services</Typography>
              <Divider sx={{ mb: 2 }} />
              
              <ArrayField source="services">
                <Datagrid bulkActionButtons={false}>
                  <ReferenceField source="service_id" reference="services">
                    <TextField source="service_name" />
                  </ReferenceField>
                  <ReferenceField source="service_price_id" reference="service-pricing">
                    <TextField source="category_id" label="Category" />
                  </ReferenceField>
                  <NumberField source="price" options={{ style: 'currency', currency: 'INR' }} />
                </Datagrid>
              </ArrayField>
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Pickup & Drop Details</Typography>
              <Divider sx={{ mb: 2 }} />
              
              <BooleanField source="pickup_required" label="Pickup Required" />
              
              {/* Conditional rendering for pickup and drop addresses */}
              <Box mt={2}>
                <Typography variant="subtitle1">Pickup Address:</Typography>
                <TextField source="pickup_address" emptyText="No pickup address provided" />
              </Box>
              
              <Box mt={2}>
                <Typography variant="subtitle1">Drop Address:</Typography>
                <TextField source="drop_address" emptyText="No drop address provided" />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Tab>
      
      <Tab label="Service Images">
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Service Images</Typography>
          <Divider sx={{ mb: 2 }} />
          
          <ImageField source="images" title="title" src="src" />
        </Paper>
      </Tab>
      
      <Tab label="Service History">
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Service History</Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Typography variant="body1">
            Service history would be displayed here...
          </Typography>
        </Paper>
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default OrderShow;