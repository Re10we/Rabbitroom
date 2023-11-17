<script lang="ts">
  import { User } from "$lib/user";
  import {
    Label,
    Modal,
    Input,
    Textarea,
    Toolbar,
    ToolbarGroup,
    ToolbarButton,
    Select,
    Checkbox,
    MultiSelect,
  } from "flowbite-svelte";
  import { CodeOutline } from "flowbite-svelte-icons";
  import { onMount } from "svelte";

  export let typeTask: "assignment" | "material" | "reusePost" | "topic";
  export let textButton: string;

  let openModal = false;
  let titleTask: string;
  let usersItem: { value: string; name: string }[] = [
    { value: "us", name: "United States" },
    { value: "ca", name: "Canada" },
    { value: "fr", name: "France" },
    { value: "jp", name: "Japan" },
    { value: "ss", name: "asd" },
    { value: "as", name: "dfg" },
    { value: "ds", name: "hgj" },
    { value: "egfg", name: "jkl" },
    { value: "hgh", name: "nm," },
    { value: "jhj", name: "zxc" },
    { value: "ert", name: ".,m" },
    { value: "jhgj", name: "sdf" },
    { value: "zxc", name: "qwe" },
    { value: "cbv", name: "ert" },
    { value: "qwe", name: "ytu" },
    { value: "mnbm", name: "iuo" },
  ];
  let selectedUsers: [];

  onMount(async () => {
    const user = User.getInstance();
    const codeCourse = user.getCurrentCodeCourse();

    if (codeCourse != undefined) {
      let allStudent = (await user.getCourseUsersByCode(codeCourse)).filter(
        (element) => element.role != "admin"
      );

      console.log(selectedUsers);
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
        <Label>For</Label>
        <MultiSelect items={usersItem} bind:value={selectedUsers} size="lg" />
      </div>
      <div>
        <Label>For</Label>
        <MultiSelect items={usersItem} bind:value={selectedUsers} size="lg" />
      </div>
    </div>
  </div>
</Modal>
