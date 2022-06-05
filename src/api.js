let debug = false;

const host = "http://localhost:8081";

export const URL_LAYER_UPLOAD = debug ? `${host}/api/v1/test/file-upload` : `${host}/api/v1/layer-image/upload`
export const URL_FETCH_LAYER_LIST = debug ? `${host}/api/v1/test/file-fetch/all` : `${host}/api/v1/layer-image/fetch/all`
export const URL_FETCH_LAYER = debug ? `${host}/api/v1/test/file-fetch/` : `${host}/api/v1/layer-image/fetch/`
export const URL_MINT_NFT = debug ? "" : `${host}/api/v1/nft/mint`
export const URL_FETCH_NFT = debug ? "" : `${host}/api/v1/nft/fetch/`