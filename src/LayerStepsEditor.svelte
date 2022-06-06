<script>
    import {
        closeModal,
        closeAllModals,
        openModal,
        modals,
    } from "svelte-modals";

    import StepEditor from "./StepEditor.svelte";

    export let isOpen;
    export let title;
    export let message;
    export let onOpenAnother;

    export let layer;

    let stackIndex = modals.length;

    function handleOpen(e) {
        e.preventDefault();
        
        // openModal(Modal, {
        //     title: `Alert #${$modals.length + 1}`,
        //     message: "This is an alert",
        //     onOpenAnother: () => {
        //         handleOpen();
        //     },
        // });
    }

    function handleBtnRemove(e, step) {
        layer.steps.splice(layer.steps.indexOf(step), 1);
        layer = layer;
    }

    function handleBtnAddStep(layer) {
        openModal(StepEditor, {
            onStepCreated: (step) => {
                layer.steps.push(step);
            },
            title: `Cuztomization #${$modals.length + 1}`,
            message: "Make your pick",
            onOpenAnother: () => {
                handleOpen();
            },
        });
    }

    function handleBtnEditStep(step) {
        openModal(StepEditor, {
            onStepCreated: (newStep) => {
                layer.steps[layer.steps.indexOf(step)] = newStep;
            },
            step,
            title: `Cuztomization #${$modals.length + 1}`,
            message: "Choose",
            onOpenAnother: () => {
                handleOpen();
            },
        });
    }

</script>

{#if isOpen}
    <div role="dialog" class="modal">
        <div class="contents">
            <h2>{title}</h2>

            <div class="step-buttons-container">
                {#each layer.steps as step}
                    <div class="color-option-buttons">
                        <div>
                            {#if step.type === "color-fill"}
                                <h3 style={"color:" + step.properties.color}>{step.type}</h3>
                            {:else if step.type === "blur"}
                                <h3>{step.type} ({step.properties.radius ?? 0})</h3>
                            {:else if step.type === "grayscale-color"}
                                <h3>{step.type}</h3>
                            {:else if step.type === "negative-color-fill-step"}
                                <h3>{step.type}</h3>
                            {:else if step.type === "brighten"}
                                <h3>{step.type} ({step.properties.factor ?? 0})</h3>
                            {:else if step.type === "horizontal-flip"}
                                <h3>{step.type}</h3>
                            {:else if step.type === "rotate-clockwise"}
                                <h3>{step.type} ({step.properties.times ?? 0})</h3>
                            {:else if step.type === "smooth-color-fill"}
                            <h3 style={"Smooth-color:" + step.properties.color}>{step.type}</h3>
                            {/if}
                            
                        </div>
                        <div>
                            <button on:click|preventDefault={handleBtnEditStep(step)}>Edit</button>
                        </div>
                        <div>
                            <button
                                on:click|preventDefault={(e) =>
                                    handleBtnRemove(e, step)}>Remove</button
                            >
                        </div>
                    </div>
                {/each}
            </div>

            <div>
                <button on:click|preventDefault={(e) => handleBtnAddStep(layer)}
                    >+ Add
                </button>
            </div>

            <div class="actions">
                {#if stackIndex > 1}
                    <button on:click={closeModal}>Close One</button>
                    <button on:click={closeAllModals}>Close All</button>
                {:else}
                    <button on:click|preventDefault={closeModal}>Close</button>
                {/if}
                <!-- <button class="hide" on:click={onOpenAnother}>Open Another</button> -->
            </div>
        </div>
    </div>
{/if}

<style>
    .step-buttons-container {
        overflow: scroll;
        overflow-x: hidden;
        min-height: 300px;
        max-height: 300px;
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
        min-height: 500px;
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
