import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { v4 as uuidv4 } from "uuid";
import FolderCard from "../FolderCard";
import PlatesGrid from "../layout/PlatesGrid";
import { useFolders } from "../../context/FoldersContext";
import PlateCard from "../PlateCard";
import axios from "axios";
export default function Favorites() {
  const [folderName, setFolderName] = useState("");
  const [likedMeal, setLikedMeals] = useState([]);
  const [meals , setMeals] = useState([]);
  const [loading , setLoading] = useState(true) ;
  const { folders, setFolders, activeFolder, setActiveFolder } = useFolders();
  
  function handleAddClick() {
    if (folderName) {
      const newFolder = { id: uuidv4(), label: folderName , meals:[] };
      setFolders([...folders, newFolder]);
      setFolderName("");
      // localStorage.setItem("folders", JSON.stringify([...folders, newFolder]));
    }
  }
  function handleDeleteFolder(key) {
   
    setFolders(folders.filter((f) => f.id !== key));
    // localStorage.setItem("folders", JSON.stringify(newFolders));
  }
  // useEffect(() => {
  //   setFolders(JSON.parse(localStorage.getItem("folders")) ?? []);
  // }, []);

//   function fetchMeals(){
//     const mealsIds = 
//     let promises = [] ;
//     for(const id of mealsIds){
//       promises.push()
//     )
// }
//     Promise.all(promises).then(responces=> setMeals(responces.map(r=>r.data.meals[0]))).then(()=> setLoading(false))
//     }
  useEffect(()=>{
    // fetchMeals() ;
    let ignore = false ;
    let mealsIds = folders.find((f=> f.label === activeFolder))?.meals ?? [] ;

    Promise.all(mealsIds.map(mId => axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mId}` )))
    .then(responces => {
      if(!ignore){
        setMeals(responces.map(res => res.data.meals[0]))
      }
    }).finally(()=> {if(!ignore) setLoading(false)})

    return ()=>{ignore = true}
  },[activeFolder,folders])

  return (
    <>
      <div className="m-8">
        <h1 className="font-bold text-[clamp(30px,6vw,45px)] text-on-background ">
          Your Favorite Recipes
        </h1>
        <span className="text-lg text-on-surface-variant">
          A collection of your most-loved meals
        </span>
      </div>
      <div className="m-8 flex  flex-wrap gap-4 cursor-pointer">
        {folders.map((f) => (
          <FolderCard
            
            key={f.id}
            activeFolder={activeFolder}
            handleDeleteFolder={handleDeleteFolder}
            folder={f}
            handleFolderActive={(label)=>{setActiveFolder(label) ; setLoading(true)}}
          ></FolderCard>
        ))}
        <div className="py-2 px-3 border-1 text-sm  rounded-3xl border-dashed border-outline-variant flex items-center justify-center">
          {" "}
          <IconButton
            onClick={() => {
              handleAddClick();
            }}
            className="cursor-pointer  !bg-primary rounded-full !text-on-background !w-6 !h-6 !mr-2  "
            sx={{ width: 8 }}
          >
            <AddIcon className="mr-1 ml-1 !text-lg"></AddIcon>
          </IconButton>
          <input
            type="text"
            value={folderName}
            placeholder="New Folder"
            onChange={(e) => setFolderName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddClick();
              }
            }}
            className="outline-0 w-22"
          />
        </div>
      </div>
      <div className="p-8">
        <PlatesGrid>

        { 
          meals.map((meal) => (
                    <PlateCard key={meal.idMeal}  isLoading={loading} meal={meal}></PlateCard>
                  ))
        }
      </PlatesGrid>
      </div>
      
    </>
  );
}
