import React from "react"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Skeleton from "./components/Skeleton"

function App() {

  return (
    <>
      <Sidebar >
        <Navbar />
        <Skeleton />
      </Sidebar>
    </>
  )
}

export default App
