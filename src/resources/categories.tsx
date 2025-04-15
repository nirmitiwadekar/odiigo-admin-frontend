// import { List, Datagrid, TextField, EditButton, DeleteButton, Edit, SimpleForm, TextInput, Create } from "react-admin";

// export const CategoryList = () => (
//     <List>
//         <Datagrid rowClick="edit">
//             <TextField source="id" />
//             <TextField source="category_name" label="Category Name" />
//             <TextField source="category_description" label="Description" />
//             <EditButton/>        
//             <DeleteButton />
//         </Datagrid>
//     </List>
// );

// export const CategoryEdit = () => (
//     <Edit>
//         <SimpleForm>
//             <TextInput source="category_name" label="Category Name" />
//             <TextInput multiline source="category_description" label="Description" />
//         </SimpleForm>
//     </Edit>
// );

// export const CategoryCreate = () => (
//     <Create>
//         <SimpleForm>
//             <TextInput source="category_name" label="Category Name" />
//             <TextInput multiline source="category_description" label="Description" />
//         </SimpleForm>
//     </Create>
// );
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    DeleteButton,
    FilterLiveSearch,
    TextInput,
    Edit,
    SimpleForm,
    Create,
    Filter,
    FilterProps,
  } from "react-admin";
  import { JSX } from "react/jsx-runtime";
  
  // Custom Filter Component
  const CategoryFilter = (props: JSX.IntrinsicAttributes & FilterProps) => (
    <Filter {...props}>
      <FilterLiveSearch source="q" label="Search" alwaysOn />
      <TextInput source="category_name" label="Category Name" />
      <TextInput source="category_description" label="Description" />
    </Filter>
  );
  
  // Category List Component
  export const CategoryList = () => (
    <List filters={<CategoryFilter children={undefined} />}>
      <Datagrid rowClick="edit">
        {/*<TextField source="id" />*/}
        <TextField source="category_name" label="Category Name" />
        <TextField source="category_description" label="Description" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
  
  // Category Edit Component
  export const CategoryEdit = () => (
    <Edit>
      <SimpleForm>
        <TextInput source="category_name" label="Category Name" required />
        <TextInput multiline source="category_description" label="Description" />
      </SimpleForm>
    </Edit>
  );
  
  // Category Create Component
  export const CategoryCreate = () => (
    <Create>
      <SimpleForm>
        <TextInput source="category_name" label="Category Name" required />
        <TextInput multiline source="category_description" label="Description" />
      </SimpleForm>
    </Create>
  );