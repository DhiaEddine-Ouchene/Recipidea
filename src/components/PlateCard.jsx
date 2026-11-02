// import PlateImg from '../assets/Plate.svg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { useFolders } from '../context/FoldersContext';
import { Link } from 'react-router-dom';

export default function PlateCard({meal  , isLoading ,handleLikeClick}){
    const {folders , setFolders} = useFolders() ;
    const [like , setLike] = useState(()=>{
        
         
       if (folders.find(f=>f?.meals.includes(meal.idMeal))) 
       {
        return true
       } else {
        return false
       }
    }) ;

    function handleLike(){
        console.log(like)
        setLike(!like);
        if(!like){handleLikeClick(meal.idMeal)}else{
            setFolders(folders.map(f => f.meals.includes(meal.idMeal) ? {...f , meals : f.meals.filter(m=> m !== meal.idMeal)} : f)) ;
        } ;
        
    
    }

    return(
        <div className=' rounded-lg overflow-hidden border-1 border-outline-variant shadow-xl'>
            <div className='relative'>
                <Link to={`/meals/${meal.idMeal}`}>
                <div className='overflow-hidden' >
                    {isLoading ? <Skeleton variant='rounded' className='w-full ' animation='pulse' height={"240px"}></Skeleton>:<img src={meal.strMealThumb} className=' object-cover w-full h-60 transition-transform hover:scale-110' alt="Plate Image" /> }
                </div>
                </Link>
                
            
            <div className='w-8 h-9.5 bg-white absolute right-3 top-3 rounded-lg flex justify-center cursor-pointer' onClick={handleLike}>
               {like ? <FavoriteIcon className='text-primary mt-1'></FavoriteIcon> : <FavoriteBorderIcon  className='text-outline mt-1'></FavoriteBorderIcon>} 
            </div>
            </div>
            <div className='p-4'>
                {isLoading ? <Skeleton variant='rounded' width={150} height={25} sx={{paddingBottom:4}}></Skeleton> :<h2 className='text-lg font-bold pb-1'>{meal.strMeal}</h2>}
                <div className='flex gap-4 '>
                   {isLoading ? <Skeleton variant='rounded' width={50} height={20} className='mt-1'></Skeleton>: meal.strArea  ? <span className='text-on-surface-variant px-2  rounded-sm text-sm bg-surface-container-high'>{meal.strArea}</span> : ''} 
                   {isLoading ? <Skeleton variant='rounded' width={50} height={20} className='mt-1'></Skeleton>: meal.strCategory  ? <span className='text-on-surface-variant px-2  rounded-sm text-sm bg-surface-container-high'>{meal.strCategory}</span> : ''} 
                </div>
            </div>
        </div>
    )
}