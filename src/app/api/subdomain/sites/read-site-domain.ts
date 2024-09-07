import { SubDomain } from "@/models/SubDomain";
import mongoose from "mongoose";

export const readSiteDomain = async (domain: string) => {
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const site = await SubDomain.findOne({ name: domain });
    return new Response(JSON.stringify(site), { status: 200 });
}