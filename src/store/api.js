import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const api = createApi({
    baseQuery :fetchBaseQuery({baseUrl:"http://localhost:3000"}),
    tagTypes:["invoices"],
    endpoints:(builder)=>({
        getInvoices:builder.query({
            query:()=>"/invoices",
            providesTags:["invoices"]
        }),
        
    
        PostInvoices:builder.mutation({
            query:(invoiceData)=>({
            url:"/invoices",
            method:"POST",
            body:invoiceData,
        }),
        invalidateTags:["invoices"],
        async onQueryStarted(invoiceData,{dispatch,queryFulfilled}){

            const patchResult = dispatch(
                api.util.updateQueryData("getInvoices" , undefined, (draft)=>{
                draft.unshift({...invoiceData})
            }),
        )
            try{
            
                await queryFulfilled
            }catch{
                patchResult.undo()
            }
            
        }
        
    }),
    
    UpdateInvoice:builder.mutation({
        query:({id,...status})=>({
            
            url:`/invoices/${id}`,
            method:"PATCH",
            body:status,
        }),
        invalidatesTags:["invoices"],
        async onQueryStarted({id,...status},{dispatch,queryFulfilled}){

            const patchResult = dispatch(
                api.util.updateQueryData("getInvoices" , undefined, (draft)=>{
                const InvoiceIndex = draft.findIndex(el=>el.id === id)
                draft[InvoiceIndex] ={...draft[InvoiceIndex],...status} 
            }),
        )
            try{
            
                await queryFulfilled
            }catch{
                patchResult.undo()
            }
            
        }
        

    }),
    DeleteInvoice:builder.mutation({
        query:(id)=>({
            url:`/invoices/${id}`,
            method:"DELETE",
            body:id,
        }),
        invalidatesTags:["invoices"],
        async onQueryStarted({id},{dispatch,queryFulfilled}){

            const patchResult = dispatch(
                api.util.updateQueryData("getInvoices" , id, (draft)=>{
                const InvoiceIndex = draft.findIndex(el=>el.id === id)
                draft.splice(InvoiceIndex,1)
            }),
        )
            try{
            
                await queryFulfilled
            }catch{
                patchResult.undo()
            }
            
        }
    }),

})
});


export const {useGetInvoicesQuery,usePostInvoicesMutation,useDeleteInvoiceMutation,useUpdateInvoiceMutation} = api