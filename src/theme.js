import { createTheme } from "@mui/material/styles"; ;
const theme = createTheme({
    palette:{
        primary:{
            main:'#9b4500'
        },
        background:{
            default:'#fcf9f8',
            paper:'#ffffff'
        },
    },
    typography:{
        fontFamily:"Geist , sans-serif",
    } ,
    shape:{
        borderRadius: '8px',
    }
})

export default theme ;