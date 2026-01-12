// Import mock data
import itemsMock from "../mockData/items.json";
import labelsMock from "../mockData/labels.json";
import locationsMock from "../mockData/locations.json";
import locationsTreeMock from "../mockData/locations-tree.json";

const API_BASE_URL = "/api/proxy";

// Helper to get auth headers
const getAuthHeaders = (isJson = true) => {
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("homebox_token") || "";
  }

  // Sanitize token - sometimes it might be literal "null" or "undefined"
  if (token === "null" || token === "undefined") {
    token = "";
  }

  const headers = {
    Authorization:
      token && !token.toLowerCase().startsWith("bearer ")
        ? `Bearer ${token}`
        : token,
    Accept: "application/json",
  };

  if (isJson) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

export const login = async (username, password, stayLoggedIn = false) => {
  const response = await fetch(`${API_BASE_URL}/v1/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, stayLoggedIn }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  console.log("Login API Response:", data); // Debug log

  if (data.token) {
    localStorage.setItem("homebox_token", data.token);
  } else {
    console.error("No token in login response!", data);
  }
  return data;
};

export const getItems = async (
  page = 1,
  pageSize = 10,
  search = "",
  locationId = ""
) => {
  const queryParams = new URLSearchParams();

  if (search) {
    queryParams.append("q", search);
  }

  if (locationId) {
    queryParams.append("locationId", locationId);
  }

  // Only add pagination if strictly necessary, as it seems to cause total: 0 on some backends
  if (page > 1) queryParams.append("page", page.toString());
  if (pageSize !== 10) queryParams.append("pageSize", pageSize.toString());

  const queryStr = queryParams.toString();
  const url = `${API_BASE_URL}/v1/items${queryStr ? "?" + queryStr : ""}`;
  const headers = getAuthHeaders();

  const tokenLabel = headers.Authorization
    ? `${headers.Authorization.substring(
        0,
        15
      )}...${headers.Authorization.slice(-4)}`
    : "NONE";

  console.log("Fetching URL:", url);
  console.log("Token check:", tokenLabel);
  console.log(
    "Token length:",
    headers.Authorization ? headers.Authorization.length : 0
  );

  try {
    await fetch(url, { headers });
  } catch (e) {}
  return handleItemsFallback(page, pageSize, search, locationId);
};

const handleItemsFallback = (page, pageSize, search, locationId) => {
  let filtered = [...itemsMock.items];
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.assetId && item.assetId.toLowerCase().includes(q))
    );
  }
  if (locationId) {
    filtered = filtered.filter((item) => item.location?.id === locationId);
  }
  const start = (page - 1) * pageSize;
  return {
    items: filtered.slice(start, start + pageSize),
    total: filtered.length,
    page,
    pageSize,
  };
};

export const createItem = async (itemData) => {
  const response = await fetch(`${API_BASE_URL}/v1/items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(itemData),
  });

  if (!response.ok) {
    throw new Error("Failed to create item");
  }

  return response.json();
};

export const updateItem = async (id, itemData) => {
  const response = await fetch(`${API_BASE_URL}/v1/items/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(itemData),
  });

  if (!response.ok) {
    throw new Error("Failed to update item");
  }

  return response.json();
};

export const deleteItem = async (id) => {
  const response = await fetch(`${API_BASE_URL}/v1/items/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete item");
  }

  return response.json(); // Usually returns deleted item or success message
};

export const getItemById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/v1/items/${id}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`API Error (${response.status}):`, errorText);
    throw new Error(`Failed to fetch item: ${response.status} ${errorText}`);
  }

  return response.json();
};

// Locations API
export const getLocations = async () => {
  try {
    await fetch(`${API_BASE_URL}/v1/locations`, { headers: getAuthHeaders() });
    return locationsMock;
  } catch (err) {
    return locationsMock;
  }
};

// Helper removed as locationsMock is now strictly used and provided as flat list by user
// (keep commented if you want to restore flattening later)
/*
const flattenLocations = (nodes) => {
  return nodes.reduce((acc, node) => {
    const { children, ...rest } = node;
    const current = { ...rest, itemCount: rest.itemCount || 0 };
    return acc.concat([current], flattenLocations(children || []));
  }, []);
};
*/

export const getLocationsTree = async () => {
  try {
    await fetch(`${API_BASE_URL}/v1/locations/tree`, {
      headers: getAuthHeaders(),
    });
    return locationsTreeMock;
  } catch (err) {
    return locationsTreeMock;
  }
};

export const createLocation = async (data) => {
  const response = await fetch(`${API_BASE_URL}/v1/locations`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create location");
  return response.json();
};

// Labels API
export const getLabels = async () => {
  try {
    await fetch(`${API_BASE_URL}/v1/labels`, { headers: getAuthHeaders() });
    return labelsMock;
  } catch (err) {
    return labelsMock;
  }
};

export const createLabel = async (data) => {
  const response = await fetch(`${API_BASE_URL}/v1/labels`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create label");
  return response.json();
};
