<script lang="ts">
  import "../../../app.postcss";
  import { Button, Dropdown, DropdownItem, Input } from "flowbite-svelte";
  import {
    PlusSolid,
    ClipboardSolid,
    BookSolid,
    ListSolid,
    ClipboardListSolid,
    BookmarkSolid,
    CloseSolid,
  } from "flowbite-svelte-icons";
  import CreateTask from "../createTasks/CreateTask.svelte";
  import CreateTopic from "../createTasks/CreateTopic.svelte";
  import { onMount } from "svelte";
  import { User } from "$lib/user";
  import { page } from "$app/stores";

  let openModalTask = false;
  let openModalTopic = false;

  let typeTask: "assignment" | "material" = "assignment";

  $: tasks = [];
  let mainTopics: string[] = [];
  let isStudent = false;

  onMount(async () => {
    const user = User.getInstance();
    const codeCourse = $page.params.codeCourse;

    const userName = await user.getUserName();
    isStudent = await user.isStudentUser(codeCourse, userName);

    tasks = await user.getCourseTasksByCode(codeCourse);

    mainTopics = tasks.map((item) => {
      return item.topic;
    });

    mainTopics = [...new Set(mainTopics)];
  });

  const handleClickRemoveTask = async (idTask: string) => {
    const user = User.getInstance();
    const codeCourse = $page.params.codeCourse;

    await user.deleteTaskFromCourse(idTask, codeCourse);

    window.location.reload();
  };
</script>

{#if isStudent == false}
  <div class="mt-6 flex justify-center">
    <Button class="mr-12 w-[7rem] h-[3.3rem] rounded-full">
      Create
      <PlusSolid class="w-3 h-3 ml-2 outline-0 text-white dark:text-white" />
    </Button>
    <Dropdown>
      <DropdownItem
        class="flex"
        on:click={() => {
          typeTask = "assignment";
          openModalTask = true;
        }}
      >
        <ClipboardSolid class="mr-2" />
        Assignment
      </DropdownItem>
      <DropdownItem
        class="flex"
        on:click={() => {
          typeTask = "material";
          openModalTask = true;
        }}
      >
        <BookSolid class="mr-2" />
        Material
      </DropdownItem>
      <DropdownItem
        class="flex"
        on:click={() => {
          openModalTopic = true;
        }}
      >
        <ListSolid class="mr-2" />
        Topic
      </DropdownItem>
    </Dropdown>

    <CreateTopic bind:openModal={openModalTopic} />
    <CreateTask bind:openModal={openModalTask} bind:typeTask />
  </div>
{/if}

<div class="flex flex-col justify-center ml-[12rem]">
  {#each mainTopics as mainTopic}
    <div class="w-[80%] ml-[3rem]">
      <Input
        class="mt-2 text-black text-2xl rounded-none border-0 border-b-2 border-orange-500 bg-transparent focus:border-0 focus:ring-0 focus:border-b-2 "
        readonly
        value={mainTopic}
      />
    </div>
    {#each tasks as { _id, title, topic, due }}
      {#if topic == mainTopic}
        <Button class="py-[1.2rem] mt-10 ml-[10rem] w-[60%] flex justify-between">
          <div class="flex -space-y-1 font-medium">
            {#if due == null}
              <BookmarkSolid class="mt-0.5 mr-2" />
            {:else}
              <ClipboardListSolid class="mt-0.5 mr-2" />
            {/if}
            <span class="text-lg">{title}</span>
          </div>
          {#if isStudent != true}
            <CloseSolid
              on:click={(e) => handleClickRemoveTask(_id)}
              class="cursor-pointer w-6 h-6 outline-0 hover:text-neutral-600"
            />
          {/if}
        </Button>
      {/if}
    {/each}
  {/each}
</div>
