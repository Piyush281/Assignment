const API_BASE_URL = "https://api.github.com/orgs/godaddy/repos";

export const fetchRepositories = async () => {
  const response = await fetch(`${API_BASE_URL}`);
  if (!response.ok) {
    throw new Error(`Error fetching repositories: ${response.statusText}`);
  }
  return response.json();
}
