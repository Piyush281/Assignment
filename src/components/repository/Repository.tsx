import type { RepositoryProps } from "./types";
import "./Repository.css";
import { stringUtils } from "../../utils/strings";

const Repository = ({ details, goBack, styles }: RepositoryProps) => {

    return (
        <div className="container" style={styles} id={"repository-container-" + details?.id}>
            <div className="container-repository">
                <div className="top-bar">
                    <h2>{stringUtils.titleCase(details?.name)}</h2>
                    <p>{details?.description}</p>
                </div>
                <div className="repository-details">
                    <Detail label="🔁 Forks" value={details?.forks_count} />
                    <Detail label="🔓 Open Issues" value={details?.open_issues_count} />
                    <Detail label="💻 Language" value={details?.language} />
                    <Detail label="👁️ Watchers" value={details?.watchers_count} />
                    <Detail label="🔗 Repository URL" value={<a href={details?.html_url} target="_blank" rel="noopener noreferrer">{details?.html_url}</a>} />
                </div>
                <div className="repository-actions">
                    <button className="go-back-button" onClick={() => goBack(-1)}>
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    )

}

const Detail = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <p><strong>{label}:</strong> {value}</p>
);

export default Repository;

// https://coolors.co/b0a1ba-a5b5bf-c1d7d6-b8e2c8-bff0d4