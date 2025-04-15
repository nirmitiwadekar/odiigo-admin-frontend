import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  EditButton,
  DeleteButton,
  Filter,
  FilterProps,
  ListProps,
  EditProps,
  CreateProps
} from "react-admin";

// Custom Filter Component
const PincodeFilter = (props: JSX.IntrinsicAttributes & FilterProps) => (
  <Filter {...props}>
    <TextInput 
      label="Search" 
      source="q" 
      alwaysOn 
      variant="outlined"
      placeholder="Search by Pincode or Area"
    />
    <TextInput label="Pincode" source="pincode" />
    <TextInput label="Area" source="area" />
  </Filter>
);

// List View
export const PincodeList: React.FC<ListProps> = (props) => (
  <List 
    {...props}
    filters={<PincodeFilter children={undefined} />}
    sort={{ field: 'pincode', order: 'ASC' }}
  >
    <Datagrid>
      <TextField source="pincode" label="Pincode" sortable />
      <TextField source="area" label="Area" sortable />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Edit View
export const PincodeEdit: React.FC<EditProps> = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="pincode" label="Pincode" required />
        <TextInput source="area" label="Area" required />
      </SimpleForm>
    </Edit>
  );
};

// Create View
export const PincodeCreate: React.FC<CreateProps> = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="pincode" label="Pincode" required />
        <TextInput source="area" label="Area" required />
      </SimpleForm>
    </Create>
  );
};