<script lang="ts">
  import { Label, Input, Button, Helper } from "flowbite-svelte";
  import { EnvelopeSolid, LockSolid } from "flowbite-svelte-icons";
  import { AuthUser, type User } from "../../../lib/authUser";
  import { AxiosError, type AxiosResponse } from "axios";
  import { goto } from "$app/navigation";

  type Field = {
    value: string;
    color_input_box: "red" | "base" | "green" | undefined;
    color_helper_box: "red" | "green" | "disabled" | "gray" | undefined;
    text_helper_box: string;
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

  const validationLoginUser = async (candidate: AuthUser): Promise<boolean> => {
    let succesfullyValidate = true;

    if (candidate.getUserEmail() != "") {
      if (candidate.isValidEmail() == false) {
        email.color_helper_box = "red";
        email.color_input_box = "red";
        email.text_helper_box = "this email is incorrect";

        succesfullyValidate = false;
      }
    } else {
      email.color_helper_box = "red";
      email.color_input_box = "red";
      email.text_helper_box = "This field must be filled";

      succesfullyValidate = false;
    }

    //========================================TODO validate password========================================
    if (candidate.getUserPassword() == "") {
      password.color_helper_box = "red";
      password.color_input_box = "red";
      password.text_helper_box = "This field must be filled";

      succesfullyValidate = false;
    }
    //========================================***********************========================================

    return succesfullyValidate;
  };

  const handleLoginClick = async () => {
    const user: User = { name: "", email: email.value, password: password.value };

    const authUser = new AuthUser(user);
    if ((await validationLoginUser(authUser)) == false) {
      return;
    }
    try {
      const response: AxiosResponse<string, any> = await authUser.signInUser();

      const access_token = response.data;

      localStorage.setItem("access_token", access_token); //save access_token in local storage

      window.location.href = "/";
    } catch (error: any) {
      switch (error.constructor) {
        case AxiosError: {
          if (error.response?.status == 401) {
            email.color_helper_box = "red";
            email.color_input_box = "red";
            email.text_helper_box = "Invalid email or password";

            password.color_helper_box = "red";
            password.color_input_box = "red";
          }
        }
        default: {
          email.color_helper_box = "red";
          email.color_input_box = "red";
          email.text_helper_box = "Error";

          password.color_helper_box = "red";
          password.color_input_box = "red";
        }
      }
    }
  };
</script>

<main class="flex flex-col items-center justify-center min-h-screen">
  <div class="mb-6">
    <Label for="input-group-1" class="block mb-2">Email</Label>
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
    <Label for="input-group-1" class="block mb-2">Password</Label>
    <Input
      bind:value={password.value}
      id="password"
      type="password"
      color={password.color_input_box}
      placeholder="•••••"
    >
      <LockSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
    </Input>
    <Helper class="mt-2" color={password.color_helper_box}>{password.text_helper_box}</Helper>
  </div>

  <div>
    <Button on:click={handleLoginClick}>Sign in</Button>
    <Button href="/auth/registr_form" class="bg-transparent hover:bg-transparent text-black"
      >Sign up</Button
    >
  </div>
</main>

<style>
</style>
