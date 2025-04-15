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
    BooleanInput,
    ReferenceArrayInput,
    SelectArrayInput,
    FilterButton,
    SearchInput,
    TopToolbar,
    CreateButton,
    ExportButton,
    DateInput,
    SelectInput,
    ArrayInput,
    SimpleFormIterator,
    BooleanField,
    DateField} from "react-admin";

// Filters
const userFilters = [
    <SearchInput source="q" alwaysOn />,
    <TextInput source="name" label="Name" />,
    <TextInput source="email" label="Email" />,
    <TextInput source="phone" label="Phone" />,
    <BooleanInput source="isActive" label="Active" />
];

const UserListActions = () => (
    <TopToolbar>
        <FilterButton />
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

export const UserList = () => (
    <List 
        filters={userFilters} 
        actions={<UserListActions />}
        //sort={{ field: 'name', order: 'ASC' }}
    >
        <Datagrid rowClick="edit">
            <TextField source="name" label="Name" />
            <TextField source="email" label="Email" />
            <TextField source="phone" label="Phone" />
            <TextField source="gender" label="Gender" />
            <DateField source="dob" label="Date of Birth" />
            <BooleanField source="isActive" label="Active" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" label="Name" fullWidth required />
            <TextInput source="email" label="Email" fullWidth required />
            <TextInput source="phone" label="Phone" fullWidth required />
            <SelectInput 
                source="gender" 
                label="Gender" 
                fullWidth 
                choices={[
                    { id: 'Male', name: 'Male' },
                    { id: 'Female', name: 'Female' },
                    { id: 'Other', name: 'Other' },
                    { id: "Don't want to specify", name: "Don't want to specify" }
                ]}
            />
            <DateInput source="dob" label="Date of Birth" fullWidth required />
            <BooleanInput source="isActive" label="Active" />
            <ArrayInput source="address">
                <SimpleFormIterator>
                    <TextInput source="street" label="Street" fullWidth />
                    <TextInput source="city" label="City" fullWidth defaultValue="Pune" />
                    <TextInput source="state" label="State" fullWidth defaultValue="Maharashtra" />
                    <TextInput source="zipCode" label="Zip Code" fullWidth />
                    <TextInput source="country" label="Country" fullWidth defaultValue="India" />
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="profilePic" label="Profile Picture URL" fullWidth defaultValue="default-profile.jpg" />
            <ReferenceArrayInput source="vehicle" reference="vehicles">
                <SelectArrayInput optionText="vehicle_name" />
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
);

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" label="Name" fullWidth required />
            <TextInput source="email" label="Email" fullWidth required />
            <TextInput source="phone" label="Phone" fullWidth required />
            <SelectInput 
                source="gender" 
                label="Gender" 
                fullWidth 
                choices={[
                    { id: 'Male', name: 'Male' },
                    { id: 'Female', name: 'Female' },
                    { id: 'Other', name: 'Other' },
                    { id: "Don't want to specify", name: "Don't want to specify" }
                ]}
                defaultValue="Don't want to specify"
            />
            <DateInput source="dob" label="Date of Birth" fullWidth required />
            <BooleanInput source="isActive" label="Active" defaultValue={true} />
            <ArrayInput source="address">
                <SimpleFormIterator>
                    <TextInput source="street" label="Street" fullWidth />
                    <TextInput source="city" label="City" fullWidth defaultValue="Pune" />
                    <TextInput source="state" label="State" fullWidth defaultValue="Maharashtra" />
                    <TextInput source="zipCode" label="Zip Code" fullWidth />
                    <TextInput source="country" label="Country" fullWidth defaultValue="India" />
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="profilePic" label="Profile Picture URL" fullWidth defaultValue="default-profile.jpg" />
            <ReferenceArrayInput source="vehicle" reference="vehicles">
                <SelectArrayInput optionText="vehicle_name" />
            </ReferenceArrayInput>
        </SimpleForm>
    </Create>
);