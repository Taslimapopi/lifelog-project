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
import PublicLessons from "../pages/HomeLayouts/PublicLessons";
import LoadingSpinner from "../pages/LoadingSpinner";
import PublicLesson from "../pages/HomeLayouts/PublicLesson";
import Pricing from "../Components/Form/Home/Pricing";
import Payment from "../Payment/Payment";
import PaymentCancelled from "../Payment/PaymentCancelled";
import MyFavorites from "../pages/Dashboard/FavriteLessons";
import Profile from "../pages/Auth/Profile";
import AdminHome from "../pages/AdminDashboard/AdminHome";
import ManageUser from "../pages/AdminDashboard/ManageUser";
import ManageLessons from "../pages/AdminDashboard/ManageLessons";
import ReportedLessons from "../pages/AdminDashboard/ReportedLessons";
import AdminProfile from "../pages/AdminDashboard/AdminProfile";


export const router = createBrowserRouter([
    {
        path:'/',
        element: <HomeLayout></HomeLayout>,
        hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>,
        children:[
            {
                index:true,
                Component:Home,
            },
            {
                path: '/public-lessons',
                element:<PublicLesson></PublicLesson>

            },
            {
                path:'/pricing',
                element:<Pricing></Pricing>

            },
            {
                path:'/payment',
                element:<Payment></Payment>
            },
            {
                path:'/payment-cancelled',
                element:<PaymentCancelled></PaymentCancelled>

            },
            {
                path:'/add-lessons',
                element:<PrivateRoute><AddLessions></AddLessions></PrivateRoute> 
            },
            {
                path:'/lessons/:id',
                element: <LessonDetails></LessonDetails>
            },
            
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
            },
            {
                path:'/auth/profile',
                element:<Profile></Profile>
                
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
            },
            {
                path:'/dashboard/fav-lessons',
                element:<MyFavorites></MyFavorites>
            },
            // admin routes
            {
                path:'/dashboard/admin',
                element:<AdminHome></AdminHome>
            },
            {
                path:'/dashboard/admin/manage-users',
                element:<ManageUser></ManageUser>
            },
            {
                path:'/dashboard/admin/manage-lessons',
                element:<ManageLessons></ManageLessons>

            },
            {
                path:'/dashboard/admin/reported-lessons',
                element:<ReportedLessons></ReportedLessons>
            },
            {
                path:'/dashboard/admin/profile',
                element:<AdminProfile></AdminProfile>
            }
            
        ]

    },
    {
        path:'/*',
        element:<ErrorPage></ErrorPage>
    }

])