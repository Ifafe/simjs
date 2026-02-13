"use client";

export default function MenusPage() {
      return (
            <div className="p-8 max-w-4xl mx-auto text-center py-20">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                        <i className="fas fa-bars text-4xl"></i>
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-4">Gerenciador de Menus</h1>
                  <p className="text-gray-400 max-w-md mx-auto mb-8">
                        Em breve você poderá organizar os menus do topo e rodapé do site através de uma interface de arrastar e soltar.
                  </p>
                  <span className="px-4 py-2 bg-white/5 rounded-full text-sm text-gray-500 border border-white/10">
                        Funcionalidade em Desenvolvimento
                  </span>
            </div>
      );
}
