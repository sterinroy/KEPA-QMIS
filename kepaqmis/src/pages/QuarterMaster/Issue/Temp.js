return (
    <div style={{ display: 'flex' }}>
      <Sidebar activeItem="tempissue" />
      <div style={{ marginLeft: SIDEBAR_WIDTH, flex: 1 }}>
        <Topbar />
        <div
          className="temp-issue-root"
          style={{
            backgroundColor: '#f9f9f9',
            minHeight: '100vh',
            padding: '2rem',
          }}
        >
          <Box className="temp-issue-box">
            <Typography
              variant="h5"
              mb={3}
              fontWeight="bold"
              textAlign="center"
            >
              Temporary Issue Form
            </Typography>
            <form onSubmit={handleSubmit} className="mui-form">
              <TextField
                label="Sl No"
                name="slNo"
                value={formData.slNo}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
              />
              <TextField
                label="PEN No"
                name="PENNo"
                value={formData.PENNo}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
              />
              <TextField
                label="Date of Issue"
                type="date"
                name="dateOfissue"
                value={formData.dateOfissue}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="To Whom"
                name="toWhom"
                value={formData.toWhom}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Mobile"
                name="mobile"
                type="number"
                value={formData.mobile}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Amount"
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Amount"
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Quantity"
                type="number"
                name="qty"
                inputProps={{ min: 1 }}
                value={formData.qty}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Item Description"
                name="itemDescription"
                value={formData.itemDescription}
                onChange={handleInputChange}
                fullWidth
                required
                multiline
                rows={3}
              />
              <TextField
                label="Purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                fullWidth
                required
                multiline
                rows={3}
              />
              <Box display="flex" justifyContent="flex-end" mt={2} mr={-79}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    borderRadius: 2,
                    px: 5,
                    py: 0,
                    fontWeight: 'bold',
                  }}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
};