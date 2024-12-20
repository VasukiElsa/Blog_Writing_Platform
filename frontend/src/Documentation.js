import { useLocation } from 'react-router-dom';
import './style.css';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Documentation = () => {

    const location = useLocation();
    const { result, title, image } = location.state;
    console.log("THIS IS LOCATION", location);

    const formatValue = (value) => {
        const formattedValue = value.replace(/\r\n|\r|\n/g, '<br />');
        return { __html: formattedValue };
    };

    const header = result.filter(item => item.label === "heading");

    return(
    <body>
        <nav className = "nav-bar">
            <header className="nav-header">{title}</header>
            {header.map((input) => (
                <AnchorLink href={`#${input.content}`} className="nav-link">
                    {input.content}
                </AnchorLink>
            ))}
        </nav>


        <div className="main-doc">

            <h2 className="blog-title">{title}</h2>
            <img className="blog-cover" src={`http://127.0.0.1:8000${image}`} alt={title}/>

            {result.map((input) => {

                switch(input.label){
                    case "heading":
                        return(
                            <section className="main-section">
                                <header id= {input.content} dangerouslySetInnerHTML={formatValue(input.content)} />
                            </section>
                        );
                    case "text":
                        return(
                            <section className="main-section">
                                <p className="text-section" dangerouslySetInnerHTML={formatValue(input.content)} />
                            </section>
                        );
                    case "code":
                        return(
                            <section className="code-section">
                                <p dangerouslySetInnerHTML={formatValue(input.content)} />
                            </section>
                        );
                    default:
                        return null;
                }
            })

            }

            <div className="bottom-spacer"></div>

            
        </div>
    </body>

    );


};

export default Documentation;