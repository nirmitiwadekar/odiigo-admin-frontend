import { 
  List, 
  Datagrid, 
  TextField, 
  NumberField, 
  EditButton, 
  useDataProvider,
  SimpleForm,
  TextInput, 
  Edit,
  NumberInput, 
  Create,
  SelectInput, 
  Filter, 
  FilterProps,
  DeleteButton
} from "react-admin";
import { useState, useEffect } from 'react';
import { JSX } from "react/jsx-runtime";


// Define Filters
const ServicePricingFilter = (props: JSX.IntrinsicAttributes & FilterProps) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <SelectInput
      label="Fuel Type"
      source="fuel_type"
      choices={[
        { id: "Petrol", name: "Petrol" },
        { id: "Diesel", name: "Diesel" },
        { id: "Electric", name: "Electric" },
        { id: "CNG", name: "CNG" },
      ]}
    />
    <SelectInput
      label="Transmission Type"
      source="transmission_type"
      choices={[
        { id: "Manual", name: "Manual" },
        { id: "Automatic", name: "Automatic" },
      ]}
    />
    <TextInput label="Car Make" source="car_make" />
    <TextInput label="Car Model" source="car_model" />
  </Filter>
);

// Service Pricing List with Filters
export const ServicePricingList = () => (
  <List filters={<ServicePricingFilter children={undefined} />}>
    <Datagrid rowClick="edit">
      {/* <TextField source="id" label="ID" /> */}
      <TextField source="service_id.service_name" label="Service Name" />
      <TextField source="car_make" label="Car Make" />
      <TextField source="car_model" label="Car Model" />
      <TextField source="fuel_type" label="Fuel Type" />
      <TextField source="transmission_type" label="Transmission Type" />
      <NumberField source="service_price" label="Price" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);


// Fetch available services
const useServices = () => {
  const [services, setServices] = useState<Array<{ id: string; name: string }>>(
    [],
  );
  const dataProvider = useDataProvider();

  useEffect(() => {
    dataProvider
      .getList("services", {
      })
      .then(({ data }) => {
        console.log("Fetched Services:", data); // Debugging
        setServices(
            data.map((service: any) => ({
              id: service._id, // Ensure "id" field is set properly
              name: service.service_name, // Ensure correct name field
            }))
          );
          
      })
      .catch((error) => console.error("Error fetching services:", error));
  }, [dataProvider]);

  return services;
};

// Service Pricing Edit
export const ServicePricingEdit = () => {
  const services = useServices();

  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" disabled />
        <SelectInput
  label="Service"
  source="service_id"
  choices={services} // Ensure choices array is correctly structured
  optionText="name" // Shows the service name in dropdown
  optionValue="id" // Use "id" instead of "_id"
/>


        <TextInput source="car_make" />
        <TextInput source="car_model" />
        <SelectInput
          source="fuel_type"
          choices={[
            { id: "Petrol", name: "Petrol" },
            { id: "Diesel", name: "Diesel" },
            { id: "Electric", name: "Electric" },
            { id: "CNG", name: "CNG" },
          ]}
        />
        <SelectInput
          source="transmission_type"
          choices={[
            { id: "Manual", name: "Manual" },
            { id: "Automatic", name: "Automatic" },
          ]}
        />
        <NumberInput source="service_price" />
      </SimpleForm>
    </Edit>
  );
};

// Service Pricing Create
export const ServicePricingCreate = () => {
  const services = useServices();

  return (
    <Create>
      <SimpleForm>
        <SelectInput
          source="service_id"
          choices={services}
          optionValue="id" // Ensure correct value mapping
          optionText="name" // Ensure correct text mapping
          label="Service"
        />

        <TextInput source="car_make" />
        <TextInput source="car_model" />
        <SelectInput
          source="fuel_type"
          choices={[
            { id: "Petrol", name: "Petrol" },
            { id: "Diesel", name: "Diesel" },
            { id: "Electric", name: "Electric" },
            { id: "CNG", name: "CNG" },
          ]}
        />
        <SelectInput
          source="transmission_type"
          choices={[
            { id: "Manual", name: "Manual" },
            { id: "Automatic", name: "Automatic" },
          ]}
        />
        <NumberInput source="service_price" />
      </SimpleForm>
    </Create>
  );
};
