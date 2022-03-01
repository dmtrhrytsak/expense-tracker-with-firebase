import { FaRegTrashAlt } from 'react-icons/fa';

type DeleteExepenseButtonProps = {
  onClick: () => Promise<void>;
};

const DeleteExepenseButton: React.FC<DeleteExepenseButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="fixed right-10 bottom-10 flex items-center justify-center h-9 w-9 rounded-full bg-red-500 text-white drop-shadow transition-[filter] duration-500 hover:drop-shadow-xl"
    >
      <FaRegTrashAlt />
    </button>
  );
};

export default DeleteExepenseButton;
