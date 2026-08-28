import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const  createTripDetails =mutation({
    args:{
        tripId: v.string(),
        tripDetails: v.any(),
        uid: v.id('userTable'),
    },
    handler: async(ctx,args)=>{
        const tripDetails={
            tripId:args.tripId,
            tripDetails:args.tripDetails,
            uid:args.uid
        }
        const result=await ctx.db.insert('TripDetailsTable',tripDetails)
    }
})

export const getTripDetails=query({
    args:{uid:v.id('userTable')},

    handler:async(ctx,args)=>{
        const result=await ctx.db
            .query('TripDetailsTable')
            .filter(q => q.eq(q.field('uid'),args.uid))
            .order('desc')
            .collect()
        return result;
    }
})