import React from "react";

export default function AlertBanner({ message, type = "info", onClose }) {
    let base = "w-full p-4 flex justify-between items-center border-b";
    let color =
        type === "danger"
            ? "bg-red-100 text-red-800 border-red-400"
            : type === "success"
                ? "bg-green-100 text-green-800 border-green-400"
                : "bg-blue-100 text-blue-800 border-blue-400";

    return (
        <div className={`${base} ${color}`}>
            <span className="font-medium">{message}</span>
            {onClose && (
                <button
                    onClick={onClose}
                    className="ml-4 text-xl font-bold focus:outline-none hover:text-black transition"
                    aria-label="Close alert"
                >
                    ✕
                </button>
            )}
        </div>
    );
}
