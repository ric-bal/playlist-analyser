interface Props {
  children: any;
}

function BodyText({ children }: Props) {
  return <p className="text-3xl text-gray-600">{children}</p>;
}

export default BodyText;
