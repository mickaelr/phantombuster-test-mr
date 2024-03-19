import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { useRouteError } from "react-router-dom";

function ErrorPage() {
    let error = useRouteError();
    console.error(error);

    return (
        <div className="container h-screen mx-auto my-10 flex flex-col justify-center items-center gap-8">
            <ExclamationTriangleIcon className="h-24 w-24 text-slate-900" />
            <h1 className="text-xl">Oops! Something wrong happened.</h1>
        </div>
    )
}
  
export default ErrorPage