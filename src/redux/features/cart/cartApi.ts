import { baseApi } from "@/redux/api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: (userId) => ({
        url: `/cart/${userId}`,
        method: "GET",
      }),
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: "/cart",
        method: "POST",
        body: data,
      }),
    }),
    removeFromCart: builder.mutation({
      query: (data) => ({
        url: `/cart`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} = cartApi;
