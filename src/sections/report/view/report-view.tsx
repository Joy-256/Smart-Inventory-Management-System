import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Sample Report Data (Replace with API Data)
const salesData = [
  { month: "Jan", sales: 4000, traffic: 2400 },
  { month: "Feb", sales: 3000, traffic: 2210 },
  { month: "Mar", sales: 5000, traffic: 2290 },
  { month: "Apr", sales: 4780, traffic: 2000 },
  { month: "May", sales: 5890, traffic: 2181 },
  { month: "Jun", sales: 4390, traffic: 2500 },
];

// Pie Chart Colors
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function ReportView() {
  const [reportType, setReportType] = useState<"sales" | "traffic">("sales");
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs().subtract(1, "month"));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [filteredData, setFilteredData] = useState(salesData);

  // Simulate API Fetch (Replace with Backend Call)
  useEffect(() => {
    // Example: Fetch from API using selected dates
    console.log("Fetching data for:", startDate?.format("YYYY-MM-DD"), endDate?.format("YYYY-MM-DD"));
    setFilteredData(salesData); // Replace with API data
  }, [startDate, endDate]);

  // Export PDF Function
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.text("Sales & Traffic Report", 10, 10);
  
    autoTable(doc, {  // ✅ Use autoTable function and pass doc
      head: [["Month", "Sales ($)", "Traffic (Visitors)"]],
      body: [
        ["January", "2000", "5000"],
        ["February", "3000", "6000"],
        ["March", "4000", "7000"],
      ],
    });
  
    doc.save("report.pdf");
  };

  return (
    <Grid container spacing={3}>
      {/* Header */}
      <Grid item xs={12}>
        <Typography variant="h4">Reports Dashboard</Typography>
      </Grid>

      {/* Date Filters */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Filter by Date</Typography>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue: Dayjs | null) => setStartDate(newValue)}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue: Dayjs | null) => setEndDate(newValue)}
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Chart Section */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6">Sales & Traffic Overview</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="traffic" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* More Charts */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Bar Chart</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
                <Bar dataKey="traffic" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Pie Chart</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={filteredData} dataKey="sales" nameKey="month" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                  {filteredData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Report Controls */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Select Report Type</Typography>
            <Button variant="contained" color="primary" fullWidth onClick={() => setReportType("sales")}>
              Sales Report
            </Button>
            <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2 }} onClick={() => setReportType("traffic")}>
              Traffic Report
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Export Options */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Export Reports</Typography>
            <Button variant="contained" color="success" fullWidth>
              <CSVLink data={filteredData} filename="report.csv" style={{ textDecoration: "none", color: "white" }}>
                Export as CSV
              </CSVLink>
            </Button>
            <Button variant="contained" color="error" fullWidth sx={{ mt: 2 }} onClick={exportToPDF}>
              Export as PDF
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Report Table */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">{reportType === "sales" ? "Sales Report" : "Traffic Report"}</Typography>
            <table width="100%" border={1} cellPadding={8}>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>{reportType === "sales" ? "Sales ($)" : "Traffic (Visitors)"}</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
                  <tr key={row.month}>
                    <td>{row.month}</td>
                    <td>{reportType === "sales" ? row.sales : row.traffic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};


export default ReportView;
