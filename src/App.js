import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Divider } from "@mui/material";
import Register from "./components/Register";
import { RecoilRoot } from "recoil";


const router = createBrowserRouter([

  {
    path: "/register",
    element: (
      <>        
        <Register />
        <Divider />
      </>
    ),
  },



]);

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />      
    </RecoilRoot>
  );
}


export default App;
