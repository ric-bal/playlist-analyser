interface Props {
  children: string;
}

function Desc({ children }: Props) {
  return <p className="lg:text-sm text-2xl text-gray-600">{children}</p>;
}

export default Desc;
