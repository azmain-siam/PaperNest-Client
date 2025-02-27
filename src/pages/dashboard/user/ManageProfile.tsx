import { IUser } from "@/components/shared/Navbar";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useGetUserByIdQuery,
  useUpdateUserAddressMutation,
} from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ManageProfile = () => {
  const user = useAppSelector(useCurrentUser) as IUser;

  const { data, isLoading, refetch } = useGetUserByIdQuery({ userId: user.id });
  const userData = data?.data;
  console.log(userData, "user data");

  const [updateUserAddress, { error }] = useUpdateUserAddressMutation();

  const [editMode, setEditMode] = useState(false);
  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    if (userData) {
      setNewAddress(userData?.address);
    }
  }, [userData]);

  const handleSave = async () => {
    const res = await updateUserAddress({
      userId: user.id,
      address: newAddress,
    });

    if (res.data.statusCode === 200) {
      toast.success("Updated user address");
      refetch();
    } else {
      toast.error("Something went wrong");
      console.log(error);
    }
    setEditMode(false);
  };

  if (isLoading) {
    return;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      <div className="mb-4">
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
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
          <p>{userData?.address || "No saved address"}</p>
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
