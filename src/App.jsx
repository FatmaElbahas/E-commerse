import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Signup from "./Pages/Signup/Signup";
import Checkout from "./Pages/Checkout/Checkout";
import Brands from "./Pages/Brands/Brands";
import Categories from "./Pages/Categories/CategoriesSlider";
import Favourites from "./Pages/Favourites/Favourites";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import WishList from "./Pages/WishList/WishList";
import SearchProducts from "./Pages/SearchProducts/SearchProducts";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Layout from "./Components/Layout/Layout";
import Cart from "./Pages/Cart/Cart";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import TokenProvider from "./Context/TokenContext";
import CartProvider from "./Context/CartContext";
import Orders from "./Pages/Orders/Orders";
import VerifyCode from "./Pages/VerifyEmail/VerifyCode";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import WishlistProvider from "./Context/WishListContext";
import SingleBrand from "./Pages/SingleBrand/SingleBrand";
import RecentlyAdded from "./Pages/RecentlyAdded/RecentlyAdded";
import FeaturedProducts from "./Pages/FeaturedProducts/FeaturedProducts";

function App() {
  const routes = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><Layout /></ProtectedRoutes>,
    children: [
      { path: "", element: <Navigate to="Home" /> }, // 👈 Redirect to /Home
      { path: "Home", element: <Home /> },
      { path: "Wishlist", element: <WishList /> },
      { path: "SearcProducts", element: <SearchProducts /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "Favorites", element: <Favourites /> },
      { path: "Categories", element: <Categories /> },
      { path: "Cart", element: <Cart /> },
      { path: "Brands", element: <Brands /> },
      { path: "brand/:id", element: <SingleBrand /> },
      { path: "RecentlyAdded", element: <RecentlyAdded /> },
      { path: "FeaturedProducts", element: <FeaturedProducts /> },
      { path: "Orders", element: <Orders /> },
      { path: "Checkout", element: <Checkout /> },
      { path: "*", element: <NotFound /> },
    ],
  },

  

    {
      path: "",
      element: <Layout />,
      children: [
        { path: "Signup", element: <Signup /> },
        { path: "Login", element: <Login /> },
        { path: "ForgetPassword", element: <ForgetPassword /> }, // ✅ نُقلت هنا
        { path: "VerifyCode", element: <VerifyCode /> },
        { path: "ResetPassword", element: <ResetPassword/> },

      ],

    },
  ]);

  return (
    <>
      <TokenProvider>
        <CartProvider>
          <WishlistProvider>
          <RouterProvider router={routes} />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            closeButton={false}
            closeOnClick={true}
          />
          </WishlistProvider>
        </CartProvider>
      </TokenProvider>
    </>
  );
}

export default App;
