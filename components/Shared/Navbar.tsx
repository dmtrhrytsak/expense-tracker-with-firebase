import Link from 'next/link';
import { BiHomeSmile } from 'react-icons/bi';

import { Container } from '.';

const Navbar = () => {
  return (
    <nav className="flex items-center h-14 bg-white drop-shadow-sm">
      <Container>
        <ul>
          <li className="">
            <Link href="/">
              <a className="flex items-center gap-2">
                <span className="p-1 rounded bg-blue-100">
                  <BiHomeSmile className="text-lg text-blue-600" />
                </span>
                <span className="font-semibold">Dashboard</span>
              </a>
            </Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
