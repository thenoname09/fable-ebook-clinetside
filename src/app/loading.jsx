import GlobalSpinner from "@/components/GlobalSpinner";

export default function Loading() {
  return <GlobalSpinner message="Loading Fable..." fullScreen={true} />;
}