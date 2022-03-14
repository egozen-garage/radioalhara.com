import {createClient, createImageUrlBuilder, createPortableTextComponent,} from "next-sanity";

const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn: process.env.NODE_ENV === "production",
    apiVersion: '2021-10-12' 
};

if (!config.projectId) {
    throw Error("The Project ID is not set. Check your environment variables.");
}

if (!config.dataset) {
    throw Error("The dataset name is not set. Check your environment variables.");
}

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const PortableText = createPortableTextComponent({
    ...config,
    serializers: {},
});

export const sanityClient = createClient(config);