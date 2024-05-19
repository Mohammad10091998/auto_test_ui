function Footer() {
  
  const navigateToMyLinkedIn = () => {
    window.open(
      "https://www.linkedin.com/in/mohammad-asif-b63b761a3?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B%2FgnfxtoTQVCHcBzNf%2BDl5Q%3D%3D",
      "_blank"
    );
  };

  const navigateToMyGithubIn = () => {
    window.open(
      "https://github.com/Mohammad10091998",
      "_blank"
    );
  };

  const copyEmailToClipboard = () => {
    const email = "mohdasifamu1998@gmail.com";
    navigator.clipboard.writeText(email).then(
      () => {
        alert("Email address copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy email: ", err);
      }
    );
  };

  return (
    <div className="fixed bottom-0 left-0 bg-slate-500 h-12 w-full flex items-center justify-center">
      <div className="flex items-center space-x-4">
        <button
          type="button"
          onClick={copyEmailToClipboard}
          className="w-20 text-center rounded-full bg-slate-600 hover:bg-slate-400 p-2 text-gray-200 hover:text-black focus:outline-none"
        >
          email
        </button>

        <button
          type="button"
          onClick={navigateToMyLinkedIn}
          className="w-20 text-center rounded-full bg-slate-600 p-2 hover:bg-slate-400 text-gray-200 hover:text-black focus:outline-none"
        >
          linkedIn
        </button>
        <button
          type="button"
          onClick={navigateToMyGithubIn}
          className="w-20 text-center rounded-full bg-slate-600 p-2 hover:bg-slate-400 text-gray-200 hover:text-black focus:outline-none"
        >
          github
        </button>
      </div>
    </div>
  );
}

export default Footer;
