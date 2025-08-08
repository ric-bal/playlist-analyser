import { SlArrowLeft } from "react-icons/sl";
import { useNavigate, Link } from "react-router-dom";

function Return() {
  const navigate = useNavigate();

  const handleRedirect = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  return (
    <>
      <Link to="/" onClick={handleRedirect} className="flex items-center">
        <SlArrowLeft className="relative top-0.5 pr-1.5 h-5 w-5" />
        <p className="text-2xl text-gray-600">Return home</p>
      </Link>
    </>
  );
}

export default Return;
