<script lang="ts">
  import { page } from "$app/stores";
  import { User } from "$lib/user";
  import {
    Label,
    Modal,
    Input,
    Textarea,
    Toolbar,
    ToolbarGroup,
    ToolbarButton,
    MultiSelect,
  } from "flowbite-svelte";
  import { CodeOutline } from "flowbite-svelte-icons";
  import { onMount } from "svelte";

  export let typeTask: "assignment" | "material" | "reusePost" | "topic";
  export let textButton: string;

  let openModal = false;
  let titleTask: string;
  let usersItem: { value: string; name: string }[] = [];
  let selectedUsers: [];

  onMount(async () => {
    const user = User.getInstance();
    const codeCourse = $page.params.codeCourse;

    if (codeCourse != undefined) {
      usersItem = (await user.getCourseUsersByCode(codeCourse))
        .filter((item) => item["role"] != "admin")
        .map((item) => {
          return { value: item["userName"], name: item["userName"] };
        });
    }
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<span on:click={() => (openModal = true)}>{textButton}</span>

<Modal bind:open={openModal} size="xl" class="w-full" placement="top-center">
  <div class="flex h-[40rem]">
    {#if typeTask == "assignment"}
      <div class="w-[70%] flex flex-col">
        <Label>Title</Label>
        <Input bind:value={titleTask} id="title" type="text" />
        <Textarea rows="6" class="mt-[3rem]" placeholder="Write a comment">
          <Toolbar slot="header" color="dark" embedded>
            <ToolbarGroup>
              <ToolbarButton name="Format code"><CodeOutline class="w-5 h-5" /></ToolbarButton>
            </ToolbarGroup>
          </Toolbar>
        </Textarea>
      </div>
    {/if}
    <div class="ml-[10rem] mr-[3rem] flex flex-col w-[20%]">
      <div>
        <Label>For students</Label>
        <MultiSelect items={usersItem} bind:value={selectedUsers} size="lg" />
      </div>
      <div>
        <Label>For</Label>
        <MultiSelect items={usersItem} bind:value={selectedUsers} size="lg" />
      </div>
    </div>
  </div>
</Modal>
