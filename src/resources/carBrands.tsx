// src/resources/carBrands.tsx
import { useRef } from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  SelectInput,
  Show,
  SimpleShowLayout,
  required,
  useRecordContext,
  useNotify,
  useRedirect,
  SaveButton,
  Toolbar,
  FormDataConsumer,
} from "react-admin";
import S3ImageSelector from './S3ImageSelector';
import { Box, Typography } from '@mui/material';

const statusChoices = [
  { id: "active", name: "Active" },
  { id: "inactive", name: "Inactive" },
];

// Custom Image Field to display brand icons nicely
const BrandIconField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  if (!record || !record[source]) return null;
  
  return (
    <Box 
      component="img" 
      src={record[source]} 
      alt={record.name || "Brand icon"}
      sx={{ 
        width: 50, 
        height: 50, 
        objectFit: 'contain',
        border: '1px solid #e0e0e0',
        borderRadius: 1
      }}
    />
  );
};

// List all car brands
export const CarBrandList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <BrandIconField source="icon" />
      <TextField source="status" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Show single brand details
export const CarBrandShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      
      <Typography variant="subtitle1" gutterBottom>Brand Icon</Typography>
      <BrandIconField source="icon" />
      
      <TextField source="status" />
    </SimpleShowLayout>
  </Show>
);

// Type for our ref
type S3SelectorRef = {
  getSelectedIconKey: () => string | null;
};

// Custom toolbar to handle form submission with iconKey
const CustomToolbar = (props: any) => {
  const s3SelectorRef = useRef<S3SelectorRef>(null);
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSubmit = async (values: any) => {
    try {
      // Copy the values to avoid modifying the original
      const formValues = { ...values };
      
      // If we have selected an icon key, add it to the form data
      if (s3SelectorRef.current) {
        const iconKey = s3SelectorRef.current.getSelectedIconKey();
        if (iconKey) {
          formValues.iconKey = iconKey;
        }
      }
      
      console.log('Submitting form values:', formValues);
      
      // Let react-admin handle the actual submission
      await props.save(formValues);
      notify('Brand saved successfully');
      redirect('list', 'car-brands');
    } catch (error) {
      console.error('Error saving brand:', error);
      notify('Error saving brand', { type: 'error' });
    }
  };

  return (
    <Toolbar {...props}>
      <SaveButton onClick={handleSubmit} />
    </Toolbar>
  );
};

// Create a new brand
export const CarBrandCreate = () => {
  const s3SelectorRef = useRef<S3SelectorRef>(null);

  return (
    <Create>
      <SimpleForm toolbar={<CustomToolbar />}>
        <TextInput source="name" validate={[required()]} fullWidth />
        
        <FormDataConsumer>
          {() => (
            <S3ImageSelector 
              source="icon" 
              label="Select Brand Icon" 
              ref={s3SelectorRef}
            />
          )}
        </FormDataConsumer>
        
        <SelectInput
          source="status"
          choices={statusChoices}
          defaultValue="active"
        />
      </SimpleForm>
    </Create>
  );
};

// Edit existing brand
export const CarBrandEdit = () => {
  const s3SelectorRef = useRef<S3SelectorRef>(null);

  return (
    <Edit>
      <SimpleForm toolbar={<CustomToolbar />}>
        <TextInput source="name" validate={[required()]} fullWidth />
        
        <FormDataConsumer>
          {() => (
            <S3ImageSelector 
              source="icon" 
              label="Brand Icon" 
              ref={s3SelectorRef}
            />
          )}
        </FormDataConsumer>
        
        <SelectInput source="status" choices={statusChoices} />
      </SimpleForm>
    </Edit>
  );
};