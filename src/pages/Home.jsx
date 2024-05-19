
const navigateToReadMe = () => {
  window.open(
    "https://github.com/Mohammad10091998/auto_test_ui/blob/main/README.md#features",
    "_blank"
  );
};

function Home() {
  return (
    <div className="bg-slate-100 relative h-screen">
      <div className="px-6 lg:px-8">
       

        <div className="mx-auto max-w-2xl py-28 z-10">
          <div className="sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-800 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Documentation to Understand.{" "}
              <button
                onClick={navigateToReadMe}
                className="font-semibold text-indigo-600"
              >
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold font-mono tracking-tight text-gray-900 sm:text-6xl">
            Accelerate Your Development with Lightning-Fast API Testing
            </h1>
            <p className="mt-6 text-lg font-mono leading-8 text-gray-600">
            Supercharge your development process with our revolutionary API testing web app. Say goodbye to slow, manual testing and hello to rapid automation. Seamlessly integrate our platform for lightning-fast, precise, and reliable testing. Streamline your pipeline, identify issues faster, and deliver high-quality software at lightning speed. Elevate your development with fast-paced API testing that boosts productivity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
