import { AccessRequest } from "../../models/accessRequest.models";
import { getIo } from "./socket";
export const handleOwnerResponse = (socket: any) => {
    socket.on("respond_request", async (data: { requestId: string, ownerId: string, response: string }) => {
        const { requestId, ownerId, response } = data as { requestId: string, ownerId: string, response: "approved" | "denied" }; // Response can be "approved" or "denied"

        const request = await AccessRequest.findById(requestId);
        if (!request || !request.history || request.history.length === 0) {
            return socket.emit("error", { message: "Request not found" });
        }

        const latestEntry = request.history[request.history.length - 1];

        if (latestEntry.ownerId.toString() !== ownerId) {
            return socket.emit("error", { message: "Unauthorized action" });
        }

        // Update request status in the latest history entry
        latestEntry.status = response;
        await request.save();

        // Notify Requester (User 2)
        getIo().to(latestEntry.requesterId.toString()).emit("request_status_update", {
            message: `Your access request was ${response}`,
            status: response
        });
    });
};
