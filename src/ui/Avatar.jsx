import PropTypes from 'prop-types';

function Avatar({ name }) {
    const initials = name && name.split(' ').map((part) => part[0]).join('');
  
    return (
      <div className="rounded-full bg-slate-200 w-10 h-10 flex items-center justify-center hover:bg-slate-50">
        <span className="text-gray-700 text-lg font-semibold">{initials}</span>
      </div>
    );
}

Avatar.propTypes = {
    name: PropTypes.string
};

export default Avatar;
