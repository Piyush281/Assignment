import { stringUtils } from "../../utils/strings";
import "./Card.css"

type CardProps = {
    id: number;
    title: string;
    description: string;
    handleRepoId: (id:number) => void;
    style?: React.CSSProperties;
}

const Card = ({ id, title, description, style, handleRepoId }: CardProps) => {
    return (
        <div className="card" style={style} onClick={()=> handleRepoId(id)} id={"card-" + id}>
            <h3 className="title">{stringUtils.titleCase(title)}</h3>
            <p className={description ? "description" : "description empty"}>{description ? description : "No description available."}</p>
        </div>
    );
}

export default Card;
