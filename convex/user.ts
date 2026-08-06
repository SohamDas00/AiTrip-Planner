import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  },

  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("userTable")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user.length === 0) {
      const userData = {
        name: args.name,
        email: args.email,
        imageUrl: args.imageUrl,
      };

      const id = await ctx.db.insert("userTable", userData);

      return {
        _id: id,
        ...userData,
      };
    }

    return user[0];
  },
});

// NEW QUERY
export const getUserByEmail = query({
  args: {
    email: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("userTable")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
  },
});