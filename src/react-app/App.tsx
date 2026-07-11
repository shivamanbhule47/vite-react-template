import { useState, useEffect } from "react";
import "./App.css";

// Define the shape of a blog post
interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts when the component mounts
  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data: Post[]) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <header>
        <h1>My Daily Blog</h1>
        <p>Welcome to my thoughts and updates.</p>
      </header>

      <main>
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.id} className="blog-card">
              <h2>{post.title}</h2>
              <small className="date">{post.date}</small>
              <p>{post.content}</p>
            </article>
          ))
        ) : (
          <p>No blog posts found. Check your API!</p>
        )}
      </main>
    </div>
  );
}

export default App;
