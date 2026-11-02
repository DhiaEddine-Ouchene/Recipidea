import Checkbox from "@mui/material/Checkbox"
import { useState } from "react"


export default function Ingredient({ingredientName , ingredientQuantity , allChecked}){
    const [checked , setChecked] = useState(false)
    return (
        <div className="flex justify-between items-center">
            <div className="text-on-background">
                <Checkbox className="m-0 p-0" checked={ checked || allChecked } onChange={e=>setChecked(e.target.checked)} sx={{color:"#897266"}}></Checkbox>
                {ingredientName}
            </div>
            <span className="text-on-surface-variant">{ingredientQuantity}</span>
        </div>
    )
}