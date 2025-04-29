import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/layout"
import ShoppingLayout from "./components/shopping-view/layout"
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import CheckAuth from "./components/common/checkAuth"
import { useDispatch, useSelector } from "react-redux"
import { Skeleton } from "./components/ui/skeleton"
import Home from "./pages/shopping-view/Home"
import Listings from "./pages/shopping-view/Listings"
import { useEffect } from "react"
import { checkAuth } from "./store/auth-slice"
import AdminLayout from "./components/admin-view/layout"
import DashBoard from "./pages/admin-view/DashBoard"
import Features from "./pages/admin-view/Features"
import Orders from "./pages/admin-view/Orders"
import Products from "./pages/admin-view/Products"
import "./App.css"

function App() {
  const {user,isAuthenticated,isLoading}=useSelector(state=>state.auth);
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch])

  if(isLoading)
    return <Skeleton/>

  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <Routes>
        <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout/></CheckAuth>}>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
        <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout/></CheckAuth>}>
          <Route path="dashboard" element={<DashBoard/>}/>
          <Route path="products" element={<Products/>}/>
          <Route path="orders" element={<Orders/>}/>
          <Route path="features" element={<Features/>}/>
        </Route> 
        <Route path="/shop" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><ShoppingLayout/></CheckAuth>}>
            <Route path='home' element={<Home/>}/>
            <Route path='listing' element={<Listings/>}/>
            {/* <Route path='checkout' element={<Checkout/>}/>
            <Route path='account' element={<Account/>}/>
            <Route path='paypal-return' element={<PaypalReturnPage/>}/>
            <Route path='payment-success' element={<PaymentSuccessPage/>}/>
            <Route path='search' element={<SearchProducts/>}/> */}
        </Route>
        {/*
        <Route path="/unauth-page" element={<UnAuthPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/> */}
      </Routes>
      
    </div>
  )
}
export default App