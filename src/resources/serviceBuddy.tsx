// import {
//   List,
//   Datagrid,
//   TextField,
//   BooleanField,
//   Edit,
//   SimpleForm,
//   TextInput,
//   BooleanInput,
//   Create,
//   useNotify,
//   useRefresh,
//   useRedirect,
//   EditButton,
//   DeleteButton,
//   ReferenceArrayInput,
//   SelectArrayInput,
//   useGetList,
//   FunctionField,
//   RaRecord,
// } from "react-admin";
// import { useEffect, useState } from "react";

// // Fixed to handle both IDs and fully populated objects
// const PincodeArrayField = ({ record }: { record?: RaRecord }) => {
//   if (!record || !record.service_pincodes) {
//     return <span>No pincodes assigned</span>;
//   }

//   // Check if we have a populated array with objects
//   if (typeof record.service_pincodes[0] === 'object' && record.service_pincodes[0] !== null) {
//     // We already have the full pincode objects, just format and display them
//     return (
//       <span>
//         {record.service_pincodes.map((pincode: any) => 
//           `${pincode.area} (${pincode.pincode})`
//         ).join(", ")}
//       </span>
//     );
//   }

//   // If we just have IDs, then we need to fetch the pincodes
//   const [pincodeData, setPincodeData] = useState<string[]>([]);

//   const {
//     data: pincodes,
//     isLoading,
//     error,
//   } = useGetList("pincodes", {
//     pagination: { page: 1, perPage: 100 },
//   });

//   useEffect(() => {
//     if (!isLoading && !error && pincodes && record?.service_pincodes) {
//       const matchedPincodes = record.service_pincodes.map((id: string) => {
//         const pincode = pincodes.find(p => p.id === id || p._id === id);
//         return pincode
//           ? `${pincode.area} (${pincode.pincode})`
//           : "Unknown Pincode";
//       });

//       setPincodeData(matchedPincodes);
//     }
//   }, [pincodes, record, isLoading, error]);

//   if (isLoading) return <span>Loading...</span>;
//   if (error) return <span>Error loading pincodes</span>;

//   return (
//     <span>
//       {pincodeData.length > 0 ? pincodeData.join(", ") : "No Pincodes Assigned"}
//     </span>
//   );
// };

// // List View with Edit & Delete Buttons
// export const ServiceBuddyList = () => (
//   <List>
//     <Datagrid>
//       {/*<TextField source="id" label="ID" />*/}
//       <TextField source="name" label="Name" />
//       <TextField source="phone" label="Phone" />
//       <FunctionField
//         label="Service Areas"
//         render={(record: RaRecord) => <PincodeArrayField record={record} />}
//       />
//       <BooleanField source="is_available" label="Available" />
//       <EditButton />
//       <DeleteButton />
//     </Datagrid>
//   </List>
// );

// // Create View
// export const ServiceBuddyCreate = () => {
//   const notify = useNotify();
//   const refresh = useRefresh();
//   const redirect = useRedirect();

//   const handleSuccess = (_data: any) => {
//     notify("Service Buddy Created Successfully");
//     redirect("/serviceBuddies");
//     refresh();
//   };

//   return (
//     <Create mutationOptions={{ onSuccess: handleSuccess }}>
//       <SimpleForm>
//         <TextInput source="name" label="Name" required />
//         <TextInput source="phone" label="Phone" required />
//         <ReferenceArrayInput source="service_pincodes" reference="pincodes">
//           <SelectArrayInput
//             optionText={(choice) =>
//               choice && choice.area && choice.pincode
//                 ? `${choice.area} (${choice.pincode})`
//                 : choice?.id || "Unknown Pincode"
//             }
//             optionValue="id"
//           />
//         </ReferenceArrayInput>

//         <BooleanInput
//           source="is_available"
//           label="Available"
//           defaultValue={true}
//         />
//       </SimpleForm>
//     </Create>
//   );
// };

// // Edit View
// export const ServiceBuddyEdit = () => {
//   const notify = useNotify();
//   const refresh = useRefresh();

//   const handleSuccess = (_data: any) => {
//     notify("Service Buddy Updated Successfully");
//     refresh();
//   };

