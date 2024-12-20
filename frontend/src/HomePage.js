import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const HomePage = () => {

    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [contents, setContents] = useState([]);


    useEffect(() => {
        getBlogs();
        getBlogContents();
    }, []);

    const getBlogs = async() =>{
        const response = await fetch('http://localhost:8000/headers/');
        setBlogs(await response.json());
    };

    const getBlogContents = async() => {
        const response = await fetch('http://localhost:8000/inputfields/');
        setContents(await response.json());
    };

    const filterContents = (props) => {

        const result = contents.filter(item=> item.title === props);
        const particularBlog = blogs.find(blog => blog.title === props);

        const title = particularBlog.title;
        const image = particularBlog.image;

        navigate('/read', {state : { result, title, image }});

    };

    const formatDate = (dateString) => {

        const date = new Date(dateString);
        const options = {month : 'short', day : 'numeric', year : 'numeric'};
        return date.toLocaleString('en-US', options);

    }


    return(
        <>

        <header>
            <h1 id="home-heading">Blogs</h1>
        </header>

        <div className="image-container">

            {blogs.map((blog, index) => (

                <div key={index} className="image-wrapper">

                    <img id = "imageEl" src={`http://127.0.0.1:8000${blog.image}`} alt={blog.title} onClick={() => filterContents(blog.title)}/>

                    <ul className="blogs">

                        <li className="blog-title" onClick={() => filterContents(blog.title)}>
                            {blog.title}
                        </li>

                        <li className="blog-description">
                            {blog.description}
                        </li>

                        <li className="created-at">
                            Published at : {formatDate(blog.created_at)}
                        </li>

                    </ul>


                </div>
    

            ))}

        </div>


        </>
    );
};

export default HomePage;