import { Cog6ToothIcon } from '@heroicons/react/24/outline'

function Loader({message = ''}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <div>
        <Cog6ToothIcon className="h-10 w-10 animate-spin"
        style={{ transform: "rotate(120deg)" }} />
        </div>

        <div className="flex">
        <Cog6ToothIcon
          className="h-10 w-10 animate-spin"
          style={{ transform: "rotate(120deg)" }}
        />
        <Cog6ToothIcon
          className="h-10 w-10 animate-spin"
          style={{ transform: "rotate(120deg)" }}
        />
        </div>
        <p>{message}</p>
    </div>
  )
}

export default Loader
