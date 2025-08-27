import { SlArrowLeft } from "react-icons/sl";
import { useNavigate, Link } from "react-router-dom";

interface Props {
  setFadeout: React.Dispatch<React.SetStateAction<boolean>>;
  delay: boolean;
}

function Return({ setFadeout, delay }: Props) {
  const navigate = useNavigate();

  const handleRedirect = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    let timer = 1200;

    if (delay) {
      setFadeout(true);
    } else {
      timer = 0;
    }

    setTimeout(() => {
      navigate("/");
    }, timer);
  };

  return (
    <>
      <Link to="/" onClick={handleRedirect} className="flex items-center">
        <SlArrowLeft className="relative top-0.5 pr-1.5 h-5 w-5" />
        <p className="lg:text-sm text-2xl text-gray-600">Return home</p>
      </Link>
    </>
  );
}

export default Return;
