<script>
    import {
        closeModal,
        closeAllModals,
        openModal,
        modals,
    } from "svelte-modals";

    export let isOpen;
    export let title;
    export let message;
    export let onOpenAnother;

    let stackIndex = modals.length;

    function handleOpen(e) {
        e.preventDefault();
        openModal(Modal, {
            title: `Alert #${$modals.length + 1}`,
            message: "This is an alert",
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
            <p>{message} hello</p>
            <div>
                <div class="color-option-buttons">
                    <div>
                        <h3>Color-fill</h3>
                    </div>
                    <div>
                        <button on:click={handleOpen}>Edit</button>
                    </div>
                    <div>
                        <button on:click={handleOpen}>Remove</button>
                    </div>
               
                </div>
            </div>
            <div>
                <div class="color-option-buttons">
                    <div>
                        <h3>Blur</h3>
                    </div>
                    <div>
                        <button on:click={handleOpen}>Edit</button>
                    </div>
                    <div>
                        <button on:click={handleOpen}>Remove</button>
                    </div>
                </div>
            </div>
            <div>
                <div class="color-option-buttons">
                    <div>
                        <h3>Gray</h3>
                    </div>
                    <div>
                        <button on:click={handleOpen}>Edit</button>
                    </div>
                    <div>
                        <button on:click={handleOpen}>Remove</button>
                    </div>
                </div>
            </div>

            <div>
                <button on:click={handleOpen}>+ Add </button>
            </div>

            <div class="actions">
                {#if stackIndex > 1}
                    <button on:click={closeModal}>Close One</button>
                    <button on:click={closeAllModals}>Close All</button>
                {:else}
                    <button on:click={closeModal}>Close</button>
                {/if}
                <button on:click={onOpenAnother}>Open Another</button>
            </div>
        </div>
    </div>
{/if}

<style>
    .color-option-buttons {
        display: flex;
        align-items: center;
    }

    .color-option-buttons > div{
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
