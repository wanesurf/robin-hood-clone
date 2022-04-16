import sanityClient from '@sanity/client'
import {process} from "next/dist/server/web/sandbox/polyfills";

export const client = sanityClient({
    projectId:process.env.SANITY_PROJECT_ID,
    dataset:'production',
    apiVersion:'v1',
    token: process.env.SANITY_TOKEN,
    useCdn:falsec
})