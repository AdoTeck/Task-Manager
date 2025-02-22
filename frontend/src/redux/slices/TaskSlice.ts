import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface Task {
    _id: string
    Title : string,
    Description : string,
    Status : string,
    PriorityLevel : string,
    Deadline : string,
    EstimateTime : string,
  }
interface CreateTaskRequest {
    Title : string,
    Description : string,
    Status : string,
    PriorityLevel : string,
    Deadline : string,
    EstimateTime : string,
}
interface CreateTaskPayload {
    projectId: string;
    taskId: string;
    taskData: CreateTaskRequest;
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
    endpoints: builder => ({
        createTask : builder.mutation<ApiResponse, CreateTaskPayload>({
            query: ({ projectId, taskData }) => ({
                url: `/createtask/${projectId}`,
                method: 'POST',
                body: taskData
            })
        }),
        getTask :  builder.query<ApiResponse, CreateTaskPayload>({
            query: ({ projectId}) => `/gettask/${projectId}`,
            
        }),
        deleteTask : builder.mutation<ApiResponse, { projectId: string; taskId: string }>({
            query: ({ projectId, taskId }) => ({
                url: `/deletetask/${projectId}/${taskId}`,
                method: 'DELETE'
        })
        }),
        updateTask : builder.mutation<ApiResponse, CreateTaskPayload>({
            query: ({ projectId, taskId, taskData }) => ({
                url: `/updatetask/${projectId}/${taskId}`,
                method: 'PUT',
                body: taskData
        })
    }),
    }),
})

export const { useCreateTaskMutation, useGetTaskQuery, useDeleteTaskMutation, useUpdateTaskMutation } = taskApi;