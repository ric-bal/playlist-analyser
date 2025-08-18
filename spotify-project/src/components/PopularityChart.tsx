"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Props {
  chartData: any;
}

// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ];

export default function Component({ chartData }: Props) {
  let keys = Object.keys(chartData[0]);

  const chartConfig = {
    xlabel: {
      label: "No. of songs: ",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <>
      <ChartContainer config={chartConfig} className="size-7/10">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={true} />
          <XAxis
            dataKey={keys[0]}
            tickLine={true}
            tickMargin={10}
            axisLine={true}
            tickFormatter={(value) => value.slice(0, 2)}
          />
          <ChartTooltip content={<ChartTooltipContent nameKey="xlabel" />} />

          <Bar dataKey={keys[1]} fill="var(--color-xlabel)" radius={4} />
        </BarChart>
      </ChartContainer>
      <p className="text-gray-600 font-semibold text-lg">
        Popularity (to nearest 10)
      </p>
    </>
  );
}
