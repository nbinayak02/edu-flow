export default async function Exam() {
    await new Promise((resolve) => {
        setTimeout(() => resolve("delay"), 3000);
    })

    return <h1>Exam</h1>
}