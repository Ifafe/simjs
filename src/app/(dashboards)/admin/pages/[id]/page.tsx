"use client";

import { useEffect, useState, use } from "react";
import PageForm from "@/components/admin/PageForm";

export default function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
      const resolvedParams = use(params);
      const [page, setPage] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            fetchPage();
      }, [resolvedParams.id]);

      const fetchPage = async () => {
            try {
                  const res = await fetch(`/api/pages/${resolvedParams.id}`);
                  if (res.ok) {
                        const data = await res.json();
                        setPage(data);
                  }
            } catch (error) {
                  console.error(error);
            } finally {
                  setLoading(false);
            }
      };

      if (loading) return <div className="p-8 text-white">Carregando editor...</div>;
      if (!page) return <div className="p-8 text-white">Página não encontrada</div>;

      return (
            <div className="content-section active">
                  <div className="section-header">
                        <div>
                              <h1>Editar Página</h1>
                              <p>Atualizar conteúdo estático</p>
                        </div>
                  </div>
                  <PageForm initialData={page} isEditing />
            </div>
      );
}
