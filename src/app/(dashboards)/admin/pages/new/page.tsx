"use client";

import PageForm from "@/components/admin/PageForm";

export default function NewPagePage() {
      return (
            <div className="content-section active">
                  <div className="section-header">
                        <div>
                              <h1>Nova Página</h1>
                              <p>Criar uma nova página de conteúdo estático</p>
                        </div>
                  </div>
                  <PageForm />
            </div>
      );
}
