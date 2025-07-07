import { Redirect, Slot } from "expo-router";
import useAuthStore from "../../store/auth.store";

export default function TabsLayout() {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Redirect href={"/login"} />;
  return <Slot />;
}
