import React, { useState } from "react";
import "./styles.css"; // Importing external CSS for styling

/**
 * This React component fetches random user data from the Random User Generator API.
 * Users can specify parameters (gender, nationality, number of users) before fetching.
 */
const App = () => {
  // State variables to manage user inputs
  const [gender, setGender] = useState(""); // Stores selected gender filter
  const [nationality, setNationality] = useState(""); // Stores selected nationality filter
  const [numUsers, setNumUsers] = useState(5); // Stores number of users to fetch
  const [users, setUsers] = useState([]); // Stores fetched user data
  const [loading, setLoading] = useState(false); // Manages loading state

  /**
   * Fetch users from the Random User Generator API based on selected parameters.
   * Uses async-await to handle API requests.
   */
  const fetchUsers = async () => {
    setLoading(true); // Indicate that data is being fetched
    try {
      // Construct the API URL dynamically based on user inputs
      let url = `https://randomuser.me/api/?results=${numUsers}`;
      if (gender) url += `&gender=${gender}`;
      if (nationality) url += `&nat=${nationality}`;

      // Fetch data from API and convert it to JSON
      const response = await fetch(url);
      const data = await response.json();
      setUsers(data.results); // Update state with fetched user data
    } catch (error) {
      console.error("Error fetching users:", error); // Handle API errors gracefully
    } finally {
      setLoading(false); // Reset loading state after API call completes
    }
  };

  return (
    <div className="container">
      <h1>Random User Generator</h1>

      {/* User input form */}
      <div className="form-group">
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="form-group">
        <label>Nationality:</label>
        <input
          type="text"
          placeholder="e.g., US, GB, FR"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Number of Users:</label>
        <input
          type="number"
          min="1"
          max="50"
          value={numUsers}
          onChange={(e) => setNumUsers(e.target.value)}
        />
      </div>

      {/* Fetch Users Button */}
      <button onClick={fetchUsers} disabled={loading}>
        {loading ? "Loading..." : "Fetch Users"}
      </button>

      {/* Display fetched user data */}
      <div className="user-container">
        {users.map((user, index) => (
          <div key={index} className="user-card">
            <img src={user.picture.medium} alt={user.name.first} />
            <h3>
              {user.name.first} {user.name.last}
            </h3>
            <p>{user.gender}</p>
            <p>{user.email}</p>
            <p>Nationality: {user.nat}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
