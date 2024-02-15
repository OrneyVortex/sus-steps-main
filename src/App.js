import {createBrowserRouter} from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/home";
import { Provider } from "react-redux";
import appStore from './utils/appStore';

function App() {

  const appRouter = createBrowserRouter([
    {
        path:"/",
        element: <Login/>
    },
    {
        path:"/home",
        element:<Home/> 
    }
]);

  return (
    <Provider store={appStore}>
    <div>
      <RouterProvider router={appRouter} /> 
    </div>
    </Provider>
  );
}

export default App;
