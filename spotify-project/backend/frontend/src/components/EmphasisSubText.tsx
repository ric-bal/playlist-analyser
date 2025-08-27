interface Props {
  children: string;
}

function EmphasisSubText({ children }: Props) {
  return (
    <p className="lg:text-sm text-[1.5rem] text-gray-600 italic font-[600]">
      {children}
    </p>
  );
}

export default EmphasisSubText;
