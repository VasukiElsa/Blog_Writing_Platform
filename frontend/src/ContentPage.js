import { useState } from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import './style.css';

const ContentPage = () => {

    const location = useLocation();
    
    const [inputFields, setInputFields] = useState([]);


    const handleFormChange = (index, event) => {

        let data = [...inputFields];

        data[index].content = event.target.value;

        setInputFields(data);
    }


    const addHeading = () => {

        let newField = {title : location.state, label : 'heading', content : ''};

        setInputFields([...inputFields, newField]);
    }

    const addText = () => {

        let newField = {title : location.state, label : 'text', content : ''};

        setInputFields([...inputFields, newField]);
    }

    const addCode = () => {

        let newField = { title : location.state, label : 'code', content : ''};

        setInputFields([...inputFields, newField]);
    };

    const removeFields = (index) => {

        let data = [...inputFields];

        data.splice(index, 1);

        setInputFields(data);

    }


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


    };



    



    return(
        <div>
            <form onSubmit={publish}>

                <div className='header-btns'>

                    <button className='heading-btn' onClick={addHeading}>Heading</button>
                    <button className='text-btn' onClick={addText}>Text</button>
                    <button className='code-btn' onClick={addCode}>Code</button>

                </div>

                {inputFields.map((input, index) => {

                    switch(input.label){

                        case "heading":
                            return(

                                <div key={index}>

                                    <input type="text" className="heading-field" name="heading" value={input.content} onChange={event=> handleFormChange(index, event)} placeholder='give the heading here...'/>

                                    <button className="remove-heading-btn" onClick={()=>removeFields(index)}>Remove</button>

                                </div>

                            )

                        case "text":
                            return(

                                <div key={index}>

                                    <textarea className="text-field" name="text" value={input.content} onChange={ event => handleFormChange(index, event)} placeholder = 'write your words here...' />

                                    <button className="remove-text-btn" onClick = {()=>removeFields(index)}>Remove</button>

                                </div>
                            )

                        case "code":
                            return(
    
                                <div key={index}>
    
                                    <textarea className="code-field" name="code" value={input.content} onChange={event=> handleFormChange(index, event)} placeholder='add your code here...'/>
    
                                    <button className="remove-code-btn" onClick={()=>removeFields(index)}>Remove</button>
    
                                 </div>
                            )

                        default:
                            return null;
                    }

                })}

            </form>

            <button className='submit-btn' onClick={publish}>PUBLISH</button>

        </div>
    )
};


export default ContentPage;