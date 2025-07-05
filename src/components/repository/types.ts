import type { RepositoryDetails } from "../../types/repository";

export interface RepositoryProps {
    details: RepositoryDetails
    goBack: (id: number) => void
    styles?: React.CSSProperties;
}