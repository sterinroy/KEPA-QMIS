import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTempIssued } from '../../../redux/actions/tempActions';
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  MenuItem,
  Select,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const categories = ['Useable', 'Repairable', 'Damaged']; 
const techReportOptions = ['Yes', 'No'];

const ReturnRequest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { issuedList, loading, error } = useSelector((state) => state.temp);

  // State for editable fields keyed by row id
  const [techReportSelections, setTechReportSelections] = useState({});
  const [categorySelections, setCategorySelections] = useState({});

  useEffect(() => {
    dispatch(fetchTempIssued());
  }, [dispatch]);

  // Handle tech report dropdown change
  const handleTechReportChange = (id, value) => {
    setTechReportSelections((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear category if tech report changed to Yes
    if (value === 'Yes') {
      
  navigate('/returnform', { state: { entry: techReportSelections, techReportRequired: value } });


    }
  };

  // Handle category dropdown change
  const handleCategoryChange = (id, value) => {
    setCategorySelections((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // On row click, navigate only if techReportRequired is Yes
  const handleRowClick = (params) => {
    const techReport = techReportSelections[params.id] ?? params.row.techReportRequired;
    if (techReport === 'Yes') {
      navigate('/returnform', { state: { recordId: params.id } });
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'slNo', headerName: 'Sl No', width: 90 },
    { field: 'PENNo', headerName: 'PEN No', width: 110 },
    { field: 'toWhom', headerName: 'To Whom', width: 150 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'mobile', headerName: 'Mobile', width: 130 },
    {
      field: 'dateOfissue',
      headerName: 'Date of Issue',
      width: 130,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toString() === 'Invalid Date'
          ? 'N/A'
          : date.toLocaleString();
      },
    },
    { field: 'itemDescription', headerName: 'Item Description', width: 200 },
    { field: 'purpose', headerName: 'Purpose', width: 150 },
    { field: 'qty', headerName: 'Quantity', width: 100 },

    // Tech Report Required column as editable dropdown
    {
      field: 'techReportRequired',
      headerName: 'Tech Report Required',
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const currentValue = techReportSelections[params.id] ?? params.value ?? '';
        return (
          <Select
            value={currentValue}
            onChange={(e) => handleTechReportChange(params.id, e.target.value)}
            displayEmpty
            size="small"
            sx={{ width: '100%' }}
          >
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            {techReportOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },

    // Select Category column - show only if techReportRequired is 'No'
    {
      field: 'selectCategory',
      headerName: 'Select Category',
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const techReport = techReportSelections[params.id] ?? params.row.techReportRequired;

        if (techReport === 'No') {
          return (
            <Select
              value={categorySelections[params.id] || ''}
              onChange={(e) => handleCategoryChange(params.id, e.target.value)}
              displayEmpty
              size="small"
              sx={{ width: '100%' }}
            >
              <MenuItem value="">
                <em>Select category</em>
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          );
        }
        return <Typography>N/A</Typography>;
      },
    },
  ];

  // Map rows, no forced default for techReportRequired here
  const rows = Array.isArray(issuedList)
    ? issuedList.map((entry, index) => ({
        id: index + 1,
        ...entry,
        // techReportRequired: entry.techReportRequired, // no default forced here
      }))
    : [];

  return (
    <>
      <Sidebar activeItem="transfer" />
      <Topbar />
      <Box
        component="main"
        sx={{
          marginLeft: '240px',
          marginTop: '64px',
          padding: 4,
          minHeight: 'calc(100vh - 64px)',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Review All Submitted Details
        </Typography>

        <Paper elevation={3} sx={{ height: 500, width: '100%', borderRadius: 3 }}>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box p={3} color="error.main">
              {error}
            </Box>
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 20, 50]}
              disableRowSelectionOnClick
              sx={{ borderRadius: 3 }}
              onRowClick={handleRowClick}
            />
          )}
        </Paper>

        <Box
          sx={{
            mt: 3,
            display: 'flex',
            justifyContent: 'flex-start',
            maxWidth: 400,
            mx: 'auto',
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/tempstockdetailentry')}
          >
            ← Back
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ReturnRequest;
