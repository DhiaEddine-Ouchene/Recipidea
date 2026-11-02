import { createContext, useState } from "react";
import { useContext , useEffect} from "react";

const FoldersContext = createContext() ;

export default function FoldersProvider({children}){
    const [folders , setFolders] = useState(()=>{
        try{
            return JSON.parse(localStorage.getItem('folders')) ?? [] ;
        }catch{
            return []
        }
    }) ;
     const [activeFolder , setActiveFolder] = useState(()=>  folders.length >0 ? folders[0].label : '') ;

    useEffect(()=>{
        localStorage.setItem("folders",JSON.stringify(folders))
    },[folders])

    return(
        <FoldersContext.Provider  value={{activeFolder,setActiveFolder,folders,setFolders}}>
            {children}
        </FoldersContext.Provider>
    )
}



export const useFolders =()=>{
    const context = useContext(FoldersContext) ;
    if(!context) throw new Error("useFolders must be used within a FoldersProvider") ;
    return context ;
}