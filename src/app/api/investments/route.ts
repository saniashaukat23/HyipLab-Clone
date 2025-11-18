// import { auth } from "@/auth";
import { dbConnect } from "@/lib/dbConnect";
import Investment from "@/models/Investment";

export async function GET() {
  // const session = await auth();
  // if (!session?.user) return new Response("Unauthorized", { status: 401 });
  // await dbConnect();
  // const data = await Investment.find({ userId: (session.user as any).id }).sort(
  //   { createdAt: -1 }
  // );
  // return Response.json({ data });
}
