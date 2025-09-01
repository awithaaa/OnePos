import { useEffect, useState } from "react";

interface Props {
  user: any;
}

export default function UserDetailBox({ user }: Props) {
  const [isUser, setUser] = useState<any>(user);
  const [isCreated, setCreated] = useState<string>("");
  const [isUpdated, setUpdated] = useState<string>("");

  useEffect(() => {
    const createdDate = new Date(user.createdAt);
    const updatedDate = new Date(user.updatedAt);
    setCreated(createdDate.toLocaleDateString());
    setUpdated(updatedDate.toLocaleDateString());
  }, [user]);

  return (
    <>
      <div>
        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">User Id</label>
            <input
              className="w-64 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isUser.id}
              readOnly
            />
          </div>
        </div>

        <div className="flex gap-8 mt-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">First Name</label>
            <input
              className="w-64 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isUser.firstName}
              readOnly
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Last Name</label>
            <input
              className="w-64 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isUser.lastName}
              readOnly
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="font-semibold text-lg">Email</label>
          <input
            className="w-full text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
            type="text"
            value={isUser.email}
            readOnly
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="font-semibold text-lg">Role</label>
          <input
            className="w-full text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
            type="text"
            value={isUser.role}
            readOnly
          />
        </div>

        <div className="flex gap-8 mt-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Created Date</label>
            <input
              className="w-64 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isCreated}
              name="price"
              readOnly
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Updated Date</label>
            <input
              className="w-64 text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
              type="text"
              value={isUpdated}
              name="salePrice"
              readOnly
            />
          </div>
        </div>

        <div className="w-full h-0.5 my-4 bg-neutral-200"></div>
      </div>
    </>
  );
}
