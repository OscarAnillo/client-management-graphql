import { useNavigate } from "react-router-dom";
import { FaTrash } from 'react-icons/fa'
import { useMutation } from "@apollo/client";
import { GET_PROJECTS } from "../Queries/Project-queries";
import { DELETE_PROJECT } from "../Mutations/Projects-mutation";
import Proptypes from 'prop-types'

export const DeleteProjectButton = ({ projectId }) => {
    const navigate = useNavigate();

    const [ deleteProject ] = useMutation(DELETE_PROJECT, {
        variables: { id: projectId },
        refetchQueries: [{ query: GET_PROJECTS }],
        onCompleted: () => navigate("/")
    })

    return (
        <div className="d-flex mt-5 ms-auto">
            <button className="btn btn-danger m-2" onClick={deleteProject}>
                <FaTrash className="icon"/> Delete Project
            </button>
        </div>
    )
}

DeleteProjectButton.propTypes = {
    projectId : Proptypes.string
}