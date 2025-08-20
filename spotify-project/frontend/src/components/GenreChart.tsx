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
// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 90, fill: "var(--color-other)" },
// ];

// function RandomHexValue() {
//   let rgb1 = [29, 78, 216];
//   let rgb2 = [168, 85, 247];

//   let rgb3 = [];
//   for (var i = 0; i < 3; i++)
//     rgb3[i] = (rgb1[i] + Math.random() * (rgb2[i] - rgb1[i])) | 0;

//   var newColor =
//     "#" +
//     rgb3
//       .map(function (n) {
//         return n.toString(16);
//       })
//       .map(function (s) {
//         return "00".slice(s.length) + s;
//       })
//       .join("");

//   return newColor;
// }

export default function ChartPieLabel({ chartData }: Props) {
  const chartConfig = {
    0: {
      color: "#ef4444",
    },
    1: {
      color: "#f59e0b",
    },
    2: {
      color: "#10b981",
    },
    3: {
      color: "#3b82f6",
    },
    4: {
      color: "#a855f7",
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
