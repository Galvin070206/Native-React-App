import axios from "axios";

const DEFAULT_BASE = "http://127.0.0.1:8001";

// Use environment variable if provided (EAS/Expo), otherwise default to localhost.
const BASE_URL = process.env.API_BASE_URL || DEFAULT_BASE;

export const api = axios.create({
  baseURL: BASE_URL,
});
