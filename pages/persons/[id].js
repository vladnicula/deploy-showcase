import { useRouter } from "next/router"

export default function PersonPage ({ personData }) {
    const { isFallback } =  useRouter()

    if ( isFallback ) {
        return (
            <h1>Loading loading</h1>
        )
    }
    
    return (
        <div>
            <h1>Data for person {personData.name}</h1>
            <pre>{personData ? JSON.stringify(personData, null, 4) : null}</pre>
        </div>
    )
}

export const getStaticPaths = async () => {

    // business logic to figure out what is top priority
    return {
        paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
        fallback: true, // can also be true or 'blocking'
    }
}

export const getStaticProps = async (context) => {
    console.log(`getStaticProps`, context.params.id)
    const id = context.params.id
    try {
        await new Promise((resolve) => setTimeout(resolve, 10000))
        const personData = await fetch(`https://swapi.dev/api/people/${id}`).then((httpResponse) => httpResponse.json())
        return {
            props: {
                personData
            }, // will be passed to the page component as props
        }
    } catch (err) {
        console.log("Error fetching persons", err)
    }
    
}
