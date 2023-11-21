<script lang="ts">
  import "../../../app.postcss";
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { PlusSolid, ClipboardSolid, BookSolid, ListSolid } from "flowbite-svelte-icons";
  import CreateTask from "../createTasks/CreateTask.svelte";
  import CreateTopic from "../createTasks/CreateTopic.svelte";

  let openModalTask = false;
  let openModalTopic = false;
  let typeTask: "assignment" | "material" = "assignment";
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
