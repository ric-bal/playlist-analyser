interface Props {
  children: string;
}

function Desc({ children }: Props) {
  return <p className="lg:text-[0.6rem] text-2xl text-gray-600">{children}</p>;
}

export default Desc;
