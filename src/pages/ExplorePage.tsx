import Section from "@/components/layout/Section";



export default function ExplorePage() {
  return (
    <div className="flex  flex-col  pt-20 px-80 ">
      <Section
        queryKey="trending"
        endpoint="trending/movie/day"
        heading="trending movies"
        params="language=en-US"
      />

      <Section
        queryKey="trending-shows"
        endpoint="trending/tv/day"
        heading="Trending Shows"
        params="language=en-US"
      />
    </div>
  );
}
