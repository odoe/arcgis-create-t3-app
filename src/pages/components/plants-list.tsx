import Link from "next/link";
import {
    trpc
} from "../../utils/trpc";

function createList(type: string) {
    return (
        <Link href={{ pathname: "/map", query: { type }}} key={`plant-${type}`}>
            <div className="p-2 px-6 border-kbk w-full cursor-pointer hover:border-l-4 hover:border-l-blue-700">
                {type}
            </div>
        </Link>
    );
}

export default function PlantsList() {
    const { data } = trpc.arcgis.powerplants.useQuery();
    return (
        <div className="bg-white border border-gray-200 w-full h-full text-gray-900 text-xl">
            {data?.types?.map(createList)}
        </div>
    );
}
