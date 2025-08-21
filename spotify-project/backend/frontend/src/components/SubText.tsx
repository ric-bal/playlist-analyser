interface Props {
  children: string;
}

function SubText({ children }: Props) {
  return <p className="text-2xl text-gray-600">{children}</p>;
}

export default SubText;
