<script lang="ts">
  import "../../../app.postcss";
  import { Button, ButtonGroup } from "flowbite-svelte";
  import Stream from "../pagesCourse/Stream.svelte";
  import Users from "../pagesCourse/Users.svelte";
  import ClassWork from "../pagesCourse/ClassWork.svelte";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  enum ButtonState {
    stream,
    classWork,
    users,
  }

  let defaultClass: string = "w-[16rem] border-transparent";
  let activeClass: string = defaultClass + " border-b-black";
  let currentButtonState: ButtonState | null = null;

  if (browser) {
    currentButtonState = Number(localStorage.getItem("courseLastState")) ?? ButtonState.stream;
  }

  const changeButtonState = (newState: ButtonState) => {
    currentButtonState = newState;

    localStorage.setItem("courseLastState", currentButtonState.toString());
  };
</script>

<svelte:head>
  <title>Course</title>
</svelte:head>

{#if currentButtonState != null}
  <div class="mt-6 flex justify-center">
    <ButtonGroup>
      <Button
        on:click={(e) => changeButtonState(ButtonState.stream)}
        class={currentButtonState == ButtonState.stream ? activeClass : defaultClass}
      >
        Stream
      </Button>
      <Button
        on:click={(e) => changeButtonState(ButtonState.classWork)}
        class={currentButtonState == ButtonState.classWork ? activeClass : defaultClass}
      >
        Classwork
      </Button>

      <Button
        on:click={(e) => changeButtonState(ButtonState.users)}
        class={currentButtonState == ButtonState.users ? activeClass : defaultClass}
      >
        Users
      </Button>
    </ButtonGroup>
  </div>

  {#if currentButtonState == ButtonState.stream}
    <Stream />
  {:else if currentButtonState == ButtonState.classWork}
    <ClassWork />
  {:else}
    <Users />
  {/if}
{/if}
