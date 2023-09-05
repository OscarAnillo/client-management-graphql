import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { FaList } from 'react-icons/fa'
import { GET_PROJECTS } from "../Queries/Project-queries";
import { ADD_PROJECT } from "../Mutations/Projects-mutation";
import { GET_CLIENTS } from "../Queries/Clients-queries";

export const AddProject = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [clientId, setClientId] = useState("");
    const [status, setStatus] = useState("new");

    const [ addProject ] = useMutation(ADD_PROJECT, {
        variables: { name, description, clientId, status },
        //refetchQueries:[{ query: GET_PROJECTS }]
        update(cache, { data: { addProject } }) {
          const { projects } = cache.readQuery({ query: GET_PROJECTS });
          cache.writeQuery({
            query: GET_PROJECTS,
            data: { projects: [...projects, addProject] },
          });
        },
      });

    //Get clients for select
    const {data, loading, error} = useQuery(GET_CLIENTS)

    const submitHandler = e => {
        e.preventDefault();
        if(!name || !description || !status){
            return alert("Please provide all the required data");
        }
        addProject(name, description, status, clientId)

        setName("");
        setDescription("");
        setClientId("");
        setStatus("new");
    }

    if (loading) return null;
    if (error) return 'Something Went Wrong';

    return (
        <div>
            {!loading && !error && (
                <>
                <button type='button' className='btn btn-primary' data-bs-toggle='modal'
                data-bs-target='#addProjectModal'>
                <div className='d-flex align-items-center'>
                <FaList className='icon' />
                <div>New Project</div>
                </div>
                </button>

                <div className='modal fade' id='addProjectModal' aria-labelledby='addProjectModalLabel' aria-hidden='true'>
                    <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                        <h5 className='modal-title' id='addProjectModalLabel'>
                            New Project
                        </h5>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                        <form onSubmit={submitHandler}>
                            <div className='mb-3'>
                            <label className='form-label'>Name</label>
                            <input type='text' className='form-control' id='name' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                            <label className='form-label'>description</label>
                            <textarea className='form-control' id='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                            <label className='form-label'>Status</label>
                            <select className="form-select" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option>Not Started</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                            </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Client</label>
                                <select id="clientId" className="form-select" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                                    <option>Select Clients</option>
                                    { data.clients.map((client) => (
                                        <option key={client.id} value={client.id}>
                                            {client.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type='submit' data-bs-dismiss='modal' className='btn btn-secondary'>Submit</button>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </>
            )}
            
        </div>
    )
}