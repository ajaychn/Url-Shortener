import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateUrlMutation } from "../../../services/urlApi";

const createUrlSchema = z.object({
  originalUrl: z.url("Please enter a valid URL"),
});

type CreateUrlFormData = z.infer<typeof createUrlSchema>;

const CreateUrlForm = () => {
  const [createUrl, { isLoading }] = useCreateUrlMutation();

  const { register, handleSubmit, reset, formState: { errors }, } = useForm<CreateUrlFormData>({
    resolver: zodResolver(createUrlSchema),
  });

  const onSubmit = async (data: CreateUrlFormData) => {
    try {
      await createUrl(data).unwrap();

      reset();
    } catch (error) {
      console.error("Failed to create URL:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="label">
          <span className="label-text">Original URL</span>
        </label>

        <input
          type="url"
          placeholder="https://example.com/very-long-url"
          className={`input input-bordered w-full ${errors.originalUrl ? "input-error" : ""
            }`}
          {...register("originalUrl")}
        />

        {errors.originalUrl && (
          <p className="mt-1 text-sm text-error">
            {errors.originalUrl.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isLoading}
      >
        {isLoading ? "Shortening..." : "Shorten URL"}
      </button>
    </form>
  );
};

export default CreateUrlForm;