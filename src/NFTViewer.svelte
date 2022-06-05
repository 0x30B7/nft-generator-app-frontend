<script>
    import {
        closeModal,
        closeAllModals,
        openModal,
        modals,
    } from "svelte-modals";

    import { URL_FETCH_NFT } from "./api";

    export let isOpen;
    export let title;

    export let nftImageId;
    export let imageSource;

    export let doLookup = true;
    export let openItself;

    if (doLookup === true && !window.nftCheckTask) {
        window.nftCheckTask = setInterval(async () => {
            let response = await fetch(URL_FETCH_NFT + nftImageId, {
                method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            });

            if (response.status === 200) {
                clearInterval(window.nftCheckTask);
                window.nftCheckTask = undefined;

                let reader = new FileReader();
                reader.onloadend = () => {
                    openItself({
                        imageSource: reader.result,
                        doLookup: false,
                    });
                };

                reader.readAsDataURL(await response.blob());
            }
        }, 2000);
    }
</script>

{#if isOpen}
    <div role="dialog" class="modal">
        <div class="contents">
            {#if imageSource}
                <h2>Done!</h2>
                <div class="nft-image">
                    <img src={imageSource} alt="nft" />
                </div>
            {:else}
                <p>Minting NFT, please wait...</p>
            {/if}

            <div class="actions">
                <button on:click|preventDefault={closeAllModals}>Close</button>
            </div>
        </div>
    </div>
{/if}

<style>
    .nft-image {
        max-width: 150;
        max-height: 150;
        border: 1px solid black;
    }

    .color-option-buttons {
        display: flex;
        align-items: center;
    }

    .color-option-buttons > div {
        margin: 10px;
    }

    .modal {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        /* allow click-through to backdrop */
        pointer-events: none;
    }

    .contents {
        min-width: 500px;
        border-radius: 6px;
        padding: 16px;
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        pointer-events: auto;
    }

    h2 {
        text-align: center;
        font-size: 24px;
    }

    p {
        text-align: center;
        margin-top: 16px;
    }

    .actions {
        margin-top: 32px;
        display: flex;
        justify-content: space-between;
        gap: 8px;
    }
</style>
