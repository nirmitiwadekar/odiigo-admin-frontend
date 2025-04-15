import {
  Edit,
  SimpleForm,
  SelectInput,
  TextInput,
  DateInput,
  BooleanInput,
  ImageInput,
  ReferenceField,
  TextField,
  useRecordContext,
  Toolbar,
  SaveButton,
  DeleteButton,
  ArrayField,
  Datagrid,
  NumberField,
  FormDataConsumer,
  required,
  ToolbarProps,
} from 'react-admin';
import { Box, Typography, Grid, Card, CardContent, Divider } from '@mui/material';
import { JSX } from 'react/jsx-runtime';

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

const OrderTitle = () => {
  const record = useRecordContext();
  return record ? <span>Order #{record.id}</span> : null;
};

const CustomerDetails = () => {
  const record = useRecordContext();
  if (!record) return null;
  
  return (
    <Card sx={{ margin: '1em' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Customer Details</Typography>
        <ReferenceField source="user_id" reference="userProfile">
          <Box>
            <Typography variant="subtitle1">
              <TextField source="name" />
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Email: <TextField source="email" component="span" />
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Phone: <TextField source="phone" component="span" />
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Address: <TextField source="address" component="span" />
            </Typography>
            <Typography variant="body2" color="textSecondary">
              City: <TextField source="city" component="span" />
            </Typography>
            <Typography variant="body2" color="textSecondary">
              State: <TextField source="state" component="span" />
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Postal Code: <TextField source="postal_code" component="span" />
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Membership: <TextField source="membership_type" component="span" />
            </Typography>
          </Box>
        </ReferenceField>
      </CardContent>
    </Card>
  );
};

const VehicleDetails = () => {
  const record = useRecordContext();
  if (!record) return null;
  
  return (
    <Card sx={{ margin: '1em' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Vehicle Details</Typography>
        <ReferenceField source="vehicle_id" reference="vehicles">
          <Box>
            <Typography variant="subtitle1">
              <TextField source="vehicle_name" />
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Brand: <TextField source="brand" component="span" />
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Model: <TextField source="model" component="span" />
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Type: <TextField source="vehicle_type" component="span" />
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Registration Number: <TextField source="registration_number" component="span" />
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Year: <TextField source="year" component="span" />
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Color: <TextField source="color" component="span" />
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Transmission: <TextField source="transmission" component="span" />
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Fuel Type: <TextField source="fuel_type" component="span" />
            </Typography>
          </Box>
        </ReferenceField>
      </CardContent>
    </Card>
  );
};

const OrderEditToolbar = (props: JSX.IntrinsicAttributes & ToolbarProps) => (
  <Toolbar {...props}>
    <SaveButton />
    <DeleteButton />
  </Toolbar>
);

const OrderEdit = () => (
  <Edit title={<OrderTitle />}>
    <SimpleForm toolbar={<OrderEditToolbar />}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CustomerDetails />
        </Grid>
        <Grid item xs={12} md={6}>
          <VehicleDetails />
        </Grid>
      </Grid>
      
      {/* Rest of the component remains the same as in the original code */}
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="h6">Order Services</Typography>
      <ArrayField source="services">
        <Datagrid>
          <ReferenceField source="service_id" reference="services">
            <TextField source="service_name" />
          </ReferenceField>
          <ReferenceField source="service_price_id" reference="service-pricing">
            <TextField source="service_price" />
          </ReferenceField>
          <NumberField source="price" options={{ style: 'currency', currency: 'INR' }} />
        </Datagrid>
      </ArrayField>
      
      <NumberField source="total_price" options={{ style: 'currency', currency: 'INR' }} />
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="h6">Order Status Management</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <SelectInput
            source="order_status"
            choices={orderStatusChoices}
            validate={required()}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectInput
            source="payment_status"
            choices={paymentStatusChoices}
            validate={required()}
          />
        </Grid>
      </Grid>
      
      <FormDataConsumer>
        {({ formData }) => formData.order_status === 'Cancelled' && (
          <TextInput
            source="cancellation_reason"
            multiline
            fullWidth
            label="Cancellation Reason"
          />
        )}
      </FormDataConsumer>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="h6">Appointment Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DateInput source="appointment_date" validate={required()} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput source="appointment_time" validate={required()} />
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="h6">Pickup & Drop Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <BooleanInput source="pickup_required" />
        </Grid>
      </Grid>
      
      <FormDataConsumer>
        {({ formData }) => formData.pickup_required && (
          <>
            <TextInput
              source="pickup_address"
              multiline
              fullWidth
              validate={required()}
            />
            <TextInput
              source="drop_address"
              multiline
              fullWidth
            />
          </>
        )}
      </FormDataConsumer>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="h6">Payment Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField source="payment_method" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField source="payment_option" />
        </Grid>
      </Grid>
      
      <TextInput source="transaction_id" fullWidth />
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="h6">Service Images</Typography>
      <ImageInput source="images" label="Upload Service Images" multiple>
        <img src="" alt="" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);

export default OrderEdit;