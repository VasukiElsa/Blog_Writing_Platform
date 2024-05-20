import {useState, useEffect} from 'react';
import axios from 'axios';

import './style.css';

const AdminPage = () => {

    const[header, setHeader] = useState({title:"", description:""});

    const[inputFields, setInputFields] = useState([]);

    const[fetchHeader, setFetchHeader] = useState([]);

    const[fetchInputFields, setFetchInputFields] = useState([]);



    useEffect(() =>{
        axios.get('http://127.0.0.1:8000/headers/')
        .then(response => {
            setFetchHeader(response.data);
        })
        .catch(error=> {
            console.error(error);
        });
    }, []);

    useEffect(() =>{
        axios.get('http://127.0.0.1:8000/inputfields/')
        .then(response => {
            setFetchInputFields(response.data);
        })
        .catch(error=> {
            console.error(error);
        });
    }, []);


    const handleFormChange = (index, event) => {

        let data = [...inputFields];
        data[index].content = event.target.value;

        setInputFields(data);


    } 

    const handleHeaderChange = (event) => {

        const{ name, value} = event.target;

        setHeader((prevFormData) => ({...prevFormData, [name]:value}));
    }


    const addHeading = () => {

        let newField = { title : header.title, label : 'heading', content : ''};

        setInputFields([...inputFields, newField]);


    };

    const addText = () => {

        let newField = { title : header.title,  label : 'text', content : ''};

        setInputFields([...inputFields, newField]);
    };

    const addCode = () => {

        let newField = { title : header.title, label : 'code', content : ''};

        setInputFields([...inputFields, newField]);
    };


    const saveCover = () => {


        axios.post('http://127.0.0.1:8000/headers/', header)
        .then(response=>{
            console.log("Header saved successfully");
            console.log(response.data);
        })
        .catch(error=>{
            console.error(error);
        });


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

   const removeFields = (index) => {

        let data = [...inputFields];

        data.splice(index, 1);

        setInputFields(data);

    };
    

    return(

        <div>
            <form onSubmit={publish}>

               <div className="header-btns">

                   <button className="heading-btn" onClick={addHeading}>Heading</button>

                   <button className="text-btn" onClick={addText}>Text</button>

                   <button className="code-btn" onClick={addCode}>Code</button>

            </div>

               

            <div>
                <input type="text" className="title-field" name="title" value={header.title} onChange={event => handleHeaderChange(event)} placeholder='write the title here...'/>

                <textarea className="des-field" name="description" value={header.description} onChange={event => handleHeaderChange(event)} placeholder='tell your description here...'/>


                <button className="submit-btn" onClick={saveCover}>SAVE COVER</button>
            </div>


                {inputFields.map((input, index) => {

                    switch(input.label){

                        case "heading":
                            return (

                                <div key={index}>

                                    <input type="text" className="heading-field" name="heading" value={input.content} onChange={event=> handleFormChange(index, event)} placeholder='give the heading here...'/>

                                    <button className="remove-btn" onClick={()=>removeFields(index)}>Remove</button>

                                </div>
                            )

                        case "text":
                            return (

                                <div key={index}>
                                     
                                     <textarea  className="text-field" name="text" value={input.content} onChange={event=> handleFormChange(index, event)} placeholder='write your words here...'/>

                                     <button className="remove-btn" onClick={()=>removeFields(index)}>Remove</button>

                                </div>
                            )

                        case "code":
                            return(

                                <div key={index}>

                                    <textarea className="code-field" name="code" value={input.content} onChange={event=> handleFormChange(index, event)} placeholder='add your code here...'/>

                                    <button className="remove-btn" onClick={()=>removeFields(index)}>Remove</button>

                                </div>
                            )

                        default:
                            return null;
                    }

                })}
            </form>

            <button className="submit-btn" onClick={publish}>PUBLISH</button>



            <h1>Headers</h1>
            <ul>
                {fetchHeader.map((head, index) =>{
                    return(

                        <li key={index}>{head.title} - {head.description}</li>

                    )
                   
                })}

            </ul>


            <h1>Contents</h1>
            <ul>
                {fetchInputFields.map((input, index) =>{
                    return(

                        <li key={index}>{input.title}   :   {input.label} - {input.content}</li>

                    )
                   
                })}

            </ul>






            <ul>
                {inputFields.map((input, index) => {

                    switch(input.label){

                        case "heading":
                            return(

                                <h1 className="heading-el">{input.content}</h1>
                            )

                        case "text":
                            return(

                                <p className="para-el">{input.content}</p>
                            )

                        case "code":
                            return(

                                <p className="code-el">{input.content}</p>
                            )

                        default:
                            return null;
                    }

                })}
            </ul> 
        </div>
    )


}



export default AdminPage;