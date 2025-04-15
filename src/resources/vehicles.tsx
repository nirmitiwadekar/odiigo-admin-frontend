import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  FilterLiveSearch,
  TextInput,
  SelectInput,
  Edit,
  SimpleForm,
  Create,
  Filter,
  FilterProps,
} from "react-admin";
import { JSX } from "react/jsx-runtime";

// Custom Filter Component as a proper Filter component

const VehicleFilter = (props: JSX.IntrinsicAttributes & FilterProps) => (
  <Filter {...props}>
    <FilterLiveSearch source="q" label="Search" alwaysOn />
    <TextInput source="license_plate" label="License Plate" />
    <TextInput source="brand_name" label="Brand Name" />
    <TextInput source="brand_model" label="Brand Model" />
    <SelectInput
      source="fuel_type"
      label="Fuel Type"
      choices={[
        { id: "Petrol", name: "Petrol" },
        { id: "Diesel", name: "Diesel" },
        { id: "Electric", name: "Electric" },
        { id: "CNG", name: "CNG" },
      ]}
    />
    <SelectInput
      source="transmission_type"
      label="Transmission Type"
      choices={[
        { id: "Automatic", name: "Automatic" },
        { id: "Manual", name: "Manual" },
      ]}
    />
  </Filter>
);

// Vehicle List Component
export const VehicleList = () => (
  <List filters={<VehicleFilter children={undefined} />}>
    <Datagrid rowClick="edit">
      {/*<TextField source="id" />*/}
      <TextField source="license_plate" label="License Plate" />
      <TextField source="brand_name" label="Brand Name" />
      <TextField source="brand_model" label="Brand Model" />
      <TextField source="fuel_type" label="Fuel Type" />
      <TextField source="transmission_type" label="Transmission Type" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Vehicle Edit Component
export const VehicleEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="license_plate" label="License Plate" required />
      <TextInput source="brand_name" label="Brand Name" required />
      <TextInput source="brand_model" label="Brand Model" required />
      <SelectInput
        source="fuel_type"
        label="Fuel Type"
        choices={[
          { id: "Petrol", name: "Petrol" },
          { id: "Diesel", name: "Diesel" },
          { id: "Electric", name: "Electric" },
          { id: "CNG", name: "CNG" },
        ]}
        required
      />
      <SelectInput
        source="transmission_type"
        label="Transmission Type"
        choices={[
          { id: "Automatic", name: "Automatic" },
          { id: "Manual", name: "Manual" },
        ]}
        required
      />
    </SimpleForm>
  </Edit>
);

// Vehicle Create Component
export const VehicleCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="license_plate" label="License Plate" required />
      <TextInput source="brand_name" label="Brand Name" required />
      <TextInput source="brand_model" label="Brand Model" required />
      <SelectInput
        source="fuel_type"
        label="Fuel Type"
        choices={[
          { id: "Petrol", name: "Petrol" },
          { id: "Diesel", name: "Diesel" },
          { id: "Electric", name: "Electric" },
          { id: "CNG", name: "CNG" },
        ]}
        required
      />
      <SelectInput
        source="transmission_type"
        label="Transmission Type"
        choices={[
          { id: "Automatic", name: "Automatic" },
          { id: "Manual", name: "Manual" },
        ]}
        required
      />
    </SimpleForm>
  </Create>
);