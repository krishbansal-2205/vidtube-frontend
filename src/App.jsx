import React, { useEffect } from "react"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import { useDispatch } from "react-redux"
import { getCurrentUser } from "./store/slices/authSlice"

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Sidebar >
        <Navbar />
        <Home />
      </Sidebar>
    </>
  )
}

export default App
