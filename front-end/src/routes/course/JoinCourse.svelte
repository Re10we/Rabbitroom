<script lang="ts">
  import { Button, Input, Label, Modal } from "flowbite-svelte";

  export let loggedInUser: boolean;

  let joinCourse = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<span
  on:click={() => {
    if (!loggedInUser) {
      window.location.href = "/auth/login_form";
    } else {
      joinCourse = true;
    }
  }}>Join course</span
>

<Modal bind:open={joinCourse} size="xs" class="w-full">
  <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Join course</h3>
  <Label class="space-y-2">
    <span>Code course</span>
    <Input type="text" name="code" />
  </Label>
  <Button class="w-full">Join course</Button>
</Modal>
