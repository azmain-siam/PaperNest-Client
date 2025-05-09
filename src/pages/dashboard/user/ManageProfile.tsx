import { IUser } from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <Card className="mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">User Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-7">
        <div>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <div>
          <Label className="block mb-1">Default Shipping Address</Label>
          {editMode ? (
            <Input
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter your address"
            />
          ) : (
            <p>{userData.address || "No saved address"}</p>
          )}
        </div>

        <div className="flex gap-3">
          {editMode ? (
            <>
              <Button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700"
              >
                Save
              </Button>
              <Button variant="secondary" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {
                setEditMode(true);
                setNewAddress(userData.address || "");
              }}
            >
              Edit Address
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ManageProfile;
