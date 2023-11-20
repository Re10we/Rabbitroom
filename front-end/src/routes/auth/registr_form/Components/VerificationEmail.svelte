<script lang="ts">
  import { Modal } from "flowbite-svelte";
  import { ExclamationCircleOutline } from "flowbite-svelte-icons";

  export let openModal = false;
</script>

<Modal bind:open={openModal} size="xs">
  <div class="text-center">
    <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
      On you email have being send verification path!
    </h3>
  </div>
</Modal>
