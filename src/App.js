import './App.css';
import React, {useEffect, useState, useRef} from 'react';
import axios from "axios";

function App() {
    const [repList, setRepList] = useState([]);
    const [language, setLanguage] = useState('JavaScript');
    const [pageNumber, setPageNumber] = useState(1);
    const [loader, setLoader] = useState(true);
    const [lastEl, setLastEl] = useState(null);
    const convasRef = useRef();

    const observer = new IntersectionObserver(
        entries => {
            if (entries[0].isIntersecting) {
                console.log('page increment');
                setPageNumber(pageNumber+1);
                setLoader(true);
            }
        }
    )

    useEffect(() => {
        fetchData()
    }, [language])

    useEffect(() => {
        if (lastEl){ observer.observe(lastEl)}
        return ()=>{if (lastEl) {observer.unobserve(lastEl)}}
    }, [language,lastEl])

    const fetchData = () => {
        axios({
            method: 'GET',
            url: 'https://api.github.com/search/repositories',
            params: {
                q: `language:${language}`,
                sort: 'stars',
                order: 'desc',
                page: pageNumber,
               // limit: 60
            }
        })
            .then(res => {
                console.log(res.data.items);
                setRepList([...repList, ...res.data.items]);
                setLoader(false)
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="App">  {/* <App2 />*/}

            <header className="App-header">

                <select value={language} onChange={(e) => {
                    setLanguage(e.target.value)
                }}>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Go">GO</option>
                </select>

                <p>GitHub's repositories</p>
            </header>
            {loader ? <h1>loading</h1> :
                <table className="table">
                    <tbody className="">
                    <tr>
                        <td>Name</td>
                        <td>URL (link)</td>
                        <td>Owner</td>
                        <td>Forks</td>
                        <td>Open issues</td>
                    </tr>
                    {repList.map(el => <tr reg={setLastEl} key={el.id} className="tbody">
                        <td>{el.full_name}</td>
                        <td><a href={el.url}>{el.url}</a></td>
                        <td>{el.owner.login}</td>
                        <td>{el.forks}</td>
                        <td>{el.open_issues}</td>
                    </tr>)}
                    </tbody>
                </table>
            }

            {/*{
              repList.map(el=><li key={el.id}>{el.name}</li>)
          }*/}

        </div>
    );
}

export default App;
