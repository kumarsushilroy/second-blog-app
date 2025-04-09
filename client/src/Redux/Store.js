
import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./Feature";

export default configureStore ({
    reducer:{
        alerts:alertSlice.reducer
    }
})
