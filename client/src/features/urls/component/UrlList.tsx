import {useDeleteUrlMutation,useGetUrlsQuery,} from "../../../services/urlApi";
import UrlCard from "./UrlCard";

const UrlList = () => {
  
  const {data,isLoading,isError,} = useGetUrlsQuery();

  const [deleteUrl, { isLoading: isDeleting }] =
    useDeleteUrlMutation();

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error">
        <span>Failed to load URLs. Please try again.</span>
      </div>
    );
  }

  const urls = data?.data ?? [];

  if (urls.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-semibold">My URLs</h2>

        <div className="py-12 text-center">
          <div className="text-5xl">🔗</div>

          <h3 className="mt-4 text-lg font-semibold">
            No URLs yet
          </h3>

          <p className="mt-1 text-sm text-base-content/60">
            Create your first short URL above.
          </p>
        </div>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteUrl(id).unwrap();
    } catch (error) {
      console.error("Failed to delete URL:", error);
    }
  };

  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">My URLs</h2>

          <p className="text-sm text-base-content/60">
            {urls.length} {urls.length === 1 ? "URL" : "URLs"} created
          </p>
        </div>

        <div className="badge badge-primary badge-outline">
          {urls.length}
        </div>
      </div>

      <div className="space-y-4">
        {urls.map((url) => (
          <UrlCard
            key={url._id}
            url={url}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        ))}
      </div>
    </section>
  );
};

export default UrlList;
