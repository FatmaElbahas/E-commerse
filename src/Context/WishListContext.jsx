import { createContext, useContext, useEffect, useState } from "react";
import { TokenContext } from "./TokenContext";
import axios from "axios";
import { toast } from "react-toastify";

export const wishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const { token } = useContext(TokenContext);
  const [wishlistInfo, setWishlistInfo] = useState(null);

  useEffect(() => {
    if (token) {
      console.log("✅ Token exists. Fetching wishlist...");
      getAllwishList();
    }
  }, [token]);

  async function AddToWishlist(productId) {
    const loading = toast.loading('Adding to wishlist...');
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        data: { productId },
        headers: { token },
      };

      const { data } = await axios.request(options);
      console.log(data);

      if (data.status === 'success') {
        getAllwishList();
        toast.success(data.message);
      }
    } catch (error) {
      console.log("❌ Error adding to wishlist:", error);
      toast.error(error.response?.data?.message || "Error adding to wishlist");
    } finally {
      toast.dismiss(loading);
    }
  }

  async function getAllwishList() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: { token },
      };
      const { data } = await axios.request(options);
      console.log(data);
      setWishlistInfo(data);
    } catch (error) {
      console.log("❌ Error getting wishlist:", error);
    }
  }

  async function removeFromWishlist(productId) {
    const loading = toast.loading("Removing...");

    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        method: 'DELETE',
        headers: { token },
      };

      const { data } = await axios.request(options);

      setWishlistInfo((prev) => ({
        ...prev,
        data: prev.data.filter((item) => item.id !== productId),
        count: prev.count - 1,
      }));

      toast.success(data.message || "Removed from wishlist");
    } catch (error) {
      console.log("❌ Error removing from wishlist:", error);
      toast.error("Something went wrong");
    } finally {
      toast.dismiss(loading);
    }
  }

  return (
    <wishlistContext.Provider
      value={{ AddToWishlist, getAllwishList, wishlistInfo, removeFromWishlist }}
    >
      {children}
    </wishlistContext.Provider>
  );
}