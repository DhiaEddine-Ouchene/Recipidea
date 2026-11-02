import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import IngrediantsIcon from "../../assets/ingrediants.svg";
import StepsIcon from "../../assets/steps.svg";
import PlanIcon from "../../assets/planIcon.svg";
import Checkbox from "@mui/material/Checkbox";

import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Ingredient from "../Ingredient";
import Instruction from "../Instruction";
import Skeleton from "@mui/material/Skeleton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Select from "@mui/material/Select";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import { useFolders } from "../../context/FoldersContext";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Meal() {
  const { mealId } = useParams();
  const [loading, setLoading] = useState(false);
  const [meal, setMeal] = useState(null);
  const [allChecked, setAllChecked] = useState(false);
  const { folders, setFolders } = useFolders();
  const [activeFolder, setActiveFolder] = useState("");
  const [open, setOpen] = useState(false);
  const [like, setLike] = useState(() => {
    if (folders.find((f) => f?.meals.includes(mealId))) {
      return true;
    } else {
      return false;
    }
  });
  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((res) => {
        const meal = res.data.meals[0];
        setMeal(meal);
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);

  function handleLikeClick() {
    setLike(!like);

    if (!like) {
      setOpen(true);
    } else {
      setFolders(
        folders.map((f) =>
          f.meals.includes(meal.idMeal)
            ? { ...f, meals: f.meals.filter((m) => m !== meal.idMeal) }
            : f,
        ),
      );
    }
  }

  function handleClose() {
    setOpen(false);
  }
  function getIngredients() {
    const list = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`]?.trim();
      const measure = meal[`strMeasure${i}`]?.trim();
      if (ingredient) list.push({ ingredient, measure });
    }
    return list;
  }

  function getNbrIngredients() {
    return getIngredients().length;
  }
  function getInstructions() {
    return meal.strInstructions.split("\r\n").filter((i) => i.trim());
  }

  function getNbrInstructions() {
    return getInstructions().length;
  }

  function handleAddMealToFolder(folder, mealId) {
    setFolders(
      folders.map((f) =>
        f.label === folder ? { ...f, meals: [...f.meals, mealId] } : f,
      ),
    );
    setOpen(false);
  }
  return (
    <div className="bg-background md:px-6  md:py-8 p-5 max-w-container-max m-auto ">
      <div className="bg-white flex flex-col sm:flex-row md:p-8 p-5 rounded-2xl md:justify-between justify-center sm:items-center gap-4 shadow-lg">
        <div className="">
          <span className="text-xs font-semibold text-on-primary-fixed px-2 py-1 rounded-2xl uppercase bg-primary-fixed">
            {`${meal?.strCategory ? meal.strCategory : ""}  ${meal?.strArea ? meal.strArea : ""} `}{" "}
            CUISINE
          </span>
          <h1 className="text-on-surface mt-2 font-bold leading-none text-[clamp(2rem,3vw,48px)]">
            {meal?.strMeal}
          </h1>
          <div className="flex gap-2 mt-2  mb-5">
            {meal?.strTags?.split(",").map((t, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 text-on-surface-variant rounded-md bg-surface-container"
              >
                {t}
              </span>
            ))}
          </div>

          <div className=" w-fit flex items-center gap-5 mb-6 border-y py-1.5 border-surface-container-highest/50">
            <div className="flex gap-1">
              <img src={IngrediantsIcon} alt="ingrediants logo" />
              {loading ? (
                <span className="text-sm text-on-surface-variant">
                  {getNbrIngredients()} Ingredients
                </span>
              ) : (
                <Skeleton width={80}></Skeleton>
              )}
            </div>
            <div className="w-1 h-1 rounded-full bg-outline-variant"></div>
            <div className="flex gap-1 ">
              <img src={StepsIcon} alt="steps Icon" />
              {loading ? (
                <span className="text-sm text-on-surface-variant">
                  {getNbrInstructions()} Steps
                </span>
              ) : (
                <Skeleton width={80}></Skeleton>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 9x:grid-cols-3 gap-3 items-center ">
            <Button
              variant="contained"
              color="primary"
              sx={{ fontSize: "14px", textTransform: "none" }}
              className="!text-[clamp(10px,2vw,12px)]"
            >
              <img src={PlanIcon} alt="Plan Icon" className="mr-1.5"></img>Add
              to Meal Plan
            </Button>
            <Button
              variant="outlined"
              className="!text-[clamp(10px,2vw,12px)]"
              sx={{
                fontSize: "14px",
                textTransform: "none",
                borderColor: "#ddc1b3",
              }}
              onClick={handleLikeClick}
            >
              {like ? (
                <FavoriteIcon
                  fontSize="small"
                  className="mr-1 -ml-1"
                ></FavoriteIcon>
              ) : (
                <FavoriteBorderIcon
                  fontSize="small"
                  className="mr-1 -ml-1"
                ></FavoriteBorderIcon>
              )}
              Save to Favorites
            </Button>
            <Button
              variant="contained"
              className="!text-[clamp(10px,2vw,12px)]"
              sx={{
                fontSize: "14px",
                textTransform: "none",
                bgcolor: "#f0eded",
                color: "#1b1c1c",
              }}
            >
              <a href={meal ? meal.strYoutube : ""} target="_blank">
                <PlayCircleIcon
                  fontSize="small"
                  className="mr-1 -ml-1 text-[#ff0000] "
                ></PlayCircleIcon>{" "}
                Watch Tutorial
              </a>
            </Button>
          </div>
        </div>
        <div className=" flex sm:w-[clamp(300px,33%,350px)] sm:h-[clamp(320px,33%,350px)] w-full h-68 items-center justify-center rounded-2xl overflow-hidden shadow-2xl ">
          {loading ? (
            <img
              src={meal?.strMealThumb}
              className="object-cover rounded-2xl hover:scale-110 transition duration-300 "
              alt="meal image"
            />
          ) : (
            <Skeleton
              variant="rectangular"
              className=" rounded-2x sm:w-[clamp(300px,33%,350px)]! sm:h-[clamp(320px,33%,350px)] w-full h-68! rounded-2xl overflow-hidden  "
            ></Skeleton>
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-12 grid-cols-6  md:gap-8 gap-4 md:mt-8 mt-4 ">
        <div className="md:col-span-5 col-span-6 bg-white rounded-2xl p-4 md:p-8 shadow-lg">
          <div className="pb-4 flex justify-between items-center border-b border-b-surface-variant ">
            <div>
              <h3 className="text-[20px] font-semibold -mb-1.5 text-on-background">
                Ingredients
              </h3>
              {loading ? (
                <span className="font-semibold text-on-surface-variant  text-xs">
                  {getNbrIngredients()} items required
                </span>
              ) : (
                <Skeleton></Skeleton>
              )}
            </div>
            <Checkbox
              sx={{ color: "#897266" }}
              checked={allChecked}
              onChange={(e) => setAllChecked(e.target.checked)}
            ></Checkbox>
          </div>
          <div className="mt-4 flex flex-col gap-3.5">
            {loading ? (
              getIngredients().map((ing, i) => (
                <Ingredient
                  allChecked={allChecked}
                  key={i}
                  ingredientName={ing.ingredient}
                  ingredientQuantity={ing.measure}
                ></Ingredient>
              ))
            ) : (
              <Skeleton className="h-20!"></Skeleton>
            )}
          </div>
        </div>
        <div className="md:col-span-7 col-span-6 bg-white rounded-2xl p-4 md:p-8 shadow-lg">
          <div className="pb-4 flex justify-between items-center border-b border-b-surface-variant ">
            <h3 className="text-3xl font-semibold -mb-1.5 text-on-background">
              Instrections
            </h3>
            {loading ? (
              <span className="font-semibold text-on-surface-variant  text-sm">
                {getNbrInstructions()} steps
              </span>
            ) : (
              <Skeleton width={80}></Skeleton>
            )}
          </div>
          <div className="mt-4 flex flex-col gap-8">
            {loading ? (
              getInstructions().map((ins, i) => (
                <Instruction key={i} instructionNbr={i + 1}>
                  {ins}
                </Instruction>
              ))
            ) : (
              <Skeleton className="h-20!"></Skeleton>
            )}
            {/* <Instruction  instructionNbr={"1"}>Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray.</Instruction>
            <Instruction  instructionNbr={"1"}>Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray.</Instruction>
            <Instruction  instructionNbr={"1"}>Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray.</Instruction>
            <Instruction  instructionNbr={"1"}>Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray.</Instruction>
            <Instruction  instructionNbr={"1"}>Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray.</Instruction>
            <Instruction  instructionNbr={"1"}>Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray.</Instruction>
            <Instruction  instructionNbr={"1"}>Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray.</Instruction> */}
          </div>
        </div>
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
            onChange={(e) => setActiveFolder(e.target.value)}
            sx={{ width: "100%" }}
            inputProps={{
              name: "max-width",
              id: "max-width",
            }}
          >
            {folders.map((f) => (
              <MenuItem key={f.id} value={f.label}>
                {f.label}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} autoFocus>
            Disagree
          </Button>
          <Button onClick={() => handleAddMealToFolder(activeFolder, mealId)}>
            Add to Folder
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
