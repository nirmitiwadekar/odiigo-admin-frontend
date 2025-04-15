import React, { useRef, useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';

interface CarModelImageSelectorProps {
  label: string;
  multiple: boolean;
  existingImages?: string[];
}

const CarModelImageSelector = forwardRef<
  { getImages: () => File[]; getExistingImages: () => string[]; getImagesToDelete: () => string[] },
  CarModelImageSelectorProps
>((props, ref) => {
  const { label, multiple, existingImages = [] } = props;
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [existingImagesList, setExistingImagesList] = useState<string[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Initialize existing images
  useEffect(() => {
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
    
    setLoading(true);
    
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
    
    setLoading(false);
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
      
      {loading && <CircularProgress size={24} />}
      
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

export default CarModelImageSelector;