
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Download, PieChart, LineChart as LineChartIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AnalyticsData } from '@/types';
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Cell, 
  Legend, 
  Line, 
  LineChart, 
  Pie, 
  PieChart as RePieChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';

// Mock analytics data
const mockAnalyticsData: AnalyticsData = {
  prescriptionsPerMonth: [
    { month: 'Jan', count: 45 },
    { month: 'Feb', count: 52 },
    { month: 'Mar', count: 49 },
    { month: 'Apr', count: 62 },
    { month: 'May', count: 58 },
    { month: 'Jun', count: 71 },
  ],
  commonMedications: [
    { medication: 'Amoxicillin', count: 87 },
    { medication: 'Lisinopril', count: 64 },
    { medication: 'Metformin', count: 53 },
    { medication: 'Atorvastatin', count: 49 },
    { medication: 'Albuterol', count: 38 },
  ],
  verificationStats: [
    { status: 'verified', count: 42 },
    { status: 'pending', count: 15 },
    { status: 'expired', count: 8 },
  ],
};

const COLORS = ['#0ea5e9', '#6366f1', '#f59e0b', '#ef4444', '#10b981'];

const AnalyticsDashboard: React.FC = () => {
  const { toast } = useToast();
  const [data] = useState<AnalyticsData>(mockAnalyticsData);

  const handleExportCSV = () => {
    // In a real app, this would generate and download a CSV file
    toast({
      title: 'Export Started',
      description: 'Your analytics data is being exported as CSV',
    });

    // Simulate download delay
    setTimeout(() => {
      toast({
        title: 'Export Complete',
        description: 'Your analytics data has been exported successfully',
      });
    }, 1500);
  };

  const prescriptionsTotal = data.prescriptionsPerMonth.reduce((total, month) => total + month.count, 0);
  const mostCommonMedication = data.commonMedications[0]?.medication || 'N/A';
  const verifiedDoctorsCount = data.verificationStats.find(stat => stat.status === 'verified')?.count || 0;

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div>
            <CardTitle className="flex items-center text-medical-primary">
              <BarChart3 className="mr-2" />
              Analytics Dashboard
            </CardTitle>
            <CardDescription>
              View prescription and verification statistics
            </CardDescription>
          </div>
          <Button
            variant="outline"
            className="mt-2 sm:mt-0"
            onClick={handleExportCSV}
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Total Prescriptions"
            value={prescriptionsTotal}
            icon={<LineChartIcon className="h-8 w-8 text-medical-primary" />}
            trend="up"
            percentChange={8.5}
          />
          <StatCard
            title="Most Prescribed"
            value={mostCommonMedication}
            icon={<PieChart className="h-8 w-8 text-medical-accent" />}
            badge
          />
          <StatCard
            title="Verified Doctors"
            value={verifiedDoctorsCount}
            icon={<BarChart3 className="h-8 w-8 text-medical-secondary" />}
            trend="down"
            percentChange={2.1}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Prescriptions per Month</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data.prescriptionsPerMonth}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#0ea5e9"
                    fillOpacity={1}
                    fill="url(#colorCount)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Common Medications</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={data.commonMedications}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.commonMedications.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Doctor Verification Status</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.verificationStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Number of Doctors">
                  {data.verificationStats.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        entry.status === 'verified' 
                          ? '#10b981' 
                          : entry.status === 'pending' 
                          ? '#f59e0b' 
                          : '#ef4444'
                      } 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
  percentChange?: number;
  badge?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  percentChange,
  badge,
}) => {
  return (
    <div className="bg-card p-4 rounded-lg border shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            {badge && typeof value === 'string' && (
              <Badge variant="outline" className="ml-2">
                Most Common
              </Badge>
            )}
          </div>
        </div>
        <div className="p-2 rounded-full bg-primary/10">{icon}</div>
      </div>
      {trend && percentChange && (
        <div className="mt-2 flex items-center">
          {trend === 'up' ? (
            <TrendingUp className="h-4 w-4 text-medical-success mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-medical-danger mr-1" />
          )}
          <span
            className={`text-xs font-medium ${
              trend === 'up' ? 'text-medical-success' : 'text-medical-danger'
            }`}
          >
            {percentChange}%
          </span>
          <span className="text-xs text-muted-foreground ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
