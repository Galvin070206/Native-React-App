import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { api } from "../services/api";
import { useRouter } from "expo-router";
import { useTheme } from "../../contexts/ThemeContext";

export default function AddSavings() {
  const { theme } = useTheme();
  const [month, setMonth] = useState("");
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async () => {
    if (!month || !income || !expenses) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/savings", {
        month,
        income: parseFloat(income),
        expenses: parseFloat(expenses),
      });
      Alert.alert("Success", "Savings added successfully");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to add savings");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TextInput
        style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
        placeholder="Month (e.g., January 2025)"
        placeholderTextColor={theme.colors.textSecondary}
        value={month}
        onChangeText={setMonth}
      />
      <TextInput
        style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
        placeholder="Income"
        placeholderTextColor={theme.colors.textSecondary}
        keyboardType="decimal-pad"
        value={income}
        onChangeText={setIncome}
      />
      <TextInput
        style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
        placeholder="Expenses"
        placeholderTextColor={theme.colors.textSecondary}
        keyboardType="decimal-pad"
        value={expenses}
        onChangeText={setExpenses}
      />
      <Button title={loading ? "Saving..." : "Save"} onPress={submit} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
