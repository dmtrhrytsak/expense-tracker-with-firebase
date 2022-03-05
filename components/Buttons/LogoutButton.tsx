type LogoButtonProps = {
  onClick: () => Promise<void>;
};

const LogoutButton: React.FC<LogoButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="underline-offset-1 hover:underline active:underline"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
