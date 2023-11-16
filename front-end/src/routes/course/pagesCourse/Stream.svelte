<script lang="ts">
  import { User } from "$lib/user";
  import "../../../app.postcss";
  import { AccordionItem, Accordion } from "flowbite-svelte";
  import { ClipboardListSolid } from "flowbite-svelte-icons";
  import { onMount } from "svelte";

  let nameCourse: string | null = "";
  let codeCourse: string | undefined = "";

  onMount(async () => {
    const user = User.getInstance();

    codeCourse = user.getCurrentCodeCourse();
    if (codeCourse != undefined) {
      nameCourse = await user.getCourseNameByCode(codeCourse);
    }
  });
</script>

<div class="mt-6 flex justify-center">
  <div
    class="relative bg-[url('/yaiko_paravoz.png')] w-[48rem] h-64 rounded-2xl bg-no-repeat bg-center bg-cover"
  >
    <span class="absolute top-[75%] left-6 text-white text-5xl">{nameCourse}</span>
  </div>
</div>

<div class="mt-6 flex justify-center ml-10">
  <!--Questions list-->
  <Accordion class="mr-6 w-[12rem]" classInactive="rounded-xl">
    <AccordionItem open>
      <span slot="header">My tasks</span>
      <Accordion>
        <AccordionItem>
          <span slot="header">My Header 2</span>
        </AccordionItem>
      </Accordion>
    </AccordionItem>
  </Accordion>

  <div class="w-[48rem] mr-64">
    <Accordion>
      <AccordionItem class="rounded-xl">
        <span slot="header" class="text-base flex gap-2">
          <ClipboardListSolid class="mt-0.5" />
          <span>My Header 2</span>
        </span>
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus
          sintexplicabo...
        </p>
      </AccordionItem>
      <AccordionItem class="rounded-xl border-t border-t-gray-200 mt-6">
        <span slot="header" class="text-base flex gap-2">
          <ClipboardListSolid class="mt-0.5" />
          <span>My Header 2</span>
        </span>
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus
          sintexplicabo...
        </p>
      </AccordionItem>
    </Accordion>
  </div>
</div>