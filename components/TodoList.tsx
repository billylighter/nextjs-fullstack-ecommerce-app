"use client";

type Todo = {
    id: number;
    title: string;
    completed: boolean;
};

export default function TodoList({ todos }: { todos: Todo[] }) {
    async function toggle(id: number) {
        await fetch(`/api/todos/${id}`, { method: "PATCH" });
        location.reload();
    }

    async function remove(id: number) {
        await fetch(`/api/todos/${id}`, { method: "DELETE" });
        location.reload();
    }

    if (!todos.length) {
        return (
            <p className="text-center text-gray-400 text-sm">
                No todos yet
            </p>
        );
    }

    return (
        <ul className="space-y-2">
            {todos.map(todo => (
                <li
                    key={todo.id}
                    className="flex items-center justify-between bg-gray-50 border rounded-lg px-3 py-2"
                >
                    <button
                        onClick={() => toggle(todo.id)}
                        className="flex items-center gap-2 flex-1 text-left"
                    >
                        <span
                            className={`h-4 w-4 rounded border flex items-center justify-center ${
                                todo.completed
                                    ? "bg-black border-black"
                                    : "border-gray-300"
                            }`}
                        >
                            {todo.completed && (
                                <span className="h-2 w-2 bg-white rounded-sm" />
                            )}
                        </span>

                        <span
                            className={`text-sm ${
                                todo.completed
                                    ? "line-through text-gray-400"
                                    : "text-gray-800"
                            }`}
                        >
                            {todo.title}
                        </span>
                    </button>

                    <button
                        onClick={() => remove(todo.id)}
                        className="text-gray-400 hover:text-red-500 text-sm"
                        aria-label="Delete"
                    >
                        ✕
                    </button>
                </li>
            ))}
        </ul>
    );
}
