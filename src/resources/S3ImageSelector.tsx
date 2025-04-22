// resources/S3ImageSelector.tsx 
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useInput, useNotify } from 'react-admin';
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import axios from 'axios';
import {API_URL} from '../config'
interface S3Image {
  key: string;
  url: string;
  lastModified?: string;
}

interface S3ImageSelectorProps {
  source: string;
  label: string;
}

const S3ImageSelector = forwardRef<{ getSelectedIconKey: () => string | null }, S3ImageSelectorProps>(
  ({ source, label }, ref) => {
    const {
      field: { value, onChange },
    } = useInput({ source });

    const [images, setImages] = useState<S3Image[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const notify = useNotify();

    // Expose the getSelectedIconKey method to parent components via ref
    useImperativeHandle(ref, () => ({
      getSelectedIconKey: () => selectedKey
    }));

    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_URL}/api/car-brands/icons`);
        console.log('S3 icons response:', response.data);
        
        if (Array.isArray(response.data)) {
          setImages(response.data);
        } else if (response.data.data && Array.isArray(response.data.data)) {
          setImages(response.data.data);
        } else {
          console.error('Unexpected response format:', response.data);
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        console.error('Error fetching S3 images:', err);
        setError('Failed to fetch images from S3. Please try again later.');
        notify('Error loading brand icons', { type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if (open) {
        fetchImages();
      }
    }, [open]);

    // Find the key for a URL when the component mounts or value changes
    useEffect(() => {
      if (value && images.length > 0) {
        const image = images.find(img => img.url === value);
        if (image) {
          setSelectedKey(image.key);
        }
      }
    }, [value, images]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSelect = (image: S3Image) => {
      // Store both the URL for display and the key for backend
      onChange(image.url);
      setSelectedKey(image.key);
      handleClose();
    };

    return (
      <Box marginBottom={2}>
        <Typography variant="subtitle1" gutterBottom>{label}</Typography>
        
        <Box display="flex" alignItems="center" gap={2}>
          {value && (
            <Box 
              component="img" 
              src={value} 
              alt="Selected brand icon"
              sx={{ 
                width: 100, 
                height: 100, 
                objectFit: 'contain',
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                padding: 1
              }}
            />
          )}
          <Button variant="contained" color="primary" onClick={handleOpen}>
            {value ? 'Change Icon' : 'Select Icon'}
          </Button>
          {value && (
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={() => {
                onChange(undefined);
                setSelectedKey(null);
              }}
            >
              Clear
            </Button>
          )}
        </Box>

        {/* Hidden input to store the key for form submission */}
        <input 
          type="hidden" 
          name={`${source}_key`} 
          value={selectedKey || ''} 
        />

        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>Select Brand Icon</DialogTitle>
          <DialogContent>
            {loading ? (
              <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Box>
                <Typography color="error">{error}</Typography>
                <Button onClick={fetchImages} sx={{ mt: 2 }}>Retry</Button>
              </Box>
            ) : images.length === 0 ? (
              <Typography>No icons found. Upload some icons to the S3 bucket first.</Typography>
            ) : (
              <ImageList cols={4} rowHeight={100} gap={8}>
                {images.map((img) => (
                  <ImageListItem 
                    key={img.key} 
                    onClick={() => handleSelect(img)}
                  >
                    <img
                      src={img.url}
                      alt=""
                      style={{
                        border: value === img.url ? '3px solid #1976d2' : '1px solid #e0e0e0',
                        borderRadius: 4,
                        cursor: 'pointer',
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        padding: 4,
                        backgroundColor: value === img.url ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
);

export default S3ImageSelector;