import { View, Text, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useTheme } from "../../contexts/ThemeContext";

export default function Home() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Monthly Savings Tracker</Text>

      <Link href="/add" asChild>
        <Button title="Add Monthly Savings" />
      </Link>

      <Link href="/history" asChild>
        <Button title="View History" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
