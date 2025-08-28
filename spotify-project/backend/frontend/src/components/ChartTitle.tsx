interface Props {
  children: string;
}

function ChartTitle({ children }: Props) {
  return (
    <h1 className="lg:hidden text-5xl border-b-4 border-gray-600 font-bold text-gray-600 2xl:pb-0 pb-5 2xl:mb-10 mb-15">
      {children}
    </h1>
  );
}

export default ChartTitle;