//   return (
//     <Edit mutationOptions={{ onSuccess: handleSuccess }}>
//       <SimpleForm>
//         <TextInput source="name" label="Name" required />
//         <TextInput source="phone" label="Phone" required />
//         <ReferenceArrayInput source="service_pincodes" reference="pincodes">
//           <SelectArrayInput
//             optionText={(choice) =>
//               choice && choice.area && choice.pincode
//                 ? `${choice.area} (${choice.pincode})`
//                 : choice?.id || "Unknown Pincode"
//             }
//             optionValue="id"
//           />
//         </ReferenceArrayInput>

//         <BooleanInput source="is_available" label="Available" />
//       </SimpleForm>
//     </Edit>
//   );
// };
import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  Create,
  useNotify,
  useRefresh,
  // useRedirect,
  EditButton,
  DeleteButton,
  ReferenceArrayInput,
  SelectArrayInput,
  useGetList,
  FunctionField,
  RaRecord,
  FormDataConsumer,
  useGetMany,
} from "react-admin";
import { useEffect, useState } from "react";
import { Box, Chip, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

// fixed to handle both IDs and fully populated objects
const PincodeArrayField = ({ record }: { record?: RaRecord }) => {
  if (!record || !record.service_pincodes) {
    return <span>No pincodes assigned</span>;
  }

  // check if we have a populated array with objects
  if (typeof record.service_pincodes[0] === 'object' && record.service_pincodes[0] !== null) {
    return (
      <span>
        {record.service_pincodes.map((pincode: any) => 
          `${pincode.area} (${pincode.pincode})`
        ).join(", ")}
      </span>
    );
  }

  // if we just have IDs, then we need to fetch the pincodes
  const [pincodeData, setPincodeData] = useState<string[]>([]);

  const {
    data: pincodes,
    isLoading,
    error,
  } = useGetList("pincodes", {
    pagination: { page: 1, perPage: 100 },
  });

  useEffect(() => {
    if (!isLoading && !error && pincodes && record?.service_pincodes) {
      const matchedPincodes = record.service_pincodes.map((id: string) => {
        const pincode = pincodes.find(p => p.id === id || p._id === id);
        return pincode
          ? `${pincode.area} (${pincode.pincode})`
          : "Unknown Pincode";
      });

      setPincodeData(matchedPincodes);
    }
  }, [pincodes, record, isLoading, error]);

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Error loading pincodes</span>;

  return (
    <span>
      {pincodeData.length > 0 ? pincodeData.join(", ") : "No Pincodes Assigned"}
    </span>
  );
};

// display - only for selected pincodes
const PincodeSelectionInput = () => {
  const form = useFormContext();

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Service Areas
      </Typography>
      
      <ReferenceArrayInput source="service_pincodes" reference="pincodes">
        <SelectArrayInput
          optionText={(choice) =>
            choice && choice.area && choice.pincode
              ? `${choice.area} (${choice.pincode})`
              : choice?.id || "Unknown Pincode"
          }
          optionValue="id"
          label="Service Pincodes"
          fullWidth
        />
      </ReferenceArrayInput>

      {/* Display Selected Pincodes */}
      <FormDataConsumer>
        {({ formData }) => {
          // Use scopedFormData for access to the current field's value
          const selectedPincodeIds = formData?.service_pincodes || [];
          
          // Only proceed if we have selected pincodes
          if (!selectedPincodeIds.length) {
            return (
              <Box sx={{ mt: 2, color: 'text.secondary', fontStyle: 'italic' }}>
                No service areas selected
              </Box>
            );
          }
          
          // deduplicate selected pincode IDs
          const uniqueSelectedIds = [...new Set(
            selectedPincodeIds.map((p: any) => 
              typeof p === "object" ? p.id || p._id : p
            )
          )];
          
          // get data only for selected pincodes
          const { data: pincodesData = [], isLoading } = useGetMany(
            "pincodes",
            {
              ids: uniqueSelectedIds,
            }
          );

          if (isLoading) return <Box sx={{ mt: 2 }}>Loading selected areas...</Box>;
          
          // filter null values
          const validPincodes = pincodesData.filter(p => p);
          
          // no duplicates are displayed
          const uniquePincodes = Array.from(
            new Map(validPincodes.map(p => [(p.id || p._id), p])).values()
          );

          // if no valid pincodes data was returned
          if (uniquePincodes.length === 0) {
            return (
              <Box sx={{ mt: 2, color: 'text.secondary', fontStyle: 'italic' }}>
                Could not load selected areas
              </Box>
            );
          }

          return (
            <Box sx={{ mt: 2 }}>
              <Box sx={{ fontWeight: "bold", mb: 1 }}>Selected Service Areas:</Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {uniquePincodes.map((pincode) => {
                  const pincodeId = pincode.id || pincode._id;
                  return (
                    <Chip
                      key={pincodeId}
                      label={`${pincode.area} (${pincode.pincode})`}
                      onDelete={() => {
                        // get current value
                        const currentValue = form.getValues("service_pincodes") || [];
                        
                        // create new array without the pincode to remove
                        const newValue = currentValue.filter((p: any) => {
                          const id = typeof p === "object" ? (p.id || p._id) : p;
                          return id !== pincodeId;
                        });
                        
                        // update form value
                        form.setValue("service_pincodes", newValue, {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        });
                        
                        // log values for debugging
                        console.log('Removing pincode:', pincodeId);
                        console.log('Previous value:', currentValue);
                        console.log('New value:', newValue);
                        console.log('Current form values:', form.getValues());
                      }}
                      color="primary"
                      variant="outlined"
                      size="small"
                      sx={{ m: 0.5 }}
                    />
                  );
                })}
              </Box>
            </Box>
          );
        }}
      </FormDataConsumer>
    </Box>
  );
};

