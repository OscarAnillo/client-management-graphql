import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../Queries/Clients-queries';
import { ClientRow } from './ClientRow';
import { Spinner } from './Spinner';


export const Clients = () => {
    const result = useQuery(GET_CLIENTS)
    const {data, error, loading} = result;

    if(loading) return <Spinner />
    if(error) return <h1>Something went wrong</h1>

    return (
        <div>
            {
                !loading && !error && (
                    <table className='table table-hover mt-3'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { data.clients.map((client) => (
                                <ClientRow key={client.id} client={client} />  
                            ))}
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}