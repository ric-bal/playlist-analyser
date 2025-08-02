import { SlArrowLeft } from "react-icons/sl";
import { useNavigate, Link } from "react-router-dom";
import BodyText from "./BodyText";

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
        <div className="relative top-0.5 pr-1.5">
          <SlArrowLeft />
        </div>
        <BodyText>Return home</BodyText>
      </Link>
    </>
  );
}

export default Return;
