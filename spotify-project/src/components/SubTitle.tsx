interface Props {
  children: string;
}

function SubTitle({ children }: Props) {
  return (
    <h1 className="tracking-tight text-[7rem] font-bold pb-4 bg-gradient-to-r from-purple-400 to-blue-500 inline-block text-transparent bg-clip-text">
      {children}
    </h1>
  );
}

export default SubTitle;
