<script lang="ts">
  import { goto } from "$app/navigation";
  import { User } from "$lib/user";
  import { Button, Input, Label, Modal } from "flowbite-svelte";

  export let loggedInUser: boolean;
  let createCourseName: string;

  let createCourse = false;

  const handleClickCreateCourse = async () => {
    const user = User.getInstance();

    if (createCourseName != "") {
      const codeCourse = await user.createCourse(createCourseName);

      if (codeCourse != null) {
        window.location.reload();
      }
    }
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<span
  on:click={() => {
    if (!loggedInUser) {
      goto("/auth/login_form");
    } else {
      createCourse = true;
    }
  }}
>
  Create course
</span>

<Modal bind:open={createCourse} size="xs" class="w-full">
  <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create course</h3>
  <Label class="space-y-2">
    <span>Name course</span>
    <Input type="text" name="nameCourse" bind:value={createCourseName} />
  </Label>
  <Button class="w-full" on:click={handleClickCreateCourse}>Create course</Button>
</Modal>
