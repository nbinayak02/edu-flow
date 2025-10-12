export default async function Class() {
    await new Promise((resolve) => {
        setTimeout(() => resolve("delay"), 3000);
    })

    return <h1>Class</h1>
}