import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function NewUserPage() {

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <p>Welcome {user?.name}!</p>
    </div>
  );
}
