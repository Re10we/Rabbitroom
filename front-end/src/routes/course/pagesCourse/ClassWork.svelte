<script lang="ts">
  import "../../../app.postcss";
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import {
    PlusSolid,
    ClipboardSolid,
    BookSolid,
    ArrowsRepeatSolid,
    ListSolid,
  } from "flowbite-svelte-icons";
  import Assignment from "../createTasks/CreateTask.svelte";
  import CreateTask from "../createTasks/CreateTask.svelte";

  let openModal = false;
  let typeTask: "assignment" | "material" | "reusePost" | "topic" = "assignment";
</script>

<div class="mt-6 flex justify-center">
  <Button class="mr-12 w-[7rem] h-[3.3rem] rounded-full">
    Create
    <PlusSolid class="w-3 h-3 ml-2 text-white dark:text-white" />
  </Button>
  <Dropdown>
    <DropdownItem
      class="flex"
      on:click={() => {
        typeTask = "assignment";
        openModal = true;
      }}
    >
      <ClipboardSolid class="mr-2" />
      Assignment
    </DropdownItem>
    <DropdownItem
      class="flex"
      on:click={() => {
        typeTask = "material";
        openModal = true;
      }}
    >
      <BookSolid class="mr-2" />
      Material
    </DropdownItem>
    <DropdownItem
      class="flex"
      on:click={() => {
        typeTask = "reusePost";
        openModal = true;
      }}
    >
      <ArrowsRepeatSolid class="mr-2" />
      Reuse post
    </DropdownItem>
    <DropdownItem
      class="flex"
      on:click={() => {
        typeTask = "topic";
        openModal = true;
      }}
    >
      <ListSolid class="mr-2" />
      Topic
    </DropdownItem>
  </Dropdown>
  <CreateTask bind:openModal bind:typeTask />
</div>
