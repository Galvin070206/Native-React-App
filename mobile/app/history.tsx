import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { api } from "../services/api";

interface Saving {
  id: number;
  month: string;
  income: number;
  expenses: number;
  savings: number;
}

export default function History() {
  const [data, setData] = useState<Saving[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSavings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/savings");
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch savings:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchSavings();
    }, [fetchSavings])
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <Text style={styles.emptyText}>No savings records yet</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.month}>{item.month}</Text>
              <Text style={styles.detail}>Income: ${item.income.toFixed(2)}</Text>
              <Text style={styles.detail}>Expenses: ${item.expenses.toFixed(2)}</Text>
              <Text style={[styles.detail, styles.savings]}>
                Savings: ${item.savings.toFixed(2)}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  month: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detail: {
    fontSize: 14,
    marginBottom: 5,
    color: "#555",
  },
  savings: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#27ae60",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 20,
  },
});
