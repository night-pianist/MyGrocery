'use node'; 

import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { internalAction } from "./_generated/server";
import { Webhook } from "svix"; 
import { v } from "convex/values";

export const fulfill = internalAction({ 
    args: { headers: v.any(), payload: v.string() }, 
    handler: async (ctx, args) => { 
        const identity = await ctx.auth.getUserIdentity();
        console.log("IDENTITY IS: ", JSON.stringify(identity));
        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!); 
        const payload = wh.verify(args.payload, args.headers) as WebhookEvent;
        return payload;  
    }
})