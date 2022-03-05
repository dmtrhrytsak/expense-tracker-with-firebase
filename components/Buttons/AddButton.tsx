import Link from 'next/link';
import { AiOutlinePlus } from 'react-icons/ai';

const AddButton = () => {
  return (
    <Link href="/add-expense">
      <a className="fixed right-10 bottom-10 flex items-center justify-center h-9 w-9 rounded-full bg-red-500 text-white drop-shadow transition-[filter] duration-500 hover:drop-shadow-xl">
        <AiOutlinePlus />
      </a>
    </Link>
  );
};

export default AddButton;
