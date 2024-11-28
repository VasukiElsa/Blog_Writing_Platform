import { useLocation } from 'react-router-dom';

const Documentation = () => {

    const location = useLocation();
    const { result, title, image } = location.state;
    console.log("THIS IS LOCATION", location);

    const formatValue = (value) => {
        const formattedValue = value.replace(/\r\n|\r|\n/g, '<br />');
        return { __html: formattedValue };
    };

    return(
        <div className="blog-container">

            <h2 className="blog-title">{title}</h2>
            <img className="blog-cover" src={`http://127.0.0.1:8000${image}`} alt={title}/>

            {result ? (
                <ul>
                    {result.map((item, index) => (

                        <li className="blog-list" key={index}>
                            <p className="label-el">{item.label}</p>
                            <p className="value-el" dangerouslySetInnerHTML={formatValue(item.content)} />
                        </li>

                    ))}
                </ul>
            ) : (
                <p>No data received</p>
            )
            }
        </div>
    );


};

export default Documentation;