import { router } from "../trpc";
import { plantsRouter } from "./plants";

export const appRouter = router({
  arcgis: plantsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
