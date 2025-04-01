import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import './Dashboard.css';

const Dashboard = ({ darkMode }) => {
  const [data, setData] = useState([]);
  const [severityCounts, setSeverityCounts] = useState([]);
  const [ipCounts, setIpCounts] = useState([]);
  const [timeSeries, setTimeSeries] = useState([]);
  const [portCounts, setPortCounts] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState([]);
  const [ipTimeSeries, setIpTimeSeries] = useState([]);

  useEffect(() => {
    fetch('/eve.json')
      .then((res) => res.json())
      .then((jsonData) => {
        console.log("Fetched Data:", jsonData);
        const transformedData = jsonData.map((item) => ({
          timestamp: item.timestamp,
          src_ip: item.src_ip,
          dest_port: item.dest_port,
          severity: item.alert?.severity || 0,
          category: item.alert?.category || 'Unknown',
        }));
        setData(transformedData);

        const severityMap = {};
        const ipMap = {};
        const timeMap = {};
        const portMap = {};
        const categoryMap = {};
        const ipTimeMap = {};

        transformedData.forEach(({ severity, src_ip, timestamp, dest_port, category }) => {
          severityMap[severity] = (severityMap[severity] || 0) + 1;
          ipMap[src_ip] = (ipMap[src_ip] || 0) + 1;
          portMap[dest_port] = (portMap[dest_port] || 0) + 1;
          categoryMap[category] = (categoryMap[category] || 0) + 1;
          
          const date = timestamp.split('T')[0];
          ipTimeMap[`${src_ip}-${date}`] = (ipTimeMap[`${src_ip}-${date}`] || 0) + 1;
          timeMap[date] = (timeMap[date] || 0) + 1;
        });

        setSeverityCounts(Object.entries(severityMap).map(([key, value]) => ({ severity: key, count: value })));
        setIpCounts(Object.entries(ipMap).map(([key, value]) => ({ ip: key, count: value })).slice(0, 5));
        setTimeSeries(Object.entries(timeMap).map(([key, value]) => ({ date: key, count: value })));
        setPortCounts(Object.entries(portMap).map(([key, value]) => ({ port: key, count: value })).slice(0, 5));
        setCategoryCounts(Object.entries(categoryMap).map(([key, value]) => ({ category: key, count: value })));
        setIpTimeSeries(Object.entries(ipTimeMap).map(([key, value]) => ({ key, count: value })));
        console.log("Severity Counts:", severityCounts);
      console.log("IP Counts:", ipCounts);
      console.log("Time Series:", timeSeries);
      console.log("Port Counts:", portCounts);
      console.log("Category Counts:", categoryCounts);
      })
      .catch((err) => console.error('Error loading data:', err));
  }, []);

  return (
    <div className="dashboard">
      <div className="grid-container">
        {/* Alerts by Severity */}
        <div className="chart-card">
          <h2>Alerts by Severity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={severityCounts}>
            {console.log("Severity Counts passed to graph:", severityCounts)} 
              <XAxis dataKey="severity" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Source IPs */}
        <div className="chart-card">
          <h2>Top Source IPs</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
            {console.log("IP Counts passed to graph:", ipCounts)}
              <Pie data={ipCounts} dataKey="count" nameKey="ip" cx="50%" cy="50%" outerRadius={80}>
                {ipCounts.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={["#8884d8", "#82ca9d", "#ffc658"][index % 3]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts Over Time */}
        <div className="chart-card">
          <h2>Alerts Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeries}>
            {console.log("Time Series passed to graph:", timeSeries)}
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Destination Ports */}
        <div className="chart-card">
          <h2>Top Destination Ports</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={portCounts}>
            {console.log("Port Counts passed to graph:", portCounts)}
              <XAxis dataKey="port" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#ff7300" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts by Category */}
        <div className="chart-card">
          <h2>Alerts by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryCounts}>
            {console.log("Category Counts passed to graph:", categoryCounts)} 
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#d500f9" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts by Source IP Over Time */}
        <div className="chart-card">
          <h2>Alerts by Source IP Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ipTimeSeries}>
            {console.log("IP Time Series passed to graph:", ipTimeSeries)} 
              <XAxis dataKey="key" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
