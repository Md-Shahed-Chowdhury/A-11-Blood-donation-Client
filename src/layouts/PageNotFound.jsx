
import pageNotFound from "./../assets/error-404.png";
import { useNavigate } from "react-router";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center ">
      
      <img src={pageNotFound} alt="" />
      <h1 className="font-bold text-3xl md:text-5xl lg:text-8xl">
        PAGE NOT FOUND
      </h1>
      <button
        onClick={() => navigate(-1)}
        className="mt-5 bg-gradient-to-br from-[#632EE3]  to-[#9F62F2] px-10 py-3 text-white font-medium text-lg rounded-sm hover:scale-90 transition-transform duration-100"
      >
        Back
      </button>
    </div>
  );
};

export default PageNotFound;
