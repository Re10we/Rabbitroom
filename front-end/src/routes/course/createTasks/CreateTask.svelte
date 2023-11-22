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
  import FormData from "form-data";
  import CreateTopic from "./CreateTopic.svelte";

  export let typeTask: "assignment" | "material" | "reusePost" | "topic";
  export let openModal = false;

  let titleTask: string = "";
  let descriptionTask: string = "";
  let files: File[] = [];
  let currentFile: FileList;

  let usersItem: { value: string; name: string }[] = [];
  let selectedUsers: (string | number)[];

  let topicItems: { value: string; name: string }[] = [];
  let selectedTopic: string = "No topic";

  let attachedLinks: { href: string; name: string }[] = [];
  let currentLinkUrl = "";

  let linkButtonDisabled = true;

  let dueValue: Date;
  let maxPointsValue: number;

  let openModalTopic = false;

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
    if (currentFile.length > 0) {
      files.push(currentFile[0]);

      files = files;
    }
  };

  const handleClickCreateTask = async () => {
    const user = User.getInstance();
    const codeCourse = $page.params.codeCourse;

    if (titleTask != "") {
      const formData: FormData = new FormData();

      formData.append("title", titleTask);
      formData.append("description", descriptionTask);
      formData.append("due", dueValue ?? "");
      formData.append("maxPoints", maxPointsValue ?? "");
      formData.append("topic", selectedTopic);
      selectedUsers.map((item) => {
        formData.append("students", item);
      });
      files.map((item) => {
        formData.append("files", item, item.name);
      });
      formData.append(
        "links",
        attachedLinks.map((item) => {
          return item.href;
        })
      );

      const response = await user.createTask(formData, codeCourse);
      if (response) {
        openModal = false;

        window.location.reload();
      }
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
          <Fileupload class="rounded-r-none" bind:files={currentFile} />
          <Button on:click={handleClickAddPathFiles} class="rounded-l-none">Attach</Button>
        </div>
      </div>

      {#if files.length > 0}
        <Listgroup items={files} let:item class="mt-[2rem]">
          <div class="grid grid-cols-2">
            <div class="col-span">
              <span class="flex flex-col"> {item.name} </span>
            </div>
            <div class="flex justify-end">
              <CloseSolid
                class="cursor-pointer w-6 h-6 outline-0"
                on:click={() => {
                  let itemIndex = files.indexOf(item);

                  files = files.filter((e, i) => i !== itemIndex);
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
          <NumberInput min="0" max="100" bind:value={maxPointsValue} />
        </div>
        <div class="mb-[1rem]">
          <Label>Due</Label>
          <Input type="date" bind:value={dueValue} />
        </div>
      {/if}
      <div>
        <Label>Topic</Label>
        <Select
          class="mt-2"
          bind:value={selectedTopic}
          on:change={() => {
            if (selectedTopic == "createTopic") {
              openModalTopic = true;
              openModal = false;
            }
          }}
        >
          <option value="createTopic">Create topic</option>
          <option selected value="No topic">No topic</option>
          {#if topicItems.length > 0}
            {#each topicItems as { value, name }}
              <option {value}>{name}</option>
            {/each}
          {/if}
        </Select>
      </div>
    </div>
  </div>
  <svelte:fragment slot="footer">
    <div class="flex justify-end w-full">
      {#if (typeTask == "assignment" && (titleTask == "" || !dueValue || new Date(dueValue).toLocaleDateString() == new Date().toLocaleDateString())) || (typeTask == "material" && titleTask == "")}
        <Button on:click={handleClickCreateTask} class="w-[20%] mr-[2.5rem]" disabled>
          Create
        </Button>
      {:else}
        <Button on:click={handleClickCreateTask} class="w-[20%] mr-[2.5rem]">Create</Button>
      {/if}
    </div>
  </svelte:fragment>
</Modal>

<CreateTopic bind:openModal={openModalTopic} />
