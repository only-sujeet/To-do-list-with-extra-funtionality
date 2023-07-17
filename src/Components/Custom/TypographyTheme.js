import {  createTheme} from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: ["Yrsa", "serif"].join(","),
        fontSize: 14,
        h1: {
            fontFamily: ["Yrsa", "serif"].join(","),
            fontSize: 40,
        },
        h2: {
            fontFamily: ["Yrsa", "serif"].join(","),
            fontSize: 32,
        },
        h3: {
            fontFamily: ["Yrsa", "serif"].join(","),
            fontSize: 24,
        },
        h4: {
            fontFamily: ["Yrsa", "serif"].join(","),
            fontSize: 20,
        },
        h5: {
            fontFamily: ["Josefin Sans", "serif"].join(","),
            fontSize: 16,
            fontWeight:"-moz-initial"
        },
        h6: {
            fontFamily: ["Yrsa", "serif"].join(","),
            fontSize: 14,
        },
        caption: {
            fontFamily: ["Yrsa", "serif"].join(","),
            fontSize: 16,
        },
        body1:{
            fontFamily: ["Yrsa", "serif"].join(","),
            fontWeight:"bolder",
            fontSize:20
        },
        overline:{
            fontFamily: ["Yrsa", "serif"].join(","),
            fontWeight:"bolder"
        }
    }

})

export default theme