import { Route, Routes } from "react-router-dom";
import Layout from "./components/auth/Layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashBoard from "./pages/admin-view/dashboard";
import AdminFeature from "./pages/admin-view/features";
import AdminOrders from "./pages/admin-view/orders";
import AdminProducts from "./pages/admin-view/products";
import ShoppingLayout from "./components/shopping-view/layout";
import Tr from "./pages/not-found/tr";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingListin from "./pages/shopping-view/listing";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import Unauth from "./pages/unauth-page/unauth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuthStatus } from "./store/auth-slice/slice";
import PaypalReturn from "./pages/shopping-view/paypal-return";
import PaymentSuccess from "./pages/shopping-view/payment-success";
import SearchPage from "./pages/shopping-view/search";
//import { Skeleton } from "@/components/ui/skeleton"


function App() {

  // const isAuthenticated=true;
  // const user={
  //   name:"shekhar",
  //   role:"user",
  // };

  // const isAuthenticated=false;
  // const user=null;
  const {user,isAuthenticated,isLoading}=useSelector(state=>state.auth)

 const dispatch=useDispatch();

 useEffect(()=>{
   dispatch(checkAuthStatus());
 },[dispatch])

if(isLoading) return <div>Loading...</div>


  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      
      <Routes>
      <Route path="/auth" element={<Layout />}>
  <Route path="login" element={<AuthLogin />} />
  <Route path="register" element={<AuthRegister />} />
</Route>

  <Route path="/admin" element={
    <CheckAuth isAuthenticated={isAuthenticated} user={user}>
    <AdminLayout/>
    </CheckAuth>}>
  <Route path="dashboard" element={<AdminDashBoard/>} />
  <Route path="feature" element={<AdminFeature/>} />
  <Route path="orders" element={<AdminOrders/>} />
  <Route path="product" element={<AdminProducts/>} />
  </Route>
  <Route path="/shop" element={
  <CheckAuth isAuthenticated={isAuthenticated} user={user}>
    <ShoppingLayout />
  </CheckAuth>
}>
  <Route path="home" element={<ShoppingHome />} />
  <Route path="checkout" element={<ShoppingCheckout />} />
  <Route path="listing" element={<ShoppingListin />} />
  <Route path="account" element={<ShoppingAccount />} />
  <Route path="paypal-return" element={<PaypalReturn/>}/>
  <Route path="payment-success" element={<PaymentSuccess/>}/>
  <Route path="search" element={<SearchPage/>}/>
</Route>


  <Route path="/unauth" element={<Unauth/>}></Route>
  <Route path="*" element={<Tr/>}/>
</Routes>

    </div>
  );
}

export default App;
