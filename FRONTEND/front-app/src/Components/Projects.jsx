import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../Queries/Project-queries';
import { Spinner } from './Spinner';
import { ProjectCard } from './ProjectCard';


export const Projects = () => {
    const { data, error, loading } = useQuery(GET_PROJECTS);


    if(loading) return <Spinner />
    if(error) return <h1>Something went wrong</h1>

    return (
        <div>
            {
                data.projects.length > 0 ? (
                    <div className='row mt-4'>
                      {data.projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  ) : (
                    <p>No Projects</p>
                  )
            }
        </div>
    )
}