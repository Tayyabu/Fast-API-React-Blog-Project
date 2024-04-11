import { Link } from "react-router-dom"


const Missing = () => {
  return (
    <main>
        <h1 className="font-bold text-2xl text-center ">404 Not Found</h1>
        <Link className="text-2xl text-green-400 font-medium   block text-center" to={'/'}>Go To Home</Link>
    </main>
  )
}

export default Missing




