export default async function Subject() {
    await new Promise((resolve) => {
        setTimeout(() => resolve("delay"), 3000);
    })

    return <h1>Subject</h1>
}