import { Menu } from "@/models/Menu";
import mongoose from "mongoose";


export async function GET(req: Request, {params}: {params: {id: string}}) {
    if (!mongoose.connection.readyState) {
        console.log('Connecting to database');
        mongoose.connect(process.env.MONGODB_URI ?? '').catch((err) => {
            console.error('Failed to connect to database', err);
        });
    }

    console.log('Getting menu');
    console.log('menu id:', params.id);
    const menu = await Menu.find({_id: params.id}).exec();
    return new Response(JSON.stringify(menu), {
        status: 200,
    });
}
