<script lang="ts">
  import { Label, Input, Button, Helper, Checkbox } from "flowbite-svelte";
  import { EnvelopeSolid, EyeOutline, EyeSlashOutline, LockSolid } from "flowbite-svelte-icons";
  import { AuthUser, type User } from "../../../lib/authUser";
  import { AxiosError, type AxiosResponse } from "axios";

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

  let isShowPassword = false;

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
      await authUser.signInUser();

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

<main class="flex justify-center">
  <div class="flex flex-col justify-center h-[55rem] w-[20rem]">
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
      <Label class="block mb-2">Password</Label>
      <Input
        type={isShowPassword ? "text" : "password"}
        placeholder="•••••"
        bind:value={password.value}
        color={password.color_input_box}
      >
        <button
          slot="left"
          on:click={() => (isShowPassword = !isShowPassword)}
          class="pointer-events-auto"
        >
          {#if isShowPassword}
            <EyeOutline class="w-6 h-6" />
          {:else}
            <EyeSlashOutline class="w-6 h-6" />
          {/if}
        </button>
      </Input>
      <Helper class="mt-2" color={password.color_helper_box}>{password.text_helper_box}</Helper>
    </div>

    <div class="flex items-start">
      <Checkbox>Remember me</Checkbox>
      <a href="/" class="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500">
        Lost password?
      </a>
    </div>

    <Button class="mt-[1rem]" on:click={handleLoginClick}>Sign in</Button>

    <div class="mt-[0.5rem] text-sm font-medium text-gray-500 dark:text-gray-300">
      Not registered?
      <a href="/auth/registr_form" class="text-primary-700 hover:underline dark:text-primary-500">
        Sign up
      </a>
    </div>
  </div>
</main>
