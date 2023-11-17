<script lang="ts">
  import "../../app.postcss";
  import { Button, ButtonGroup } from "flowbite-svelte";
  import Stream from "./pagesCourse/Stream.svelte";
  import Tasks from "./pagesCourse/Tasks.svelte";
  import Users from "./pagesCourse/Users.svelte";
  import ClassWork from "./pagesCourse/ClassWork.svelte";

  enum ButtonState {
    stream,
    classWork,
    tasks,
    users,
  }

  $: currentButtonState = ButtonState.stream;
  let defaultClass: string = "w-[16rem] border-transparent";
  let activeClass: string = defaultClass + " border-b-black";

  const changeButtonState = (newState: ButtonState) => {
    currentButtonState = newState;
  };
</script>

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
      on:click={(e) => changeButtonState(ButtonState.tasks)}
      class={currentButtonState == ButtonState.tasks ? activeClass : defaultClass}
    >
      Tasks
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
{:else if currentButtonState == ButtonState.tasks}
  <Tasks />
{:else}
  <Users />
{/if}
