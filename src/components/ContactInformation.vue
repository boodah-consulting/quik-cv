<template>
  <div class="row" id="wrapper">
    <div class="col text-h2" id="personal-details">
      <div id="name" class="q-pl-xl">
        <span class="q-pl-xl first-name">{{ firstName }}</span> <span class="last-name">{{ lastName }}</span>
      </div>
    </div>
    <div id="contact-details">
      <div class="justify-center q-my-md q-mr-md">
        <div class="col" id="email"> {{ email }} </div>
        <div class="col" id="phone"> {{ phone }} </div>
      </div>
    </div>
  </div>
  <span class="row justify-center" id="location">{{ location }}</span>
  <span class="row justify-center" id="github">{{ github }} </span>
</template>

<style></style>

<script>
import contactDetails from './../data/contact_details.json'

/**
 *
 * Component used to display contact information
 *
 * Usage:
 *   <ContactInformation />
 *
 * @module ContactInformation
 *
 */
export default {
  name: 'ContactInformation',
  data: function () {
    return { ...contactDetails };
  },
}
</script>
