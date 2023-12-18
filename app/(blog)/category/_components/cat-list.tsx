import { Category } from "@prisma/client";
import { CatItems } from "./cat-item";

interface CatListProps {
  fetchData: () => Promise<Category[]>;
}

export const CatList = async ({ fetchData }: CatListProps) => {
  const catData = await fetchData();
  if (!catData) {
    return null;
  }
  const renderedCatData = catData.map((data) => (
    <CatItems key={data.id} data={data} />
  ));
  return <div className="w-full">{renderedCatData}</div>;
};
