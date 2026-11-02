import HeroImg from "../../assets/Hero.jpg";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect, useRef } from "react";
import { useMeals } from "../../context/MealsContext";
import PlatesGrid from "../layout/PlatesGrid";
import PlateCard from "../PlateCard";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';
import { useFolders } from "../../context/FoldersContext";

export default function Home() {
  const [cusines, setCusines] = useState([]);
  const {meals,setMeals , activeCategory , setActiveCategory , activeCuisine , setActiveCusine , searchWord ,handleSearch , setSearchWord , loading , setLoading} = useMeals();
  const seenIds = useRef(new Set());
  const {folders , setFolders} = useFolders() ;
  const [activeFolder , setActiveFolder] = useState("") ;
  const [open,setOpen] = useState(false) ;
  const [likedMealId, setLikedMealId] = useState("") ;

  function handleLikeClick(mealId){
    setOpen(true) ;
    setLikedMealId(mealId);
  }  
  function handleClose(){
    setOpen(false)
  }
  function fetchMeals(cusine, category) {
    setLoading(true)
    if (cusine === "All" && category !== "All") {
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((response) => {
          setMeals(
            response.data.meals.map((meal) => {
              return { ...meal, strCategory: category };
            }),
          );
        })
        .catch(() => console.error("Category doesn't exist")).finally(()=>setLoading(false));
    } else if (cusine !== "All" && category === "All") {
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cusine}`)
        .then((response) => {
          setMeals(
            response.data.meals.map((meal) => {
              return { ...meal, strArea: cusine };
            }),
          );
        })
        .catch(() => console.error("Cusine doesn't exist")).then(()=>setLoading(false));
    } else if (cusine !== "All" && category !== "All") {
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((response) => {
          let filtredMeals = response.data.meals.filter(
            (meal) => meal.strCountry === cusine,
          );

          setMeals(
            filtredMeals.map((meal) => {
              return { ...meal, strCountry: cusine };
            }),
          );
        
        }).finally(()=>setLoading(false));
    } else {
      setMeals([]);
      fetchRandomMeals(16);
    }
  }
  function handleAddMealToFolder(folder , mealId){

  setFolders(
  folders.map((f) =>
    f.label === folder ? { ...f, meals: [...f.meals, mealId] } : f
  )
);
    setOpen(false)
  }

  

  function fetchRandomMeals(nbr) {
    setLoading(true);
    let promises = [] ;
    for (let i = 0; i < nbr; i++) {
      promises.push( fetchRandomMeal(i))
    }
    Promise.all(promises).then(()=>setLoading(false))
  }

  function fetchRandomMeal() {
    return (
    axios
      .get("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((response) => {
        let meal = response.data.meals[0];
        if (seenIds.current.has(meal.idMeal)) {
          fetchRandomMeal();
        } else {
          seenIds.current.add(meal.idMeal);
          setMeals((meals) => [...meals, meal]);
        }
      })
      .catch(() => console.error("Faild to get Meal")))
  }

  function fetchCusines() {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then((response) => {
        setCusines([
          ...new Set([
            { id: 0, strArea: "All", strCountry: "All" },
            ...response.data.meals,
          ]),
        ]);
      });
  }

  const categories = [
    { id: 0, name: "All", emoji: "🍽️" },
    { id: 1, name: "Beef", emoji: "🥩" },
    { id: 2, name: "Breakfast", emoji: "🍳" },
    { id: 3, name: "Chicken", emoji: "🍗" },
    { id: 4, name: "Dessert", emoji: "🍰" },
    { id: 5, name: "Goat", emoji: "🐐" },
    { id: 6, name: "Lamb", emoji: "🍖" },
    { id: 7, name: "Miscellaneous", emoji: "🍱" },
    { id: 8, name: "Pasta", emoji: "🍝" },
    { id: 9, name: "Seafood", emoji: "🦐" },
    { id: 10, name: "Side", emoji: "🥗" },
    { id: 11, name: "Starter", emoji: "🥟" },
    { id: 12, name: "Vegan", emoji: "🌱" },
    { id: 13, name: "Vegetarian", emoji: "🥕" },
  ];


  useEffect(() => {
    fetchCusines();
    fetchMeals(activeCuisine, activeCategory);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollBottom = window.innerHeight + window.scrollY;
      const pageHight = document.documentElement.scrollHeight;
      if (pageHight - scrollBottom <= 200) {
        fetchRandomMeals(8);
      }
    };
    if (
      activeCategory === "All" &&
      activeCuisine === "All" &&
      searchWord === ""
    ) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeCategory, activeCuisine, searchWord]);
  return (
    <div className="p-2  ">
      <div
        style={{ backgroundImage: `url(${HeroImg})` }}
        className="text-center flex p-12 flex-col items-center bg-cover   rounded-md overflow-hidden
        "
      >
        <h1 className="text-4xl font-extrabold text-white">
          What are we cooking <br /> today?
        </h1>
        <span className="text-white font-regular">
          Discover recipes from around the world.
        </span>
        <div className=" w-[clamp(400px,50vw,700px)] bg-white flex rounded-DEFAULT items-center ">
          <SearchIcon className="ml-2 text-primary"></SearchIcon>
          <input
            type="text"
            value={searchWord}
            onChange={(e) => {
                            setSearchWord(e.target.value)

              if(e.target.value){
              handleSearch(e);}
              else{
                fetchMeals(activeCuisine,activeCategory)
              }
            }}
            className="bg-white flex-1 p-2.5 focus:outline-0 placeholder:text-outline/60 rounded-DEFAULT"
            placeholder="Search by ingredients,dish name , or chef..."
          />
          {/* <button onClick={} className="bg-primary-container text-on-primary-container font-bold px-4 py-1.5 rounded-[8px] m-2 cursor-pointer">
            Search
          </button> */}
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:w-full  ">
        <div className="mt-6 md:flex-2">
          <h3 className="text-xl font-semibold ml-4 mb-2 ">Categories</h3>
          <ul className="flex gap-3 ml-4 flex-wrap">
            {categories.map((category) => (
              <li
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.name);

                  fetchMeals(activeCuisine, category.name);
                }}
                className={` ${category.name === activeCategory ? "bg-primary-fixed" : "bg-surface-container-high"} px-5 py-2.5 cursor-pointer border-outline-variant border-1  rounded-full`}
              >
                {category.emoji + " " + category.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 md:flex-1 ">
          <h3 className="text-xl font-semibold ml-4 mb-2  ">
            Popular Cuisines
          </h3>
          <Autocomplete
            className="ml-4 !w-full pr-8"
            disablePortal
            options={[...new Set(cusines.map((c) => c.strArea))]}
            value={activeCuisine}
            onChange={(e, newVlaue) => {
              if (newVlaue) {
                //  fetchByCusine(cusines.find(c => c.strArea === newVlaue).strCountry);
                let country = cusines.find(
                  (c) => c.strArea === newVlaue,
                ).strCountry;

                fetchMeals(country, activeCategory);
                setActiveCusine(country);
              }
            }}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                }}
                {...params}
                label="Search cuisines..."
              />
            )}
          />
       
        </div>
      </div>

      <div className="m-4 mt-6">
        <div className="mb-8">
          <h2 className="text-[26px] -mb-1 font-extrabold text-on-background">
            Recommended for You
          </h2>
          <span className="text-[16px]  text-on-surface-variant ">
            Hand-picked dishes based on your taste profile.
          </span>
        </div>

        <PlatesGrid>
          {meals.map((meal) => (
            <PlateCard key={meal.idMeal} handleLikeClick={(mealId)=>handleLikeClick(mealId)} isLoading={loading} meal={meal}></PlateCard>
          ))}
  
        </PlatesGrid>
      </div>
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to add the meal to liked meals?"}
        </DialogTitle>
        <DialogContent className="flex!"> 
          <DialogContentText id="alert-dialog-description">
            Please select folder
          </DialogContentText>
          <Select
                autoFocus
                value={activeFolder}
                onChange={(e)=>setActiveFolder(e.target.value)}
                sx={{width:"100%"}}
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                }}
              >{
                folders.map((f)=><MenuItem key={f.id } value={f.label}>{f.label}</MenuItem>)
              }
              </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)} autoFocus>
            Disagree
          </Button>
          <Button onClick={()=>handleAddMealToFolder(activeFolder , likedMealId)}>Add to Folder</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
