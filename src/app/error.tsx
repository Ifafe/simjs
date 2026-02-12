"use client";

import { useEffect } from "react";

export default function Error({
      error,
      reset,
}: {
      error: Error & { digest?: string };
      reset: () => void;
}) {
      useEffect(() => {
            // Log the error to an error reporting service
            console.error(error);
      }, [error]);

      return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
                  <h2 className="text-2xl font-bold mb-4 text-red-500">Algo deu errado!</h2>
                  <p className="mb-6 text-gray-400 text-center max-w-md">
                        Estamos trabalhando para resolver o problema. Por favor, tente novamente.
                  </p>
                  <button
                        onClick={
                              // Attempt to recover by trying to re-render the segment
                              () => reset()
                        }
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full font-bold transition-colors"
                  >
                        Tentar Novamente
                  </button>
            </div>
      );
}
