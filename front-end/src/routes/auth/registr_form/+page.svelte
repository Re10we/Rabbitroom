<script lang="ts">
  import { Label, Input, Button, Helper } from "flowbite-svelte";
  import { EnvelopeSolid, LockSolid, UserCircleSolid } from "flowbite-svelte-icons";
  import { AuthUser, type User } from "../../../lib/authUser";
  import { redirect } from "@sveltejs/kit";
  import { goto } from "$app/navigation";

  type Field = {
    value: string;
    color_input_box: "red" | "base" | "green" | undefined;
    color_helper_box: "red" | "green" | "disabled" | "gray" | undefined;
    text_helper_box: string;
  };

  let name: Field = {
    value: "",
    color_input_box: "base",
    color_helper_box: "disabled",
    text_helper_box: "",
  };
  let email: Field = {
    value: "",
    color_input_box: "base",
    color_helper_box: "disabled",
    text_helper_box: "",
  };
  let password: Field = {
    value: "",
    color_input_box: "base",
    color_helper_box: "disabled",
    text_helper_box: "",
  };
  let confirm_password: Field = {
    value: "",
    color_input_box: "base",
    color_helper_box: "disabled",
    text_helper_box: "",
  };

  const validationRegUser = async (candidate: AuthUser): Promise<boolean> => {
    let succesfullyValidate = true;

    if (candidate.getUserName() != "") {
      if (candidate.isValidUserName() == false) {
        name.color_helper_box = "red";
        name.color_input_box = "red";
        name.text_helper_box = "this name is incorrect";

        succesfullyValidate = false;
      } else {
        if ((await candidate.isStorageUserName()) == false) {
          name.color_helper_box = "green";
          name.color_input_box = "green";
          name.text_helper_box = "";
        } else {
          //TODO validation for user name
          name.color_helper_box = "red";
          name.color_input_box = "red";
          name.text_helper_box = "this name is storage";
        }
      }
    } else {
      name.color_helper_box = "red";
      name.color_input_box = "red";
      name.text_helper_box = "This field must be filled";

      succesfullyValidate = false;
    }

    if (candidate.getUserEmail() != "") {
      if (candidate.isValidEmail() == false) {
        email.color_helper_box = "red";
        email.color_input_box = "red";
        email.text_helper_box = "this email is incorrect";

        succesfullyValidate = false;
      } else {
        if ((await candidate.isStorageEmail()) == false) {
          email.color_helper_box = "green";
          email.color_input_box = "green";
          email.text_helper_box = "";
        } else {
          email.color_helper_box = "red";
          email.color_input_box = "red";
          email.text_helper_box = "this email is storage";
        }
      }
    } else {
      email.color_helper_box = "red";
      email.color_input_box = "red";
      email.text_helper_box = "This field must be filled";

      succesfullyValidate = false;
    }

    //========================================TODO validate password========================================
    if (candidate.getUserPassword() != "") {
      if (candidate.isValidPassword() == false) {
        password.color_helper_box = "red";
        password.color_input_box = "red";
        //TODO
        password.text_helper_box = "password is not corrected, please add this symbol:...";

        succesfullyValidate = false;
      } else {
        password.color_helper_box = "green";
        password.color_input_box = "green";
        password.text_helper_box = "";
      }
    } else {
      password.color_helper_box = "red";
      password.color_input_box = "red";
      password.text_helper_box = "This field must be filled";

      succesfullyValidate = false;
    }
    //========================================***********************========================================

    if (confirm_password.value != "") {
      if (candidate.getUserPassword() != confirm_password.value) {
        confirm_password.color_helper_box = "red";
        confirm_password.color_input_box = "red";
        confirm_password.text_helper_box = "Passwords do not match";

        succesfullyValidate = false;
      } else {
        confirm_password.color_helper_box = "green";
        confirm_password.color_input_box = "green";
        confirm_password.text_helper_box = "";
      }
    } else {
      confirm_password.color_helper_box = "red";
      confirm_password.color_input_box = "red";
      confirm_password.text_helper_box = "This field must be filled";

      succesfullyValidate = false;
    }

    return succesfullyValidate;
  };

  const registrationClick = async () => {
    const user = { name: name.value, email: email.value, password: password.value };

    const authUser = new AuthUser(user);
    if ((await validationRegUser(authUser)) == false) {
      return;
    }

    await authUser.signUpUser();

    window.location.href = "/auth/login_form";
  };
</script>

<main class="flex flex-col items-center justify-center min-h-screen">
  <div class="mb-6">
    <Label for="input-group-1" class="block mb-2">Your Username</Label>
    <Input
      bind:value={name.value}
      color={name.color_input_box}
      id="email"
      type="text"
      placeholder="your_username"
    >
      <UserCircleSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
    </Input>
    <Helper class="mt-2" color={name.color_helper_box}>{name.text_helper_box}</Helper>
  </div>

  <div class="mb-6">
    <Label for="input-group-1" class="block mb-2">Your Email</Label>
    <Input
      bind:value={email.value}
      id="email"
      type="email"
      placeholder="name@flowbite.com"
      color={email.color_input_box}
    >
      <EnvelopeSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
    </Input>
    <Helper class="mt-2" color={email.color_helper_box}>{email.text_helper_box}</Helper>
  </div>

  <div class="mb-6">
    <Label for="input-group-1" class="block mb-2">Create password</Label>
    <Input
      bind:value={password.value}
      id="password"
      type="password"
      placeholder="•••••"
      color={password.color_input_box}
    >
      <LockSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
    </Input>
    <Helper class="mt-2" color={password.color_helper_box}>{password.text_helper_box}</Helper>
  </div>

  <div class="mb-6">
    <Label for="input-group-1" class="block mb-2">Confirm password</Label>
    <Input
      bind:value={confirm_password.value}
      id="password"
      type="password"
      placeholder="•••••"
      color={confirm_password.color_input_box}
    >
      <LockSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
    </Input>
    <Helper class="mt-2" color={confirm_password.color_helper_box}
      >{confirm_password.text_helper_box}</Helper
    >
  </div>
  <div>
    <Button on:click={registrationClick}>Sign up</Button>
  </div>
</main>

<style>
</style>
