"use client";

import { useEffect, useState, use } from "react";
import PostForm from "@/components/admin/PostForm";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
      const resolvedParams = use(params);
      const [post, setPost] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            fetchPost();
      }, [resolvedParams.id]);

      const fetchPost = async () => {
            try {
                  const res = await fetch(`/api/posts/${resolvedParams.id}`);
                  if (res.ok) {
                        const data = await res.json();
                        setPost(data);
                  }
            } catch (error) {
                  console.error(error);
            } finally {
                  setLoading(false);
            }
      };

      if (loading) return <div className="p-8 text-white">Carregando editor...</div>;
      if (!post) return <div className="p-8 text-white">Post não encontrado</div>;

      return (
            <div className="content-section active">
                  <div className="section-header">
                        <div>
                              <h1>Editar Post</h1>
                              <p>Atualizar conteúdo existente</p>
                        </div>
                  </div>
                  <PostForm initialData={post} isEditing />
            </div>
      );
}
