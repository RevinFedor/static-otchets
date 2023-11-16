import { apiSlice } from '../../app/api/apiSlice';

const companyApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCompanyUser: builder.query({
            query: (userId) => `/company/getCompanyUser/${userId}`,
            providesTags: ['Company'],
        }),
        getCompanyThis: builder.query({
            query: (userId) => `/company/getCompanyThis/${userId}`,
            providesTags: ['Company'],
        }),
        createCompany: builder.mutation({
            query: ({ data }) => ({
                url: '/company/createCompany',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Company'],
            // async onQueryStarted({ data, id }, { dispatch, queryFulfilled }) {
            //   const patchResult = dispatch(
            //     apiSlice.util.updateQueryData("getCompanyCompany", id, (company) => {
            //       company.message.push({ ...data });
            //     })
            //   );
            //   try {
            //     await queryFulfilled;
            //   } catch {
            //     patchResult.undo();
            //   }
            // },
        }),

        updateCompany: builder.mutation({
            query: ({ data }) => ({
                url: '/company/updateCompany',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Company'],
        }),
        deleteCompany: builder.mutation({
            query: ({ data }) => ({
                url: '/company/deleteCompany',
                method: 'DELETE',
                body: data,
            }),
            invalidatesTags: ['Company'],
        }),
    }),
});

export const {
    useGetCompanyUserQuery,
    useGetCompanyThisQuery,
    useCreateCompanyMutation,
    useUpdateCompanyMutation,
    useDeleteCompanyMutation,
} = companyApiSlice;
