import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Documentation = () => {

    const location = useLocation();
    const { result, title, image } = location.state;
    console.log("THIS IS LOCATION", location);

    const navigate = useNavigate();

    const formatValue = (value) => {
        const formattedValue = value.replace(/\r\n|\r|\n/g, '<br />');
        return { __html: formattedValue };
    };

    const header = result.filter(item => item.label === "heading");

    const dashboard = () => {
        navigate('/home');
    }

    return(
        <>   
    
        <nav className = "nav-bar">
            <header className="nav-header">{title}</header>
            {header.map((input, index) => (
                <AnchorLink key={index} href={`#${input.content}`} className="nav-link">
                    {input.content}
                </AnchorLink>
            ))}
        </nav>


        <div className="main-doc">
            <button className="home-btn" type="button" onClick={dashboard}>HOME</button>

            <h2 className="blog-title">{title}</h2>
            <img className="blog-cover" src={`http://127.0.0.1:8000${image}`} alt={title}/>

            {result.map((input, index) => {

                switch(input.label){
                    case "heading":
                        return(
                            <section key={index} className="main-section">
                                <header id= {input.content} dangerouslySetInnerHTML={formatValue(input.content)} />
                            </section>
                        );
                    case "text":
                        return(
                            <section key={index} className="main-section">
                                <p className="text-section" dangerouslySetInnerHTML={formatValue(input.content)} />
                            </section>
                        );
                    case "code":
                        return(
                            <div key={index} className="syntax-bar">
                                <pre>
                                   <code dangerouslySetInnerHTML={formatValue(input.content)} />
                                </pre>
                            </div>
                        );

                    case "image":
                        return(
                            <section key={index} className="main-section">
                                <img className="img-bar" src={`http://127.0.0.1:8000${input.image}`}  alt="preview" />
                            </section>
                        )
                    default:
                        return null;
                }
            })

            }

            <div className="bottom-spacer"></div>

            
        </div>

        </>
    

    );


};

export default Documentation;