import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  Typography,
  Button,
} from '@mui/material';
import { getCustomerLoans, makePayment } from '../../services/api';

const LoanCustomerDashboard = ({ token }) => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      const response = await getCustomerLoans(token);
      setLoans(response.data);
    };

    fetchLoans();
  }, [token]);

  const handlePayment = async (loanId, amount) => {
    try {
      await makePayment(token, loanId, amount);
      alert('Payment successful!');
      // Refresh loans after payment
      const response = await getCustomerLoans(token);
      setLoans(response.data);
    } catch (error) {
      alert('Payment failed!');
    }
  };

  return (
    <Card sx={{ padding: 3, margin: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Loans
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Loan ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Remaining Balance</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan.id}>
              <TableCell>{loan.id}</TableCell>
              <TableCell>${loan.amount}</TableCell>
              <TableCell>${loan.remaining_balance}</TableCell>
              <TableCell>{loan.status}</TableCell>
              <TableCell>
                {loan.status === 'approved' && loan.remaining_balance > 0 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handlePayment(loan.id, 100)} // Fixed payment amount
                  >
                    Pay $100
                  </Button>
                ) : (
                  'No Action Required'
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default LoanCustomerDashboard;
