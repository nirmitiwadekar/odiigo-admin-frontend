import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  required,
  useCreate,
  useUpdate,
  useNotify,
  useRedirect,
  ReferenceInput,
  SelectInput,
  FormDataConsumer,
  Show,
  SimpleShowLayout} from 'react-admin';
import { Box, Typography, Grid, Card, CardMedia } from '@mui/material';

// CarModelImageSelector component from your provided code
const CarModelImageSelector = forwardRef<
  { getImages: () => File[]; getExistingImages: () => string[]; getImagesToDelete: () => string[] },
  { label: string; multiple: boolean; existingImages?: string[] }
>((props, ref) => {
  const { label, multiple, existingImages = [] } = props;
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [existingImagesList, setExistingImagesList] = useState<string[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Initialize existing images
  React.useEffect(() => {
    if (existingImages && existingImages.length > 0) {
      setExistingImagesList(existingImages);
    }
  }, [existingImages]);
  
  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    getImages: () => {
      return selectedFiles;
    },
    getExistingImages: () => {
      return existingImagesList.filter(img => !imagesToDelete.includes(img));
    },
    getImagesToDelete: () => {
      return imagesToDelete;
    }
  }));
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    
    // Process new files
    const newFiles = Array.from(files);
    const newFileURLs = newFiles.map(file => URL.createObjectURL(file));
    
    if (multiple) {
      setSelectedFiles(prev => [...prev, ...newFiles]);
      setSelectedImages(prev => [...prev, ...newFileURLs]);
    } else {
      // Clear existing selections if not multiple
      setSelectedFiles(newFiles);
      setSelectedImages(newFileURLs);
      // Mark all existing images for deletion if not multiple
      if (existingImagesList.length > 0) {
        setImagesToDelete(existingImagesList);
      }
    }
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleRemoveNewImage = (index: number) => {
    setSelectedFiles(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
    
    setSelectedImages(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index]); // Clean up object URL
      updated.splice(index, 1);
      return updated;
    });
  };
  
  const handleRemoveExistingImage = (image: string) => {
    setImagesToDelete(prev => [...prev, image]);
  };
  
  const handleRestoreExistingImage = (image: string) => {
    setImagesToDelete(prev => prev.filter(img => img !== image));
  };
  
  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Typography variant="subtitle1">{label}</Typography>
      
      <Box sx={{ mt: 1, mb: 2 }}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Select Image{multiple ? 's' : ''}
        </button>
      </Box>
      
      {/* Display existing images */}
      {existingImagesList.length > 0 && (
        <>
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Existing Images</Typography>
          <Grid container spacing={2}>
            {existingImagesList.map((image, index) => {
              const isMarkedForDeletion = imagesToDelete.includes(image);
              
              return (
                <Grid item xs={6} sm={4} md={3} key={`existing-${index}`}>
                  <Box
                    sx={{
                      position: 'relative',
                      height: 150,
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      opacity: isMarkedForDeletion ? 0.5 : 1,
                    }}
                  >
                    <img
                      src={image}
                      alt={`Existing ${index + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <button
                      type="button"
                      onClick={() => 
                        isMarkedForDeletion 
                          ? handleRestoreExistingImage(image) 
                          : handleRemoveExistingImage(image)
                      }
                      style={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        background: isMarkedForDeletion ? 'rgba(0,255,0,0.8)' : 'rgba(255,0,0,0.8)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: 24,
                        height: 24,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {isMarkedForDeletion ? '✓' : '×'}
                    </button>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
      
      {/* Display newly selected images */}
      {selectedImages.length > 0 && (
        <>
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>New Images</Typography>
          <Grid container spacing={2}>
            {selectedImages.map((image, index) => (
              <Grid item xs={6} sm={4} md={3} key={`new-${index}`}>
                <Box
                  sx={{
                    position: 'relative',
                    height: 150,
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={image}
                    alt={`Selected ${index + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveNewImage(index)}
                    style={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      background: 'rgba(255,0,0,0.8)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: 24,
                      height: 24,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ×
                  </button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
});

// Custom Image Gallery component for Show view
interface ImageGalleryProps {
  record?: any;
}

const ImageGallery = ({ record }: ImageGalleryProps) => {
  if (!record || !record.carImages || !record.carImages.length) {
    return <Typography variant="body2">No images available</Typography>;
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {record.carImages.map((image: string, index: number) => (
        <Card key={index} sx={{ width: 150, m: 1 }}>
          <CardMedia
            component="img"
            height="100"
            image={image}
            alt={`Car model ${record.name} - image ${index + 1}`}
            sx={{ objectFit: "contain" }}
          />
        </Card>
      ))}
    </Box>
  );
};

// List component
export const CarModelList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <TextField source="brand.name" label="Brand" />
      <TextField source="status" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Show component
export const CarModelShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="brand.name" label="Brand" />
      <TextField source="status" />
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Car Images
      </Typography>
      <ImageGallery />
    </SimpleShowLayout>
  </Show>
);

// Create component
export const CarModelCreate = () => {
  const [create] = useCreate();
  const notify = useNotify();
  const redirect = useRedirect();
  const imageRef = useRef<{
    getImages: () => File[];
    getExistingImages: () => string[];
    getImagesToDelete: () => string[];
  }>(null);

  const handleSubmit = async (values: any) => {
    // Get new images from ref
    const newImages = imageRef.current?.getImages() || [];
    
    // Create FormData object for multipart form submission
    const formData = new FormData();
    
    // Append all form values
    Object.keys(values).forEach(key => {
      if (key !== 'carImages' && values[key] !== undefined) {
        formData.append(key, values[key]);
      }
    });
    
    // Append new images if any
    if (newImages.length > 0) {
      newImages.forEach((file) => {
        formData.append('carImages', file);
      });
    }
    
    try {
      await create(
        'car-models',
        { data: formData },
        {
          onSuccess: () => {
            notify('Car model created successfully', { type: 'success' });
            redirect('list', 'car-models');
          },
          onError: (error: any) => {
            notify(`Error: ${error.message}`, { type: 'error' });
          }
        }
      );
    } catch (error: unknown) {
      console.error('Error creating car model', error);
      
      if (error instanceof Error) {
        notify(`Error creating car model: ${error.message}`, { type: 'error' });
      } else {
        notify('Error creating car model', { type: 'error' });
      }
    }
  };
  
  const toolbar = <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <button type="submit" style={{ padding: '10px 20px' }}>Save</button>
  </div>;
  
  return (
    <Create>
      <SimpleForm onSubmit={handleSubmit} toolbar={toolbar}>
        <TextInput source="name" validate={required()} fullWidth />
        
        <ReferenceInput label="Brand" source="brand" reference="car-brands">
          <SelectInput optionText="name" />
        </ReferenceInput>
        
        <SelectInput
          source="status"
          choices={[
            { id: "active", name: "Active" },
            { id: "inactive", name: "Inactive" },
          ]}
          defaultValue="active"
          fullWidth
        />
        
        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
          Car Images
        </Typography>
        
        <CarModelImageSelector
          ref={imageRef}
          label="Car Images"
          multiple={true}
        />
      </SimpleForm>
    </Create>
  );
};

// Edit component
export const CarModelEdit = () => {
  const [update] = useUpdate();
  const notify = useNotify();
  const redirect = useRedirect();
  const imageRef = useRef<{
    getImages: () => File[];
    getExistingImages: () => string[];
    getImagesToDelete: () => string[];
  }>(null);

  // Create a custom toolbar with always-enabled save button
  const CustomToolbar = () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
      <button 
        type="submit" 
        style={{ 
          padding: '10px 20px',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Save
      </button>
    </div>
  );

  const handleSubmit = async (values: any) => {
    // Log the values to help debug
    console.log("Form values before submit:", values);
    
    // Ensure we have an ID - check various possible locations
    const recordId = values.id || values._id;
    
    if (!recordId) {
      notify('Cannot update: Missing ID', { type: 'error' });
      console.error("Missing ID in form values:", values);
      return;
    }
    
    console.log("Using record ID for update:", recordId);
    
    const newImages = imageRef.current?.getImages() || [];
    const remainingExistingImages = imageRef.current?.getExistingImages() || [];
    const imagesToDelete = imageRef.current?.getImagesToDelete() || [];

    const formData = new FormData();

    // Explicitly add the ID to form data
    formData.append('id', recordId);

    // Handle brand properly - ensure it's an ID string, not an object
    if (values.brand) {
      const brandId = typeof values.brand === 'object' ? 
        (values.brand.id || values.brand._id) : values.brand;
      formData.append('brand', brandId);
    }

    // Append other fields (excluding carImages, brand which we handled above)
    Object.keys(values).forEach((key) => {
      if (key !== 'carImages' && key !== 'brand' && key !== 'id' && values[key] !== undefined) {
        formData.append(key, values[key]);
      }
    });

    // Convert arrays to JSON strings for the backend to parse
    formData.append('existingImages', JSON.stringify(remainingExistingImages));
    formData.append('imagesToDelete', JSON.stringify(imagesToDelete));

    // Append new image files
    newImages.forEach((file) => {
      formData.append('carImages', file);
    });

    // Log formData contents for debugging
    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      // Make sure to pass the correct ID to the update function
      await update(
        'car-models',
        { 
          id: recordId,  // Explicit ID here
          data: formData
        },
        {
          onSuccess: () => {
            notify('Car model updated successfully', { type: 'success' });
            redirect('list', 'car-models');
          },
          onError: (error: any) => {
            console.error("Update error:", error);
            notify(`Error: ${error.message}`, { type: 'error' });
          }
        }
      );
    } catch (error: unknown) {
      console.error('Error updating car model', error);
      if (error instanceof Error) {
        notify(`Update failed: ${error.message}`, { type: 'error' });
      } else {
        notify('Update failed', { type: 'error' });
      }
    }
  };

  return (
    <Edit>
      <SimpleForm onSubmit={handleSubmit} toolbar={<CustomToolbar />}>
        {/* Make sure ID is included in the form */}
        <TextInput source="id" disabled />
        <TextInput source="name" validate={required()} fullWidth />

        <ReferenceInput label="Brand" source="brand" reference="car-brands">
          <SelectInput optionText="name" />
        </ReferenceInput>

        <SelectInput
          source="status"
          choices={[
            { id: "active", name: "Active" },
            { id: "inactive", name: "Inactive" },
          ]}
          fullWidth
        />

        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
          Car Images
        </Typography>

        <FormDataConsumer>
          {({ formData }) => {
            // Add debug info to help with troubleshooting
            console.log("FormData in Consumer:", formData);
            
            // Ensure we have access to the full formData with carImages
            return (
              <CarModelImageSelector
                ref={imageRef}
                label="Car Images"
                multiple={true}
                existingImages={formData?.carImages || []}
              />
            );
          }}
        </FormDataConsumer>
      </SimpleForm>
    </Edit>
  );
};