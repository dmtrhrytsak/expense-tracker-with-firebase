import Link from 'next/link';
import { BiHomeSmile } from 'react-icons/bi';

import { Container } from '.';

type NavbarProps = {
  isAuth: boolean;
  logoutButton: React.ReactElement;
};

const Navbar: React.FC<NavbarProps> = ({ isAuth, logoutButton }) => {
  return (
    <nav className="flex items-center h-14 bg-white drop-shadow-sm">
      <Container>
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center w-min gap-2">
              <span className="p-1 rounded bg-blue-100">
                <BiHomeSmile className="text-lg text-blue-600" />
              </span>
              <span className="font-semibold">Dashboard</span>
            </a>
          </Link>

          {isAuth && logoutButton}
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
