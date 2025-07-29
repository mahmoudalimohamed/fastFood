import useAuthStore from "@/store/auth.store";
import { Button, Text, View } from "react-native";

function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);
  return <Button title="Logout" onPress={logout} />;
}

function ViewUser({ user }) {
  return (
    <View>
      <Text>{user?.name}</Text>
      <Text>{user?.email}</Text>
    </View>
  );
}

export default function Profile() {
  const { user } = useAuthStore();
  return (
    <>
      <ViewUser user={user} />
      <LogoutButton />
    </>
  );
}
