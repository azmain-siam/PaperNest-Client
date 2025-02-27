import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
    getUserById: builder.query({
      query: ({ userId }) => ({
        url: `/user/${userId}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ userId, status }) => {
        console.log(userId, status);
        return {
          url: `/user/update/${userId}`,
          method: "PATCH",
          body: { status },
        };
      },
    }),
    updateUserAddress: builder.mutation({
      query: ({ userId, address }) => {
        console.log(userId, address);
        return {
          url: `/user/update/address/${userId}`,
          method: "PATCH",
          body: { address },
        };
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateUserAddressMutation,
  useGetUserByIdQuery,
} = userApi;
