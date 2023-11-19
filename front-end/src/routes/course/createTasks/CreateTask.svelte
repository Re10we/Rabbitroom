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
    NumberInput,
    Select,
    Fileupload,
    Button,
    Listgroup,
  } from "flowbite-svelte";
  import { CodeOutline, CloseSolid } from "flowbite-svelte-icons";
  import { onMount } from "svelte";

  export let typeTask: "assignment" | "material" | "reusePost" | "topic";
  export let openModal = false;

  let titleTask: string;
  let descriptionTask: string;
  let pathFiles: { value: string; name: string }[] = [];
  let pathFileValue: string;
  let files: FileList;

  let usersItem: { value: string; name: string }[] = [];
  let topicItems: { value: string; name: string }[] = [];

  let selectedUsers: (string | number)[];
  let selectedTopic: string;

  $: currentLinkUrl = "";
  $: linkButtonDisabled = true;
  let attachedLinks: { href: string; name: string }[] = [];

  onMount(async () => {
    const user = User.getInstance();
    const codeCourse = $page.params.codeCourse;

    if (codeCourse != undefined) {
      usersItem = (await user.getCourseUsersByCode(codeCourse))
        .filter((item) => item["role"] != "admin")
        .map((item) => {
          return { value: item["userName"], name: item["userName"] };
        });

      selectedUsers = usersItem.map((item) => {
        return item.value;
      });

      topicItems = (await user.getCourseTopicsByCode(codeCourse)).map((item) => {
        return { value: item, name: item };
      });
    }
  });

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleClickAddLink = () => {
    if (isValidUrl(currentLinkUrl)) {
      const url = new URL(currentLinkUrl);

      attachedLinks.push({ href: url.href, name: url.hostname });
      attachedLinks = attachedLinks;
    } else {
      if (
        currentLinkUrl.startsWith("http://") == false &&
        currentLinkUrl.startsWith("https://") == false
      ) {
        attachedLinks.push({ href: "http://" + currentLinkUrl, name: currentLinkUrl });
      } else {
        attachedLinks.push({ href: currentLinkUrl, name: currentLinkUrl });
      }

      attachedLinks = attachedLinks;
    }

    currentLinkUrl = "";
    linkButtonDisabled = true;
  };

  const handleClickAddPathFiles = () => {
    if (pathFileValue.length > 0) {
      pathFiles.push({ value: pathFileValue, name: files[0].name });

      pathFiles = pathFiles;
    }
  };
</script>

<Modal bind:open={openModal} size="xl" class="w-full" placement="top-center">
  <div class="flex h-[40rem]">
    <div class="w-[70%] flex flex-col">
      <Label>Title</Label>
      <Input bind:value={titleTask} id="title" type="text" />

      <Textarea
        rows="6"
        class="mt-[3rem]"
        placeholder="Write a comment"
        bind:value={descriptionTask}
      >
        <Toolbar slot="header" color="dark" embedded>
          <ToolbarGroup>
            <ToolbarButton name="Format code"><CodeOutline class="w-5 h-5" /></ToolbarButton>
          </ToolbarGroup>
        </Toolbar>
      </Textarea>

      <div class="mt-[2rem]">
        <Label>Attach file</Label>
        <div class="flex">
          <Fileupload class="rounded-r-none" bind:value={pathFileValue} bind:files />
          <Button on:click={handleClickAddPathFiles} class="rounded-l-none">Attach</Button>
        </div>
      </div>

      {#if pathFiles.length > 0}
        <Listgroup items={pathFiles} let:item class="mt-[2rem]">
          <div class="grid grid-cols-2">
            <div class="col-span">
              <span class="flex flex-col"> {item.name} </span>
            </div>
            <div class="flex justify-end">
              <CloseSolid
                class="cursor-pointer w-6 h-6 outline-0"
                on:click={() => {
                  let itemIndex = pathFiles.indexOf(item);

                  pathFiles = pathFiles.filter((e, i) => i !== itemIndex);
                }}
              />
            </div>
          </div>
        </Listgroup>
      {/if}

      <div class="mt-[2rem]">
        <Label>Attach link</Label>
        <div class="flex h-[2.6rem]">
          <Button
            class="rounded-r-none w-[13%]"
            bind:disabled={linkButtonDisabled}
            on:click={handleClickAddLink}
          >
            Add link
          </Button>
          <Input
            type="url"
            on:input={() => {
              if (currentLinkUrl.length > 0) linkButtonDisabled = false;
              else {
                linkButtonDisabled = true;
              }
            }}
            class="rounded-l-none w-[87%]"
            bind:value={currentLinkUrl}
          />
        </div>

        {#if attachedLinks.length > 0}
          <Listgroup items={attachedLinks} let:item class="mt-[2rem]">
            <div class="grid grid-cols-2">
              <div class="col-span">
                <a class="flex flex-col" href={item.href} target="_blank">
                  <span>{item.name}</span>
                  <span>{item.href}</span>
                </a>
              </div>
              <div class="flex justify-end">
                <CloseSolid
                  class="cursor-pointer w-6 h-6 outline-0"
                  on:click={() => {
                    let itemIndex = attachedLinks.indexOf(item);

                    attachedLinks = attachedLinks.filter((e, i) => i !== itemIndex);
                  }}
                />
              </div>
            </div>
          </Listgroup>
        {/if}
      </div>
    </div>

    <div class="ml-[10rem] mr-[3rem] flex flex-col w-[20%]">
      <div class="mb-[1rem]">
        <Label>For students</Label>
        <MultiSelect items={usersItem} bind:value={selectedUsers} size="lg" />
      </div>
      {#if typeTask == "assignment"}
        <div class="mb-[1rem]">
          <Label>Points</Label>
          <NumberInput min="0" max="100" />
        </div>
        <div class="mb-[1rem]">
          <Label>Due</Label>
          <Input type="date" />
        </div>
      {/if}
      <div>
        <Label>Topic</Label>
        <Select class="mt-2" bind:value={selectedTopic} placeholder="">
          <option selected value="create">Create topic</option>

          {#if topicItems.length > 0}
            {#each topicItems as { value, name }}
              <option {value}>{name}</option>
            {/each}
          {:else}
            <option>No topic</option>
          {/if}
        </Select>
      </div>
    </div>
  </div>
  <svelte:fragment slot="footer">
    <div class="flex justify-end w-full">
      <Button class="w-[20%] mr-[2.5rem]">Create</Button>
    </div>
  </svelte:fragment>
</Modal>
