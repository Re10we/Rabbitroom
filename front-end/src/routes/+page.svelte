<script lang="ts">
  import { Button, Card } from "flowbite-svelte";
  import "../app.postcss";
  import { onMount } from "svelte";
  import { User } from "$lib/user";
  import JoinCourse from "./course/auth/JoinCourse.svelte";
  import CreateCourse from "./course/auth/CreateCourse.svelte";

  $: loginingUser = false;

  let userName: string;
  let userEmail: string;
  $: userCourses = [];

  onMount(async () => {
    const user = User.getInstance();

    loginingUser = await user.isLogginIn();
    if (loginingUser) {
      userName = await user.getUserName();
      userEmail = await user.getUserEmail();
      userCourses = await user.getUserCourses();
    }
  });
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>
<main>
  {#if loginingUser == true}
    {#if userCourses.length > 0}
      <div class="flex mt-10 h-[50%] w-screen flex-wrap">
        {#each userCourses as { nameCourse, codeCourse }}
          <Card href="/course/{codeCourse}" class="ml-12 w-[18rem] h-[16rem]" padding="none">
            <div
              class="relative bg-[url('/back_course_1.jfif')] h-[7rem] rounded-t-md bg-no-repeat bg-center bg-cover"
            >
              <span class="absolute top-[5%] left-2 text-white font-medium text-5xl"
                >{nameCourse}</span
              >
            </div>
          </Card>
        {/each}
      </div>
    {/if}
  {/if}
  {#if userCourses.length == 0}
    <div class="relative h-[55rem]">
      <div class="absolute top-[50%] left-[50%] -ml-28 -mt-28">
        <Button><JoinCourse loggedInUser={loginingUser} /></Button>
        <Button class="bg-transparent hover:bg-transparent text-black focus:ring-0 ">
          <CreateCourse loggedInUser={loginingUser} />
        </Button>
      </div>
    </div>
  {/if}
</main>
