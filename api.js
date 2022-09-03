import { createClient } from 'urql';

const APIRUL = "https://api-mumbai.lens.dev";

export const client = new createClient({
    url: APIRUL,
});

export const recommendedProfiles = `
    query RecommendedProfiles {
        recommendedProfiles {
            id
            name
            bio
            attributes {
                displayType
                traitType
                key
                value
            }
            followNftAddress
            metadata
            isDefault
            picture {
                ... on NftImage {
                    contractAddress
                    tokenId
                    uri
                    verified
                }
                ... on MediaSet {
                    original {
                        url
                        mimeType
                    }
                }
                __typename
            }
            handle
            coverPicture {
                ... on NftImage {
                    contractAddress
                    tokenId
                    uri
                    verified
                }
                ... on MediaSet {
                    original {
                        url
                        mimeType
                    }
                }
                __typename
            }
            ownedBy
            dispatcher {
                address
                canUseRelay
            }
            stats {
                totalFollowers
                totalFollowing
                totalPosts
                totalComments
                totalMirrors
                totalPublications
                totalCollects
            }
            followModule {
                ... on FeeFollowModuleSettings {
                    type
                    amount {
                        asset {
                            symbol
                            name
                            decimals
                            address
                        }
                        value
                    }
                    recipient
                }
                ... on ProfileFollowModuleSettings {
                    type
                }
                ... on RevertFollowModuleSettings {
                    type
                }
            }
        }
    }
`;

export const getProfileById = `
    query Profile($id: ProfileId!) {
        profile(request: { profileId: $id }) {
            id
            name
            bio
            attributes {
                displayType
                traitType
                key
                value
            }
            followNftAddress
            metadata
            isDefault
            picture {
                ... on NftImage {
                    contractAddress
                    tokenId
                    uri
                    verified
                }
                ... on MediaSet {
                    original {
                        url
                        mimeType
                    }
                }
                __typename
            }
            handle
            coverPicture {
                ... on NftImage {
                    contractAddress
                    tokenId
                    uri
                    verified
                }
                ... on MediaSet {
                    original {
                        url
                        mimeType
                    }
                }
                __typename
            }
            ownedBy
            dispatcher {
                address
                canUseRelay
            }
            stats {
                totalFollowers
                totalFollowing
                totalPosts
                totalComments
                totalMirrors
                totalPublications
                totalCollects
            }
            followModule {
                ... on FeeFollowModuleSettings {
                    type
                    amount {
                        asset {
                            symbol
                            name
                            decimals
                            address
                        }
                        value
                    }
                    recipient
                }
                ... on ProfileFollowModuleSettings {
                    type
                }
                ... on RevertFollowModuleSettings {
                    type
                }
            }
        }
    }
`

export const getPublicationsById = `
    query Publications ($id: ProfileId!) {
        publications(request: {
            profileId: $id,
            publicationTypes: [POST, COMMENT, MIRROR],
            limit: 10
        }) {
            items {
                __typename
                ... on Post {
                    ...PostFields
                }
                ... on Comment {
                    ...CommentFields
                }
                ... on Mirror {
                    ...MirrorFields
                }
            }
            pageInfo {
                prev
                next
                totalCount
            }
        }
    }

    fragment MediaFields on Media {
        url
        mimeType
    }

    fragment ProfileFields on Profile {
        id
        name
        bio
        attributes {
            displayType
            traitType
            key
            value
        }
        isFollowedByMe
        isFollowing(who: null)
        followNftAddress
        metadata
        isDefault
        handle
        picture {
            ... on NftImage {
                contractAddress
                tokenId
                uri
                verified
            }
            ... on MediaSet {
                original {
                    ...MediaFields
                }
            }
        }
        coverPicture {
            ... on NftImage {
                contractAddress {
                    contractAddress
                    tokenId
                    uri
                    verified
                }
            }
            ... on MediaSet {
                original {
                    ...MediaFields
                }
            }
        }
        ownedBy
        dispatcher {
            address
        }
        stats {
            totalFollowers
            totalFollowing
            totalPosts
            totalComments
            totalMirrors
            totalPublications
            totalCollects
        }
        followModule {
            ... on FeeFollowModuleSettings {
                type
                amount {
                    asset {
                        name
                        symbol
                        decimals
                        address
                    }
                    value
                }
                recipient
            }
            ... on ProfileFollowModuleSettings {
                type
            }
            ... on RevertFollowModuleSettings {
                type
            }
        }
    }

    fragment PublicationStatsFields on PublicationStats {
        totalAmountOfMirrors
        totalAmountOfCollects
        totalAmountOfComments
    }

    fragment MetadataOutputFields on MetadataOutput {
        name
        description
        content
        media {
            original {
            ...MediaFields
            }
        }
        attributes {
            displayType
            traitType
            value
        }
    }

    fragment Erc20Fields on Erc20 {
        name
        symbol
        decimals
        address
    }

    fragment CommentMirrorOfFields on Comment {
        ...CommentBaseFields
        mainPost {
            ... on Post {
                ...PostFields
            }
            ... on Mirror {
                ...MirrorBaseFields
            }
        }
    }
`