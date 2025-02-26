import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "/user",
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
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
