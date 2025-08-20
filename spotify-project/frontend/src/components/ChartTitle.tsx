interface Props {
  children: string;
}

function ChartTitle({ children }: Props) {
  return (
    <h1 className="text-5xl border-b-4 border-gray-600 font-bold text-gray-600 pb-5 mb-15">
      {children}
    </h1>
  );
}

export default ChartTitle;
