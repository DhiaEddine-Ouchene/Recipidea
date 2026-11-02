import { useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import IconButton from "@mui/material/IconButton";


export default function FolderCard({folder , handleDeleteFolder , handleFolderActive , activeFolder}){
    const [hover, setHover] = useState(false)
    
    return(
         <div
           
          className={`p-2 px-4 text-sm border border-outline-variant  inline-block rounded-3xl ${activeFolder === folder.label ? "bg-primary-fixed-dim" : ""}`}
           onMouseEnter={()=>setHover(true)}
           onMouseLeave={()=>setHover(false)}

          >
            <FolderOpenIcon className="mr-2" onClick={()=>handleFolderActive(folder.label)}></FolderOpenIcon>
         
             {folder.label}{" "}
             {hover ?<IconButton onClick={()=>handleDeleteFolder(folder.id)} aria-label="delete"  className="ml-4  !w-6 !h-6 " color="error" ><DeleteIcon fontSize="inherit" className="!text-lg" /></IconButton> : ""}
            
          </div>
    )
}