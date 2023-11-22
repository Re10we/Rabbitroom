<script lang="ts">
  import { page } from "$app/stores";
  import { User } from "$lib/user";
  import "../../../app.postcss";
  import { AccordionItem, Accordion, Button } from "flowbite-svelte";
  import { ClipboardListSolid, BookmarkSolid } from "flowbite-svelte-icons";
  import { onMount } from "svelte";

  let nameCourse: string | null = "";
  let codeCourse: string | undefined = "";
  let userName: string;
  let isAdminUser: boolean = false;
  $: tasks = [];

  onMount(async () => {
    const user = User.getInstance();
    const codeCourse = $page.params.codeCourse;

    nameCourse = await user.getCourseNameByCode(codeCourse);
    userName = await user.getUserName();
    isAdminUser = await user.isAdminUser(codeCourse, userName);

    tasks = (await user.getCourseTasksByCode(codeCourse)).reverse();
  });

  const handleVisibilityTasks = (
    owner: string,
    students: { name: string; points: number }[]
  ): boolean => {
    return (
      students.find((item) => item.name == userName) != undefined ||
      userName == owner ||
      isAdminUser
    );
  };
</script>

<div class="mt-6 flex justify-center">
  <div
    class="relative bg-[url('/back_course_1.jfif')] w-[48rem] h-64 rounded-2xl bg-no-repeat bg-center bg-cover"
  >
    <span class="absolute top-[75%] left-6 text-white font-medium text-5xl">{nameCourse}</span>
  </div>
</div>

<div class="mt-6 flex justify-center ml-10">
  <!--Questions list-->
  <div class="flex flex-col">
    <Accordion class="mr-6 w-[12rem]" classInactive="rounded-xl">
      <AccordionItem open>
        <span slot="header">Upcoming</span>
        {#each tasks as { title, due, owner, students }}
          {#if due != null && handleVisibilityTasks(owner, students)}
            <span>due: {new Date(due).toLocaleDateString()}</span>
            <span>{title}</span>
          {/if}
        {/each}
      </AccordionItem>
    </Accordion>

    {#if isAdminUser == true}
      <div class="mt-[3rem]">
        <Accordion class="mr-6 w-[12rem]" classInactive="rounded-xl">
          <AccordionItem open>
            <span slot="header">Class code</span>

            <h1>{$page.params.codeCourse}</h1>
          </AccordionItem>
        </Accordion>
      </div>
    {/if}
  </div>

  <div class="w-[48rem] mr-64">
    <Accordion>
      {#each tasks as { title, description, due, owner, students }}
        {#if handleVisibilityTasks(owner, students)}
          <AccordionItem class="rounded-xl border-t border-t-gray-200 mt-3">
            <span slot="header" class="text-base flex gap-2">
              {#if due == null}
                <BookmarkSolid class="mt-0.5 mr-2" />
              {:else}
                <ClipboardListSolid class="mt-0.5 mr-2" />
              {/if}
              <span>{title}</span>
            </span>
            <p class="mb-2 text-gray-500 dark:text-gray-400">{description}</p>
            <div class="flex justify-end">
              <Button class="h-8">View</Button>
            </div>
          </AccordionItem>
        {/if}
      {/each}
    </Accordion>
  </div>
</div>
