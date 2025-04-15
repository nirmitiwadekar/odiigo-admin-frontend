// import { List, Datagrid, TextField, EditButton, DeleteButton, Edit, SimpleForm, TextInput, Create, ReferenceInput, SelectInput } from "react-admin";

// export const ServiceList = () => (
//     <List>
//         <Datagrid rowClick="edit">
//             {/*<TextField source="id" />*/}
//             <TextField source="service_name" label="Service Name" />
//             {/*<TextField source="price" label="Price" />*/}
//             <EditButton />
//             <DeleteButton />
//         </Datagrid>
//     </List>
// );

// export const ServiceEdit = () => (
//     <Edit>
//         <SimpleForm>
//             <TextInput source="service_name" label="Service Name" />
//             <TextInput multiline source="service_details" label="Details" />
//             {/*<NumberInput source="price" label="Price" />*/}
//             <ReferenceInput source="category_id" reference="categories">
//                 <SelectInput optionText="category_name" />
//             </ReferenceInput>
//         </SimpleForm>
//     </Edit>
// );

// export const ServiceCreate = () => (
//     <Create>
//         <SimpleForm>
//             <TextInput source="service_name" label="Service Name" />
//             <TextInput multiline source="service_details" label="Details" />
//             {/*<NumberInput source="price" label="Price" />*/}
//             <ReferenceInput source="category_id" reference="categories">
//                 <SelectInput optionText="category_name" />
//             </ReferenceInput>
//         </SimpleForm>
//     </Create>
// );
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
  ReferenceInput,
  SelectInput,
  //ReferenceField,
  FilterButton,
  SearchInput,
  TopToolbar,
  CreateButton,
  ExportButton,
} from "react-admin";

const serviceFilters = [
  <SearchInput source="q" alwaysOn />,
  <ReferenceInput source="category_id" reference="categories">
    <SelectInput optionText="category_name" />
  </ReferenceInput>,
  <TextInput source="service_name" label="Service Name" />,
  //<TextField source="included_services" label="Included Services" />
];

const ServiceListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const ServiceList = () => (
  <List filters={serviceFilters} actions={<ServiceListActions />}>
    <Datagrid rowClick="edit">
      <TextField source="service_name" label="Service Name" />
      <TextField source="service_details" label="Details" />
      <TextField source="included_services" label="Included Services" />
      {/* <ReferenceField
        source="category_id"
        reference="categories"
        label="Category"
      >
        <TextField source="category_name" />
      </ReferenceField> */}
        <TextField source="category_id.category_name" label="Category Name" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const ServiceEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="service_name" label="Service Name" fullWidth />
      <TextInput source="service_details" label="Details" multiline fullWidth />
      <TextInput
        source="included_services"
        label="Included Services"
        multiline
        fullWidth
      />
      <ReferenceInput source="category_id" reference="categories">
        <SelectInput
          optionText="category_name"
          optionValue="_id"
          label="Category"
        />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const ServiceCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput
        source="service_name"
        label="Service Name"
        fullWidth
        required
      />
      <TextInput
        source="service_details"
        label="Details"
        multiline
        fullWidth
        required
      />
      <TextInput
        source="included_services"
        label="Included Services"
        multiline
        fullWidth
        required
      />
      <ReferenceInput source="category_id" reference="categories" required>
        <SelectInput
          optionText="category_name"
          optionValue="_id"
          label="Category"
        />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
