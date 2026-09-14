"use client";

import type {
  CenterCityMetric,
  CourseDemandMetric,
  IntentBreakdown,
} from "@/lib/analytics/ga4";
import { useMemo, useState } from "react";
import { BIDonutChart, type DonutSlice } from "./bi-donut-chart";
import { BIHeaderFilters, type FilterState } from "./bi-header-filters";
import { BIMasterTable, type MasterRecord } from "./bi-master-table";
import { BIMetricsTable } from "./bi-metrics-table";
import { BIRegionBarChart, type RegionBarData } from "./bi-region-bar-chart";

interface BIDashboardViewProps {
  courses: CourseDemandMetric[];
  cities: CenterCityMetric[];
  intent: IntentBreakdown | null;
  rawEnquiries: {
    id: number;
    name: string;
    phone: string;
    course: string;
    createdAt: string | Date;
  }[];
  totalEnquiriesCount: number;
  lastRefreshTime?: string;
}

const ZONE_MAPPING: Record<string, string[]> = {
  South: [
    "visakhapatnam",
    "hyderabad",
    "vijayawada",
    "guntur",
    "tirupati",
    "bengaluru",
    "chennai",
    "coimbatore",
    "madurai",
    "kochi",
    "calicut",
  ],
  North: [
    "delhi",
    "lucknow",
    "kanpur",
    "varanasi",
    "gorakhpur",
    "jaipur",
    "gurgaon",
    "dehradun",
    "chandigarh",
  ],
  East: ["patna", "bhubaneswar", "kolkata", "ranchi", "guwahati", "jamshedpur"],
  West: [
    "mumbai",
    "pune",
    "nagpur",
    "ahmedabad",
    "surat",
    "indore",
    "bhopal",
    "raipur",
  ],
};

export function BIDashboardView({
  courses,
  cities,
  intent,
  rawEnquiries,
  totalEnquiriesCount,
  lastRefreshTime = "2026-09-11 00:44:12 IST",
}: BIDashboardViewProps) {
  const [filters, setFilters] = useState<FilterState>({
    zone: "All",
    category: "All",
    city: "All",
    dateRange: "28d",
  });

  const availableCities = useMemo(() => {
    return Array.from(new Set(cities.map((c) => c.city))).sort();
  }, [cities]);

  // Filter courses based on Category
  const filteredCourses = useMemo(() => {
    return courses
      .filter((c) => c.category !== "General")
      .filter((c) => {
        if (filters.category === "All") return true;
        return c.category === filters.category;
      });
  }, [courses, filters.category]);

  // Regional bar chart data
  const regionChartData: RegionBarData[] = useMemo(() => {
    if (filters.zone !== "All") {
      const allowed = new Set(ZONE_MAPPING[filters.zone] || []);
      return cities
        .filter((c) => allowed.has(c.city.toLowerCase()))
        .slice(0, 8)
        .map((c) => ({
          label: c.city,
          value: c.views,
          isHub: c.isMajorNifsHub,
        }));
    }

    // Default: Show Top Cities & Zones
    return cities.slice(0, 8).map((c) => ({
      label: c.city,
      value: c.views,
      isHub: c.isMajorNifsHub,
    }));
  }, [cities, filters.zone]);

  // Intent Donut Data (Course vs Job)
  const intentSlices: DonutSlice[] = useMemo(() => {
    const courseViews = intent?.courseViews ?? 5900;
    const jobViews = intent?.jobViews ?? 670;

    return [
      {
        label: "Course Seekers",
        value: courseViews,
        color: "#06b6d4", // Cyan
      },
      {
        label: "Job / Placements",
        value: jobViews,
        color: "#a855f7", // Purple
      },
    ];
  }, [intent]);

  // Category Distribution Donut Data
  const categorySlices: DonutSlice[] = useMemo(() => {
    const map: Record<string, number> = {
      Diploma: 0,
      Degree: 0,
      "PG Diploma": 0,
      Certificate: 0,
    };

    courses.forEach((c) => {
      if (map[c.category] !== undefined) {
        map[c.category] += c.views;
      }
    });

    const colors: Record<string, string> = {
      Diploma: "#f59e0b", // Amber
      Degree: "#3b82f6", // Blue
      "PG Diploma": "#ec4899", // Pink
      Certificate: "#10b981", // Emerald
    };

    return Object.entries(map)
      .filter(([_, val]) => val > 0)
      .map(([cat, val]) => ({
        label: cat,
        value: val,
        color: colors[cat] || "#6366f1",
      }));
  }, [courses]);

  // Master records for bottom table
  const masterRecords: MasterRecord[] = useMemo(() => {
    return rawEnquiries.map((enq) => {
      const d =
        typeof enq.createdAt === "string"
          ? new Date(enq.createdAt)
          : enq.createdAt;
      const dateStr = d.toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
      });

      return {
        id: enq.id,
        name: enq.name,
        phone: enq.phone,
        course: enq.course,
        city: "Visakhapatnam HQ",
        type: "enquiry" as const,
        status: "Pending Call",
        dateStr,
      };
    });
  }, [rawEnquiries]);

  return (
    <div className="space-y-5">
      {/* 1. Header & Interactive Filter Bar */}
      <BIHeaderFilters
        filters={filters}
        onFilterChange={setFilters}
        onReset={() =>
          setFilters({
            zone: "All",
            category: "All",
            city: "All",
            dateRange: "28d",
          })
        }
        availableCities={availableCities}
        lastRefreshTime={lastRefreshTime}
      />

      {/* 2. Upper Analytic Tier (3-Column PowerBI Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* In-Cell Bar Metrics Table (5 Cols) */}
        <div className="lg:col-span-5 h-[390px]">
          <BIMetricsTable courses={filteredCourses} />
        </div>

        {/* Vertical Regional Amber Bar Chart (4 Cols) */}
        <div className="lg:col-span-4 h-[390px]">
          <BIRegionBarChart
            data={regionChartData}
            title={
              filters.zone === "All"
                ? "Feeder Cities by Traffic"
                : `${filters.zone} India Feeder Volume`
            }
          />
        </div>

        {/* Intent Split Donut (3 Cols) */}
        <div className="lg:col-span-3 h-[390px]">
          <BIDonutChart
            title="Intent Split Ratio"
            subtitle="Course vs Job"
            slices={intentSlices}
            totalLabel="Total Views"
          />
        </div>
      </div>

      {/* 3. Lower Analytic Tier (2-Column PowerBI Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Category Multi-Segment Donut Chart (4 Cols) */}
        <div className="lg:col-span-4 h-[420px]">
          <BIDonutChart
            title="Demand by Course Tier"
            subtitle="Tier Breakdown"
            slices={categorySlices}
            totalLabel="Course Reads"
          />
        </div>

        {/* Master Detail Action Table with 🔗 Icons (8 Cols) */}
        <div className="lg:col-span-8 h-[420px]">
          <BIMasterTable
            records={masterRecords}
            totalCount={totalEnquiriesCount}
          />
        </div>
      </div>
    </div>
  );
}
