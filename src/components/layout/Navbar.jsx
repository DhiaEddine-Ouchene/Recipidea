import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { useMeals } from "../../context/MealsContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const {handleSearch} = useMeals() ;
  const [focus, setFocus] = useState(false);
  const [dropDown , setDropDown] = useState(false);
  const navigate = useNavigate() ;
  const activeStyle = "font-bold border-b-2 h-6.5 text-primary border-primary ";
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/Favorites" },
    { label: "MealPlanner", path: "/MealPlanner" },
  ];
  return (
    <div className="bg-background flex items-center p-4 justify-around relative">
      <span className="text-primary text-3xl font-bold">Recipedia</span>
      <div className="relative text-on-surface-variant w-1/3 ">
        <SearchIcon
          className={`absolute ${focus ? "hidden!" : "block"} left-1 top-1/2 -translate-y-1/2`}
        ></SearchIcon>
        <input
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          className={`${focus ? "pl-4" : "pl-7"} py-1.5  border-1 outline-0  w-full placeholder:text-on-surface-variant border-surface-variant  rounded-xl`}
          type="text"
          placeholder="Search"
          onChange={(e)=>{if(e.target.value){handleSearch(e) ; navigate("/") }}}
        />
      </div>
      <div className="order-last  ">
      <DensityMediumIcon className="md:!hidden cursor-pointer" onClick={()=>{setDropDown(!dropDown)}}></DensityMediumIcon>
      <nav  className="absolute md:relative bg-background right-2 z-30 top-[110%] shadow-2xl md:shadow-background rounded-md ">
          <ul className={`${dropDown?'flex':"hidden"} b gap-4 md:flex-row flex-col text-on-surface-variant md:flex  p-4 md:p-2 items-start`}>
          {navItems.map((item) => 
            <li key={item.path} className=" z-50 bg-background">
              <NavLink to={item.path} className={({isActive})=> isActive ? activeStyle :''}>
                {item.label}
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      </div>
      {/* <div className="logo bg-violet-600 w-9 h-9 rounded-full text-white text-2xl flex items-center justify-center md:order-last ">
        M
      </div> */}
    </div>
  );
}
