interface Props {
  children: any;
}

function BodyText({ children }: Props) {
  return <p className="text-[1.65rem] text-gray-600">{children}</p>;
}

export default BodyText;
