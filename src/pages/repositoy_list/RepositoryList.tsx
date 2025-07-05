import { useEffect, useState } from "react";
import type { RepositoryDetails } from "../../types/repository";
import { fetchRepositories } from "../../apis/repository_details";
import Card from "../../components/card/Card";

import "./RepositoryList.css";
import { Link } from "react-router";
import Repository from "../../components/repository/Repository";


const RepositoryList = () => {

    const [repositories, setRepositories] = useState<RepositoryDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [repoId, setRepoId] = useState<number>(-1)
    const [repoDetails, setRepoDetails] = useState<RepositoryDetails | null>(null);

    useEffect(() => {
        fetchRepositories().then((data) => {
            setRepositories(data);
            setLoading(false);
        }).catch((error) => {
            console.error("Error fetching repositories:", error);
            setLoading(false);
        });
    }, [])

    const handleRepoId = (id: number) => {
        const body: HTMLElement = document.getElementsByTagName("body")[0];
        if (id === -1) {
            body.style.overflow = "auto";
            setRepoId(-1);
            setRepoDetails(null);
        } else {
            body.style.overflow = "hidden"; 
            setRepoId(id);
            const selectedRepo = repositories.find((repo) => repo.id === id);
            setRepoDetails(selectedRepo || null);
        }
    }

    return (
        <div style={repoId !== -1 ? { position: "relative" } : {}}>
            <div className="repository-list">
                <div className="header-container">
                    <div className="header-left">
                        <h1>GoDaddy Repository List</h1>
                        {!loading && (
                            <p>Total Repositories: {repositories.length}</p>
                        )}
                    </div>
                    {!loading && (
                        <div className="header-right">
                            <Link to="/"> <button>Go Back to Home</button></Link>
                        </div>
                    )}
                </div>
                {loading ? (
                    <div className="loading-container"><p>Loading...</p></div>
                ) : (
                    <div className="card-container">
                        {repositories.map((repo) => (
                            <Card
                                key={repo.id}
                                id={repo.id}
                                title={repo.name}
                                description={repo.description}
                                style={{ backdropFilter: "blur(5px)", borderRadius: "10px" }}
                                handleRepoId={handleRepoId}
                            />
                        ))}
                    </div>
                )}
            </div>
            {
                repoDetails && repoId !== -1 && ( <Repository details={repoDetails} goBack={handleRepoId} styles={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backdropFilter: "blur(2px)" }} /> )
            }
        </div>
    );
}

export default RepositoryList;

