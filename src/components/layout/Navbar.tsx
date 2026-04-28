import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/useAuthStore";
import BlueSkylinkLogo from "../../../public/logos/Logo 1.png";
const Navbar = () => {
  const { isAuthenticated, user } = useAuthStore();
  const isAdmin = user?.role === "admin";

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to={ROUTES.HOME} className="flex items-center gap-3">
          <img src={BlueSkylinkLogo} alt="SkyLink" className="h-9.5 w-auto" />
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-slate-500 md:flex">
          <Link to={ROUTES.SEARCH_RESULTS} className="hover:text-slate-800">
            Book
          </Link>
          <Link to={ROUTES.HOME} className="hover:text-slate-800">
            Explore
          </Link>
          <Link to={ROUTES.PNR_STATUS} className="hover:text-slate-800">
            Flight Status
          </Link>
          <Link to={ROUTES.MY_BOOKINGS} className="hover:text-slate-800">
            Manage
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <Link
              to={ROUTES.LOGIN}
              className="rounded-md border border-slate-300 px-4 py-1.5 text-sm font-semibold text-slate-600 hover:border-slate-400 hover:text-slate-800"
            >
              Sign In
            </Link>
          ) : (
            <Link
              to={isAdmin ? ROUTES.ADMIN_DASHBOARD : ROUTES.USER_DASHBOARD}
              className="rounded-md bg-(--sky-primary)] px-4 py-1.5 text-sm font-semibold text-white hover:bg-(--sky-primary-dark)]"
            >
              {isAdmin ? "Admin" : "Dashboard"}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
