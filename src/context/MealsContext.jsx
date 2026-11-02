import { useContext, createContext, useState } from "react";
import axios from "axios";

const MealsContext = createContext();
export default function MealsProvider({ children }) {
  const [searchWord, setSearchWord] = useState("");
  const [activeCuisine, setActiveCusine] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  let [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleSearch(e) {
    setLoading(true);
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${e.target.value.charAt(0)}`,
      )
      .then((response) => {
        let firstFilterdMeals = Array.isArray(response.data.meals)
          ? response.data.meals
          : [];
     
        let secondFilterMeals = firstFilterdMeals.filter((m) => {
          if (activeCategory === "All" && activeCuisine === "All") {
            return m?.strMeal
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          } else if (activeCategory === "All") {
            return (
              m.strCountry?.toLowerCase().trim() ===
                activeCuisine.toLowerCase().trim() &&
              m.strMeal?.toLowerCase().includes(e.target.value.toLowerCase())
            );
          } else {
            return (
              m.strMeal?.toLowerCase().includes(e.target.value.toLowerCase()) &&
              m.strCategory?.toLowerCase() === activeCategory.toLowerCase()
            );
          }
        });
        setMeals(secondFilterMeals);
      })
      .finally(() => setLoading(false));
  }

  return (
    <MealsContext.Provider
      value={{
        meals,
        setMeals,
        activeCategory,
        setActiveCategory,
        loading,
        setLoading,
        activeCuisine,
        setActiveCusine,
        searchWord,
        setSearchWord,
        handleSearch,
      }}
    >
      {children}
    </MealsContext.Provider>
  );
}

export function useMeals() {
  const context = useContext(MealsContext);
  if (!context) {
    throw new Error("useMeals must be used within a MealsProvider");
  }
  return context;
}
