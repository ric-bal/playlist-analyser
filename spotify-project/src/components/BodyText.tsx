interface Props {
  children: string;
}

function BodyText({ children }: Props) {
  return <p className="text-2xl text-gray-600">{children}</p>;
}

export default BodyText;
