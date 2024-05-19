import CollectionsList from "../features/collection/CollectionsList";
import TestingAPIList from "../features/testingapi/TestingAPIList";

function Content() {
  return (
    <div className="flex justify-center mt-12">
      <div className="max-w-screen-2xl w-full">
        <div className="flex">
          <div className="w-1/4">
            {/* Wrap CollectionsList in a div with overflow-y-auto */}
            <div className="overflow-y-auto">
              <CollectionsList />
            </div>
          </div>
          <div className="w-3/4">
            {/* Wrap TestingAPIList in a div with overflow-y-auto */}
            <div className="overflow-y-auto">
              <TestingAPIList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
