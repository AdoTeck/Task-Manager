import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Todo {  
  _id : string;  
  Title: string;
  Description: string;
  Completed: boolean;
  createdAt : string;
}

interface ApiResponse {
  message: string;
  todo: Todo[];
}

interface CreateTodoRequest {
  Title: string;
  Description: string;
}

interface UpdateTodoRequest {
  _id: string;
  Title: string;
  Description: string;
  Completed?: boolean;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/todo",
    credentials: "include", 
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json"); 
      return headers; 
    },
   }),
   tagTypes: ['Todo'], 
  endpoints: (builder) => ({
    getTodo: builder.query<ApiResponse, void>({
      query: () => "/gettodo",
      providesTags: ['Todo'],
    }),
    createTodo: builder.mutation<ApiResponse, CreateTodoRequest>({
      query: (newTodo) =>({
        url: "/createtodo",
        method: 'POST',
        body: newTodo,
      }),
      invalidatesTags: ['Todo']
    }),
    updateTodo: builder.mutation<ApiResponse, UpdateTodoRequest>({
      query: ({ _id, ...updatedTodo }) => ({
        url: `/updatetodo/${_id}`,
        method: 'PUT',
        body: updatedTodo,
      }),
      invalidatesTags: ['Todo']
    }),
    deleteTodo : builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `/deletetodo/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),
  }), 
});

export const { useGetTodoQuery, useCreateTodoMutation,useDeleteTodoMutation ,useUpdateTodoMutation } = api;
