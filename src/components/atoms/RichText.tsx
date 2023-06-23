const RichText = ({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) => {
  return (
    <div
      className={`rich-text ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default RichText;
