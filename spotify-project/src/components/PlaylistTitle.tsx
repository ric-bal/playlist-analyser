interface Props {
  children: string;
}

function PlaylistTitle({ children }: Props) {
  return (
    <h1 className="gradient-text-purple inline-block tracking-tight text-9xl pb-5 font-bold text-transparent animate-gradient">
      {children}
    </h1>
  );
}

export default PlaylistTitle;
