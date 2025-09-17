const BASE_URL = 'https://notes-api.dicoding.dev/v1';

// Utility functions for API calls
const fetchWithAuth = async (url, options = {}) => {
  const token = getAccessToken();
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

// Token management
const putAccessToken = (accessToken) => {
  localStorage.setItem('accessToken', accessToken);
};

const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

// Authentication API
const register = async ({ name, email, password }) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const responseJson = await response.json();
  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
};

const login = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();
  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
};

const getUserLogged = async () => {
  const response = await fetchWithAuth(`${BASE_URL}/users/me`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
};

// Notes API
const addNote = async ({ title, body }) => {
  const response = await fetchWithAuth(`${BASE_URL}/notes`, {
    method: 'POST',
    body: JSON.stringify({ title, body }),
  });

  const responseJson = await response.json();
  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
};

const getActiveNotes = async () => {
  const response = await fetchWithAuth(`${BASE_URL}/notes`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
};

const getArchivedNotes = async () => {
  const response = await fetchWithAuth(`${BASE_URL}/notes/archived`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
};

const getNote = async (id) => {
  const response = await fetchWithAuth(`${BASE_URL}/notes/${id}`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
};

const archiveNote = async (id) => {
  const response = await fetchWithAuth(`${BASE_URL}/notes/${id}/archive`, {
    method: 'POST',
  });

  const responseJson = await response.json();
  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.message;
};

const unarchiveNote = async (id) => {
  const response = await fetchWithAuth(`${BASE_URL}/notes/${id}/unarchive`, {
    method: 'POST',
  });

  const responseJson = await response.json();
  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.message;
};

const deleteNote = async (id) => {
  const response = await fetchWithAuth(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  });

  const responseJson = await response.json();
  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.message;
};

export {
  putAccessToken,
  getAccessToken,
  register,
  login,
  getUserLogged,
  addNote,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
};