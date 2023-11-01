<script lang="ts">
  import { Label, Input, Button, Helper } from "flowbite-svelte";
  import {
    EnvelopeSolid,
    LockSolid,
    UserCircleSolid,
  } from "flowbite-svelte-icons";
  import { AuthUser } from "../authUser";

  let name: string;
  let email: string;
  let password: string;

  const validationRegUser = async () => {
    if (password != confirm_password.value) {
      confirm_password.color_helper_box = "red";
      confirm_password.color_input_box = "red";
    } else {
      confirm_password.color_helper_box = "green";
      confirm_password.color_input_box = "green";

      await registrationClick();
    }
  };

  const registrationClick = async () => {
    const user = { name: name, email: email, password: password };
    const authUser = new AuthUser(user);

    const result = await authUser.regUser();
    console.log(result);
  };

  let confirm_password = {
    value: "" as string,
    color_input_box: "base" as "red" | "base" | "green" | undefined,
    color_helper_box: "disabled" as
      | "red"
      | "green"
      | "disabled"
      | "gray"
      | undefined,
  };
</script>

<main class="flex flex-col items-center justify-center min-h-screen">
  <div class="mb-6">
    <Label for="input-group-1" class="block mb-2">Your Username</Label>
    <Input bind:value={name} id="email" type="text" placeholder="your_username">
      <UserCircleSolid
        slot="left"
        class="w-5 h-5 text-gray-500 dark:text-gray-400"
      />
    </Input>
  </div>

  <div class="mb-6">
    <Label for="input-group-1" class="block mb-2">Your Email</Label>
    <Input
      bind:value={email}
      id="email"
      type="email"
      placeholder="name@flowbite.com"
    >
      <EnvelopeSolid
        slot="left"
        class="w-5 h-5 text-gray-500 dark:text-gray-400"
      />
    </Input>
  </div>

  <div class="mb-6">
    <Label for="input-group-1" class="block mb-2">Create password</Label>
    <Input bind:value={password} id="password" type="password">
      <LockSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
    </Input>
  </div>

  <div class="mb-6">
    <Label for="input-group-1" class="block mb-2">Confirm password</Label>
    <Input
      bind:value={confirm_password.value}
      id="password"
      type="password"
      color={confirm_password.color_input_box}
    >
      <LockSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
    </Input>
    <Helper class="mt-2" color={confirm_password.color_helper_box} />
  </div>
  <div>
    <Button on:click={registrationClick} href="/">Sign up</Button>
  </div>
</main>

<style>
</style>
