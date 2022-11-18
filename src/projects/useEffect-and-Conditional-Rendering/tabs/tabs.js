import React, { useState, useEffect } from 'react'

const url = 'https://course-api.com/react-tabs-project';

const Tabs = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(true);

    const [people, setPeople] = useState([]);
    const [person, setPerson] = useState({});

    const getPeople = async () => {
        try {
            const response = await fetch(url);
            // console.log(`status: ${response.status}`);
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                // console.log(data[0]);
                setPeople(data);
                setPerson(data[0]);
                setIsLoading(false);
                setIsError(false);
            } else {
                throw new Error('url not found.');
            }
        }
        catch(error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const shiftPerson = (id) => {
        setPerson(people.find(item => item.id === id));
    }

    useEffect(() => {
        getPeople();
        setPerson({ ...people[0] });
    }, []);

    if (isLoading) {
        return <h1>loading...</h1>
    }

    if (isError) {
        return <h1>error...</h1>
    }

    return (
        <section className="tabs">
            <div className="title">
                <h2>experience</h2>
                <div className="underline"></div>
            </div>
            
            <div className="jobs-center">
                <div className="btn-container">
                    {
                        people.map(item => {
                            return item.id === person.id
                            ? (<button key={ item.id } className="job-btn active-btn" onClick={ () => shiftPerson(item.id) } >{ item.company }</button>)
                            : (<button key={ item.id } className="job-btn false" onClick={ () => shiftPerson(item.id) } >{ item.company }</button>)
                        })
                    }
                </div>

                <article className="job-info">
                    <h3>{ person.title }</h3>

                    <h4>{ person.company }</h4>
                    
                    <p className="job-date">{ person.dates }</p>

                    {
                        person.duties.map((duty, index) => {
                            return (
                                <div key={ index } className="job-desc">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="job-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"></path>
                                    </svg>
                                    <p>{ duty }</p>
                                </div>
                            )
                        })
                    }
                </article>
            </div>

            <button type="button" className="btn">more info</button>
        </section>        
    )
};

export default Tabs
