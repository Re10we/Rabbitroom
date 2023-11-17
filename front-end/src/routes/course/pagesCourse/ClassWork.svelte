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
  import Assignment from "../createTasks/Assignment.svelte";
</script>

<div class="mt-6 flex justify-center">
  <Button class="mr-12 w-[7rem] h-[3.3rem] rounded-full">
    Create
    <PlusSolid class="w-3 h-3 ml-2 text-white dark:text-white" />
  </Button>
  <Dropdown>
    <DropdownItem class="flex">
      <ClipboardSolid class="mr-2" />
      <Assignment typeTask="assignment" textButton="Assignment" />
    </DropdownItem>
    <DropdownItem class="flex"><BookSolid class="mr-2" />Material</DropdownItem>
    <DropdownItem class="flex"><ArrowsRepeatSolid class="mr-2" />Reuse post</DropdownItem>
    <DropdownItem class="flex"><ListSolid class="mr-2" />Topic</DropdownItem>
  </Dropdown>
</div>
