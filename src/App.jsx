import Body from "./components/Body";
import Header from "./components/Header";
import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import RestaurantCategory from "./components/RestaurantCategory";
import UserContext from "./utils/UserContext";
import { useEffect, useState } from "react";


const AppLayout = () => {

  const [userName,setUserName]=useState("John Doe");

  // authentication 
  useEffect(()=>{
    //authentication
    const data={
      name:"Jane Smith",
    }
    setUserName(data.name);
  }, [])

  return (
    <UserContext.Provider value={{loggedInUser: userName,setUserName}} >
    <div className="app">
      {/* <UserContext.Provider value={{loggedInUser:"adinath"}} > */}
      <Header />
      {/* </UserContext.Provider> */}
      <Outlet />
    </div>
    </UserContext.Provider>
  );
};


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "restaurant/:resId",
        element: <RestaurantCategory />
      }
    ],
  },
]);


const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
