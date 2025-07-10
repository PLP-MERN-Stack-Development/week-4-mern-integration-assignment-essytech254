import Navbar from './NavBar';

const Layout = ({ children }) => (
  <div>
    <Navbar />
    <main className="p-4">{children}</main>
  </div>
);

export default Layout;
