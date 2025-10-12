import { headers } from "next/headers";

export default async function getUser() {
  const header = await headers();
  const userHeader = header.get("x-user-data");

  if (!userHeader) {
    return null;
  }

  const userdata = JSON.parse(userHeader);
  return userdata;
}
