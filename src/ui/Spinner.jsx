import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import PropTypes from 'prop-types'; 

function Spinner({ message = '', height = 7, width = 7, color = '', bg = 'bg-slate-300'}) {
  return (
    <div className={`flex justify-center items-center rounded-md ${bg} px-3 py-1 text-sm font-semibold text-black`}>
      <Cog6ToothIcon className={`h-${height} w-${width} animate-spin fill-${color}`} />
      <h2 className="pt-1 pl-2">{message}</h2>
    </div>
  );
}

Spinner.propTypes = {
  message: PropTypes.string, 
  height: PropTypes.number, 
  width: PropTypes.number, 
  color: PropTypes.string, 
  bg: PropTypes.string, 
};

export default Spinner;
