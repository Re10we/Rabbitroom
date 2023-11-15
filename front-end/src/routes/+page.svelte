<script lang="ts">
  import { Button, Card, Input, Label, Modal } from "flowbite-svelte";
  import "../app.postcss";
  import { onMount } from "svelte";
  import { User } from "$lib/user";
  import JoinCourse from "./course/JoinCourse.svelte";
  import CreateCourse from "./course/CreateCourse.svelte";

  $: loginingUser = false;

  let userName: string;
  let userEmail: string;
  $: userCourses = [];

  onMount(async () => {
    if (User.getInstance().isLogginIn() == true) {
      loginingUser = true;

      const user = User.getInstance();

      userName = await user.getUserName();
      userEmail = await user.getUserEmail();
      userCourses = await user.getUserCourses();
    }
  });
</script>

<main>
  {#if loginingUser == true}
    {#if userCourses.length > 0}
      <div class="flex mt-10 h-screen w-screen flex-wrap">
        {#each userCourses as { nameCourse }}
          <Card href="/" class="ml-12  w-[18rem] h-[16rem]" padding="none">
            <div
              class="relative bg-[url('/yaiko_paravoz.png')] h-[7rem] rounded-t-md bg-no-repeat bg-center bg-cover"
            >
              <span class="absolute top-[5%] left-6 text-white text-5xl">{nameCourse}</span>
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
        <Button><CreateCourse loggedInUser={loginingUser} /></Button>
      </div>
    </div>
  {/if}
</main>
