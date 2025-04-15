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
  RaRecord,
  Filter,
  FilterProps,
  ReferenceArrayInput,
  FunctionField,
  SelectArrayInput,
  DateInput,
  FormDataConsumer,
  useGetMany,
} from "react-admin";
import { JSX } from "react";
import { Box, Chip, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

// Custom Services Array Field Component
const ServiceArrayField: React.FC<{ record?: RaRecord }> = ({ record }) => {
  if (!record || !record.services || !record.services.length) {
    return <span>No services assigned</span>;
  }

  // If services are populated as full objects
  if (typeof record.services[0] === "object" && record.services[0] !== null) {
    return (
      <span>
        {record.services
          .map(
            (service: any) => service.service_name || service.name || "Unnamed",
          )
          .join(", ")}
      </span>
    );
  }

  // If only ObjectIds are present
  return <span>{record.services.join(", ")}</span>;
};

// Custom Filter Component for Garage
const GarageFilter = (props: JSX.IntrinsicAttributes & FilterProps) => (
  <Filter {...props}>
    <FilterLiveSearch source="q" label="Search" alwaysOn />
    <TextInput source="name" label="Garage Name" alwaysOn />
    <TextInput source="ownerDetails.Name" label="Owner Name" />
    <TextInput source="location.city" label="City" />
    <TextInput source="vehicle_type.vehicleBrand" label="Vehicle Brand" />
    <SelectInput
      source="status"
      label="Status"
      choices={[
        { id: "active", name: "Active" },
        { id: "inactive", name: "Inactive" },
      ]}
    />
  </Filter>
);

// Simplified Vehicle Selection Input Component
const VehicleSelectionInput: React.FC = () => {
  const { setValue, trigger } = useFormContext();

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Vehicle Selection
      </Typography>

      {/* Brands Selection */}
      <ReferenceArrayInput source="vehicleBrands" reference="car-brands">
        <SelectArrayInput
          optionText={(choice: any) => choice?.name || "Unnamed Brand"}
          optionValue="_id"
          label="Vehicle Brands"
          fullWidth
        />
      </ReferenceArrayInput>

      {/* Models Selection - Filtered by selected brands */}
      <FormDataConsumer>
        {({ formData }) => {
          const selectedBrandIds = formData?.vehicleBrands || [];

          return (
            <Box sx={{ mt: 2 }}>
              <ReferenceArrayInput
                source="vehicleModels"
                reference="car-models"
                filter={{
                  brand:
                    selectedBrandIds.length > 0
                      ? {
                          $in: selectedBrandIds.map((b: any) =>
                            typeof b === "object" ? b._id : b,
                          ),
                        }
                      : undefined,
                }}
              >
                <SelectArrayInput
                  optionText={(choice: any) => {
                    if (!choice) return "";
                    const brandName =
                      choice.brand && typeof choice.brand === "object"
                        ? choice.brand.name
                        : "";
                    return `${choice.name}${brandName ? ` (${brandName})` : ""}`;
                  }}
                  optionValue="_id"
                  label="Vehicle Models"
                  fullWidth
                  disabled={selectedBrandIds.length === 0}
                  helperText={
                    selectedBrandIds.length === 0 ? "Select brands first" : ""
                  }
                />
              </ReferenceArrayInput>
            </Box>
          );
        }}
      </FormDataConsumer>

      {/* Display Selected Items */}
      <FormDataConsumer>
        {({ formData }) => {
          const selectedBrandIds = formData?.vehicleBrands || [];
          const selectedModelIds = formData?.vehicleModels || [];

          // Get data for selected brands
          const { data: brandsData = [] } = useGetMany("car-brands", {
            ids: selectedBrandIds.map((b: any) =>
              typeof b === "object" ? b._id : b,
            ),
          });

          // Get data for selected models
          const { data: modelsData = [] } = useGetMany("car-models", {
            ids: selectedModelIds.map((m: any) =>
              typeof m === "object" ? m._id : m,
            ),
          });

          return (
            <Box sx={{ mt: 2 }}>
              {/* Display selected brands */}
              {brandsData.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Selected Brands:
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 , mb : 2  }}
                  >
                    {brandsData.map((brand) => (
                      <Chip
                        key={brand._id}
                        label={brand.name}
                        size="small"
                        onDelete={() => {
                          // Remove brand
                          const updatedBrands = selectedBrandIds.filter(
                            (b: any) => {
                              const id = typeof b === "object" ? b._id : b;
                              return id !== brand._id;
                            },
                          );

                          // Remove models associated with this brand
                          const updatedModels = selectedModelIds.filter(
                            (m: any) => {
                              const id = typeof m === "object" ? m._id : m;
                              const model = modelsData.find(
                                (mdl) => mdl._id === id,
                              );
                              const modelBrandId =
                                model?.brand?._id || model?.brand;
                              return modelBrandId !== brand._id;
                            },
                          );

                          setValue("vehicleBrands", updatedBrands, {
                            shouldDirty: true,
                          });
                          setValue("vehicleModels", updatedModels, {
                            shouldDirty: true,
                          });
                          trigger(["vehicleBrands", "vehicleModels"]);
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Display selected models */}
              {modelsData.length > 0 && (
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Selected Models:
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 , mb : 4}}
                  >
                    {modelsData.map((model) => (
                      <Chip
                        key={model._id}
                        label={model.name}
                        size="small"
                        onDelete={() => {
                          const updatedModels = selectedModelIds.filter(
                            (m: any) => {
                              const id = typeof m === "object" ? m._id : m;
                              return id !== model._id;
                            },
                          );
                          setValue("vehicleModels", updatedModels, {
                            shouldDirty: true,
                          });
                          trigger("vehicleModels");
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          );
        }}
      </FormDataConsumer>
    </Box>
  );
};

// Services Selection Component
const ServicesSelectionInput: React.FC = () => {
  const { setValue, getValues, trigger } = useFormContext();

  return (
    <Box sx={{ mt: 2 }}>
      <ReferenceArrayInput source="services" reference="services">
        <SelectArrayInput
          optionText={(choice) =>
            choice?.service_name || choice?.name || "Unnamed Service"
          }
          optionValue="_id"
          label="Services"
          fullWidth
          sx={{
            "& .MuiChip-root": {
              margin: "2px",
              borderRadius: "16px",
            },
          }}
        />
      </ReferenceArrayInput>

      <FormDataConsumer>
        {({ formData }) => {
          const rawSelected = formData?.services || [];

          const selectedIds = [
            ...new Set(
              rawSelected.map((s: any) => (typeof s === "object" ? s._id : s)),
            ),
          ];

          const { data: servicesData = [], isLoading } = useGetMany(
            "services",
            {
              ids: selectedIds,
            },
          );

          if (isLoading || servicesData.length === 0) return null;

          // ✅ Deduplicate servicesData
          const uniqueServices = Array.from(
            new Map(servicesData.map((s) => [s._id, s])).values(),
          );

          return (
            <Box sx={{ mt: 2 }}>
              <Box sx={{ fontWeight: "bold", mb: 1 }}>Selected Services:</Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {uniqueServices.map((service) => (
                  <Chip
                    key={service._id}
                    label={service.service_name || service.name || "Unnamed"}
                    onDelete={() => {
                      const current = getValues("services") || [];
                      const updated = current.filter((s: any) => {
                        const id = typeof s === "object" ? s._id : s;
                        return id !== service._id;
                      });
                      setValue("services", updated, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                      trigger("services");
                    }}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          );
        }}
      </FormDataConsumer>
    </Box>
  );
};

// Garage List Component with Filtering and Sorting
export const GarageList = () => {
  console.log("Rendering GarageList");

  return (
    <List
      filters={<GarageFilter children={undefined} />}
      sort={{ field: "createdAt", order: "DESC" }}
      perPage={10}
      filterDefaultValues={{ status: null }}
    >
      <Datagrid rowClick="edit">
        <TextField source="name" label="Garage Name" />
        <TextField source="ownerDetails.Name" label="Owner Name" />
        <TextField source="ownerDetails.Phone" label="Owner Phone" />
        <TextField source="ownerDetails.Email" label="Owner Email" />
        <TextField source="location.address" label="Address" />
        <TextField source="location.city" label="City" />
        <FunctionField
          label="Services"
          render={(record: RaRecord) => <ServiceArrayField record={record} />}
        />
        <FunctionField
          label="Vehicle Brands"
          render={(record: RaRecord) =>
            record.vehicleBrands
              ?.map((brand: any) =>
                typeof brand === "object" ? brand.name : brand,
              )
              .join(", ") || "N/A"
          }
        />
        <FunctionField
          label="Vehicle Models"
          render={(record: RaRecord) =>
            record.vehicleModels
              ?.map((model: any) =>
                typeof model === "object" ? model.name : model,
              )
              .join(", ") || "N/A"
          }
        />
        {/* <FunctionField
          label="Vehicle Brands"
          render={(record: RaRecord) =>
            record.vehicleBrands?.map((brand: any) => brand.name).join(", ") ||
            "N/A"
          }
        />
        <FunctionField
          label="Vehicle Models"
          render={(record: RaRecord) =>
            record.vehicleModels
              ?.map((models: any) => models.name)
              .join(", ") || "N/A"
          }
        /> */}
        <TextField source="status" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

// Garage Edit Component
export const GarageEdit = () => (
  <Edit
    mutationMode="pessimistic"
    transform={(data) => {
      console.log("Edit Form data being sent:", data);
      return data;
    }}
  >
    <SimpleForm>
      <TextInput source="name" label="Garage Name" required />
      <TextInput source="ownerDetails.Name" label="Owner Name" required />
      <TextInput source="ownerDetails.Phone" label="Owner Phone" required />
      <TextInput source="ownerDetails.Email" label="Owner Email" required />
      <TextInput source="location.address" label="Address" required />
      <TextInput source="location.city" label="City" required />
      {/* <ReferenceArrayInput source="vehicleBrands" reference="car-brands">
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
      <ReferenceArrayInput source="vehicleModels" reference="car-models">
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput> */}
      <VehicleSelectionInput />

      <DateInput source="onboardingDate" label="Onboarding Date" />
      <SelectInput
        source="status"
        choices={[
          { id: "active", name: "Active" },
          { id: "inactive", name: "Inactive" },
        ]}
        required
      />
      <ServicesSelectionInput />
    </SimpleForm>
  </Edit>
);

// Garage Create Component
export const GarageCreate = () => (
  <Create
    transform={(data) => {
      console.log("Create Form data being sent:", data);
      return data;
    }}
  >
    <SimpleForm>
      <TextInput source="name" label="Garage Name" required />
      <TextInput source="ownerDetails.Name" label="Owner Name" required />
      <TextInput source="ownerDetails.Phone" label="Owner Phone" required />
      <TextInput source="ownerDetails.Email" label="Owner Email" required />
      <TextInput source="location.address" label="Address" required />
      <TextInput source="location.city" label="City" required />
      {/* <ReferenceArrayInput source="vehicleBrands" reference="car-brands">
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
      <ReferenceArrayInput source="vehicleModels" reference="car-models">
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput> */}
      <VehicleSelectionInput />

      <DateInput source="onboardingDate" label="Onboarding Date" />
      <SelectInput
        source="status"
        choices={[
          { id: "active", name: "Active" },
          { id: "inactive", name: "Inactive" },
        ]}
        required
      />
      <ServicesSelectionInput />
    </SimpleForm>
  </Create>
);

// Export the components - fix multiple default exports by only exporting named components
export { VehicleSelectionInput, ServicesSelectionInput };