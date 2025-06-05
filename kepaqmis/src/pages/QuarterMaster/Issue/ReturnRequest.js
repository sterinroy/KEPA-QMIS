import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchTempIssued } from '../../../redux/actions/tempActions';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Skeleton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button
} from '@mui/material';
import Sidebar from './Sidebar';
import Topbar from './Topbar';




const SIDEBAR_WIDTH = 240;
const ReturnRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { issuedList, loading, error } = useSelector((state) => state.temp);

  
  const [techReportSelections, setTechReportSelections] = useState({});
  const [categorySelections, setCategorySelections] = useState({});

  useEffect(() => {
    dispatch(fetchTempIssued());
  }, [dispatch]);

  const handleTechReportChange = (index, value) => {
    setTechReportSelections((prev) => ({ ...prev, [index]: value }));

    if (value === "Yes") {
      navigate("/returnform", { state: { techReportRequired: "Yes" } });
    }
    
  };

  const handleCategoryChange = (index, value) => {
    setCategorySelections((prev) => ({ ...prev, [index]: value }));
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar activeItem="return" />
      <div style={{ flexGrow: 1, marginLeft: SIDEBAR_WIDTH }}>
        <Topbar />
        <main style={{ padding: '80px 20px 50px', backgroundColor: '#f5f5f5', minHeight: '150vh', marginTop: '40px' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Return Request List
          </Typography>

          <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 520 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Details</TableCell>
                    <TableCell>Description & Purpose</TableCell>
                    <TableCell>Tech Report Required?</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell colSpan={3}>
                          <Skeleton variant="rectangular" height={100} />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center" sx={{ color: 'error.main' }}>
                        {error}
                      </TableCell>
                    </TableRow>
                  ) : issuedList.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        No return requests found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    issuedList.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ verticalAlign: 'top', pr: 4 }}>
                          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1}>
                            <Typography><b>Sl No:</b> {entry.slNo}</Typography>
                            <Typography><b>PEN No:</b> {entry.PENNo}</Typography>
                            <Typography><b>To Whom:</b> {entry.toWhom}</Typography>
                            <Typography><b>Name:</b> {entry.name}</Typography>
                            <Typography><b>Mobile:</b> {entry.mobile}</Typography>
                            <Typography><b>Date of Issue:</b> {new Date(entry.dateOfissue).toLocaleDateString()}</Typography>
                            <Typography><b>Quantity:</b> {entry.qty}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'top', pl: 4 }}>
                          <Box display="flex" gap={2}>
                            <Box flex={2}>
                              <Typography><b>Item Description:</b></Typography>
                              <Typography>{entry.itemDescription}</Typography>
                            </Box>
                            <Box flex={1}>
                              <Typography><b>Purpose:</b></Typography>
                              <Typography>{entry.purpose}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <FormControl fullWidth size="small" sx={{ mb: 1 }}>
                            <InputLabel id={`tech-report-label-${index}`}>Required?</InputLabel>
                            <Select
                              labelId={`tech-report-label-${index}`}
                              value={techReportSelections[index] || ""}
                              label="Required?"
                              onChange={(e) => handleTechReportChange(index, e.target.value)}
                            >
                              <MenuItem value="Yes">Yes</MenuItem>
                              <MenuItem value="No">No</MenuItem>
                            </Select>
                          </FormControl>

                          {/* Show category dropdown only if "No" is selected */}
                          {techReportSelections[index] === "No" && (
                            <FormControl fullWidth size="small">
                              <InputLabel id={`category-label-${index}`}>Category</InputLabel>
                              <Select
                                labelId={`category-label-${index}`}
                                value={categorySelections[index] || ""}
                                label="Category"
                                onChange={(e) => handleCategoryChange(index, e.target.value)}
                              >
                                <MenuItem value="Useable">Useable</MenuItem>
                                <MenuItem value="Repairable">Repairable</MenuItem>
                                <MenuItem value="Damaged">Damaged</MenuItem>
                              </Select>
                            </FormControl>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </main>
      </div>
    </div>
  );
};

export default ReturnRequest;
