import useAuthStore from "@/store/auth.store";
import { Button } from "react-native";

export default function Profile() {
  const LogoutButton = () => {
    const logout = useAuthStore((state) => state.logout);
    return <Button title="Logout" onPress={logout} />;
  };

  return (
    <>
      <LogoutButton />
    </>
  );
}
