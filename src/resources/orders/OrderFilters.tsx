// src/resources/orders/OrderFilters.tsx
import {
    FilterList,
    FilterListItem,
    FilterLiveSearch,
    ReferenceInput,
    AutocompleteInput,
    DateInput,
    Form,
    useGetList
  } from 'react-admin';
  import { Box, Typography, Divider } from '@mui/material';
  import AssignmentIcon from '@mui/icons-material/Assignment';
  import CheckCircleIcon from '@mui/icons-material/CheckCircle';
  import PendingIcon from '@mui/icons-material/Pending';
  
  const orderStatusFilters = [
    { label: 'Placed', value: 'Placed' },
    { label: 'Confirmed', value: 'Confirmed' },
    { label: 'Pickup', value: 'Pickup' },
    { label: 'In service', value: 'In service' },
    { label: 'Closed', value: 'Closed' },
    { label: 'Cancelled', value: 'Cancelled' },
  ];
  
  const paymentStatusFilters = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Failed', value: 'Failed' },
  ];
  
  const paymentMethodFilters = [
    { label: 'Cash', value: 'Cash' },
    { label: 'Card', value: 'Card' },
    { label: 'UPI', value: 'UPI' },
    { label: 'Net Banking', value: 'Net Banking' },
  ];
  
  const OrderFilters = () => {
    // Pre-fetch users for the autocomplete
    const { data: users, isLoading: isLoadingUsers } = useGetList(
      'userProfile',
      { pagination: { page: 1, perPage: 100 }, sort: { field: 'name', order: 'ASC' } }
    );
  
    return (
      <Box sx={{ width: 250, p: 1 }}>
        <Typography variant="h6" gutterBottom>Filters</Typography>
        <Divider sx={{ mb: 2 }} />
        
        <FilterLiveSearch source="q" placeholder="Search orders" fullWidth />
        
        <Box sx={{ mt: 2, mb: 2 }}>
          <FilterList label="Order Status" icon={<AssignmentIcon />}>
            {orderStatusFilters.map(statusFilter => (
              <FilterListItem
                key={statusFilter.value}
                label={statusFilter.label}
                value={{ order_status: statusFilter.value }}
              />
            ))}
          </FilterList>
        </Box>
        
        <Box sx={{ mt: 2, mb: 2 }}>
          <FilterList label="Payment Status" icon={<PendingIcon />}>
            {paymentStatusFilters.map(statusFilter => (
              <FilterListItem
                key={statusFilter.value}
                label={statusFilter.label}
                value={{ payment_status: statusFilter.value }}
              />
            ))}
          </FilterList>
        </Box>
        
        <Box sx={{ mt: 2, mb: 2 }}>
          <FilterList label="Payment Method" icon={<CheckCircleIcon />}>
            {paymentMethodFilters.map(methodFilter => (
              <FilterListItem
                key={methodFilter.value}
                label={methodFilter.label}
                value={{ payment_method: methodFilter.value }}
              />
            ))}
          </FilterList>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle2" gutterBottom>Advanced Filters</Typography>
        
        {/* Form for reference/date inputs that require form context */}
        <Form>
          <Box sx={{ mt: 2, mb: 2 }}>
            <ReferenceInput source="user_id" reference="userProfile">
              <AutocompleteInput 
                label="Customer" 
                optionText={(record) => record && record.name ? record.name : ''}
                fullWidth
                disabled={isLoadingUsers}
                helperText={isLoadingUsers ? "Loading customers..." : undefined}
              />
            </ReferenceInput>
          </Box>
          
          <Box sx={{ mt: 2, mb: 2 }}>
            <DateInput source="appointment_date_gte" label="Appointment From" fullWidth />
          </Box>
          
          <Box sx={{ mt: 2, mb: 2 }}>
            <DateInput source="appointment_date_lte" label="Appointment To" fullWidth />
          </Box>
        </Form>
      </Box>
    );
  };
  
  export default OrderFilters;