// list View with Edit & Delete Buttons
export const ServiceBuddyList = () => (
  <List>
    <Datagrid>
      <TextField source="name" label="Name" />
      <TextField source="phone" label="Phone" />
      <FunctionField
        label="Service Areas"
        render={(record: RaRecord) => <PincodeArrayField record={record} />}
      />
      <BooleanField source="is_available" label="Available" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const ServiceBuddyCreate = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  // const redirect = useRedirect();

  const handleSuccess = (_data: any) => {
    notify("Service Buddy Created Successfully");
    // redirect("/serviceBuddies");
    refresh();
  };

  return (
    <Create 
      mutationOptions={{ onSuccess: handleSuccess }}
      transform={(data) => {
        // Deduplicate service_pincodes before sending to the server
        if (data.service_pincodes) {
          data.service_pincodes = [...new Set(
            data.service_pincodes.map((p: any) => 
              typeof p === "object" ? p.id || p._id : p
            )
          )];
        }
        console.log("Create Form data being sent:", data);
        return data;
      }}
    >
      <SimpleForm>
        <TextInput source="name" label="Name" required />
        <TextInput source="phone" label="Phone" required />
        <PincodeSelectionInput />
        <BooleanInput
          source="is_available"
          label="Available"
          defaultValue={true}
        />
      </SimpleForm>
    </Create>
  );
};

// edit View with fixed pincode removal
export const ServiceBuddyEdit = () => {
  const notify = useNotify();
  const refresh = useRefresh();

  const handleSuccess = (_data: any) => {
    notify("Service Buddy Updated Successfully");
    refresh();
  };

  return (
    <Edit 
      mutationOptions={{ onSuccess: handleSuccess }}
      transform={(data) => {
        // before sending to the server
        if (data.service_pincodes) {
          data.service_pincodes = [...new Set(
            data.service_pincodes.map((p: any) => 
              typeof p === "object" ? p.id || p._id : p
            )
          )];
        }
        console.log("Edit Form data being sent:", data);
        return data;
      }}
    >
      <SimpleForm>
        <TextInput source="name" label="Name" required />
        <TextInput source="phone" label="Phone" required />
        <PincodeSelectionInput />
        <BooleanInput source="is_available" label="Available" />
      </SimpleForm>
    </Edit>
  );
};

export { PincodeSelectionInput };