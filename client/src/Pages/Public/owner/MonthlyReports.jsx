// client/src/Pages/Public/owner/MonthlyReports.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import OwnerSidebar from "../../../components/OwnerSidebar";
import DashboardNav from "../../../components/DashboardNav";
import {
  FaArrowLeft,
  FaEnvelope,
  FaSpinner,
  FaChartLine,
  FaCalendarAlt,
  FaSyncAlt,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

const MonthlyReports = () => {
  const navigate = useNavigate();
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [reportData, setReportData] = useState(null);
  const [comparisonData, setComparisonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sendingPDF, setSendingPDF] = useState(false);
  const [pdfSent, setPdfSent] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Fetch on mount and when month/year changes
  useEffect(() => {
    fetchMonthlyReport();
    fetchComparison();
  }, [selectedMonth, selectedYear]);

  // Auto-refresh when user returns to tab
  useEffect(() => {
    const handleFocus = () => {
      console.log("🔄 Page focused - refreshing data...");
      fetchMonthlyReport();
      fetchComparison();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        handleFocus();
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [selectedMonth, selectedYear]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("⏰ Auto-refresh (30s)");
      fetchMonthlyReport();
      fetchComparison();
    }, 30000);

    return () => clearInterval(interval);
  }, [selectedMonth, selectedYear]);

  const fetchMonthlyReport = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/finance/monthly/${selectedYear}/${selectedMonth}`
      );
      setReportData(res.data.data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to fetch monthly report:", err);
      setReportData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchComparison = async () => {
    try {
      const res = await api.get("/finance/monthly/compare?months=6");
      setComparisonData(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch comparison:", err);
    }
  };

  const handleManualRefresh = () => {
    fetchMonthlyReport();
    fetchComparison();
  };

  const handleSendPDF = async () => {
    setSendingPDF(true);
    try {
      await api.post("/finance/monthly/send-pdf", {
        year: selectedYear,
        month: selectedMonth,
      });
      setPdfSent(true);
      setTimeout(() => setPdfSent(false), 5000);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send PDF");
    } finally {
      setSendingPDF(false);
    }
  };

  const summary = reportData?.summary;
  const recommendations = reportData?.recommendations || [];
  const entries = reportData?.entries || [];

  const expenseChartData = summary
    ? Object.entries(summary.expenseBreakdown).map(([key, value]) => {
        const labels = {
          fuel: "Fuel",
          driver_salary: "Salary",
          ice: "Ice",
          repair_maintenance: "Repairs",
          equipment: "Equipment",
          other: "Other",
        };
        return { name: labels[key] || key, value };
      })
    : [];

  const fishChartData = summary
    ? Object.entries(summary.fishBreakdown)
        .map(([name, data]) => ({
          name,
          income: data.income,
          quantity: data.quantity,
        }))
        .sort((a, b) => b.income - a.income)
    : [];

  const dailyChartData =
    entries.map((entry) => ({
      date: new Date(entry.date).getDate(),
      income: entry.totalIncome || 0,
      expenses: entry.totalExpenses || 0,
      profit: entry.netProfit || 0,
    })) || [];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <OwnerSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardNav />

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <button
                  onClick={() => navigate("/owner/finance")}
                  className="p-2 bg-white rounded-lg shadow hover:bg-gray-100"
                >
                  <FaArrowLeft />
                </button>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    📊 Monthly Reports
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Analyze your monthly performance
                  </p>
                </div>
              </div>

              {/* Month/Year Selector + Refresh */}
              <div className="flex items-center gap-3 flex-wrap">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(2000, i).toLocaleString("default", {
                        month: "long",
                      })}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <option key={i} value={now.getFullYear() - i}>
                      {now.getFullYear() - i}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleManualRefresh}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                             disabled:opacity-50 flex items-center gap-2 transition-all"
                  title="Refresh data"
                >
                  <FaSyncAlt className={loading ? "animate-spin" : ""} />
                  {loading ? "Refreshing..." : "Refresh"}
                </button>
              </div>
            </div>

            {/* Last Updated Info */}
            <div className="text-right text-xs text-gray-500 mb-4">
              🔄 Last updated: {lastUpdated.toLocaleTimeString()}
              <span className="ml-2 text-green-600">● Auto-refresh ON</span>
            </div>

            {loading && !reportData ? (
              <div className="flex items-center justify-center h-64">
                <FaSpinner className="animate-spin text-4xl text-blue-500" />
              </div>
            ) : !summary || summary.workingDays === 0 ? (
              <div className="bg-white rounded-xl shadow p-12 text-center">
                <p className="text-6xl mb-4">📭</p>
                <h3 className="text-xl font-bold text-gray-600">
                  No data for this month
                </h3>
                <p className="text-gray-400 mt-2">
                  Start recording daily entries to see monthly reports
                </p>
                <button
                  onClick={() => navigate("/owner/finance/daily")}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  ➕ Add Daily Entry
                </button>
              </div>
            ) : (
              <>
                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto">
                  {["overview", "daily", "comparison", "analysis"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-2 rounded-lg font-medium capitalize whitespace-nowrap ${
                        activeTab === tab
                          ? "bg-blue-600 text-white shadow"
                          : "bg-white text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {tab === "daily" ? "📅 Daily Entries" : tab}
                    </button>
                  ))}
                </div>

                {/* ===== OVERVIEW TAB ===== */}
                {activeTab === "overview" && (
                  <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-white rounded-xl shadow p-5">
                        <p className="text-sm text-gray-500">Total Income</p>
                        <p className="text-2xl font-bold text-green-600">
                          Rs. {summary.totalIncome.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-white rounded-xl shadow p-5">
                        <p className="text-sm text-gray-500">Total Expenses</p>
                        <p className="text-2xl font-bold text-red-600">
                          Rs. {summary.totalExpenses.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-white rounded-xl shadow p-5">
                        <p className="text-sm text-gray-500">Net Profit</p>
                        <p
                          className={`text-2xl font-bold ${
                            summary.totalNetProfit >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          Rs. {summary.totalNetProfit.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-white rounded-xl shadow p-5">
                        <p className="text-sm text-gray-500">Working Days</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {summary.workingDays}
                        </p>
                      </div>
                    </div>

                    {/* Average Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-5 text-white">
                        <p className="text-sm opacity-80">Avg Daily Income</p>
                        <p className="text-xl font-bold">
                          Rs. {summary.avgDailyIncome.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-5 text-white">
                        <p className="text-sm opacity-80">Avg Daily Expense</p>
                        <p className="text-xl font-bold">
                          Rs. {summary.avgDailyExpense.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-5 text-white">
                        <p className="text-sm opacity-80">Profit Margin</p>
                        <p className="text-xl font-bold">{summary.profitMargin}%</p>
                      </div>
                    </div>

                    {/* Daily Trend Chart */}
                    <div className="bg-white rounded-xl shadow p-6 mb-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">
                        📈 Daily Trend
                      </h3>
                      <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={dailyChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="date"
                            label={{ value: "Day", position: "bottom" }}
                          />
                          <YAxis />
                          <Tooltip
                            formatter={(value) => `Rs. ${value.toLocaleString()}`}
                          />
                          <Legend />
                          <Bar
                            dataKey="income"
                            fill="#10b981"
                            name="Income"
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar
                            dataKey="expenses"
                            fill="#ef4444"
                            name="Expenses"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                      {fishChartData.length > 0 && (
                        <div className="bg-white rounded-xl shadow p-6">
                          <h3 className="text-lg font-bold text-gray-800 mb-4">
                            🐟 Fish Income Breakdown
                          </h3>
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={fishChartData} layout="vertical">
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis type="number" />
                              <YAxis dataKey="name" type="category" width={80} />
                              <Tooltip
                                formatter={(value) =>
                                  `Rs. ${value.toLocaleString()}`
                                }
                              />
                              <Bar
                                dataKey="income"
                                fill="#3b82f6"
                                radius={[0, 8, 8, 0]}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      )}

                      {expenseChartData.length > 0 && (
                        <div className="bg-white rounded-xl shadow p-6">
                          <h3 className="text-lg font-bold text-gray-800 mb-4">
                            🥧 Expense Distribution
                          </h3>
                          <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                              <Pie
                                data={expenseChartData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label={({ name, percent }) =>
                                  `${name} ${(percent * 100).toFixed(0)}%`
                                }
                                dataKey="value"
                              >
                                {expenseChartData.map((_, index) => (
                                  <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                  />
                                ))}
                              </Pie>
                              <Tooltip
                                formatter={(value) =>
                                  `Rs. ${value.toLocaleString()}`
                                }
                              />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </div>

                    {/* Send PDF Button */}
                    <div className="bg-white rounded-xl shadow p-6 text-center">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        📧 Get Monthly Report via Email
                      </h3>
                      <p className="text-gray-500 text-sm mb-4">
                        Receive a detailed PDF report with income, expenses, profit
                        summary and recommendations
                      </p>
                      <button
                        onClick={handleSendPDF}
                        disabled={sendingPDF}
                        className={`flex items-center gap-2 px-8 py-3 rounded-xl text-white 
                                   font-semibold mx-auto transition-all ${
                                     pdfSent
                                       ? "bg-green-500"
                                       : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
                                   }`}
                      >
                        {sendingPDF ? (
                          <>
                            <FaSpinner className="animate-spin" /> Sending...
                          </>
                        ) : pdfSent ? (
                          "✅ Report Sent to Your Email!"
                        ) : (
                          <>
                            <FaEnvelope /> Send PDF Report
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}

                {/* ===== DAILY ENTRIES TAB ===== */}
                {activeTab === "daily" && (
                  <div className="bg-white rounded-xl shadow overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-500" />
                        Daily Sales for{" "}
                        {new Date(selectedYear, selectedMonth - 1).toLocaleString(
                          "default",
                          { month: "long" }
                        )}{" "}
                        {selectedYear}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {entries.length} working days recorded this month
                      </p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                              Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                              Fish Caught
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">
                              Qty
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-green-700 uppercase">
                              Income
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-red-700 uppercase">
                              Expenses
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-blue-700 uppercase">
                              Profit
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {entries.map((entry, index) => (
                            <tr
                              key={entry._id || index}
                              className="border-t hover:bg-blue-50 transition-colors"
                            >
                              <td className="px-4 py-4">
                                <div className="font-medium text-gray-800">
                                  {new Date(entry.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                    }
                                  )}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {new Date(entry.date).toLocaleDateString(
                                    "en-US",
                                    { weekday: "short" }
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <div className="flex flex-wrap gap-1">
                                  {entry.fishEntries.map((fish, i) => (
                                    <span
                                      key={i}
                                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                                      title={`${fish.quantity} ${fish.unit} @ Rs. ${fish.pricePerUnit}`}
                                    >
                                      {fish.fishName} ({fish.quantity}
                                      {fish.unit})
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="px-4 py-4 text-right font-medium text-gray-700">
                                {entry.totalFishQuantity || 0} kg
                              </td>
                              <td className="px-4 py-4 text-right font-semibold text-green-600">
                                Rs. {(entry.totalIncome || 0).toLocaleString()}
                              </td>
                              <td className="px-4 py-4 text-right font-semibold text-red-600">
                                Rs. {(entry.totalExpenses || 0).toLocaleString()}
                              </td>
                              <td
                                className={`px-4 py-4 text-right font-bold ${
                                  (entry.netProfit || 0) >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                Rs. {(entry.netProfit || 0).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-gray-100 font-bold">
                          <tr>
                            <td colSpan="2" className="px-4 py-3 text-gray-800">
                              TOTAL ({entries.length} days)
                            </td>
                            <td className="px-4 py-3 text-right text-gray-800">
                              {summary.totalFishQuantity} kg
                            </td>
                            <td className="px-4 py-3 text-right text-green-700">
                              Rs. {summary.totalIncome.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-right text-red-700">
                              Rs. {summary.totalExpenses.toLocaleString()}
                            </td>
                            <td
                              className={`px-4 py-3 text-right ${
                                summary.totalNetProfit >= 0
                                  ? "text-green-700"
                                  : "text-red-700"
                              }`}
                            >
                              Rs. {summary.totalNetProfit.toLocaleString()}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                )}

                {/* ===== COMPARISON TAB ===== */}
                {activeTab === "comparison" && (
                  <>
                    <div className="bg-white rounded-xl shadow p-6 mb-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">
                        📊 6-Month Income vs Expenses Comparison
                      </h3>
                      <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={comparisonData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="monthName" />
                          <YAxis />
                          <Tooltip
                            formatter={(value) => `Rs. ${value.toLocaleString()}`}
                          />
                          <Legend />
                          <Bar
                            dataKey="totalIncome"
                            fill="#10b981"
                            name="Income"
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar
                            dataKey="totalExpenses"
                            fill="#ef4444"
                            name="Expenses"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6 mb-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">
                        📈 Net Profit Trend
                      </h3>
                      <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={comparisonData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="monthName" />
                          <YAxis />
                          <Tooltip
                            formatter={(value) => `Rs. ${value.toLocaleString()}`}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="netProfit"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            name="Net Profit"
                            dot={{ r: 6 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="totalIncome"
                            stroke="#10b981"
                            strokeWidth={2}
                            name="Income"
                            strokeDasharray="5 5"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-white rounded-xl shadow overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                              Month
                            </th>
                            <th className="px-6 py-3 text-right text-sm font-semibold text-green-700">
                              Income
                            </th>
                            <th className="px-6 py-3 text-right text-sm font-semibold text-red-700">
                              Expenses
                            </th>
                            <th className="px-6 py-3 text-right text-sm font-semibold text-blue-700">
                              Profit
                            </th>
                            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                              Days
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {comparisonData.map((month, index) => (
                            <tr key={index} className="border-t hover:bg-gray-50">
                              <td className="px-6 py-4 font-medium">
                                {month.monthName} {month.year}
                              </td>
                              <td className="px-6 py-4 text-right text-green-600">
                                Rs. {month.totalIncome.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 text-right text-red-600">
                                Rs. {month.totalExpenses.toLocaleString()}
                              </td>
                              <td
                                className={`px-6 py-4 text-right font-bold ${
                                  month.netProfit >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                Rs. {month.netProfit.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 text-right">
                                {month.workingDays}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}

                {/* ===== ANALYSIS TAB ===== */}
                {activeTab === "analysis" && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <FaChartLine className="text-blue-500" />
                        Recommendations & Insights
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {recommendations.map((rec, index) => (
                          <div
                            key={index}
                            className={`p-5 rounded-xl border-l-4 ${
                              rec.type === "warning"
                                ? "bg-orange-50 border-orange-500"
                                : rec.type === "success"
                                ? "bg-green-50 border-green-500"
                                : "bg-blue-50 border-blue-500"
                            }`}
                          >
                            <p
                              className={`font-bold mb-1 ${
                                rec.type === "warning"
                                  ? "text-orange-700"
                                  : rec.type === "success"
                                  ? "text-green-700"
                                  : "text-blue-700"
                              }`}
                            >
                              {rec.type === "warning"
                                ? "⚠️"
                                : rec.type === "success"
                                ? "✅"
                                : "ℹ️"}{" "}
                              {rec.title}
                            </p>
                            <p className="text-sm text-gray-600">{rec.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">
                        📋 Key Performance Metrics
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">
                            Revenue per Working Day
                          </p>
                          <p className="text-xl font-bold text-gray-800">
                            Rs. {summary.avgDailyIncome.toLocaleString()}
                          </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">
                            Cost per Working Day
                          </p>
                          <p className="text-xl font-bold text-gray-800">
                            Rs. {summary.avgDailyExpense.toLocaleString()}
                          </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">
                            Profit per Working Day
                          </p>
                          <p className="text-xl font-bold text-gray-800">
                            Rs. {summary.avgDailyProfit.toLocaleString()}
                          </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Total Fish Catch</p>
                          <p className="text-xl font-bold text-gray-800">
                            {summary.totalFishQuantity.toLocaleString()} kg
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MonthlyReports;