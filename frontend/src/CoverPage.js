import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

const CoverPage = () => {


    const [header, setHeader] = useState({title : "", description : ""});
 

    const navigate = useNavigate();


    const handleHeaderChange = (event) => {
        const { name, value } = event.target;
        setHeader(
            (prevFormData) => {
                return(
                    {...prevFormData, [name] : value}
                )
            }          
        )
    }

  

    const saveCover = () => {

        const formData = new FormData();
        formData.append('title', header.title);
        formData.append('description', header.description);

        const fileInput = document.querySelector('input[type="file"]');
        if(fileInput.files[0]){
            formData.append('image', fileInput.files[0]);
        }
        
        axios.post("http://127.0.0.1:8000/headers/", formData, {
            headers: {
                'Content-Type' : 'multipart/form-data',
            },
        })

        .then(response=>{
            console.log("Headers saved successfully!");
            console.log(response.data);
        })
        .catch(error=>{
            console.error(error)
        });

        navigate('/contentpage', { state : header.title });

        setHeader({});


    }

    return(


        <div>

           <input type="text" className="title-field" name="title" value={header.title} onChange={handleHeaderChange} placeholder='write the title here...'/>

           <textarea className="des-field" name="description" value={header.description} onChange={handleHeaderChange} placeholder='tell your description here...'/>

           <input type="file" />


           <button className="submit-btn" onClick={saveCover}>SAVE COVER</button>

        </div>

    )
};

export default CoverPage;