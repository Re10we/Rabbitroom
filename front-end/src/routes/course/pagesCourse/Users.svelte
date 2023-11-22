<script lang="ts">
  import { page } from "$app/stores";
  import { User } from "$lib/user";
  import { Avatar, Button, Input } from "flowbite-svelte";
  import { onMount } from "svelte";

  $: users = [];
  let listNameGroup = [
    { value: "teacher", name: "Teachers" },
    { value: "student", name: "Students" },
  ];

  onMount(async () => {
    const user = User.getInstance();
    const codeCourse = $page.params.codeCourse;

    users = await user.getCourseUsersByCode(codeCourse);
  });
</script>

<div class="flex flex-col justify-center ml-[12rem]">
  {#each listNameGroup as currentGroup}
    <div class="w-[80%] ml-[3rem]">
      <Input
        class="mt-2 text-black text-2xl rounded-none border-0 border-b-2 border-orange-500 bg-transparent focus:border-0 focus:ring-0 focus:border-b-2 "
        readonly
        value={currentGroup.name}
      />
    </div>
    {#each users as { userName, role }}
      {#if role == currentGroup.value || (currentGroup.value == "teacher" && role == "admin")}
        <div class="flex mt-[2rem] ml-[3rem]">
          <div class="flex justify-center space-y-1 font-medium dark:text-white">
            <Avatar />
            <span class="ml-[1rem] text-lg">{userName}</span>
          </div>
        </div>
      {/if}
    {/each}
  {/each}
</div>
