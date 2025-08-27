interface Props {
  children: string;
}

function Error({ children }: Props) {
  return (
    <h1 className="tracking-tight text-center sm:text-6xl text-8xl font-bold pb-4 bg-gradient-to-b from-gray-400 to-gray-500 inline-block text-transparent bg-clip-text">
      {children}
    </h1>
  );
}

export default Error;
