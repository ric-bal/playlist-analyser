"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Props {
  chartData: any;
}

export default function Component({ chartData }: Props) {
  let keys = Object.keys(chartData[0]);
  chartData = chartData.slice(0, 25);

  let vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );

  let rightMargin = 150;
  if (vw <= 1535) {
    rightMargin = 0;
  }

  const chartConfig = {
    xLabel: {
      label: "No. of songs: ",
      color: "#818cf8",
    },
    insideText: {
      color: "#475569",
    },
  } satisfies ChartConfig;

  return (
    <>
      <ChartContainer
        config={chartConfig}
        className="lg:h-7/10 lg:w-8/10 size-7/10"
      >
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{
            right: rightMargin,
          }}
        >
          <CartesianGrid horizontal={true} vertical={true} strokeWidth={2} />
          <YAxis
            dataKey={keys[0]}
            type="category"
            tickLine={false}
            tickMargin={5}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 2)}
            hide
          />
          <XAxis dataKey={keys[1]} type="number" hide />
          <ChartTooltip content={<ChartTooltipContent nameKey="xLabel" />} />
          <Bar
            dataKey={keys[1]}
            fill="var(--color-xLabel)"
            radius={4}
            layout="vertical"
          >
            <LabelList
              dataKey={keys[0]}
              position="right"
              offset={8}
              className="fill-(--color-insideText) lg:text-[0.4rem] text-sm font-bold"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
      <p className="text-gray-600 font-semibold lg:text-sm text-lg">
        Top 25 Artists
      </p>
    </>
  );
}
