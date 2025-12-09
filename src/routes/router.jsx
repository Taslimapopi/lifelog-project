import { createBrowserRouter } from "react-router";
import AuthLayouts from "../layOuts/AuthLayouts";
import Login from "../pages/Auth/login";
import Register from "../pages/Auth/Register";
import HomeLayout from "../layOuts/HomeLayout";
import Home from "../pages/HomeLayouts/Home";
import DashboardLayout from "../layOuts/DashboardLayout";
import AddLessions from "../pages/addLessions/AddLessions";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./Privateraroutes";
import MyLessons from "../pages/Dashboard/MyLessons";
import LessonDetails from "../pages/LessionDetails/LessonDetails";
import UpdateLessonForm from "../pages/UpdateLesson/UpdateLesson";


export const router = createBrowserRouter([
    {
        path:'/',
        element: <HomeLayout></HomeLayout>,
        children:[
            {
                index:true,
                Component:Home,
            },
            {
                path:'/add-lessons',
                element:<PrivateRoute><AddLessions></AddLessions></PrivateRoute> 
            },
            {
                path:'/lessons/:id',
                element: <LessonDetails></LessonDetails>
            }
        ]
    },
    {
        path:'/auth',
        element:<AuthLayouts></AuthLayouts>,
        children: [
            {
                path:'/auth/login',
                element: <Login></Login>
            },
            {
                path:'/auth/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path:'dashboard',
        element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            // author routes
            {
                path:'/dashboard/my-lessons',
                element: <MyLessons></MyLessons>
            },
            {
                path: '/dashboard/update-lesson/:id',
                element: <UpdateLessonForm></UpdateLessonForm>
            }
        ]

    },
    {
        path:'/*',
        element:<ErrorPage></ErrorPage>
    }

])