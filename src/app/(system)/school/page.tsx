export default async function School() {
  await new Promise((resolve) => {
    setTimeout(() => resolve("delay"), 3000);
  });
  return <h1>Hello School</h1>;
}
