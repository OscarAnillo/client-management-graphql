import { useMutation } from '@apollo/client';
import { FaTrash } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { DELETE_CLIENT } from '../Mutations/mutations';
import { GET_CLIENTS } from '../Queries/Clients-queries';
import { GET_PROJECTS } from '../Queries/Project-queries';


export const ClientRow = ({ client }) => {
    const [ deleteClient ] = useMutation(DELETE_CLIENT, {
        variables: {id: client.id},
        refetchQueries: [{ query: GET_CLIENTS}, {query: GET_PROJECTS }]
        // update(cache, { data: { deleteClient}}) {
        //     const { clients } = cache.readQuery({
        //         query: GET_CLIENTS
        //     });
        //     cache.writeQuery({
        //         query: GET_CLIENTS,
        //         data: {clients: clients.filter(client => client.id !== deleteClient.id)}
        //     })   
        // }
    });

    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button className="btn btn-danger btn-sm" onClick={deleteClient}>
                    <FaTrash /> 
                </button>
            </td>
        </tr>
    )
}

ClientRow.propTypes = {
    client : PropTypes.object
}