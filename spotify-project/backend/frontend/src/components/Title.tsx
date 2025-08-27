interface Props {
  children: string;
}

function Title({ children }: Props) {
  return (
    <div className="">
      <h1 className="gradient-text-purple inline-block tracking-tight text-center sm:text-7xl lg:text-6xl text-9xl pb-5 font-bold text-transparent animate-gradient">
        {children}
      </h1>
    </div>
  );
}

export default Title;
