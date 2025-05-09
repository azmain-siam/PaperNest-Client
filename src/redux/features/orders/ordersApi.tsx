import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
    }),
    getOrdersByUser: builder.query({
      query: (userId) => ({
        url: `/orders/${userId}`,
        method: "GET",
      }),
    }),
    addOrder: builder.mutation({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: order,
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => {
        return {
          url: `/orders/${orderId}`,
          method: "PATCH",
          body: { status },
        };
      },
    }),
    calculateRevenue: builder.query({
      query: () => {
        return {
          url: `/orders/revenue/admin`,
          method: "GET",
        };
      },
    }),
    getClientSecret: builder.mutation({
      query: (data) => {
        return {
          url: `/orders/payment`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useAddOrderMutation,
  useUpdateOrderStatusMutation,
  useGetOrdersByUserQuery,
  useGetClientSecretMutation,
  useCalculateRevenueQuery,
} = orderApi;
