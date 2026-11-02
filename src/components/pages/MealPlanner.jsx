import Button from "@mui/material/Button";
import { useState, useEffect, useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useFolders } from "../../context/FoldersContext";
import axios from "axios";
import { closestCorners, useDraggable, useDroppable } from "@dnd-kit/core";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function MealPlanner() {
  const [focus, setFocus] = useState(false);
  const [searchedMeal, setSearchedMeal] = useState("");
  const { folders } = useFolders();
  const [loading, setLoading] = useState();
  const [meals, setMeals] = useState([]);
  const sensors = useSensors(
  useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
  useSensor(TouchSensor, {
    activationConstraint: { delay: 200, tolerance: 8 },
  }),
);
  const [activeDay, setActiveDay] = useState(
    () => new Date().toString().split(" ")[0],
  );

  function getWeek() {
    let day = new Date();
    let week = [];

    for (let i = 1; i <= 7; i++) {
      week.push({
        key: day.toDateString(),
        date: day.toString().split(" ")[2],
        name: day.toString().split(" ")[0],
        breakfast: null,
        lunch: null,
        dinner: null,
      });
      day.setDate(day.getDate() + 1);
    }
    return week;
  }

  function loadSaved() {
    try {
      return JSON.parse(localStorage.getItem("days")) ?? [];
    } catch {
      return [];
    }
  }
  const [days, setDays] = useState(() => {
    const savedDays = loadSaved();
    return getWeek().map(
      (d) => savedDays.find((sDay) => sDay.key === d.key) ?? d,
    );
  });

  useEffect(() => {
    const mealsIds = [];
    folders?.forEach((f) => f.meals?.forEach((mId) => mealsIds.push(mId)));
    Promise.all(
      mealsIds.map((mId) =>
        axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mId}`,
        ),
      ),
    )
      .then((responces) => {
        setMeals(responces.map((res) => res.data.meals[0]));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const targetMeals = useMemo(() => {
    return meals.filter((m) =>
      m?.strMeal.toLowerCase().includes(searchedMeal.trim().toLowerCase()),
    );
  }, [searchedMeal, meals]);

  function clearWeek() {
    setDays(
      days.map((d) => {
        return { ...d, breakfast: null, lunch: null, dinner: null };
      }),
    );
  }

  function handleDragEnd({ active, over }) {
    if (!over) return;
    const [index, slot] = over.id.split("-");
    const newDays = days.map((d, i) =>
      i === Number(index) ? { ...d, [slot]: active.data.current.meal } : d,
    );

    setDays(newDays);
    localStorage.setItem("days", JSON.stringify(newDays));
  }

  function handleDeleteMeal(id) {
    const [index, slot] = id.split("-");
    const newDays = days.map((p, i) =>
      i === Number(index) ? { ...p, [slot]: null } : p,
    );
    setDays(newDays);
    localStorage.setItem("days", JSON.stringify(newDays));
  }

  return (
    <DndContext modifiers={[restrictToWindowEdges]} onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="px-6 py-8 grid grid-cols-6 lg:grid-cols-12 gap-6  ">
        <div className="col-span-6 lg:col-span-9">
          <div className="flex items-center justify-between mb-6 w-full">
            <div>
              <h1 className="text-[clamp(30px,6vw,45px)] font-bold text-on-background ">
                Mela Planner
              </h1>
              <span>
                Week of {new Date().toDateString().slice(4, 11)} -{" "}
                {`${new Date().toDateString().slice(4, 8)} ${days[6].date}  `}
              </span>
            </div>
            <div>
              <Button
                variant="outlined"
                className="text-sm text-on-background! lowercase! px-4! "
                onClick={clearWeek}
              >
                Clear Week
              </Button>
            </div>
          </div>
          <div className="overflow-x-scroll  w-full lg:w-full lg:scrollbar-none scrollbar-track-transparent">
            <div className="min-w-180 md:min-w-0 overflow-hidden">
              <table className="border-separate border w-full table-fixed border-spacing-0 border-surface-container-highest overflow-hidden rounded-2xl ">
                <thead>
                  <tr className="bg-surface-container">
                    <th className="border border-surface-container-highest rounded-tl-[15px]"></th>
                    {days.map((d, i) => (
                      <th
                        key={i}
                        className={`uppercase border ${i === days.length - 1 ? "rounded-tr-[15px]" : ""} ${activeDay === d.name ? " border-b-4 border-r-0 border-l-0 border-b-primary bg-primary-fixed/20" : ""} border-surface-container-highest`}
                      >
                        <div className="flex flex-col py-1 ">
                          <span
                            className={`font-semibold text-xs ${activeDay === d.name ? "text-primary" : "text-on-surface-variant"}  `}
                          >
                            {d.name}
                          </span>
                          <span
                            className={`font-semibold text-[20px]  ${activeDay === d.name ? "text-primary" : "text-on-background"}`}
                          >
                            {d.date}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-on-surface-variant text-xs border font-semibold border-surface-container-highest bg-surface-container">
                      <div className=" h-32 flex justify-center items-center ">
                        Breakfast
                      </div>
                    </td>
                    {days.map((d, i) => (
                      <td
                        key={d.key}
                        className="border border-surface-container-highest p-1"
                      >
                        <DroppableMeal
                          meal={d.breakfast}
                          id={`${i}-breakfast`}
                          handleDeleteMeal={handleDeleteMeal}
                        ></DroppableMeal>
                      </td>
                    ))}
                    {/* <td className="border border-surface-container-highest"></td>
                    <td className="border border-surface-container-highest"></td>
                    <td className="border border-surface-container-highest"></td>
                    <td className="border border-surface-container-highest"></td>
                    <td className="border border-surface-container-highest"></td>
                    <td className="border border-surface-container-highest"></td>
                    <td className="border border-surface-container-highest"></td> */}
                  </tr>
                  <tr>
                    <td className="text-on-surface-variant text-xs font-semibold border border-surface-container-highest bg-surface-container">
                      <div className=" h-32 flex justify-center items-center ">
                        Lunch
                      </div>
                    </td>
                    {days.map((d, i) => (
                      <td
                        key={d.key}
                        className="border border-surface-container-highest p-1"
                      >
                        <DroppableMeal
                          meal={d.lunch}
                          id={`${i}-lunch`}
                          handleDeleteMeal={handleDeleteMeal}
                        ></DroppableMeal>
                      </td>
                    ))}
                    {/* <td className="border border-surface-container-highest p-1"></td>
                    <td className="border border-surface-container-highest"></td>
                    <td className="border border-surface-container-highest"></td>
                    <td className="border border-surface-container-highest"></td>
                    <td className="border border-surface-container-highest"></td>
                    <td className="border border-surface-container-highest"></td>
                    <td className="border border-surface-container-highest"></td> */}
                  </tr>
                  <tr>
                    <td className="text-on-surface-variant text-xs font-semibold border border-surface-container-highest bg-surface-container rounded-bl-[15px]">
                      {" "}
                      <div className=" h-32 flex justify-center items-center ">
                        Dinner
                      </div>
                    </td>
                    {days.map((d, i) => (
                      <td
                        key={d.key}
                        className={`border border-surface-container-highest p-1 ${i === 6 ? "rounded-br-[15px]" : ""}`}
                      >
                        <DroppableMeal
                          meal={d.dinner}
                          id={`${i}-dinner`}
                          handleDeleteMeal={handleDeleteMeal}
                        ></DroppableMeal>
                      </td>
                    ))}
                    {/* <td className="border border-surface-container-highest"></td>
                    <td className="border border-surface-container-highest"></td>
                    <td className="border border-surface-container-highest"></td>
                    <td className="border border-surface-container-highest"></td>
                    <td className="border border-surface-container-highest"></td>
                    <td className="border border-surface-container-highest"></td>
                    <td className="border border-surface-container-highest rounded-br-[15px]"></td> */}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-span-6 md: lg:col-span-3 p-4 rounded-2xl border border-surface-container-highest">
          <div>
            <h2 className="font-semibold text-[20px] mb-1">Saved Recipes</h2>
            <div className="relative text-on-surface-variant md:w-1/2 w-full 9x:w-full! ">
              <SearchIcon
                className={`absolute ${focus ? "hidden!" : "block"} left-1 top-1/2 -translate-y-1/2`}
              ></SearchIcon>
              <input
                onBlur={() => setFocus(false)}
                onFocus={() => setFocus(true)}
                className={`${focus ? "pl-4" : "pl-7"} py-1.5  border outline-0   w-full! placeholder:text-on-surface-variant border-surface-variant  rounded-xl `}
                type="text"
                placeholder="Search"
                onChange={(e) => setSearchedMeal(e.target.value)}
                value={searchedMeal}
              />
            </div>
          </div>
          <div className="grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-1 ">
            {targetMeals.map((m) => (
              <DraggableMeal key={m.idMeal} meal={m}></DraggableMeal>
            ))}
            {/* <DragOverlay></DragOverlay> */}
          </div>
        </div>
      </div>
    </DndContext>
  );
}

function DraggableMeal({ meal }) {
  const { setNodeRef, listeners, transform, attributes, isDragging } =
    useDraggable({
      id: meal.idMeal,
      data: { meal },
    });

  const style = transform
    ? { transform: `translate(${transform.x}px,${transform.y}px)` }
    : undefined;
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      style={style}
      {...attributes}
      className={` rounded-lg border cursor-grab active:cursor-grab border-surface-container-highest flex gap-2 items-center  bg-background  transition-[width,padding] duration-200  ${isDragging ? "w-25 p-1" : "p-2 w-full"} `}
    >
      {isDragging ? (
        <div
          className={`rounded-md overflow-hidden border border-surface-container-highest bg-background flex flex-col h-32 `}
        >
          <div className="basis-1/2  overflow-hidden shrink-0">
            <img
              src={meal?.strMealThumb}
              alt="Meal image"
              className=" object-cover object-center w-full h-full  "
            />
          </div>
          <div className="text-[clamp(14px,2vw,15px)] p-2 flex items-center h-1/2 leading-4  font-semibold text-on-background line-clamp-2">
            {meal?.strMeal}
          </div>
        </div>
      ) : (
        <>
          <div className="w-16 h-16 shrink-0">
            <img
              src={meal.strMealThumb}
              alt="meal Image"
              className="object-cover rounded-2xl"
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-on-background line-clamp-1">{meal.strMeal}</h3>
            <span className="text-sm text-on-surface-variant ">
              {meal.strCategory ?? ""}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

function DroppableMeal({ meal, id, handleDeleteMeal }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: { meal },
  });

  return (
    <div
      className={`h-32 rounded-md ${isOver ? "bg-primary/20 " : ""}`}
      ref={setNodeRef}
    >
      {meal && (
        <Link to={`/meals/${meal?.idMeal}`}>
          {" "}
          <div
            className={`rounded-md overflow-hidden border border-surface-container-highest bg-background flex flex-col h-32 group`}
          >
            <div className="basis-1/2  overflow-hidden shrink-0 relative">
              <img
                src={meal?.strMealThumb}
                alt="Meal image"
                className=" object-cover object-center w-full h-full  "
              />
              <button
                className="absolute transition-all -top-6 -right-6 group-hover:top-0 group-hover:right-0 cursor-pointer "
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteMeal(id);
                }}
              >
                <RemoveCircleIcon className="text-red-600 top-1 z-40   right-1 drop-shadow-md "></RemoveCircleIcon>
              </button>
            </div>
            <div className="text-[clamp(12px,2vw,15px)] p-2 flex items-center h-1/2 leading-4  font-semibold text-on-background  ">
              <span className="line-clamp-2 ">{meal?.strMeal}</span>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
