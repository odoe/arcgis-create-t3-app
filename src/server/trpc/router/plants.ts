import { z } from "zod";
import config from "@arcgis/core/config";
import { executeQueryJSON } from "@arcgis/core/rest/query";

import { router, publicProcedure } from "../trpc";

config.request.useIdentity = false;

const PLANT_URL = "https://services1.arcgis.com/4yjifSiIG17X0gW4/arcgis/rest/services/PowerPlants_WorldResourcesInstitute/FeatureServer/0";

export const plantsRouter = router({
    powerplants: publicProcedure
        .output(z.object({ types: z.array(z.string()) }))
        .query(async () => {
            const query = {
                outFields: ['fuel1'],
                where: '1=1',
                returnDistinctValues: true,
                returnGeometry: false
            }
            const results = await executeQueryJSON(PLANT_URL, query)
            const types = results.features
                .map((feature) => feature.attributes['fuel1'])
                .filter(Boolean)
                .sort();

            return {
                types
            };
        }),
});
