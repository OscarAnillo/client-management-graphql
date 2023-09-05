import { Clients } from '../Components/Clients'
import { AddClient } from '../Components/AddClients'
import { AddProject } from '../Components/AddProject'
import { Projects } from '../Components/Projects'

export const Home = () => {
    return (
        <>
            <div className="d-flex gap-3 mb-4">
                <AddClient />
                <AddProject />
            </div>
            <Projects />
            <hr />
            <Clients />
        </>
    )
}