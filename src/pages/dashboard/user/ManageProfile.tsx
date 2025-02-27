import { useState } from "react";

const ManageProfile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Main St, City, Country",
  });

  const [editMode, setEditMode] = useState(false);
  const [newAddress, setNewAddress] = useState(profile.address);

  const handleSave = () => {
    setProfile({ ...profile, address: newAddress });
    setEditMode(false);
  };
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      <div className="mb-4">
        <p>
          <strong>Name:</strong> {profile.name}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
      </div>
      <div className="mb-4">
        <p>
          <strong>Default Shipping Address:</strong>
        </p>
        {editMode ? (
          <input
            type="text"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            className="w-full border p-2 rounded-md"
          />
        ) : (
          <p>{profile.address}</p>
        )}
      </div>
      <div className="flex gap-2">
        {editMode ? (
          <>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => setEditMode(true)}
          >
            Edit Address
          </button>
        )}
      </div>
    </div>
  );
};

export default ManageProfile;
