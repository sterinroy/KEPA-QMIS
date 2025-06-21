import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Alert,
  Popover,
  TextField,
} from "@mui/material";
import { useQMPOrderController } from "./QMPOrderController";
import QMPFormEntry from "./QMPFormEntry";
import "../QMP.css";

const QMPOrder = () => {
  const controller = useQMPOrderController();

  return (
    <div className="form">
      <Box
        className="direct-issue-box"
        sx={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography
          variant="h5"
          mb={2}
          fontWeight="bold"
          textAlign="center"
          color="white"
        >
          QM-Purchase Order Form
        </Typography>

        <form className="mui-form">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                className="order-no-field"
                label="Order/Req Number"
                name="orderNo"
                type="text"
                value={controller.formData.orderNo}
                onChange={(e) =>
                  controller.setFormData({
                    ...controller.formData,
                    orderNo: e.target.value,
                  })
                }
                required
                fullWidth
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "#ccc" },
                  mb: 2,
                }}
              />
            </Grid>

            {controller.formData.entries.map((entry, index) => (
              <QMPFormEntry
                key={index}
                entry={entry}
                index={index}
                categories={controller.categories}
                handleChange={controller.handleChange}
                handleRemoveEntry={controller.handleRemoveEntry}
                setAnchorEl={controller.setAnchorEl}
                setAnchorElSub={controller.setAnchorElSub}
              />
            ))}

            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={controller.handleAddEntry}
                sx={{
                  borderRadius: "20px",
                  px: 4,
                  py: 1,
                  fontWeight: "bold",
                  backgroundColor: "#007bff",
                  "&:hover": { backgroundColor: "#0056b3" },
                }}
              >
                Add Entry
              </Button>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={controller.handleSubmit}
                sx={{
                  borderRadius: "20px",
                  px: 4,
                  py: 1,
                  fontWeight: "bold",
                  backgroundColor: "#007bff",
                  "&:hover": { backgroundColor: "#0056b3" },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>

          {controller.loading && <Alert severity="info">Submitting...</Alert>}
          {controller.successMessage && (
            <Alert severity="success">{controller.successMessage}</Alert>
          )}
          {controller.errorMessage && (
            <Alert severity="error">{controller.errorMessage}</Alert>
          )}
        </form>

        {/* Category Popover */}
        <Popover
          open={Boolean(controller.anchorEl)}
          anchorEl={controller.anchorEl}
          onClose={() => controller.setAnchorEl(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1">Add New Category</Typography>
            <TextField
              size="small"
              value={controller.newCategory}
              onChange={(e) => controller.setNewCategory(e.target.value)}
              placeholder="Category Name"
              fullWidth
              sx={{ mb: 1 }}
            />
            <Button variant="contained" onClick={controller.handleAddCategory}>
              Add
            </Button>
          </Box>
        </Popover>

        {/* Subcategory Popover */}
        <Popover
          open={Boolean(controller.anchorElSub)}
          anchorEl={controller.anchorElSub}
          onClose={() => controller.setAnchorElSub(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1">Add New Subcategory</Typography>
            <TextField
              size="small"
              value={controller.newSubcategory}
              onChange={(e) => controller.setNewSubcategory(e.target.value)}
              placeholder="Subcategory Name"
              fullWidth
              sx={{ mb: 1 }}
            />
            <Button
              variant="contained"
              onClick={controller.handleAddSubcategory}
            >
              Add
            </Button>
          </Box>
        </Popover>
      </Box>
    </div>
  );
};

export default QMPOrder;
