import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Task {
  _id: string
  Title: string
  Description: string
  Status: string
  PriorityLevel: string
  Deadline: string
  EstimateTime: string
}
interface CreateTaskRequest {
  Title: string
  Description: string
  Status: string
  PriorityLevel: string
  Deadline: string
  EstimateTime: string
}
interface CreateTaskPayload {
  projectId: string
  taskId: string
  taskData: CreateTaskRequest
}
interface ApiResponse {
  message: string
  task: Task[]
}

export const taskApi = createApi({
  reducerPath: 'task',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/task',
  }),
  tagTypes: ['Task'],
  endpoints: builder => ({
    createTask: builder.mutation<ApiResponse, CreateTaskPayload>({
      query: ({ projectId, taskData }) => ({
        url: `/createtask/${projectId}`,
        method: 'POST',
        body: taskData,
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),
    getTask: builder.query<ApiResponse, { projectId: string }>({
      query: ({ projectId }) => `/gettask/${projectId}`,
      providesTags: result =>
        result
          ? [
              ...result.task.map(task => ({ type: 'Task' as const, id: task._id })),
              { type: 'Task', id: 'LIST' },
            ]
          : [{ type: 'Task', id: 'LIST' }],
    }),
    deleteTask: builder.mutation<ApiResponse, { projectId: string; taskId: string }>({
      query: ({ projectId, taskId }) => ({
        url: `/deletetask/${projectId}/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),
    updateTask: builder.mutation<ApiResponse, CreateTaskPayload>({
      query: ({ projectId, taskId, taskData }) => ({
        url: `/updatetask/${projectId}/${taskId}`,
        method: 'PUT',
        body: taskData,
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),
  }),
})

export const {
  useCreateTaskMutation,
  useGetTaskQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = taskApi
