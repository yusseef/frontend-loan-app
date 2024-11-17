import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Card, Typography } from '@mui/material';
import { getLoanApplications } from '../../services/api';

const LoanProviderDashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const response = await getLoanApplications();
      setApplications(response.data);
    };

    fetchApplications();
  }, []);

  return (
    <Card sx={{ padding: 3, margin: 3 }}>
      <Typography variant="h4" gutterBottom>
        Loan Applications
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Applicant</TableCell>
            <TableCell>Amount Requested</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell>{app.applicant}</TableCell>
              <TableCell>{app.amount_requested}</TableCell>
              <TableCell>{app.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default LoanProviderDashboard;
