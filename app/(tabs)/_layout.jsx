import { Redirect, Slot } from "expo-router";

export default function TabsLayout() {
  const isAuthed = false;

  if (!isAuthed) return <Redirect href={"/login"} />;
  return <Slot />;
}
