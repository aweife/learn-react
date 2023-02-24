import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Layout from './Layout';
import Missing from './Missing';
import NewPost from './NewPost';
import PostPage from './PostPage';

function App() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");

    useEffect(() => {
        const filteredResults = posts.filter(post =>
            ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
            ((post.title).toLowerCase()).includes(search.toLowerCase()));

        setSearchResults(filteredResults.reverse());
    }, [posts, search])

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), "MMMM dd, yyyy pp");
        const newPost = { id, title: postTitle, datetime, body: postBody };
        const allPosts = [...posts, newPost];
        setPosts(allPosts);

        setPostTitle("");
        setPostBody("");
        navigate("/");
    }

    const handleDelete = (id) => {
        const postsList = posts.filter(post => post.id !== id);
        setPosts(postsList);
        navigate("/");
    };

    return (
        <Routes>
            <Route path='/' element={<Layout
                search={search}
                setSearch={setSearch}
            />}>
                <Route index element={<Home posts={searchResults} />} />
                <Route path='post'>
                    <Route index element={<NewPost
                        postTitle={postTitle}
                        setPostTitle={setPostTitle}
                        postBody={postBody}
                        setPostBody={setPostBody}
                        handleSubmit={handleSubmit}
                    />} />
                    <Route path=':id' element={<PostPage
                        posts={posts}
                        handleDelete={handleDelete}
                    />} />
                </Route>
                <Route path='about' element={<About />} />
                <Route path='*' element={<Missing />} />
            </Route>
        </Routes>
    );
}

export default App;
