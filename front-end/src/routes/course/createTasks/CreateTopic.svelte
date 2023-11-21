<script lang="ts">
  import { page } from "$app/stores";
  import { User } from "$lib/user";
  import { FloatingLabelInput, Modal, Helper, Button } from "flowbite-svelte";

  export let openModal = false;

  let topic = {
    value: "" as string,
    helperValue: "" as string,
    colorInput: "base" as "base" | "red" | "green" | undefined,
    colorHelper: "disabled" as "red" | "green" | "gray" | "disabled" | undefined,
  };

  const handleClickCreateTopic = async () => {
    if (topic.value != "") {
      const user = User.getInstance();
      const codeCourse = $page.params.codeCourse;

      const isCreate = await user.createTopic(codeCourse, topic.value);

      if (isCreate) {
        topic.helperValue = "";
        topic.colorInput = "base";
        topic.colorHelper = "disabled";

        window.location.reload();

        openModal = false;
      } else {
        topic.helperValue = "this topic already exists";
        topic.colorInput = "red";
        topic.colorHelper = "red";
      }
    } else {
      topic.helperValue = "fields must be filled";
      topic.colorInput = "red";
      topic.colorHelper = "red";
    }
  };
</script>

<Modal bind:open={openModal} size="xl" class="w-[30rem]" placement="center">
  <div class="flex flex-col">
    <h1 class="font-medium flex justify-center">Create topic</h1>
    <FloatingLabelInput color={topic.colorInput} type="text" bind:value={topic.value} />
    <Helper color={topic.colorHelper}>{topic.helperValue}</Helper>

    <div class="w-full mt-[2rem] flex justify-center">
      <Button on:click={handleClickCreateTopic}>Create new topic</Button>
    </div>
  </div>
</Modal>
