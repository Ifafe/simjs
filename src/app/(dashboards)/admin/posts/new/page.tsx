"use client";

import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
      return (
            <div className="content-section active">
                  <div className="section-header">
                        <div>
                              <h1>Novo Post</h1>
                              <p>Criar uma nova publicação para o blog</p>
                        </div>
                  </div>
                  <PostForm />
            </div>
      );
}
