import { SlReload } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";

function Refresh() {
  const navigate = useNavigate();
  const handleRedirect = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate(0);
  };

  return (
    <>
      <Link to="#" onClick={handleRedirect} className="flex items-center">
        <SlReload className="relative top-0.5 pr-1.5 h-5 w-5" />
        <p className="text-2xl text-gray-600">Refresh page</p>
      </Link>
    </>
  );
}

export default Refresh;
