import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default async function Home() {
    const {data, error} = useSWR('/api/databases', fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <div>
            <h1>{ data }</h1>
        </div>
    )
}
