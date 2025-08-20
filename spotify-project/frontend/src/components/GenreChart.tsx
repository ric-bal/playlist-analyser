"use client";

import { LabelList, Pie, PieChart } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Props {
  chartData: any;
}

export default function ChartPieLabel({ chartData }: Props) {
  const chartConfig = {
    0: {
      color: "#818cf8",
    },
    1: {
      color: "#6366f1",
    },
    2: {
      color: "#4f46e5",
    },
    3: {
      color: "#4338ca",
    },
    4: {
      color: "#3730a3",
    },
  } satisfies ChartConfig;

  let keys = Object.keys(chartData[0]);
  chartData = chartData.slice(0, 10);

  return (
    <>
      <ChartContainer
        config={chartConfig}
        className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square size-7/10"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartData}
            dataKey={keys[1]}
            label
            labelLine={true}
            fontSize={20}
            fontWeight={"bold"}
            nameKey={keys[0]}
          >
            <LabelList
              dataKey={keys[0]}
              className="fill-background size-min"
              stroke="none"
              fontSize={"auto"}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </>
  );
}
