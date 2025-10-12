export default async function Student() {
    await new Promise((resolve) => {
        setTimeout(() => resolve("delay"), 3000);
    })

    return <h1>Student</h1>
}