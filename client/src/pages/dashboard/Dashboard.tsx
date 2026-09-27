import Navbar from "../../components/Navbar";
import CreateUrlForm from "../../features/urls/component/CreateUrlForm";
import UrlList from "../../features/urls/component/UrlList";


const Dashboard = () => {
  return (
    <main className="min-h-screen bg-base-200">
      <Navbar />

      <div className="px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="card mb-8 bg-base-100 shadow">
            <div className="card-body">
              <CreateUrlForm />
            </div>
          </div>

          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <UrlList />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;