import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default async function Home() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
        cache: "no-store",
    });
    const todos = await res.json();

    return (
        <main className="min-h-screen bg-gray-50 flex justify-center py-16">
            <div className="w-full max-w-md bg-white shadow rounded-xl p-6">
                <h1 className="text-2xl font-semibold mb-6 text-center">
                    Todo App
                </h1>

                <TodoForm />
                <TodoList todos={todos} />
            </div>
        </main>
    );
}
