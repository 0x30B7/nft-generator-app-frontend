<script>
    import {
        closeModal,
        closeAllModals,
        openModal,
        modals,
    } from "svelte-modals";

    import BlurEditor from "./step-editors/BlurEditor.svelte";
    import ColorFillEditor from "./step-editors/ColorFillEditor.svelte";

    export let isOpen;
    export let title;
    export let message;
    export let onOpenAnother;

    export let onStepCreated;
    export let step;

    let stepType = step?.type ?? "color-fill";
    let stepProperties = step?.properties ?? {};

    // TODO: reset step properties when step type is changed

    let stackIndex = modals.length;

    function handleBtnClose(e) {
        onStepCreated({ type: stepType, properties: stepProperties });
        closeModal(e);
    }
</script>

{#if isOpen}
    <div role="dialog" class="modal">
        <div class="contents">
            <h2>{title}</h2>
            <p>{message} hello</p>

            <!-- select step type -->
            <label for="stepType">Step type</label>

            <select name="stepType" bind:value={stepType}>
                <option value="color-fill">color-fill</option>
                <option value="blur">blur</option>
            </select>

            {#if stepType === "color-fill"}
                <ColorFillEditor properties={stepProperties} />
            {:else if stepType === "blur"}
                <BlurEditor properties={stepProperties} />
            {/if}

            <div class="actions">
                {#if stackIndex > 1}
                    <button on:click|preventDefault={handleBtnClose}
                        >Close One</button
                    >
                    <button on:click={closeAllModals}>Close All</button>
                {:else}
                    <button on:click|preventDefault={handleBtnClose}
                        >Close</button
                    >
                {/if}
            </div>
        </div>
    </div>
{/if}

<style>
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
