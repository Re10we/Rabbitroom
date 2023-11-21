<script lang="ts">
  import { goto } from "$app/navigation";
  import { User } from "$lib/user";
  import { Button, Input, Label, Modal } from "flowbite-svelte";

  export let loggedInUser: boolean;
  let joinCourseCode: string;

  let joinCourse = false;

  const handleClickJoinCourse = async () => {
    const user = User.getInstance();

    if (joinCourseCode != "" && joinCourseCode.length == 6) {
      const isSuccessfullyAdd = await user.joinCourse(joinCourseCode);

      if (isSuccessfullyAdd) {
        window.location.reload();

        console.log("Join course!");
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
      joinCourse = true;
    }
  }}
>
  Join course
</span>

<Modal bind:open={joinCourse} size="xs" class="w-full">
  <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Join course</h3>
  <Label class="space-y-2">
    <span>Code course</span>
    <Input type="text" name="code" bind:value={joinCourseCode} />
  </Label>
  <Button class="w-full" on:click={handleClickJoinCourse}>Join course</Button>
</Modal>
