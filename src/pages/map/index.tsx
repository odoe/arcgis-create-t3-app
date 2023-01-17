import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

async function loadMap(container: HTMLDivElement, type: string) {
    const { init } = await import("../../utils/mapping");
    init(container, type);
}

export default function WebMap() {
    const r = useRouter();
    const mapRef = useRef<HTMLDivElement>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded && mapRef.current && r.query) {
            setLoaded(true);
            loadMap(mapRef.current, r.query.type as string);
        }
    }, [mapRef, r, loaded]);

    return (
        <section className="h-full w-full">
            <div className="h-full w-full" ref={mapRef}></div>
        </section>
    );
}
