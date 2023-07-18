import { getCurrentUser } from "@/lib/session";

export default async function NewUserPage() {

  const user = await getCurrentUser();

  return (
    <div>
      <p>Welcome {user?.name}!</p>
    </div>
  );
}
