interface Props {
  children: string;
}

function Title({ children }: Props) {
  return (
    <h1 className="gradient-text-purple inline-block tracking-tight text-9xl font-bold text-transparent animate-gradient">
      {children}
    </h1>
  );
}

export default Title;
