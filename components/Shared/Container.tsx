type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="container mx-auto px-4 md:px-5 lg:px-6">{children}</div>
  );
};

export default Container;
