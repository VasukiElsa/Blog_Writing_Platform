import { useState } from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const ContentPage = () => {

    const location = useLocation();
    const navigate = useNavigate();
    
    const [inputFields, setInputFields] = useState([]);

    const handleFormChange = (index, event, field = 'content') => {

        let data = [...inputFields];

        data[index][field] = event.target.value;

        setInputFields(data);
    }

    const handleImageChange = (index, event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            let data = [...inputFields];
            data[index].image = reader.result; // Store the image as Base64
            setInputFields(data);
        };
    
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    // Default Base64 placeholder (a small transparent image as an example)
    const defaultBase64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wIAAgkB/j+HMAAAAABJRU5ErkJggg==";


    const addHeading = () => {

        let newField = {title : location.state, label : 'heading', content : '', language : 'not-applicable', image : defaultBase64Image};

        setInputFields((prevFields) => {
            return [...prevFields, newField];
        });
    };
    

    const addText = () => {

        let newField = {title : location.state, label : 'text', content : '', language : 'not-applicable', image: defaultBase64Image};

        setInputFields((prevFields) => {
            return [...prevFields, newField];
        });
    }

    const addCode = () => {

        let newField = { title : location.state, label : 'code', content : '', language : 'java', image: defaultBase64Image};

        setInputFields((prevFields) => {
            return [...prevFields, newField];
        });
    };

    const addImage = () => {

        let newField = { title: location.state, label: 'image', content:'not-applicable', language: 'not-applicable', image: ''};

        setInputFields((prevFields) => {
            return [...prevFields, newField];
        });

    };

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1);
        setInputFields(data);
    }


    console.log("inputFields state before submit:", inputFields);

    const publish = (e) => {

        e.preventDefault();

        axios.post('http://127.0.0.1:8000/inputfields/', inputFields)
        .then(response=>{
            console.log("Input Fields saved successfully");
            console.log(response.data);
        })
        .catch(error=>{
            console.error(error);
        });

        navigate('/home');

        setInputFields([]);


    };
    

    
    
    return(
        <div>
            <form onSubmit={publish}>

                <div className='header-btns'>

                    <button type = "button" className='heading-btn' onClick={addHeading}>Heading</button>
                    <button type = "button" className='text-btn' onClick={addText}>Text</button>
                    <button type = "button" className='code-btn' onClick={addCode}>Code</button>
                    <button type = "button" className='image-btn' onClick={addImage}>Image</button>

                </div>

                <div className='input-container'>

                {inputFields.map((input, index) => {

                    switch(input.label){

                        case "heading":
                            return(

                                <div className="input-wrapper" key={index}>

                                    <input type="text" className="heading-field" name="heading" value={input.content} onChange={event=> handleFormChange(index, event)} 
                                    placeholder='Add Heading'/>

                                    <button className="remove-btn" onClick={()=>removeFields(index)}>Remove</button>

                                </div>

                            )

                        case "text":
                            return(

                                <div className="input-wrapper" key={index}>

                                    <textarea className="text-field" name="text" value={input.content} onChange={ event => handleFormChange(index, event)}
                                    placeholder='Add Text'/>

                                    <button className="remove-btn" onClick={()=>removeFields(index)}>Remove</button>

                                </div>
                            )

                        case "code":
                            return(
    
                                <div className="input-wrapper" key={index}>
    
                                    <select className="language-select" value={input.language} onChange={(event)=> handleFormChange(index, event, 'language')}>

                                        <option value="java">Java</option>
                                        <option value="python">Python</option>
                                        <option value="bash">Bash</option>
                                        <option value="html">HTML</option>
                                        <option value="shell">Shell</option>
                                    </select>

                                    <Editor height="200px"
                                    language={input.language}
                                    theme="vs-light"
                                    value={input.content}
                                    options={{
                                        fontSize: 20
                                        
                                    }}
                                    onChange={(value) => handleFormChange(index, { target: { value } })} 
                                    />

                                    <button className="remove-btn" onClick={()=>removeFields(index)}>Remove</button>

    
                                 </div>
                            )

                            case "image":
                                return (
                                    <div className="input-wrapper" key={index}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => handleImageChange(index, event)}
                                        />

                                        {input.image && (<img src={input.image} alt="Preview" className="image-preview" />)}
                                        
                                        <button className="remove-btn" onClick={()=>removeFields(index)}>Remove</button>
                                    </div>
                                );
                        default:
                            return null;
                    }

                })}
                </div>

            </form>

            <button className='submit-btn' onClick={publish}>PUBLISH</button>

        </div>
    )
};


export default ContentPage;