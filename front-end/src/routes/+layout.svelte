<script lang="ts">
  import { User } from "$lib/user";
  import "../app.postcss";
  import {
    Avatar,
    Button,
    Drawer,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
  } from "flowbite-svelte";
  import {
    UserSettingsSolid,
    HomeSolid,
    BarsSolid,
    CalendarMonthSolid,
    ArchiveSolid,
  } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import { sineIn } from "svelte/easing";

  let hiddenValue = true;

  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn,
  };

  $: loggedIn = false;
  let userName: string;
  let userEmail: string;

  onMount(async () => {
    if (User.getInstance().isLogginIn() == true) {
      loggedIn = true;

      const user = User.getInstance();

      userName = await user.getUserName();
      userEmail = await user.getUserEmail();
    }
  });

  const signOut = () => {
    User.getInstance().logOut();
    window.location.reload();
  };
</script>

<div class="flex justify-between ml-2 mt-2">
  <div class="flex">
    <span
      class="w-7 h-7 hover:rounded-full hover:bg-gray-200 hover:shadow-xl hover:shadow-gray-300"
    >
      <BarsSolid on:click={() => (hiddenValue = !hiddenValue)} class="w-7 h-7 cursor-pointer" />
    </span>

    <div class="flex ml-4">
      <img
        class="w-8 h-8"
        src="https://www.gstatic.com/classroom/logo_square_rounded.svg"
        alt="ImageGoogleClass"
      />
      <span class="text-2xl">RabbitRoom</span>
    </div>
  </div>
  {#if loggedIn == true}
    <div>
      <Avatar id="user-drop" class="w-22 h-10 mr-12 cursor-pointer" src="/yaiko_paravoz.png" />
      <Dropdown triggeredBy="#user-drop">
        <DropdownHeader>
          <span class="block text-sm">{userName}</span>
          <span class="block truncate text-sm font-medium">{userEmail}</span>
        </DropdownHeader>

        <DropdownItem>Settings</DropdownItem>
        <DropdownDivider />
        <DropdownItem on:click={signOut}>Sign out</DropdownItem>
      </Dropdown>
    </div>
  {:else}
    <div>
      <Button class="w-22 h-10" href="/auth/login_form">Sign In</Button>
      <Button class="w-22 h-10" href="/auth/registr_form">Sign Up</Button>
    </div>
  {/if}
</div>

<Drawer transitionType="fly" {transitionParams} bind:hidden={hiddenValue}>
  <Sidebar asideClass="bg-transparent">
    <SidebarWrapper>
      <SidebarGroup>
        <SidebarItem
          on:click={() => {
            window.location.href = "/";
          }}
          label="Home"
        >
          <svelte:fragment slot="icon">
            <HomeSolid
              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Calendar">
          <svelte:fragment slot="icon">
            <CalendarMonthSolid
              class="w-5 h-5  text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Arhive courses">
          <svelte:fragment slot="icon">
            <ArchiveSolid
              class="w-5 h-5  text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Settings">
          <svelte:fragment slot="icon">
            <UserSettingsSolid
              class="w-5 h-5  text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
        </SidebarItem>
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
</Drawer>

<slot />
