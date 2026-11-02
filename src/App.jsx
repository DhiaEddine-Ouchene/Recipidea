import './App.css'
import { Route , Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './components/pages/Home';
import Favorites from './components/pages/Favorites';
import MealPlanner from './components/pages/MealPlanner';
import MealsProvider from './context/MealsContext';
import FoldersProvider from './context/FoldersContext';
import Meal from './components/pages/Meal';
function App() {

  return (
    <>
    <MealsProvider>
      <FoldersProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index  element={<Home></Home>}></Route>
          <Route path='meals/:mealId' element={<Meal/>}></Route>
          <Route path='Favorites' element={<Favorites></Favorites>}></Route>
          <Route path='MealPlanner' element={<MealPlanner></MealPlanner>}></Route>
        </Route>
      </Routes>
      </FoldersProvider>
      </MealsProvider>
    </>
  )
}

export default App
