// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Grid, Card, CardContent, Typography, Button } from "@mui/material";

// const QMIssueOverview = () => {
//   const navigate = useNavigate();

//   const options = [
//     {
//       title: "Direct Issue Form",
//       description: "Submit a direct issue entry",
//       path: "/QuarterMasterIssue/DirectIssueForm",
//     },
//     {
//       title: "Requested Issue Form",
//       description: "Handle requested issue form",
//       path: "/QuarterMasterIssue/RequestedIssueForm",
//     },
//     {
//       title: "Verification Status",
//       description: "Check the verification status",
//       path: "/QuarterMasterIssue/VerificationStatus",
//     },
//     {
//       title: "Stock Details",
//       description: "View available stock information",
//       path: "/QuarterMasterIssue/StockDetails",
//     },
//     {
//       title: "Temporary Issue Form",
//       description: "Log a temporary issue",
//       path: "/QuarterMasterIssue/TemporaryIssueForm",
//     },
//     {
//       title: "Temporary Issue History",
//       description: "View history of temporary issues",
//       path: "/QuarterMasterIssue/TemporaryIssueHistory",
//     },
//     {
//       title: "Return Request",
//       description: "Submit a return request",
//       path: "/QuarterMasterIssue/ReturnRequest",
//     },
//   ];

//   return (
//     <div style={{ padding: "2rem" }}>
//       <Typography variant="h4" gutterBottom>
//         Quarter Master Issue Overview
//       </Typography>

//       <Grid container spacing={3}>
//         {options.map((option, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Card elevation={3} sx={{ height: "100%" }}>
//               <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//                 <Typography variant="h6">{option.title}</Typography>
//                 <Typography variant="body2">{option.description}</Typography>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => navigate(option.path)}
//                 >
//                   Go
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default QMIssueOverview;
import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Button, Box } from "@mui/material";

const QMIssueOverview = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: "Direct Issue Form",
      description: "Submit a direct issue entry",
      path: "/QuarterMasterIssue/DirectIssueForm",
    },
    {
      title: "Requested Issue Form",
      description: "Handle requested issue form",
      path: "/QuarterMasterIssue/RequestedIssueForm",
    },
    {
      title: "Verification Status",
      description: "Check the verification status",
      path: "/QuarterMasterIssue/VerificationStatus",
    },
    {
      title: "Stock Details",
      description: "View available stock information",
      path: "/QuarterMasterIssue/StockDetails",
    },
    {
      title: "Temporary Issue Form",
      description: "Log a temporary issue",
      path: "/QuarterMasterIssue/TemporaryIssueForm",
    },
    {
      title: "Temporary Issue History",
      description: "View history of temporary issues",
      path: "/QuarterMasterIssue/TemporaryIssueHistory",
    },
    {
      title: "Return Request",
      description: "Submit a return request",
      path: "/QuarterMasterIssue/ReturnRequest",
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Quarter Master Issue Overview
      </Typography>

      <Grid container spacing={3}>
        {options.map((option, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: 200, // fixed equal height
                width:300,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              elevation={3}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {option.title}
                </Typography>
                <Typography variant="body2">{option.description}</Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate(option.path)}
                >
                  Go
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QMIssueOverview;
