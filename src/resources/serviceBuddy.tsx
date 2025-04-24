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
  // useRedirect,
  EditButton,
  DeleteButton,
  ReferenceArrayInput,
  SelectArrayInput,
  useGetList,
  FunctionField,
  RaRecord,
  useGetMany,
  useDataProvider, // Uncommented this import
  useRefresh,      // Added refresh hook
} from "react-admin";
import { useEffect, useState } from "react";
import { Box, Chip, Typography } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";

// Improved component to display pincode arrays in the list view
const PincodeArrayField = ({ record }: { record?: RaRecord }) => {
  if (!record) return <span>No record</span>;

  // handles-> when service_pincodes is undefined or empty
  if (!record.service_pincodes || record.service_pincodes.length === 0) {
      return <span>No pincodes assigned</span>;
  }

  if (typeof record.service_pincodes[0] === 'object' && record.service_pincodes[0] !== null) {
      // We already have the full pincode objects, just format and display them
      return (
          <span>
              {record.service_pincodes.map((pincode: any) =>
                  `${pincode.area} (${pincode.pincode})`
              ).join(", ")}
          </span>
      );
  }

  // If we just have IDs, then we need to fetch the pincodes
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

const PincodeSelectionInput = () => {
  const form = useFormContext();
  // Directly watch the service_pincodes field for real-time updates
  const selectedPincodeIds = useWatch({ name: "service_pincodes" }) || [];
  const [normalizedIds, setNormalizedIds] = useState<string[]>([]);

  // process IDs to handle both string and object formats
  useEffect(() => {
      const processedIds = selectedPincodeIds
          .map((p: any) => typeof p === "object" ? (p.id || p._id) : p)
          .filter(Boolean);
      setNormalizedIds(processedIds);

      const currentValue = form.getValues("service_pincodes");
      if (JSON.stringify(currentValue) !== JSON.stringify(processedIds)) {
          form.setValue("service_pincodes", processedIds, {
              shouldDirty: true,
              shouldValidate: true,
          });
      }
  }, [selectedPincodeIds, form]);

  // Get detailed data
  const { data: selectedPincodes = [], isLoading: isLoadingSelected } = useGetMany(
      "pincodes",
      { ids: normalizedIds },
      { enabled: normalizedIds.length > 0 }
  );

  // handle individual pincode removal
  const handlePincodeRemove = (pincodeId: string) => {
      const updatedIds = normalizedIds.filter(id => id !== pincodeId);
      form.setValue("service_pincodes", updatedIds, {
          shouldDirty: true,
          shouldValidate: true,
      });
  };

  return (
      <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Service Areas
          </Typography>

          {/* Standard Selection Component */}
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

          {/* Selected Pincodes Display */}
          <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                  Selected Service Areas:
              </Typography>

              {isLoadingSelected && normalizedIds.length > 0 ? (
                  <Box sx={{ color: 'text.secondary' }}>Loading selected areas...</Box>
              ) : normalizedIds.length === 0 ? (
                  <Box sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                      No service areas selected
                  </Box>
              ) : (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {selectedPincodes.map((pincode) => {
                          if (!pincode) return null;
                          const pincodeId = pincode.id || pincode._id;
                          return (
                              <Chip
                                  key={pincodeId}
                                  label={`${pincode.area} (${pincode.pincode})`}
                                  onDelete={() => handlePincodeRemove(pincodeId)}
                                  color="primary"
                                  variant="outlined"
                                  size="small"
                                  sx={{ m: 0.5 }}
                              />
                          );
                      })}
                  </Box>
              )}
          </Box>
      </Box>
  );
};

export const ServiceBuddyList = () => {
  const refresh = useRefresh();
  const [forceRefresh, setForceRefresh] = useState(0);

  // Force refresh every 2 seconds to catch updates
  useEffect(() => {
      const timer = setInterval(() => {
          setForceRefresh(prev => prev + 1);
          refresh(); // Add actual data refresh
      }, 2000);

      return () => clearInterval(timer);
  }, [refresh]);

  return (
      <List key={forceRefresh}>
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
};

// Enhanced Create View with direct API update
export const ServiceBuddyCreate = () => {
  const notify = useNotify();
  // const redirect = useRedirect();
  const dataProvider = useDataProvider(); // Uncommented this
  const refresh = useRefresh();

  const handleSuccess = async (data: any) => {
      try {
          // Make a direct update call to ensure pincodes are saved
          if (data.service_pincodes && data.service_pincodes.length > 0) {
              const normalizedPincodes = [...new Set(
                  data.service_pincodes.map((p: any) =>
                      typeof p === "object" ? (p.id || p._id) : p
                  ).filter(Boolean)
              )];

              await dataProvider.update('serviceBuddies', {
                  id: data.id || data._id,
                  data: { service_pincodes: normalizedPincodes },
                  previousData: data,
              });
          }

          notify("Service Buddy Created Successfully", { type: 'success' });
          refresh(); // Refresh the data
          // redirect("/serviceBuddies");

      } catch (error) {
          console.error("Error ensuring pincodes are saved:", error);
          notify("Error saving service buddy details", { type: 'error' });
      }
  };

  return (
      <Create
          mutationOptions={{ onSuccess: handleSuccess }}
          transform={(data) => {
              // Ensure service_pincodes is always an array, even if empty
              if (!data.service_pincodes) {
                  data.service_pincodes = [];
              } else {
                  // Normalize IDs (convert object references to string IDs)
                  data.service_pincodes = data.service_pincodes
                      .map((p: any) => typeof p === "object" ? (p.id || p._id) : p)
                      .filter(Boolean); // Remove any null/undefined values

                  // Deduplicate
                  data.service_pincodes = [...new Set(data.service_pincodes)];
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

// Enhanced Edit View with direct API update to ensure pincodes are saved
export const ServiceBuddyEdit = () => {
  const notify = useNotify();
  // const redirect = useRedirect();
  const dataProvider = useDataProvider(); // Uncommented this
  const refresh = useRefresh();

  const handleSuccess = async (data: any) => {
      const recordId = data.id || data._id;

      try {
          // Make a direct update call to ensure pincodes are saved correctly
          if (data.service_pincodes && Array.isArray(data.service_pincodes)) {
              const normalizedPincodes = [...new Set(
                  data.service_pincodes.map((p: any) =>
                      typeof p === "object" ? (p.id || p._id) : p
                  ).filter(Boolean)
              )];

              await dataProvider.update('serviceBuddies', {
                  id: recordId,
                  data: { service_pincodes: normalizedPincodes },
                  previousData: data,
              });
          }

          notify("Service Buddy Updated Successfully", { type: 'success' });
          refresh(); // Ensure data is refreshed
          // redirect("/serviceBuddies");
      } catch (error) {
          console.error("Error ensuring pincodes are saved:", error);
          notify("Error updating service buddy details", { type: 'error' });
      }
  };

  return (
      <Edit
          mutationOptions={{ onSuccess: handleSuccess }}
          transform={(data) => {
              // Ensure service_pincodes is always an array, even if empty
              if (!data.service_pincodes) {
                  data.service_pincodes = [];
              } else {
                  // convert object references to string IDs
                  data.service_pincodes = data.service_pincodes
                      .map((p: any) => typeof p === "object" ? (p.id || p._id) : p)
                      .filter(Boolean); // remove any null/undefined values

                  // Deduplicate
                  data.service_pincodes = [...new Set(data.service_pincodes)];
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