import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  login,
  getItems,
  createItem,
  updateItem,
  deleteItem,
  getItemById,
  getLocations,
  getLocationsTree,
  getLabels,
  createLocation,
  createLabel,
} from "./api";

// Auth Hooks
export const useLogin = () => {
  return useMutation({
    mutationFn: ({ username, password, stayLoggedIn }) =>
      login(username, password, stayLoggedIn),
  });
};

// Helper to format date relative or absolute
const formatRelativeDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) return "Today";
  if (diffDays <= 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
};

// Inventory Hooks
export const useItems = (
  page = 1,
  pageSize = 10,
  search = "",
  locationId = ""
) => {
  return useQuery({
    queryKey: ["items", page, pageSize, search, locationId],
    queryFn: () => getItems(page, pageSize, search, locationId),
    keepPreviousData: true,
    retry: false, // Don't retry on 401s
    select: (data) => {
      // Transform API data to UI format
      const items = (data.items || []).map((item) => ({
        ...item,
        // UI expects 'model' but API gives 'assetId' or 'description'
        model: item.assetId || item.id,
        // UI expects location string, API gives object
        location: item.location?.name || "Unknown",
        subLocation: "", // API doesn't provide subLocation yet
        // UI expects labels with text/bg tokens
        labels: (item.labels || []).map((l) => ({
          text: l.name,
          bg: l.color || "#eff6ff", // Use color from API or default light blue
          textCol: "#1e3a8a", // Default dark blue text
        })),
        updated: formatRelativeDate(item.updatedAt),
        // Ensure color exists for placeholder
        color: "#e0e7ff",
      }));

      return {
        ...data,
        items,
      };
    },
  });
};

export const useItem = (id) => {
  return useQuery({
    queryKey: ["items", id],
    queryFn: () => getItemById(id),
    enabled: !!id,
  });
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["items"]);
    },
  });
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }) => updateItem(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["items"]);
      queryClient.invalidateQueries(["items", variables.id]);
    },
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["items"]);
    },
  });
};

// Locations Hooks
export const useLocations = () => {
  return useQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
  });
};

export const useLocationsTree = () => {
  return useQuery({
    queryKey: ["locations", "tree"],
    queryFn: getLocationsTree,
  });
};

export const useCreateLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLocation,
    onSuccess: () => queryClient.invalidateQueries(["locations"]),
  });
};

// Labels Hooks
export const useLabels = () => {
  return useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
  });
};

export const useCreateLabel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLabel,
    onSuccess: () => queryClient.invalidateQueries(["labels"]),
  });
};
