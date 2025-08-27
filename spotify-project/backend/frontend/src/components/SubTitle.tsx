interface Props {
  children: string;
}

function SubTitle({ children }: Props) {
  return (
    <h1 className="tracking-tight lg:text-2xl text-[7rem] font-bold bg-gradient-to-r from-purple-400 to-blue-500 inline-block text-transparent bg-clip-text">
      {children}
    </h1>
  );
}

export default SubTitle;
