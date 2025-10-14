
import {getUser} from "@/lib/auth";

export default async function Page() {
  const user = await getUser();
  return (
   <div>hello {user.email}</div>
  );
}
