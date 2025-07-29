// utils/logout.js
export default function Logout(navigate) {
  localStorage.removeItem("token");
  navigate("/Login"); // أو أي صفحة تحبيها
}