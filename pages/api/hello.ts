// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: "World" });
};

export default withSentry(handler);

export type FetchResult =
  | {
      result: Data;
      error: null;
    }
  | {
      result: null;
      error: object;
    }
  | {
      result: null;
      error: null;
    };

export const fetchHello = (): Promise<FetchResult> => {
  return fetch("/api/hello")
    .then((r) => {
      if (r.status === 200) return r;
      console.error(r);
      throw new Error("invalid status code");
    })
    .then((r) => r.json())
    .then((resp) => ({ result: resp, error: null }))
    .catch((e) => ({ result: null, error: e }));
};
